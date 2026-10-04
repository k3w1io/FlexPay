import { useState } from 'react'
import { SAMPLE_PROFILE } from './data'

const W = 342
const H = 152
const BOTTOM = 128
const TOP = 44
const MAX = 1400
const START_MINUTES = 7 * 60
const BIN = 15

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const xAt = (t: string) => ((toMinutes(t) - START_MINUTES) / (SAMPLE_PROFILE.length * BIN)) * W
const yAt = (v: number) => BOTTOM - (v / MAX) * (BOTTOM - TOP)

/** Fixed historical profile with the usual crossing and the selected plan as markers. */
export function RoadChart({ usual, plan }: { usual: string; plan: string | null }) {
  const [showTable, setShowTable] = useState(false)
  const bw = W / SAMPLE_PROFILE.length
  const windowX0 = xAt('08:00')
  const windowX1 = xAt('09:00')

  return (
    <div className="chart-block">
      <div className="chart-legend">
        <span className="legend-item">
          <svg width="14" height="14" aria-hidden="true">
            <line x1="7" y1="0" x2="7" y2="14" stroke="var(--color-ink)" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
          Usual <span className="num">{usual}</span>
        </span>
        {plan && (
          <span className="legend-item is-plan">
            <svg width="14" height="14" aria-hidden="true">
              <line x1="7" y1="0" x2="7" y2="14" stroke="var(--color-scenario)" strokeWidth="2" />
            </svg>
            Your plan <span className="num">{plan}</span>
          </span>
        )}
        <span className="legend-item">
          <span className="legend-swatch" />
          Offer window
        </span>
      </div>

      <svg
        className="road-chart"
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Sample crossings per 15 minutes from 07:00 to 10:00. Offer window 08:00 to 09:00. Usual crossing ${usual}${plan ? `, planned crossing ${plan}` : ''}.`}
      >
        <rect x={windowX0} y={10} width={windowX1 - windowX0} height={BOTTOM - 10} fill="var(--color-scenario-soft)" />
        {SAMPLE_PROFILE.map((v, i) => {
          const inWindow = i >= 4 && i <= 7
          return (
            <rect
              key={i}
              x={i * bw + (bw - 18) / 2}
              y={yAt(v)}
              width={18}
              height={BOTTOM - yAt(v)}
              rx={2}
              fill={inWindow ? '#B5C4EA' : '#DDE1E5'}
            />
          )
        })}
        <line x1={xAt(usual)} y1={14} x2={xAt(usual)} y2={BOTTOM} stroke="var(--color-ink)" strokeWidth={1.5} strokeDasharray="3 3" />
        <circle cx={xAt(usual)} cy={14} r={4} fill="#fff" stroke="var(--color-ink)" strokeWidth={1.5} />
        {plan && (
          <g className="plan-marker" style={{ transform: `translateX(${xAt(plan)}px)` }}>
            <line x1={0} y1={14} x2={0} y2={BOTTOM} stroke="var(--color-scenario)" strokeWidth={2} />
            <circle cx={0} cy={14} r={5} fill="var(--color-scenario)" />
          </g>
        )}
        <line x1={0} y1={BOTTOM} x2={W} y2={BOTTOM} stroke="var(--color-ink)" />
        {['07:00', '08:00', '09:00', '10:00'].map((t, i, all) => (
          <text
            key={t}
            x={i === all.length - 1 ? W : xAt(t)}
            y={BOTTOM + 18}
            textAnchor={i === 0 ? 'start' : i === all.length - 1 ? 'end' : 'middle'}
            className="chart-tick"
          >
            {t}
          </text>
        ))}
      </svg>

      <div className="chart-caption">
        <span>Crossings per 15 min · sample weekday</span>
        <button type="button" className="link-button" onClick={() => setShowTable((v) => !v)} aria-expanded={showTable}>
          {showTable ? 'Hide values' : 'View values'}
        </button>
      </div>

      {showTable && (
        <table className="chart-table">
          <caption className="visually-hidden">Sample crossings per 15 minutes</caption>
          <thead>
            <tr>
              <th scope="col">Starts</th>
              <th scope="col">Crossings</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_PROFILE.map((v, i) => {
              const minutes = START_MINUTES + i * BIN
              const label = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
              return (
                <tr key={label}>
                  <td className="num">{label}</td>
                  <td className="num">{v.toLocaleString('en-IE')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
