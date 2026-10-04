import { useEffect, useMemo, useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { Slider } from '@base-ui/react/slider'
import { Switch } from '@base-ui/react/switch'
import { ToggleGroup } from '@base-ui/react/toggle-group'
import { Toggle } from '@base-ui/react/toggle'
import {
  MODEL_VERSION,
  PRESETS,
  distributeEvenly,
  distributeReduction,
  runScenario,
  runTarget,
  type Assumptions,
  type PresetName,
} from '../model/scenario'
import { SAMPLE_PROFILE, THRESHOLDS, binLabel, eligibleVehicles } from './data'
import { TrafficChart } from './TrafficChart'

type Mode = 'budget' | 'target'

type Inputs = {
  mode: Mode
  start: number
  end: number
  reward: number
  budget: number
  target: number
  threshold: number
  preset: PresetName | 'custom'
  assumptions: Assumptions
  laterOn: boolean
  laterShare: number
}

const DEFAULTS: Inputs = {
  mode: 'budget',
  start: 8,
  end: 12,
  reward: 3,
  budget: 1000,
  target: 250,
  threshold: 60,
  preset: 'central',
  assumptions: PRESETS.central,
  laterOn: true,
  laterShare: 0.5,
}

type Saved = { id: string; name: string; savedAt: string; inputs: Inputs; modelVersion: string }

const STORE = 'flexpay-planner-proposals-v1'

const readSaved = (): Saved[] => {
  try {
    return JSON.parse(localStorage.getItem(STORE) ?? '[]')
  } catch {
    return []
  }
}

const int = (n: number) => Math.round(n).toLocaleString('en-IE')
const eur = (n: number, digits = 0) =>
  `€${n.toLocaleString('en-IE', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`
const pct = (n: number) => `${Math.round(n * 100)}%`

function derive(inputs: Inputs) {
  const counts = SAMPLE_PROFILE.slice(inputs.start, inputs.end)
  const baseline = counts.reduce((a, b) => a + b, 0)
  const eligible = eligibleVehicles(baseline, inputs.threshold)
  const len = inputs.end - inputs.start
  const laterStart = inputs.end
  const laterEnd = Math.min(SAMPLE_PROFILE.length, inputs.end + 4)
  const laterAvailable = laterEnd - laterStart === 4
  const laterShare = inputs.laterOn && laterAvailable ? inputs.laterShare : null

  const base = { baseline, eligible, reward: inputs.reward, budget: inputs.budget, laterShare }
  const scenario = runScenario({ ...base, assumptions: inputs.assumptions })
  const range = {
    cautious: runScenario({ ...base, assumptions: PRESETS.cautious }).additional,
    optimistic: runScenario({ ...base, assumptions: PRESETS.optimistic }).additional,
  }
  const target = runTarget({ target: inputs.target, eligible, reward: inputs.reward, budget: inputs.budget, assumptions: inputs.assumptions })

  const shown = inputs.mode === 'target' ? Math.min(inputs.target, baseline) : scenario.additional
  const later = laterShare === null ? 0 : shown * laterShare

  return {
    baseline,
    eligible,
    len,
    scenario,
    range,
    target,
    shown,
    laterAvailable,
    laterWindow: laterShare === null ? null : { start: laterStart, end: laterEnd, added: distributeEvenly(laterEnd - laterStart, later) },
    reductions: distributeReduction(counts, shown),
    later,
  }
}

export function PlannerApp() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS)
  const [saved, setSaved] = useState<Saved[]>(readSaved)
  const [toast, setToast] = useState('')
  const set = (patch: Partial<Inputs>) => setInputs((s) => ({ ...s, ...patch }))
  const d = useMemo(() => derive(inputs), [inputs])
  const windowText = `${binLabel(inputs.start)}–${binLabel(inputs.end)}`

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify(saved))
    } catch {
      // Saving proposals is a demo convenience.
    }
  }, [saved])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const save = () => {
    const name = `${windowText} · €${inputs.reward} · ${inputs.mode === 'budget' ? eur(inputs.budget) + '/day' : `target ${inputs.target}`}`
    setSaved((s) => [{ id: crypto.randomUUID(), name, savedAt: new Date().toISOString(), inputs, modelVersion: MODEL_VERSION }, ...s].slice(0, 12))
    setToast('Proposal saved. No offers have been sent.')
  }

  return (
    <div className="planner">
      <header className="planner-topbar">
        <div className="topbar-left">
          <span className="crumb muted">Pilot planner</span>
          <span className="crumb-sep">/</span>
          <span className="crumb">Untitled proposal</span>
          <span className="tag tag-outline">DRAFT</span>
        </div>
        <div className="topbar-right">
          <span className="small muted">Sample data · not live</span>
          <SavedDialog saved={saved} onLoad={(s) => setInputs(s.inputs)} onClear={() => setSaved([])} />
          <CompareDialog saved={saved} />
          <button type="button" className="pbtn pbtn-primary" onClick={save}>
            Save proposal
          </button>
        </div>
      </header>

      <div className="planner-body">
        <main className="planner-main">
          <div className="section-header">
            <div>
              <h1>N7 inbound · Junction 1 to M50</h1>
              <p className="muted">Weekday morning profile · 15-minute intervals · all vehicles · counter location to confirm</p>
            </div>
            <ToggleGroup
              className="segmented"
              value={[inputs.mode]}
              onValueChange={(v) => v.length && set({ mode: v[v.length - 1] as Mode })}
              aria-label="Planning mode"
            >
              <Toggle value="budget" className="segment">
                Start from budget
              </Toggle>
              <Toggle value="target" className="segment">
                Start from target
              </Toggle>
            </ToggleGroup>
          </div>

          <section className="chart-section">
            <div className="chart-head">
              <span className="strong">Vehicle crossings per 15 minutes</span>
              <div className="legend">
                <span><i className="sw sw-history" />Observed · sample weekday</span>
                <span><i className="sw sw-scenario" />Scenario estimate</span>
                <span><i className="sw sw-avoided" />Avoided</span>
                <span><i className="sw sw-later" />Moved later · assumed</span>
              </div>
            </div>
            <TrafficChart
              start={inputs.start}
              end={inputs.end}
              onChange={(start, end) => set({ start, end })}
              reductions={d.reductions}
              later={d.laterWindow}
              windowLabel={inputs.mode === 'target' ? `Offer window · target ${int(inputs.target)}` : `Offer window · ${windowText}`}
            />
          </section>

          <div className="window-strip">
            <div className="strip-group">
              <span className="muted">Window</span>
              <TimeSelect value={inputs.start} min={0} max={inputs.end - 1} onChange={(start) => set({ start })} label="Window start" />
              <span className="muted">to</span>
              <TimeSelect value={inputs.end} min={inputs.start + 1} max={SAMPLE_PROFILE.length} onChange={(end) => set({ end })} label="Window end" />
            </div>
            <div className="strip-group grow">
              <span className="muted">Baseline</span>
              <span className="num strong">{int(d.baseline)}</span>
              <span className="muted">crossings · sample</span>
            </div>
            <label className="strip-group">
              <Switch.Root className="pswitch" checked={inputs.laterOn} onCheckedChange={(laterOn) => set({ laterOn })} disabled={!d.laterAvailable}>
                <Switch.Thumb className="pswitch-thumb" />
              </Switch.Root>
              <span>Model later travel</span>
              <select
                className="pinput num"
                value={inputs.laterShare}
                onChange={(e) => set({ laterShare: Number(e.target.value) })}
                disabled={!inputs.laterOn || !d.laterAvailable}
                aria-label="Share travelling later"
              >
                {[0.25, 0.5, 0.75].map((s) => (
                  <option key={s} value={s}>
                    {pct(s)}
                  </option>
                ))}
              </select>
              <span className="muted">into</span>
              <span className="num">{d.laterAvailable ? `${binLabel(inputs.end)}–${binLabel(inputs.end + 4)}` : 'no later data'}</span>
            </label>
          </div>

          <div className="controls">
            <section className="control-col">
              <h2 className="plabel">Offer</h2>
              <div className="field-col">
                <span id="reward-label">Reward per completed offer</span>
                <ToggleGroup
                  className="segmented full"
                  value={[[2, 3, 5].includes(inputs.reward) ? String(inputs.reward) : 'other']}
                  onValueChange={(v) => {
                    const pick = v[v.length - 1]
                    if (!pick) return
                    set({ reward: pick === 'other' ? 4 : Number(pick) })
                  }}
                  aria-labelledby="reward-label"
                >
                  {['2', '3', '5'].map((r) => (
                    <Toggle key={r} value={r} className="segment num">
                      €{r}
                    </Toggle>
                  ))}
                  <Toggle value="other" className="segment">
                    Other
                  </Toggle>
                </ToggleGroup>
                {![2, 3, 5].includes(inputs.reward) && (
                  <MoneyInput label="Custom reward" value={inputs.reward} suffix="per offer" min={0.5} step={0.5} onChange={(reward) => set({ reward })} />
                )}
              </div>
              {inputs.mode === 'target' && (
                <div className="field-col">
                  <span>Target reduction</span>
                  <label className="pfield is-focus">
                    <input
                      type="number"
                      className="num"
                      min={1}
                      max={d.baseline}
                      value={inputs.target}
                      onChange={(e) => set({ target: Math.max(1, Number(e.target.value) || 1) })}
                      aria-label="Target reduction in crossings"
                    />
                    <span className="small muted">crossings · {((inputs.target / d.baseline) * 100).toFixed(1)}%</span>
                  </label>
                </div>
              )}
              <div className="field-col">
                <span>{inputs.mode === 'target' ? 'Daily reward budget available' : 'Daily reward budget'}</span>
                <MoneyInput label="Daily reward budget" value={inputs.budget} suffix="per day" min={0} step={50} onChange={(budget) => set({ budget })} />
                {inputs.mode === 'budget' && (
                  <span className="small muted">Funds {int(d.scenario.acceptancePlaces)} acceptances. Reserved only when someone accepts.</span>
                )}
              </div>
            </section>

            <section className="control-col">
              <h2 className="plabel">Who gets an offer</h2>
              <div className="field-col">
                <div className="row-between">
                  <span id="threshold-label">Usually crosses in window</span>
                  <span className="num strong">≥ {inputs.threshold}% of days</span>
                </div>
                <Slider.Root
                  value={inputs.threshold}
                  min={20}
                  max={100}
                  step={20}
                  onValueChange={(v) => set({ threshold: v as number })}
                  aria-labelledby="threshold-label"
                >
                  <Slider.Control className="pslider">
                    <Slider.Track className="pslider-track">
                      <Slider.Indicator className="pslider-indicator" />
                      <Slider.Thumb className="pslider-thumb" aria-label="Minimum crossing frequency" />
                    </Slider.Track>
                  </Slider.Control>
                </Slider.Root>
                <div className="slider-ticks small muted">
                  {THRESHOLDS.map((t) => (
                    <span key={t}>{t}%</span>
                  ))}
                </div>
              </div>
              <dl className="kv">
                <div>
                  <dt>Eligible vehicles</dt>
                  <dd className="num">{int(d.eligible)}</dd>
                </div>
                <div>
                  <dt>Invitations to send</dt>
                  <dd className="num">{int(d.scenario.invitations)}</dd>
                </div>
              </dl>
              <span className="tag tag-dashed">SIMULATED BASELINE</span>
            </section>

            <section className="control-col">
              <div className="row-between">
                <h2 className="plabel">Behaviour assumptions</h2>
                <AssumptionsDialog inputs={inputs} onApply={(assumptions, preset) => set({ assumptions, preset })} />
              </div>
              <dl className="kv">
                <div>
                  <dt>Accept the offer</dt>
                  <dd className="num">{pct(inputs.assumptions.accept)}</dd>
                </div>
                <div>
                  <dt>Complete once accepted</dt>
                  <dd className="num">{pct(inputs.assumptions.complete)}</dd>
                </div>
                <div>
                  <dt>Changed because of the offer</dt>
                  <dd className="num">{pct(inputs.assumptions.caused)}</dd>
                </div>
              </dl>
              <div className="row-start">
                <span className="tag tag-assumed">ASSUMED · UNTESTED</span>
                <span className="small muted">{inputs.preset === 'custom' ? 'Custom' : `${inputs.preset[0].toUpperCase()}${inputs.preset.slice(1)} case`}</span>
              </div>
            </section>
          </div>
        </main>

        <aside className="rail" aria-live="polite">
          {inputs.mode === 'budget' ? <BudgetRail d={d} inputs={inputs} windowText={windowText} /> : <TargetRail d={d} inputs={inputs} windowText={windowText} />}

          <section className="rail-section">
            <h2 className="plabel">{inputs.mode === 'budget' ? 'Reward cost · per day' : 'Reward cost at target · per day'}</h2>
            <div className="cost-row">
              <div>
                <span className="num cost">
                  {inputs.mode === 'budget'
                    ? eur(d.scenario.payments)
                    : d.target
                      ? eur(d.target.placesNeeded * inputs.assumptions.complete * inputs.reward)
                      : '—'}
                </span>
                <span className="small muted">Expected payments</span>
              </div>
              <div>
                <span className="num cost">
                  {d.scenario.costPerAdditional === null ? 'n/a' : eur(d.scenario.costPerAdditional, 2)}
                </span>
                <span className="small muted">Per crossing avoided</span>
              </div>
            </div>
            <p className="small muted">Rewards only. Infrastructure, integration and operating costs not included.</p>
          </section>

          {d.laterWindow ? (
            <section className="rail-section bordered">
              <h2 className="plabel">Where the {int(d.shown)} journeys go</h2>
              <div className="split-row">
                <i className="sw sw-later" />
                <span>
                  Travel later, {binLabel(d.laterWindow.start)}–{binLabel(d.laterWindow.end)}
                </span>
                <span className="num">{int(d.later)}</span>
              </div>
              <div className="split-row muted">
                <i className="sw sw-avoided" />
                <span>Outside this model</span>
                <span className="num">{int(d.shown - d.later)}</span>
              </div>
            </section>
          ) : (
            <section className="rail-section bordered">
              <p className="small muted">Displacement outside the window is not modelled.</p>
            </section>
          )}
        </aside>
      </div>

      <div className={`ptoast ${toast ? 'is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}

type Derived = ReturnType<typeof derive>

function BudgetRail({ d, inputs, windowText }: { d: Derived; inputs: Inputs; windowText: string }) {
  const s = d.scenario
  const max = Math.max(d.range.optimistic, s.additional, 1) * 1.1
  const pos = (v: number) => `${(v / max) * 100}%`
  const limit =
    s.acceptancesLimitedBy === 'budget'
      ? `Limited by budget. Assumed uptake would fill ${int(s.invitations * inputs.assumptions.accept - s.acceptancePlaces)} more acceptances at this reward.`
      : `Limited by assumed uptake, not budget. The ${eur(inputs.budget)} budget could fund ${int(s.acceptancePlaces)} acceptances.`

  return (
    <>
      <section className="rail-section">
        <h2 className="plabel">Estimated change · per day</h2>
        <div className="hero">
          <span className="num hero-number">{int(s.additional)}</span>
          <span className="hero-text">
            fewer crossings
            <br />
            {windowText}
          </span>
        </div>
        <p className="small muted">
          {s.reductionPct === null ? '' : `${s.reductionPct.toFixed(1)}% of the ${int(d.baseline)} baseline · `}
          {inputs.preset === 'custom' ? 'custom case' : `${inputs.preset} case`}
        </p>
        <div className="range" aria-label={`Range ${int(d.range.cautious)} cautious to ${int(d.range.optimistic)} optimistic`}>
          <div className="range-track">
            <span className="range-band" style={{ left: pos(d.range.cautious), width: `calc(${pos(d.range.optimistic)} - ${pos(d.range.cautious)})` }} />
            <span className="range-tick" style={{ left: pos(d.range.cautious) }} />
            <span className="range-tick" style={{ left: pos(d.range.optimistic) }} />
            <span className="range-marker" style={{ left: pos(s.additional) }} />
          </div>
          <div className="range-labels small">
            <span style={{ left: pos(d.range.cautious) }}>
              Cautious <b className="num">{int(d.range.cautious)}</b>
            </span>
            <span style={{ left: pos(d.range.optimistic) }}>
              Optimistic <b className="num">{int(d.range.optimistic)}</b>
            </span>
          </div>
        </div>
      </section>

      <section className="rail-section">
        <h2 className="plabel">How we get there</h2>
        <Funnel
          rows={[
            ['Invited', s.invitations],
            ['Accept', s.acceptances],
            ['Complete', s.completions],
            ['Caused by offer', s.additional],
          ]}
        />
        <p className="note">{limit}</p>
      </section>
    </>
  )
}

function TargetRail({ d, inputs, windowText }: { d: Derived; inputs: Inputs; windowText: string }) {
  const t = d.target
  return (
    <>
      <section className="rail-section">
        <h2 className="plabel">Target · per day</h2>
        <div className="hero">
          <span className="num hero-number ink">{int(inputs.target)}</span>
          <span className="hero-text">
            fewer crossings
            <br />
            {windowText}
          </span>
        </div>
        {t && (
          <p className="verdict">
            <i className={`verdict-dot ${t.reachable ? 'ok' : ''}`} />
            {t.reachable ? 'Reachable with this pool and budget' : 'Not reachable with this pool and budget'}
          </p>
        )}
        {!t && <p className="verdict">Can't be reached when an assumption is zero.</p>}
      </section>

      {t && (
        <table className="gap-table">
          <thead>
            <tr>
              <th scope="col">Central case needs</th>
              <th scope="col">Needed</th>
              <th scope="col">Have</th>
              <th scope="col">Short</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Eligible vehicles</th>
              <td className="num">{int(t.invitationsNeeded)}</td>
              <td className="num muted">{int(d.eligible)}</td>
              <td className={`num short ${t.shortVehicles ? 'is-short' : ''}`}>{t.shortVehicles ? int(t.shortVehicles) : '—'}</td>
            </tr>
            <tr>
              <th scope="row">Daily budget</th>
              <td className="num">{eur(t.budgetNeeded)}</td>
              <td className="num muted">{eur(inputs.budget)}</td>
              <td className={`num short ${t.shortBudget ? 'is-short' : ''}`}>{t.shortBudget ? eur(t.shortBudget) : '—'}</td>
            </tr>
            <tr>
              <th scope="row">Acceptances</th>
              <td className="num">{int(t.placesNeeded)}</td>
              <td className="num muted">{int(t.placesAvailable)}</td>
              <td className={`num short ${t.shortPlaces ? 'is-short' : ''}`}>{t.shortPlaces ? int(t.shortPlaces) : '—'}</td>
            </tr>
          </tbody>
        </table>
      )}

      {t && !t.reachable && (
        <section className="rail-section">
          <h2 className="plabel">Ways to close the gap</h2>
          <ol className="steps">
            {t.shortVehicles > 0 && <li>Recruit {int(t.shortVehicles)} more eligible vehicles, through employer partners or a wider invitation drop.</li>}
            {t.shortBudget > 0 && (
              <li>
                Raise the daily budget to {eur(t.budgetNeeded)}.{t.shortVehicles > 0 ? " Budget alone won't close it: the pool is still short." : ''}
              </li>
            )}
            <li>Run as proposed and learn. Today's setup reaches about {int(d.scenario.additional)}.</li>
          </ol>
        </section>
      )}
    </>
  )
}

function Funnel({ rows }: { rows: [string, number][] }) {
  const max = Math.max(rows[0][1], 1)
  return (
    <div className="funnel">
      {rows.map(([label, value], i) => {
        const last = i === rows.length - 1
        return (
          <div key={label} className={`funnel-row ${last ? 'is-last' : ''}`}>
            <span>{label}</span>
            <span className="funnel-track">
              <span className="funnel-bar" style={{ width: `${(value / max) * 100}%` }} />
            </span>
            <span className="num">{int(value)}</span>
          </div>
        )
      })}
    </div>
  )
}

function TimeSelect({ value, min, max, onChange, label }: { value: number; min: number; max: number; onChange: (v: number) => void; label: string }) {
  return (
    <select className="pinput num" value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label={label}>
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((bin) => (
        <option key={bin} value={bin}>
          {binLabel(bin)}
        </option>
      ))}
    </select>
  )
}

function MoneyInput({
  label,
  value,
  suffix,
  min,
  step,
  onChange,
}: {
  label: string
  value: number
  suffix: string
  min: number
  step: number
  onChange: (v: number) => void
}) {
  return (
    <label className="pfield">
      <span className="num">€</span>
      <input
        type="number"
        className="num"
        aria-label={label}
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(Math.max(min, Number(e.target.value) || 0))}
      />
      <span className="small muted">{suffix}</span>
    </label>
  )
}

function AssumptionsDialog({ inputs, onApply }: { inputs: Inputs; onApply: (a: Assumptions, preset: PresetName | 'custom') => void }) {
  const [draft, setDraft] = useState(inputs.assumptions)
  const [preset, setPreset] = useState(inputs.preset)
  const fields: [keyof Assumptions, string][] = [
    ['accept', 'Accept the offer'],
    ['complete', 'Complete once accepted'],
    ['caused', 'Changed because of the offer'],
  ]
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open) {
          setDraft(inputs.assumptions)
          setPreset(inputs.preset)
        }
      }}
    >
      <Dialog.Trigger className="plink">Edit</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="pdialog-backdrop" />
        <Dialog.Popup className="pdialog">
          <Dialog.Title className="pdialog-title">Behaviour assumptions</Dialog.Title>
          <Dialog.Description className="small muted">
            These are untested scenario assumptions, not evidence. Changing the reward never changes them automatically.
          </Dialog.Description>
          <ToggleGroup
            className="segmented full"
            value={preset === 'custom' ? [] : [preset]}
            onValueChange={(v) => {
              const p = v[v.length - 1] as PresetName | undefined
              if (!p) return
              setPreset(p)
              setDraft(PRESETS[p])
            }}
            aria-label="Preset"
          >
            {(['cautious', 'central', 'optimistic'] as const).map((p) => (
              <Toggle key={p} value={p} className="segment">
                {p[0].toUpperCase() + p.slice(1)}
              </Toggle>
            ))}
          </ToggleGroup>
          <div className="kv">
            {fields.map(([key, label]) => (
              <label key={key} className="kv-input">
                <span>{label}</span>
                <span className="pfield small-field">
                  <input
                    type="number"
                    className="num"
                    min={0}
                    max={100}
                    value={Math.round(draft[key] * 100)}
                    onChange={(e) => {
                      setPreset('custom')
                      setDraft({ ...draft, [key]: Math.min(100, Math.max(0, Number(e.target.value) || 0)) / 100 })
                    }}
                  />
                  <span className="small muted">%</span>
                </span>
              </label>
            ))}
          </div>
          <div className="pdialog-actions">
            <Dialog.Close className="pbtn">Cancel</Dialog.Close>
            <Dialog.Close className="pbtn pbtn-primary" onClick={() => onApply(draft, preset)}>
              Apply
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function SavedDialog({ saved, onLoad, onClear }: { saved: Saved[]; onLoad: (s: Saved) => void; onClear: () => void }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="pbtn">Saved proposals{saved.length ? ` · ${saved.length}` : ''}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="pdialog-backdrop" />
        <Dialog.Popup className="pdialog">
          <Dialog.Title className="pdialog-title">Saved proposals</Dialog.Title>
          {saved.length === 0 ? (
            <p className="muted">Nothing saved yet. Proposals are stored in this browser only.</p>
          ) : (
            <ul className="saved-list">
              {saved.map((s) => (
                <li key={s.id}>
                  <div>
                    <span className="strong">{s.name}</span>
                    <span className="small muted">
                      {new Date(s.savedAt).toLocaleString('en-IE', { dateStyle: 'medium', timeStyle: 'short' })} · {s.modelVersion}
                    </span>
                  </div>
                  <Dialog.Close className="plink" onClick={() => onLoad(s)}>
                    Open
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          )}
          <div className="pdialog-actions">
            {saved.length > 0 && (
              <button type="button" className="pbtn" onClick={onClear}>
                Clear all
              </button>
            )}
            <Dialog.Close className="pbtn pbtn-primary">Done</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function CompareDialog({ saved }: { saved: Saved[] }) {
  const pair = saved.slice(0, 2)
  const rows = pair.map((s) => ({ s, d: derive(s.inputs) }))
  const line = (label: string, get: (x: (typeof rows)[number]) => string) => {
    const values = rows.map(get)
    const changed = values.length === 2 && values[0] !== values[1]
    return (
      <tr key={label} className={changed ? 'is-changed' : ''}>
        <th scope="row">{label}</th>
        {values.map((v, i) => (
          <td key={i} className="num">
            {v}
          </td>
        ))}
      </tr>
    )
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger className="pbtn">Compare</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="pdialog-backdrop" />
        <Dialog.Popup className="pdialog wide">
          <Dialog.Title className="pdialog-title">Compare proposals</Dialog.Title>
          {rows.length < 2 ? (
            <p className="muted">Save two proposals to compare them side by side.</p>
          ) : (
            <table className="compare-table">
              <thead>
                <tr>
                  <th />
                  <th scope="col">Newer</th>
                  <th scope="col">Older</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group">
                  <th colSpan={3}>Inputs</th>
                </tr>
                {line('Window', (x) => `${binLabel(x.s.inputs.start)}–${binLabel(x.s.inputs.end)}`)}
                {line('Reward', (x) => eur(x.s.inputs.reward, 2))}
                {line('Daily budget', (x) => eur(x.s.inputs.budget))}
                {line('Eligibility threshold', (x) => `≥ ${x.s.inputs.threshold}%`)}
                <tr className="group">
                  <th colSpan={3}>Assumptions</th>
                </tr>
                {line('Accept / complete / caused', (x) =>
                  [x.s.inputs.assumptions.accept, x.s.inputs.assumptions.complete, x.s.inputs.assumptions.caused].map(pct).join(' / '),
                )}
                <tr className="group">
                  <th colSpan={3}>Outcomes</th>
                </tr>
                {line('Additional crossings avoided', (x) => int(x.d.scenario.additional))}
                {line('Expected payments', (x) => eur(x.d.scenario.payments))}
                {line('Per crossing avoided', (x) => (x.d.scenario.costPerAdditional === null ? 'n/a' : eur(x.d.scenario.costPerAdditional, 2)))}
              </tbody>
            </table>
          )}
          <p className="small muted">Highlighted rows differ. Check whether a better outcome comes from a bigger intervention or from more optimistic assumptions.</p>
          <div className="pdialog-actions">
            <Dialog.Close className="pbtn pbtn-primary">Done</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
