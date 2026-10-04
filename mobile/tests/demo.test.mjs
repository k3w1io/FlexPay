import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  activePlan,
  balance,
  DEMO_LOGIN,
  earned,
  initialState,
  reducer,
  restoreState,
} from '../src/domain/demo.ts';

const start = () => reducer(initialState(), { type: 'login' });
const book = (state) => reducer(state, { type: 'book', method: 'home' });
test('sign-in is required for booking, transfers and completion', () => {
  let state = initialState();
  for (const action of [
    { type: 'book', method: 'home' },
    { type: 'transfer' },
    { type: 'complete', id: 'plan-1' },
  ])
    assert.deepEqual(reducer(state, action), state);
});
test('one day pays exactly once for both journeys, even with repeated actions', () => {
  let state = book(start());
  state = reducer(state, { type: 'complete', id: 'plan-1' });
  assert.equal(earned(state), 300);
  assert.equal(balance(state), 1500);
  for (const action of [
    { type: 'complete', id: 'plan-1' },
    { type: 'book', method: 'transit' },
    { type: 'cancel', id: 'plan-1' },
    { type: 'change', id: 'plan-1', method: 'later' },
  ])
    state = reducer(state, action);
  assert.equal(state.plans.length, 1);
  assert.equal(earned(state), 300);
  assert.equal(state.plans[0].method, 'home');
});
test('inconclusive verification holds the reward until an explicit requested review', () => {
  let state = book(start());
  state = reducer(state, { type: 'scenario', value: 'unknown' });
  state = reducer(state, { type: 'complete', id: 'plan-1' });
  assert.equal(state.plans[0].status, 'review');
  assert.equal(balance(state), 1200);
  state = reducer(state, { type: 'resolve', id: 'plan-1' });
  assert.equal(earned(state), 0);
  state = reducer(state, { type: 'appeal', id: 'plan-1' });
  state = reducer(state, { type: 'resolve', id: 'plan-1' });
  state = reducer(state, { type: 'resolve', id: 'plan-1' });
  assert.equal(earned(state), 300);
});
test('cancelled days cannot earn and can be replaced without duplicate daily rewards', () => {
  let state = book(start());
  state = reducer(state, { type: 'cancel', id: 'plan-1' });
  assert.equal(activePlan(state), undefined);
  state = reducer(state, { type: 'complete', id: 'plan-1' });
  assert.equal(earned(state), 0);
  state = reducer(state, { type: 'book', method: 'transit' });
  assert.equal(activePlan(state).id, 'plan-2');
  state = reducer(state, { type: 'complete', id: 'plan-2' });
  assert.equal(earned(state), 300);
});
test('removing Monday prevents new offers without silently cancelling saved plans', () => {
  let state = start();
  state = reducer(state, {
    type: 'profile',
    value: { ...state.profile, days: ['Tue'] },
  });
  assert.equal(book(state).plans.length, 0);
  state = book(start());
  state = reducer(state, {
    type: 'profile',
    value: { ...state.profile, days: [] },
  });
  assert.equal(activePlan(state).status, 'planned');
});
test('changing a planned travel choice does not create another plan', () => {
  let state = book(start());
  state = reducer(state, { type: 'change', id: 'plan-1', method: 'passenger' });
  assert.equal(state.plans.length, 1);
  assert.equal(state.plans[0].method, 'passenger');
  assert.equal(balance(state), 1200);
});
test('transfers debit only available funds, repeated transfers cannot overdraw', () => {
  let state = reducer(book(start()), { type: 'complete', id: 'plan-1' });
  state = reducer(state, { type: 'transfer' });
  state = reducer(state, { type: 'transfer' });
  assert.equal(state.transfers.length, 1);
  assert.equal(state.transfers[0].cents, 1500);
  assert.equal(balance(state), 0);
});
test('restored progress is validated and never contains passwords', () => {
  const state = reducer(book(start()), { type: 'complete', id: 'plan-1' });
  assert.deepEqual(restoreState(JSON.stringify(state)), state);
  assert.equal(JSON.stringify(state).includes(DEMO_LOGIN.password), false);
  for (const raw of [
    null,
    '{bad',
    '{}',
    JSON.stringify({ ...state, version: 8 }),
    JSON.stringify({ ...state, plans: [state.plans[0], state.plans[0]] }),
    JSON.stringify({ ...state, transfers: [{ id: 'bad', cents: 99000 }] }),
  ])
    assert.deepEqual(restoreState(raw), initialState());
});
test('reset restores a clean rehearsal while keeping sign-in; logout preserves progress', () => {
  const state = reducer(book(start()), { type: 'complete', id: 'plan-1' });
  const loggedOut = reducer(state, { type: 'logout' });
  assert.equal(loggedOut.signedIn, false);
  assert.equal(earned(loggedOut), 300);
  assert.deepEqual(reducer(state, { type: 'reset' }), start());
});
