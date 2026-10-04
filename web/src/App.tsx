import { useEffect, useState } from 'react'
import { CommuterApp } from './commuter/CommuterApp'
import { PlannerApp } from './planner/PlannerApp'

type View = 'commuter' | 'planner'

const viewFromHash = (): View => (window.location.hash === '#/planner' ? 'planner' : 'commuter')

export function App() {
  const [view, setView] = useState<View>(viewFromHash)

  useEffect(() => {
    const onHash = () => setView(viewFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className={`app app-${view}`}>
      <nav className="demo-nav" aria-label="FlexPay demo">
        <a className="demo-brand" href="#/commuter">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <rect x="1" y="1" width="16" height="16" rx="4" fill="currentColor" />
            <path d="M5 12.5 L9 5.5 L13 12.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          FlexPay
        </a>
        <div className="demo-tabs">
          <a href="#/commuter" aria-current={view === 'commuter' ? 'page' : undefined}>
            Commuter app
          </a>
          <a href="#/planner" aria-current={view === 'planner' ? 'page' : undefined}>
            Council planner
          </a>
        </div>
        <span className="demo-note">Prototype · simulated data</span>
      </nav>
      {view === 'commuter' ? <CommuterApp /> : <PlannerApp />}
    </div>
  )
}
