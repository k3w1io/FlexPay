export const DEMO_LOGIN = { username: 'aoife.demo', password: 'FlexPayDemo!' };
export const REWARD_CENTS = 300;
export const OPENING_BALANCE_CENTS = 1200;
export const DEMO_DATE = 'Monday, 5 October';
export const METHODS = [
  {
    id: 'home',
    title: 'Work from home',
    subtitle: 'Swap the commute for a calmer start.',
    icon: 'home',
  },
  {
    id: 'transit',
    title: 'Take public transport',
    subtitle: 'Use a train, bus or Luas for both journeys.',
    icon: 'train',
  },
  {
    id: 'passenger',
    title: 'Share a lift',
    subtitle: 'Travel as a passenger; leave your car at home.',
    icon: 'people',
  },
  {
    id: 'later',
    title: 'Travel outside the peak',
    subtitle: 'After 10:00 out and after 19:00 home.',
    icon: 'clock',
  },
] as const;
export type Method = (typeof METHODS)[number]['id'];
export type Scenario = 'clear' | 'unknown';
export type PlanStatus = 'planned' | 'paid' | 'review' | 'cancelled';
export type Plan = {
  id: string;
  date: string;
  method: Method;
  status: PlanStatus;
  appealed: boolean;
};
export type Profile = {
  home: string;
  work: string;
  days: string[];
  reminders: boolean;
};
export type Transfer = { id: string; cents: number };
export type DemoState = {
  version: 1;
  signedIn: boolean;
  profile: Profile;
  plans: Plan[];
  transfers: Transfer[];
  scenario: Scenario;
};
export type Action =
  | { type: 'login' }
  | { type: 'logout' }
  | { type: 'book'; method: Method }
  | { type: 'cancel'; id: string }
  | { type: 'change'; id: string; method: Method }
  | { type: 'complete'; id: string }
  | { type: 'appeal'; id: string }
  | { type: 'resolve'; id: string }
  | { type: 'scenario'; value: Scenario }
  | { type: 'profile'; value: Profile }
  | { type: 'transfer' }
  | { type: 'reset' };

export function initialState(): DemoState {
  return {
    version: 1,
    signedIn: false,
    profile: {
      home: 'Naas',
      work: 'Dublin',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      reminders: true,
    },
    plans: [],
    transfers: [],
    scenario: 'clear',
  };
}
export function money(cents: number) {
  return `€${(cents / 100).toFixed(2)}`;
}
export function earned(state: DemoState) {
  return state.plans.filter((p) => p.status === 'paid').length * REWARD_CENTS;
}
export function balance(state: DemoState) {
  return (
    OPENING_BALANCE_CENTS +
    earned(state) -
    state.transfers.reduce((sum, t) => sum + t.cents, 0)
  );
}
export function activePlan(state: DemoState) {
  return state.plans.find((p) => p.status !== 'cancelled');
}
export function methodLabel(method: Method) {
  return METHODS.find((m) => m.id === method)?.title ?? 'Flexible travel';
}
export function reducer(state: DemoState, action: Action): DemoState {
  if (!state.signedIn && !['login', 'logout', 'reset'].includes(action.type))
    return state;
  switch (action.type) {
    case 'login':
      return { ...state, signedIn: true };
    case 'logout':
      return { ...state, signedIn: false };
    case 'reset':
      return { ...initialState(), signedIn: state.signedIn };
    case 'scenario':
      return { ...state, scenario: action.value };
    case 'profile':
      return { ...state, profile: action.value };
    case 'book': {
      // One reward per participant per day; cancelled plans may be replaced.
      if (
        !state.signedIn ||
        activePlan(state) ||
        !state.profile.days.includes('Mon')
      )
        return state;
      if (!METHODS.some((m) => m.id === action.method)) return state;
      return {
        ...state,
        plans: [
          ...state.plans,
          {
            id: `plan-${state.plans.length + 1}`,
            date: DEMO_DATE,
            method: action.method,
            status: 'planned',
            appealed: false,
          },
        ],
      };
    }
    case 'cancel':
      return {
        ...state,
        plans: state.plans.map((p) =>
          p.id === action.id && p.status === 'planned'
            ? { ...p, status: 'cancelled' }
            : p,
        ),
      };
    case 'change':
      return METHODS.some((m) => m.id === action.method)
        ? {
            ...state,
            plans: state.plans.map((p) =>
              p.id === action.id && p.status === 'planned'
                ? { ...p, method: action.method }
                : p,
            ),
          }
        : state;
    case 'complete':
      return {
        ...state,
        plans: state.plans.map((p) =>
          p.id === action.id && p.status === 'planned'
            ? { ...p, status: state.scenario === 'clear' ? 'paid' : 'review' }
            : p,
        ),
      };
    case 'appeal':
      return {
        ...state,
        plans: state.plans.map((p) =>
          p.id === action.id && p.status === 'review'
            ? { ...p, appealed: true }
            : p,
        ),
      };
    case 'resolve':
      return {
        ...state,
        plans: state.plans.map((p) =>
          p.id === action.id && p.status === 'review' && p.appealed
            ? { ...p, status: 'paid' }
            : p,
        ),
      };
    case 'transfer': {
      const cents = balance(state);
      if (!state.signedIn || cents <= 0) return state;
      return {
        ...state,
        transfers: [
          ...state.transfers,
          { id: `transfer-${state.transfers.length + 1}`, cents },
        ],
      };
    }
  }
}

// Only the synthetic profile and demo progress are persisted. Never store passwords.
export function restoreState(raw: string | null): DemoState {
  if (!raw) return initialState();
  try {
    const data = JSON.parse(raw);
    if (
      data.version !== 1 ||
      typeof data.signedIn !== 'boolean' ||
      !Array.isArray(data.plans) ||
      !Array.isArray(data.transfers)
    )
      return initialState();
    if (
      !data.profile ||
      typeof data.profile.home !== 'string' ||
      typeof data.profile.work !== 'string' ||
      !Array.isArray(data.profile.days) ||
      typeof data.profile.reminders !== 'boolean'
    )
      return initialState();
    if (
      !data.profile.days.every(
        (d: unknown) =>
          typeof d === 'string' &&
          ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(d),
      )
    )
      return initialState();
    if (!['clear', 'unknown'].includes(data.scenario)) return initialState();
    if (
      !data.plans.every(
        (p: Plan) =>
          p &&
          typeof p.id === 'string' &&
          p.date === DEMO_DATE &&
          METHODS.some((m) => m.id === p.method) &&
          ['planned', 'paid', 'review', 'cancelled'].includes(p.status) &&
          typeof p.appealed === 'boolean',
      )
    )
      return initialState();
    if (
      new Set(data.plans.map((p: Plan) => p.id)).size !== data.plans.length ||
      data.plans.filter((p: Plan) => p.status !== 'cancelled').length > 1
    )
      return initialState();
    if (
      !data.transfers.every(
        (t: Transfer) =>
          t &&
          typeof t.id === 'string' &&
          Number.isInteger(t.cents) &&
          t.cents > 0,
      )
    )
      return initialState();
    const restored: DemoState = {
      version: 1,
      signedIn: data.signedIn,
      profile: {
        home: data.profile.home,
        work: data.profile.work,
        days: data.profile.days,
        reminders: data.profile.reminders,
      },
      plans: data.plans.map((p: Plan) => ({
        id: p.id,
        date: p.date,
        method: p.method,
        status: p.status,
        appealed: p.appealed,
      })),
      transfers: data.transfers.map((t: Transfer) => ({
        id: t.id,
        cents: t.cents,
      })),
      scenario: data.scenario,
    };
    return balance(restored) >= 0 ? restored : initialState();
  } catch {
    return initialState();
  }
}
