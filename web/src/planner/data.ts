// Planner demo fixtures. The road profile is a labelled sample until a verified N7 dataset
// is prepared; the eligible-vehicle cohort is simulated. See docs/experience/council-simulator-prd.md.

export const PROFILE_START = 6 * 60
export const BIN_MINUTES = 15

/** Sample weekday crossings per 15 minutes, 06:00–11:00, inbound, all vehicles. */
export const SAMPLE_PROFILE = [
  520, 640, 780, 900, 1020, 1110, 1170, 1210, 1230, 1290, 1270, 1210, 1110, 1020, 960, 910, 860, 820, 790, 770,
]

export const binLabel = (bin: number) => {
  const minutes = PROFILE_START + bin * BIN_MINUTES
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

/** Share of window crossings made by enrolled vehicles in the simulated pilot cohort. */
const ENROLLED_SHARE = 0.32

/** Simulated share of enrolled vehicles that cross on at least this share of comparable days. */
const FREQUENCY_SHARE: Record<number, number> = { 20: 0.95, 40: 0.82, 60: 0.625, 80: 0.38, 100: 0.12 }

export const THRESHOLDS = [20, 40, 60, 80, 100]

/** Simulated distinct eligible vehicles for a window. 08:00–09:00 at 60% gives the PRD's 1,000. */
export function eligibleVehicles(baseline: number, threshold: number): number {
  return Math.round(baseline * ENROLLED_SHARE * (FREQUENCY_SHARE[threshold] ?? 0))
}
