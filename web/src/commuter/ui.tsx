import type { ReactNode } from 'react'
import { Dialog } from '@base-ui/react/dialog'

export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <span className="statusbar-time">9:41</span>
      <svg width="82" height="22" viewBox="0 0 82 22" fill="currentColor">
        <path d="M3.7 13H2.5a1 1 0 0 0-1 1v2.5a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1m5.2-2.5H7.7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1M14.1 8h-1.2a1 1 0 0 0-1 1v7.5a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1m5.2-2.5h-1.2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1.2a1 1 0 0 0 1-1v-10a1 1 0 0 0-1-1" />
        <rect x="53" y="6" width="23" height="11" rx="3.5" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="55" y="8" width="19" height="7" rx="2" />
      </svg>
    </div>
  )
}

export function DemoTag() {
  return <span className="tag tag-demo">DEMO</span>
}

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="brand">
        <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true">
          <rect x="1" y="1" width="16" height="16" rx="4" fill="currentColor" />
          <path d="M5 12.5 L9 5.5 L13 12.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>FlexPay</span>
      </div>
      <DemoTag />
    </header>
  )
}

export function NavHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="nav-header">
      <button type="button" className="back" onClick={onBack}>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15 5 L8 12 L15 19" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>
      <DemoTag />
    </header>
  )
}

export function Title({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="title-block">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  )
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="actions">{children}</div>
}

export function Primary({ children, onClick, disabled }: { children: ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export function Secondary({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="btn btn-ghost" onClick={onClick}>
      {children}
    </button>
  )
}

export function Outline({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="btn btn-outline" onClick={onClick}>
      {children}
    </button>
  )
}

export function Numbered({ items }: { items: ReactNode[] }) {
  return (
    <ol className="numbered">
      {items.map((item, i) => (
        <li key={i}>
          <span className="numbered-index">{String(i + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

export function Check({ tone = 'ink' }: { tone?: 'ink' | 'blue' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill={tone === 'blue' ? 'var(--color-scenario)' : 'var(--color-ink)'} />
      <path d="M6 10.2 L8.8 13 L14 7.5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6 3 L11 8 L6 13" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Explanatory sheet built on Base UI Dialog. */
export function InfoSheet({ trigger, title, children }: { trigger: ReactNode; title: string; children: ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="link-button">{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" />
        <Dialog.Popup className="sheet">
          <Dialog.Title className="sheet-title">{title}</Dialog.Title>
          <div className="sheet-body">{children}</div>
          <Dialog.Close className="btn btn-primary">Got it</Dialog.Close>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export type TimelineStep = {
  title: string
  detail: string
  state: 'done' | 'current' | 'todo' | 'warning' | 'paid'
  /** Demo shortcut: tapping the step advances the simulated clock. */
  onClick?: () => void
}

export function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="timeline">
      {steps.map((step, i) => {
        const nextDone = steps[i + 1] && steps[i + 1].state !== 'todo'
        return (
          <li
            key={step.title}
            className={`timeline-step is-${step.state}`}
            onClick={step.onClick}
            style={step.onClick ? { cursor: 'pointer' } : undefined}
          >
            <div className="timeline-rail">
              <TimelineMarker state={step.state} />
              {i < steps.length - 1 && <span className={`timeline-line ${nextDone ? 'is-done' : ''}`} />}
            </div>
            <div className="timeline-text">
              <span className="timeline-title">{step.title}</span>
              <span className="timeline-detail">{step.detail}</span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function TimelineMarker({ state }: { state: TimelineStep['state'] }) {
  if (state === 'done') return <Check />
  if (state === 'paid') return <Check tone="blue" />
  if (state === 'current')
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="#fff" stroke="var(--color-scenario)" strokeWidth="2" />
        <circle cx="10" cy="10" r="4" fill="var(--color-scenario)" />
      </svg>
    )
  if (state === 'warning')
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="9" fill="var(--color-assumed-soft)" stroke="var(--color-assumed)" strokeWidth="2" />
        <path d="M10 6 V10.5" stroke="var(--color-assumed-text)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="10" cy="13.6" r="1" fill="var(--color-assumed-text)" />
      </svg>
    )
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" fill="#fff" stroke="var(--color-history)" strokeWidth="1.5" />
    </svg>
  )
}
