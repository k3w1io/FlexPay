import { useCallback, useEffect, useState } from 'react'
import type { Plan } from './data'

export type Screen =
  | 'setup'
  | 'offer'
  | 'flex'
  | 'routes'
  | 'review'
  | 'declined'
  | 'full'
  | 'status'
  | 'changed'
  | 'result'
  | 'unconfirmed'
  | 'future'

export type Outcome = 'verified' | 'unconfirmed'

export type CommuterState = {
  screen: Screen
  history: Screen[]
  destinationLabel: string
  destinationPlace: string
  plan: Plan
  routeId: string
  accepted: boolean
  note: string
  days: string[]
  reminders: boolean
  /** Demo controls: these simulate outcomes and never touch real records. */
  demoOfferFull: boolean
  demoOutcome: Outcome
}

export const INITIAL: CommuterState = {
  screen: 'offer',
  history: [],
  destinationLabel: 'Office',
  destinationPlace: 'Dublin city centre',
  plan: 'later',
  routeId: 'train-0821',
  accepted: false,
  note: '',
  days: ['Tue', 'Thu'],
  reminders: false,
  demoOfferFull: false,
  demoOutcome: 'verified',
}

const KEY = 'flexpay-commuter-demo-v1'

function load(): CommuterState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...INITIAL, ...JSON.parse(raw) }
  } catch {
    // Storage unavailable; fall back to the initial demo state.
  }
  return INITIAL
}

export function useCommuter() {
  const [state, setState] = useState<CommuterState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // Ignore: persistence is a convenience in the demo.
    }
  }, [state])

  const update = useCallback((patch: Partial<CommuterState>) => setState((s) => ({ ...s, ...patch })), [])

  const go = useCallback(
    (screen: Screen) => setState((s) => ({ ...s, screen, history: [...s.history, s.screen].slice(-20) })),
    [],
  )

  const back = useCallback(
    () =>
      setState((s) => {
        const history = [...s.history]
        const previous = history.pop() ?? 'offer'
        return { ...s, screen: previous, history }
      }),
    [],
  )

  const reset = useCallback(() => setState(INITIAL), [])

  return { state, update, go, back, reset }
}

export type Commuter = ReturnType<typeof useCommuter>
