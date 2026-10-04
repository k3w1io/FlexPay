import { useEffect, useRef, type JSX } from 'react'
import { useCommuter, type Commuter, type Screen } from './state'
import {
  ChangedScreen,
  DeclinedScreen,
  FlexScreen,
  FullScreen,
  OfferScreen,
  ResultScreen,
  ReviewScreen,
  RoutesScreen,
  SetupScreen,
  StatusScreen,
  UnconfirmedScreen,
  FutureScreen,
} from './screens'
import { StatusBar } from './ui'

const SCREENS: Record<Screen, (props: { c: Commuter }) => JSX.Element> = {
  setup: SetupScreen,
  offer: OfferScreen,
  flex: FlexScreen,
  routes: RoutesScreen,
  review: ReviewScreen,
  declined: DeclinedScreen,
  full: FullScreen,
  status: StatusScreen,
  changed: ChangedScreen,
  result: ResultScreen,
  unconfirmed: UnconfirmedScreen,
  future: FutureScreen,
}

export function CommuterApp() {
  const c = useCommuter()
  const { state } = c
  const Current = SCREENS[state.screen]
  const scrollRef = useRef<HTMLDivElement>(null)

  const advanceToResult = () => {
    if (!state.accepted) c.update({ accepted: true })
    c.go(state.demoOutcome === 'verified' ? 'result' : 'unconfirmed')
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [state.screen])

  // Hidden presenter shortcuts: → advance clock, F offer full, U unconfirmed, R reset.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('input, textarea') || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === 'ArrowRight' && state.screen === 'status') advanceToResult()
      else if (e.key === 'f') c.update({ demoOfferFull: !state.demoOfferFull })
      else if (e.key === 'u') c.update({ demoOutcome: state.demoOutcome === 'verified' ? 'unconfirmed' : 'verified' })
      else if (e.key === 'r') c.reset()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })


  return (
    <div className="stage">
      <div className="phone" aria-label="FlexPay commuter app">
        <StatusBar />
        <div className="phone-scroll" ref={scrollRef}>
          <main className="screen" key={state.screen}>
            <Current c={c} />
          </main>
        </div>
      </div>

    </div>
  )
}
