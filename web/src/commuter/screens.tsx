import { useState, type ReactNode } from 'react'
import { RadioGroup } from '@base-ui/react/radio-group'
import { Radio } from '@base-ui/react/radio'
import { Switch } from '@base-ui/react/switch'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import { BASELINE_THURSDAYS, OFFER, PARTICIPANT, PLANS, ROUTES, planSentence, type Plan, type Route } from './data'
import { RoadChart } from './RoadChart'
import type { Commuter } from './state'
import {
  Actions,
  AppHeader,
  Chevron,
  InfoSheet,
  NavHeader,
  Numbered,
  Outline,
  Primary,
  Secondary,
  Timeline,
  Title,
} from './ui'

const euro = `€${OFFER.rewardEuro}`
const WINDOW = `${OFFER.windowStart}–${OFFER.windowEnd}`

function CheckingExplainer() {
  return (
    <>
      <p>After {OFFER.windowEnd}, we check whether {PARTICIPANT.vehicle} was seen passing the section between {WINDOW}.</p>
      <p>If we don't get enough readings to be sure, the result stays open and your reward stays reserved. A missed reading never counts against you.</p>
      <p className="muted">In this demo, observations and verification are simulated.</p>
    </>
  )
}

export function OfferScreen({ c }: { c: Commuter }) {
  return (
    <>
      <AppHeader />
      <div className="screen-body">
        <Title eyebrow={`Wednesday evening, ${PARTICIPANT.name}`} title="A little flexibility tomorrow?" />

        <section className="offer-card" aria-label="Tomorrow's offer">
          <div className="offer-card-top">
            <span className="offer-date">{OFFER.dateLong}</span>
            <span className="offer-deadline">Accept by {OFFER.acceptBy}</span>
          </div>
          <span className="money">{euro}</span>
          <p className="offer-condition">
            to keep your car out of the N7 section between <span className="num">{OFFER.windowStart}</span> and{' '}
            <span className="num">{OFFER.windowEnd}</span>.
          </p>
          <div className="offer-meta">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M2 8 H14 M10 4 L14 8 L10 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Inbound · Entry A to Exit B · {PARTICIPANT.vehicle}
          </div>
        </section>

        <section className="routine" aria-labelledby="routine-title">
          <div className="row-between">
            <h2 id="routine-title">Your usual Thursday</h2>
            <span className="evidence">Observed · simulated</span>
          </div>
          <p>
            Your car usually crosses this section around <span className="num">08:15</span>.
          </p>
          <ul className="thursdays">
            {BASELINE_THURSDAYS.map((d) => (
              <li key={d.label}>
                <span className={`dot ${d.crossed ? 'is-crossed' : ''}`} aria-hidden="true" />
                <span>{d.label}</span>
                <span className="visually-hidden">{d.crossed ? 'crossed in the window' : 'did not cross in the window'}</span>
              </li>
            ))}
          </ul>
          <div className="row-between small">
            <span className="muted">Crossed {WINDOW} on 3 of 4 Thursdays</span>
            <InfoSheet trigger="Correct this" title="Something not right?">
              <p>Tell us if this isn't your usual pattern, for example if someone else drives the car on Thursdays.</p>
              <p>Your note is kept separately. It doesn't change the camera record, and we'll review eligibility before any offer can be accepted.</p>
            </InfoSheet>
          </div>
        </section>
      </div>
      <Actions>
        <Primary onClick={() => c.go('flex')}>See how I could flex</Primary>
        <Secondary onClick={() => c.go('declined')}>Not tomorrow</Secondary>
      </Actions>
    </>
  )
}

export function FlexScreen({ c }: { c: Commuter }) {
  const { state } = c
  const firstRoute = ROUTES.find((r) => r.id === state.routeId) ?? ROUTES[0]

  return (
    <>
      <NavHeader onBack={c.back} />
      <div className="screen-body">
        <Title title="Find your flex" />

        <div className="planning-for">
          <div>
            <span className="small muted">{OFFER.dateLong} · planning for</span>
            <strong>
              {state.destinationLabel}, {state.destinationPlace}
            </strong>
          </div>
          <button type="button" className="link-button" onClick={() => c.go('setup')}>
            Change
          </button>
        </div>

        <RoadChart usual="08:15" plan={PLANS[state.plan].marker} />

        <section aria-labelledby="ways-title" className="ways">
          <h2 id="ways-title" className="label">
            Ways to keep your car out {WINDOW}
          </h2>
          <RadioGroup
            className="options"
            value={state.plan}
            onValueChange={(value) => c.update({ plan: value as Plan })}
            aria-labelledby="ways-title"
          >
            <OptionCard value="later" title="Drive later" detail="cross ~09:15" />
            <OptionCard value="transport" title="Public transport" detail="train · bus · Luas">
              <div className="option-extra">
                <span className="route-line">
                  <ModeBadge mode="train" label="Train" />
                  <span className="num">{firstRoute.stops[0].time}</span>
                  <span className="muted">{firstRoute.summary}</span>
                </span>
                <span className="row-between">
                  <span className="small muted">{ROUTES.length} routes into the city</span>
                  <button
                    type="button"
                    className="link-button strong"
                    onClick={(e) => {
                      e.stopPropagation()
                      c.update({ plan: 'transport' })
                      c.go('routes')
                    }}
                  >
                    See routes <Chevron />
                  </button>
                </span>
              </div>
            </OptionCard>
            <OptionCard value="earlier" title="Drive earlier" detail="cross before 08:00" />
          </RadioGroup>
          <p className="small muted">Whichever way you go, the offer is the same: keep the car out of the section {WINDOW}.</p>
        </section>
      </div>
      <Actions>
        <Primary onClick={() => c.go('review')}>Review the {euro} offer</Primary>
      </Actions>
    </>
  )
}

function OptionCard({ value, title, detail, children }: { value: Plan; title: string; detail: string; children?: ReactNode }) {
  return (
    <label className="option">
      <Radio.Root value={value} className="radio">
        <Radio.Indicator className="radio-dot" />
      </Radio.Root>
      <span className="option-main">
        <span className="row-between">
          <span className="option-title">{title}</span>
          <span className="muted">{detail}</span>
        </span>
        {children}
      </span>
    </label>
  )
}

function ModeBadge({ mode, label }: { mode: 'train' | 'luas' | 'bus'; label: string }) {
  return <span className={`mode mode-${mode}`}>{label}</span>
}

export function RoutesScreen({ c }: { c: Commuter }) {
  const { state } = c
  const selected = ROUTES.find((r) => r.id === state.routeId) ?? ROUTES[0]
  return (
    <>
      <NavHeader onBack={c.back} />
      <div className="screen-body">
        <Title title="Public transport" subtitle={`${OFFER.dateLong} · to ${state.destinationLabel}, ${state.destinationPlace}`} />
        <div className="routes">
          {ROUTES.map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              selected={route.id === selected.id}
              onSelect={() => c.update({ routeId: route.id, plan: 'transport' })}
            />
          ))}
        </div>
        <p className="small muted">Picking a route is just for planning. The offer stays the same: keep {PARTICIPANT.vehicle} out of the section {WINDOW}.</p>
      </div>
      <Actions>
        <Primary
          onClick={() => {
            c.update({ plan: 'transport' })
            c.back()
          }}
        >
          Plan with the {selected.stops[0].time} {selected.legs[0].label.toLowerCase()}
        </Primary>
        <Secondary onClick={c.back}>Back to options</Secondary>
      </Actions>
    </>
  )
}

function RouteCard({ route, selected, onSelect }: { route: Route; selected: boolean; onSelect: () => void }) {
  return (
    <button type="button" className={`route ${selected ? 'is-selected' : ''}`} onClick={onSelect} aria-pressed={selected}>
      <span className="row-between">
        <span className="route-modes">
          {route.legs.map((leg, i) => (
            <span key={leg.label} className="route-modes">
              {i > 0 && <Chevron />}
              <ModeBadge mode={leg.mode} label={leg.label} />
            </span>
          ))}
        </span>
        {selected ? (
          <span className="small strong blue">Selected</span>
        ) : (
          <span className="num strong">
            {route.stops[0].time}–{route.stops[route.stops.length - 1].time}
          </span>
        )}
      </span>
      {selected ? (
        <ol className="stops">
          {route.stops.map((stop, i) => (
            <li key={stop.name} className={i === route.stops.length - 1 ? 'is-last' : ''}>
              <span className="stop-dot" />
              <span>{stop.name}</span>
              <span className="num strong">{stop.time}</span>
            </li>
          ))}
        </ol>
      ) : (
        <span className="muted">{route.summary}</span>
      )}
      {selected && route.note && <span className="small muted">{route.note}</span>}
    </button>
  )
}

export function ReviewScreen({ c }: { c: Commuter }) {
  const { state } = c
  const [accepting, setAccepting] = useState(false)

  const accept = () => {
    if (accepting) return
    setAccepting(true)
    // Simulated funded-place check. A repeat tap is ignored while it runs.
    setTimeout(() => {
      setAccepting(false)
      if (state.demoOfferFull) {
        c.go('full')
      } else {
        c.update({ accepted: true })
        c.go('status')
      }
    }, 900)
  }

  return (
    <>
      <NavHeader onBack={c.back} />
      <div className="screen-body">
        <Title title="Review your offer" subtitle={`Accept by ${OFFER.acceptBy} on ${OFFER.dateLong}`} />
        <dl className="agreement">
          <div>
            <dt>Reward</dt>
            <dd className="num big">{euro}</dd>
          </div>
          <div>
            <dt>Keep out of the section</dt>
            <dd className="num">{WINDOW}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{OFFER.dateLong}</dd>
          </div>
          <div>
            <dt>Section</dt>
            <dd>{OFFER.section}</dd>
          </div>
          <div>
            <dt>Vehicle</dt>
            <dd className="num">{PARTICIPANT.vehicle}</dd>
          </div>
        </dl>
        <Numbered
          items={[
            `${planSentence(state.plan, state.routeId)} You can change it; the agreement stays the same.`,
            "It covers the car, whoever drives it. If anyone takes it through the section in the window, there's no reward.",
            "If you need to drive, that's fine. No penalty, just no reward.",
          ]}
        />
        <InfoSheet trigger="How the agreement is checked" title="How we check">
          <CheckingExplainer />
        </InfoSheet>
      </div>
      <Actions>
        <Primary onClick={accept} disabled={accepting}>
          {accepting ? 'Securing your place…' : `Accept and reserve ${euro}`}
        </Primary>
        <Secondary onClick={() => c.go('declined')}>Not tomorrow</Secondary>
      </Actions>
      <div className="visually-hidden" aria-live="polite">
        {accepting ? 'Securing your place' : ''}
      </div>
    </>
  )
}

export function DeclinedScreen({ c }: { c: Commuter }) {
  return (
    <>
      <AppHeader />
      <div className="screen-body">
        <Title eyebrow={OFFER.dateLong} title="No problem" />
        <p className="lead">Thanks for letting us know. Nothing changes, and there's no catch for saying no.</p>
        <p className="muted">We'll tell you about other mornings when places are available.</p>
      </div>
      <Actions>
        <Primary onClick={() => c.go('future')}>Hear about future mornings</Primary>
        <Secondary onClick={() => c.go('offer')}>Back to the offer</Secondary>
      </Actions>
    </>
  )
}

export function FullScreen({ c }: { c: Commuter }) {
  const { state } = c
  return (
    <>
      <NavHeader onBack={() => c.go('offer')} />
      <div className="screen-body">
        <Title title="This offer is full" subtitle={`${OFFER.dateLong} · ${WINDOW}`} />
        <section className="panel">
          <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="15" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" />
            <path d="M10 16 H22" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h2>All places were taken</h2>
          <p>Tomorrow's places filled up before your acceptance went through. Nothing was reserved, and nothing changes for you.</p>
        </section>
        <div>
          <h2 className="h3">Your plan still works</h2>
          <p className="muted">{planSentence(state.plan, state.routeId)} There's just no reward attached this time.</p>
        </div>
      </div>
      <Actions>
        <Primary onClick={() => c.go('future')}>Hear about future mornings</Primary>
        <Secondary onClick={() => c.go('offer')}>Back to home</Secondary>
      </Actions>
    </>
  )
}

export function StatusScreen({ c }: { c: Commuter }) {
  const { state } = c
  return (
    <>
      <AppHeader />
      <div className="screen-body">
        <Title eyebrow={`${OFFER.dateLong}, 07:40`} title="Your flex morning" />
        <section className="reward-card">
          <span className="reward-label">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="3" y="7" width="10" height="7" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5.5 7 V5 a2.5 2.5 0 0 1 5 0 V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Reserved for you
          </span>
          <span className="money">{euro}</span>
          <p>Yours once we've checked the agreement. Not paid yet.</p>
        </section>
        <Timeline
          steps={[
            { title: 'Accepted', detail: 'Wednesday 7 October, 21:04', state: 'done' },
            {
              title: `Keep out ${WINDOW}`,
              detail: `${PARTICIPANT.vehicle} · ${OFFER.section}. ${planSentence(state.plan, state.routeId)}`,
              state: 'current',
            },
            { title: `After ${OFFER.windowEnd}, we check`, detail: 'Nothing for you to do.', state: 'todo' },
            {
              title: 'Your result',
              detail: "Shown here when it's ready.",
              state: 'todo',
              onClick: () => c.go(state.demoOutcome === 'verified' ? 'result' : 'unconfirmed'),
            },
          ]}
        />
      </div>
      <Actions>
        <div className="button-row">
          <InfoSheet trigger={<span className="btn btn-outline">View agreement</span>} title="Your agreement">
            <p>
              Keep {PARTICIPANT.vehicle} out of the {OFFER.section} section between {WINDOW} on {OFFER.dateLong}. Reward: {euro}, reserved.
            </p>
            <CheckingExplainer />
          </InfoSheet>
          <Outline onClick={() => c.go('changed')}>My plans changed</Outline>
        </div>
        <button type="button" className="list-link" onClick={() => c.go('future')}>
          Hear about future flex mornings <Chevron />
        </button>
      </Actions>
    </>
  )
}

export function ChangedScreen({ c }: { c: Commuter }) {
  const { state } = c
  return (
    <>
      <AppHeader />
      <div className="screen-body">
        <Title eyebrow={`${OFFER.dateLong}, 07:52`} title="Plans changed?" />
        <p className="lead">That's fine. Life happens.</p>
        <Numbered
          items={[
            `If ${PARTICIPANT.vehicle} passes the section between ${OFFER.windowStart} and ${OFFER.windowEnd}, you won't get this ${euro}.`,
            "There's no penalty or charge, and future offers aren't affected.",
            `We'll still check after ${OFFER.windowEnd} and show you the result.`,
          ]}
        />
        <label className="field">
          <span className="field-label">Tell us why (optional)</span>
          <textarea
            value={state.note}
            onChange={(e) => c.update({ note: e.target.value })}
            placeholder="e.g. Had to do the school run"
            rows={3}
          />
          <span className="small muted">Helps us offer better times. It doesn't change the result.</span>
        </label>
      </div>
      <Actions>
        <Primary onClick={() => c.go('status')}>Got it</Primary>
        <Secondary onClick={c.back}>Back to my agreement</Secondary>
      </Actions>
    </>
  )
}

export function ResultScreen({ c }: { c: Commuter }) {
  return (
    <>
      <AppHeader />
      <div className="screen-body">
        <Title eyebrow={`${OFFER.dateLong}, 10:12`} title="Thanks for making room" />
        <section className="credited-card">
          <div className="row-between">
            <span className="reward-label">Agreement verified</span>
            <span className="tag tag-on-blue">SIMULATED</span>
          </div>
          <span className="money">+{euro}</span>
          <p>Credited for Thursday's agreement. Nothing more to do.</p>
        </section>
        <Timeline
          steps={[
            { title: 'Accepted', detail: 'Wednesday 7 October, 21:04', state: 'done' },
            { title: `Kept out ${WINDOW}`, detail: `${PARTICIPANT.vehicle} · ${OFFER.section}`, state: 'done' },
            { title: 'Agreement verified', detail: 'Enough observations in the window · simulated', state: 'done' },
            { title: `${euro} credited`, detail: 'Simulated credit · no real payment', state: 'paid' },
          ]}
        />
      </div>
      <Actions>
        <div className="button-row">
          <InfoSheet trigger={<span className="btn btn-outline">View details</span>} title="Thursday's agreement">
            <p>
              {PARTICIPANT.vehicle} was not seen in the {OFFER.section} section between {WINDOW} on {OFFER.dateLong}, with enough
              observations to be sure.
            </p>
            <p className="muted">Simulated verification and credit. No real payment was made.</p>
          </InfoSheet>
          <Outline onClick={() => c.go('offer')}>Done</Outline>
        </div>
        <button type="button" className="list-link" onClick={() => c.go('future')}>
          Hear about future flex mornings <Chevron />
        </button>
      </Actions>
    </>
  )
}

export function UnconfirmedScreen({ c }: { c: Commuter }) {
  return (
    <>
      <AppHeader />
      <div className="screen-body">
        <Title eyebrow={`${OFFER.dateLong}, 10:12`} title="We couldn't confirm it yet" />
        <section className="pending-card">
          <span className="reward-label">Still reserved</span>
          <span className="money">{euro}</span>
          <p>We didn't get enough readings to confirm either way. This isn't a fail, and your {euro} stays reserved while we check.</p>
        </section>
        <Timeline
          steps={[
            { title: 'Accepted', detail: 'Wednesday 7 October, 21:04', state: 'done' },
            { title: `Window ended at ${OFFER.windowEnd}`, detail: `${PARTICIPANT.vehicle} · ${OFFER.section}`, state: 'done' },
            { title: 'Not enough readings', detail: "The camera's coverage had gaps · simulated", state: 'warning' },
            { title: 'Being reviewed', detail: "We'll update you here. Nothing to do.", state: 'todo' },
          ]}
        />
      </div>
      <Actions>
        <div className="button-row">
          <InfoSheet trigger={<span className="btn btn-outline">View details</span>} title="Why it's still open">
            <CheckingExplainer />
          </InfoSheet>
          <InfoSheet trigger={<span className="btn btn-outline">Ask a question</span>} title="Ask a question">
            <p>In the full service you could ask for a review here. This demo doesn't send messages.</p>
          </InfoSheet>
        </div>
        <button type="button" className="list-link" onClick={() => c.go('future')}>
          Hear about future flex mornings <Chevron />
        </button>
      </Actions>
    </>
  )
}

export function SetupScreen({ c }: { c: Commuter }) {
  const { state } = c
  const [label, setLabel] = useState(state.destinationLabel)
  const [place, setPlace] = useState(state.destinationPlace)
  return (
    <>
      <NavHeader onBack={c.back} />
      <div className="screen-body">
        <Title title="Where do you usually head?" subtitle="On weekday mornings. Optional, and you can change it any time." />
        <div className="field">
          <span className="field-label" id="call-it">
            Call it
          </span>
          <ToggleGroup
            className="chips"
            value={[label]}
            onValueChange={(v) => v.length && setLabel(v[v.length - 1])}
            aria-labelledby="call-it"
          >
            {['Office', 'School run', 'Other'].map((name) => (
              <Toggle key={name} value={name} className="chip">
                {name}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
        <label className="field">
          <span className="field-label">Area or address</span>
          <span className="input-with-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M9 16 C9 16 3.5 10.5 3.5 7 a5.5 5.5 0 0 1 11 0 C14.5 10.5 9 16 9 16 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="9" cy="7" r="2" fill="currentColor" />
            </svg>
            <input value={place} onChange={(e) => setPlace(e.target.value)} />
          </span>
        </label>
        <section className="panel">
          <h2 className="h3">Why we ask</h2>
          <p>So we can show you real ways in: trains, buses and Luas, and when to drive.</p>
          <p>It never affects your rewards. We only see your car where it passes the FlexZone.</p>
        </section>
      </div>
      <Actions>
        <Primary
          onClick={() => {
            c.update({ destinationLabel: label, destinationPlace: place.trim() || state.destinationPlace })
            c.back()
          }}
        >
          Save
        </Primary>
        <Secondary onClick={c.back}>Skip for now</Secondary>
      </Actions>
    </>
  )
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export function FutureScreen({ c }: { c: Commuter }) {
  const { state } = c
  const [days, setDays] = useState<string[]>(state.days)
  const [reminders, setReminders] = useState(state.reminders)
  const [saved, setSaved] = useState(false)
  return (
    <>
      <NavHeader onBack={c.back} />
      <div className="screen-body">
        <Title title="Future flex mornings" subtitle="Which days might sometimes work for you?" />
        <ToggleGroup multiple className="days" value={days} onValueChange={(v) => setDays(v)} aria-label="Weekdays">
          {WEEKDAYS.map((d) => (
            <Toggle key={d} value={d} className="day">
              {d}
            </Toggle>
          ))}
        </ToggleGroup>
        <label className="switch-row">
          <span>
            <strong>Evening reminders</strong>
            <span className="small muted">The night before, never while driving</span>
          </span>
          <Switch.Root className="switch" checked={reminders} onCheckedChange={setReminders}>
            <Switch.Thumb className="switch-thumb" />
          </Switch.Root>
        </label>
        <section className="panel">
          <p>You still choose each offer, one day at a time.</p>
          <p>Offers depend on places being available, so there won't always be one.</p>
        </section>
        <div aria-live="polite" className="saved-note">
          {saved ? 'Preferences saved. This demo doesn’t send real notifications.' : ''}
        </div>
      </div>
      <Actions>
        <Primary
          onClick={() => {
            c.update({ days, reminders })
            setSaved(true)
          }}
        >
          Save
        </Primary>
        <Secondary onClick={c.back}>Not now</Secondary>
      </Actions>
    </>
  )
}
