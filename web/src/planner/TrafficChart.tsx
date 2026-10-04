import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { SAMPLE_PROFILE, binLabel } from './data'

const W = 976
const H = 288
const X0 = 44
const TOP = 36
const BOTTOM = 252
const MAX = 1400
const BINS = SAMPLE_PROFILE.length
const BW = (W - X0) / BINS
const BAR = 32

const sy = (v: number) => BOTTOM - (v / MAX) * (BOTTOM - TOP)
const bx = (bin: number) => X0 + bin * BW

type Props = {
  start: number
  end: number
  onChange: (start: number, end: number) => void
  /** Avoided crossings per bin inside the window. */
  reductions: number[]
  /** Added crossings per bin in the later window, or null when off. */
  later: { start: number; end: number; added: number[] } | null
  windowLabel: string
}

type Drag = { kind: 'start' | 'end' | 'move'; originBin: number; start: number; end: number }

export function TrafficChart({ start, end, onChange, reductions, later, windowLabel }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drag, setDrag] = useState<Drag | null>(null)

  const binAt = (clientX: number) => {
    const rect = svgRef.current!.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * W
    return Math.max(0, Math.min(BINS, Math.round((x - X0) / BW)))
  }

  const onPointerDown = (kind: Drag['kind']) => (e: PointerEvent) => {
    e.preventDefault()
    ;(e.target as Element).setPointerCapture(e.pointerId)
    setDrag({ kind, originBin: binAt(e.clientX), start, end })
  }

  const onPointerMove = (e: PointerEvent) => {
    if (!drag) return
    const bin = binAt(e.clientX)
    if (drag.kind === 'start') onChange(Math.min(bin, end - 1), end)
    else if (drag.kind === 'end') onChange(start, Math.max(bin, start + 1))
    else {
      const len = drag.end - drag.start
      const s = Math.max(0, Math.min(BINS - len, drag.start + bin - drag.originBin))
      onChange(s, s + len)
    }
  }

  const onKey = (edge: 'start' | 'end') => (e: KeyboardEvent) => {
    const delta = e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowRight' ? 1 : 0
    if (!delta) return
    e.preventDefault()
    if (edge === 'start') onChange(Math.max(0, Math.min(start + delta, end - 1)), end)
    else onChange(start, Math.min(BINS, Math.max(end + delta, start + 1)))
  }

  return (
    <svg
      ref={svgRef}
      className={`traffic-chart ${drag ? 'is-dragging' : ''}`}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      onPointerMove={onPointerMove}
      onPointerUp={() => setDrag(null)}
      role="group"
      aria-label={`Vehicle crossings per 15 minutes, 06:00 to 11:00. Offer window ${binLabel(start)} to ${binLabel(end)}.`}
    >
      {later && <rect x={bx(later.start)} y={10} width={bx(later.end) - bx(later.start)} height={BOTTOM - 10} className="later-band" />}
      <rect x={bx(start)} y={10} width={bx(end) - bx(start)} height={BOTTOM - 10} className="window-band" onPointerDown={onPointerDown('move')} />

      {[0, 500, 1000].map((v) => (
        <g key={v}>
          <line x1={X0} y1={sy(v)} x2={W} y2={sy(v)} className="gridline" />
          <text x={X0 - 10} y={sy(v) + 4} textAnchor="end" className="tick">
            {v.toLocaleString('en-IE')}
          </text>
        </g>
      ))}

      {SAMPLE_PROFILE.map((v, i) => {
        const x = bx(i) + (BW - BAR) / 2
        const inWindow = i >= start && i < end
        if (inWindow) {
          const scenario = v - (reductions[i - start] ?? 0)
          return (
            <g key={i} className="bar-group">
              <rect x={x} y={sy(scenario)} width={BAR} height={BOTTOM - sy(scenario)} className="bar bar-scenario" />
              {scenario < v && (
                <rect x={x + 0.5} y={sy(v) + 0.5} width={BAR - 1} height={Math.max(0, sy(scenario) - sy(v) - 1)} className="bar-avoided" />
              )}
            </g>
          )
        }
        const added = later && i >= later.start && i < later.end ? later.added[i - later.start] : 0
        return (
          <g key={i} className="bar-group">
            <rect x={x} y={sy(v)} width={BAR} height={BOTTOM - sy(v)} className="bar bar-history" />
            {added > 0 && <rect x={x} y={sy(v + added)} width={BAR} height={sy(v) - sy(v + added)} className="bar-later" />}
          </g>
        )
      })}

      {(['start', 'end'] as const).map((edge) => {
        const x = bx(edge === 'start' ? start : end)
        return (
          <g key={edge}>
            <line x1={x} y1={10} x2={x} y2={BOTTOM} className="brush-line" />
            <rect
              x={x - 6}
              y={(TOP + BOTTOM) / 2 - 14}
              width={12}
              height={28}
              rx={4}
              className="brush-handle"
              tabIndex={0}
              role="slider"
              aria-label={edge === 'start' ? 'Window start' : 'Window end'}
              aria-valuetext={binLabel(edge === 'start' ? start : end)}
              aria-valuenow={edge === 'start' ? start : end}
              aria-valuemin={0}
              aria-valuemax={BINS}
              onPointerDown={onPointerDown(edge)}
              onKeyDown={onKey(edge)}
            />
          </g>
        )
      })}

      <text x={bx(start) + 10} y={26} className="band-label band-label-window">
        {windowLabel}
      </text>
      {later && (
        <text x={bx(later.start) + 10} y={26} className="band-label band-label-later">
          Later travel · assumed
        </text>
      )}

      <line x1={X0} y1={BOTTOM} x2={W} y2={BOTTOM} className="axis" />
      {Array.from({ length: 6 }, (_, h) => {
        const x = bx(h * 4)
        return (
          <text key={h} x={x} y={BOTTOM + 22} textAnchor={h === 0 ? 'start' : h === 5 ? 'end' : 'middle'} className="tick">
            {binLabel(h * 4)}
          </text>
        )
      })}
    </svg>
  )
}
