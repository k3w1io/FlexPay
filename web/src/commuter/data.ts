// Demo fixtures for the commuter journey. Aoife, DEMO-01, her baseline, the offer and
// every reward state are fictional. See docs/experience/commuter-experience-prd.md.

export const PARTICIPANT = {
  name: 'Aoife',
  vehicle: 'DEMO-01',
}

export const OFFER = {
  dateLong: 'Thursday 8 October',
  dateShort: 'Thu 8 Oct',
  windowStart: '08:00',
  windowEnd: '09:00',
  acceptBy: '07:30',
  rewardEuro: 3,
  section: 'N7 inbound, Entry A to Exit B',
}

/** Synthetic learning-period Thursdays. `crossed` is whether DEMO-01 crossed 08:00–09:00. */
export const BASELINE_THURSDAYS = [
  { label: '10 Sep', crossed: true },
  { label: '17 Sep', crossed: true },
  { label: '24 Sep', crossed: false },
  { label: '1 Oct', crossed: true },
]

/** Sample 15-minute road profile, 07:00–10:00. Replace with prepared TII data when available. */
export const SAMPLE_PROFILE = [1020, 1110, 1170, 1210, 1230, 1290, 1270, 1210, 1110, 1020, 960, 910]

export type Leg = { mode: 'train' | 'luas' | 'bus'; label: string }

export type Route = {
  id: string
  legs: Leg[]
  stops: { name: string; time: string }[]
  summary: string
  note?: string
}

// Train times are real scheduled services from docs/data/consumer-rail-2026-10-08.json
// (NTA GTFS, CC BY 4.0). Luas and bus times are invented for the demo; see
// docs/data/consumer-demo-invented-values.md.
export const ROUTES: Route[] = [
  {
    id: 'train-0821',
    legs: [
      { mode: 'train', label: 'Train' },
      { mode: 'luas', label: 'Luas Red' },
    ],
    stops: [
      { name: 'Sallins & Naas', time: '08:21' },
      { name: 'Heuston', time: '08:52' },
      { name: 'City centre', time: '09:05' },
    ],
    summary: 'Sallins & Naas → Heuston',
    note: "Train times: NTA timetable (CC BY 4.0). Getting to Sallins & Naas station isn't included.",
  },
  {
    id: 'train-0834',
    legs: [
      { mode: 'train', label: 'Train' },
      { mode: 'luas', label: 'Luas Red' },
    ],
    stops: [
      { name: 'Sallins & Naas', time: '08:34' },
      { name: 'Heuston', time: '08:55' },
    ],
    summary: 'Sallins & Naas → Heuston',
  },
  {
    id: 'bus-0750',
    legs: [{ mode: 'bus', label: 'Bus' }],
    stops: [
      { name: 'Naas', time: '07:50' },
      { name: 'City centre', time: '08:50' },
    ],
    summary: 'Naas → city centre · direct',
  },
]

export type Plan = 'later' | 'transport' | 'earlier'

export const PLANS: Record<Plan, { title: string; detail: string; marker: string | null }> = {
  later: { title: 'Drive later', detail: 'cross ~09:15', marker: '09:15' },
  transport: { title: 'Public transport', detail: 'train · bus · Luas', marker: null },
  earlier: { title: 'Drive earlier', detail: 'cross before 08:00', marker: '07:45' },
}

export function planSentence(plan: Plan, routeId: string): string {
  if (plan === 'later') return 'Your plan is to cross around 09:15.'
  if (plan === 'earlier') return 'Your plan is to cross before 08:00.'
  const route = ROUTES.find((r) => r.id === routeId) ?? ROUTES[0]
  const first = route.stops[0]
  return `Your plan is the ${first.time} ${route.legs[0].label.toLowerCase()} from ${first.name}.`
}
