// Scenario calculation contract from docs/experience/council-simulator-prd.md.
// One intervention day. Outputs are approximate scenario estimates, not forecasts.

export const MODEL_VERSION = 'planner-model-0.1'

export type Assumptions = {
  /** Share of invitations accepted, 0–1. */
  accept: number
  /** Share of acceptances completed and verifiable, 0–1. */
  complete: number
  /** Share of completions caused by the offer, 0–1. */
  caused: number
}

export const PRESETS = {
  cautious: { accept: 0.2, complete: 0.7, caused: 0.5 },
  central: { accept: 0.3, complete: 0.8, caused: 0.75 },
  optimistic: { accept: 0.4, complete: 0.9, caused: 0.85 },
} satisfies Record<string, Assumptions>

export type PresetName = keyof typeof PRESETS

export type ScenarioInput = {
  /** Historical crossings in the selected window. */
  baseline: number
  /** Distinct eligible vehicles after baseline filtering. */
  eligible: number
  /** Invitation cap; defaults to the eligible pool. */
  invitationCap?: number
  /** Flat reward per completed offer, euros. */
  reward: number
  /** Daily reward budget, euros. Reserved on acceptance. */
  budget: number
  assumptions: Assumptions
  /** Share of additional avoided crossings moving to a later window, 0–1. Null when off. */
  laterShare: number | null
}

export type Limit = 'eligible' | 'invitationCap' | 'uptake' | 'budget' | 'tie'

export type ScenarioResult = {
  invitations: number
  acceptancePlaces: number
  acceptances: number
  completions: number
  additional: number
  payments: number
  reserved: number
  maxCommitment: number
  reductionPct: number | null
  costPerAdditional: number | null
  invitationsLimitedBy: Limit
  acceptancesLimitedBy: Limit
  later: number
  outsideModel: number
  inconsistent: boolean
}

// Guards against floating-point drift such as 417 / 0.3 = 1390.0000000000002.
const EPSILON = 1e-9
const safeCeil = (x: number) => Math.ceil(x - EPSILON)
const safeFloor = (x: number) => Math.floor(x + EPSILON)

export function runScenario(input: ScenarioInput): ScenarioResult {
  const { baseline, eligible, reward, budget, assumptions, laterShare } = input
  const cap = input.invitationCap ?? eligible

  const invitations = Math.min(eligible, cap)
  const acceptancePlaces = reward > 0 ? safeFloor(budget / reward) : 0
  const demanded = invitations * assumptions.accept
  const acceptances = Math.min(demanded, acceptancePlaces)
  const completions = acceptances * assumptions.complete
  const additional = completions * assumptions.caused
  const payments = completions * reward
  const reserved = acceptances * reward
  const maxCommitment = Math.min(invitations, acceptancePlaces) * reward

  const later = laterShare === null ? 0 : additional * laterShare

  return {
    invitations,
    acceptancePlaces,
    acceptances,
    completions,
    additional,
    payments,
    reserved,
    maxCommitment,
    reductionPct: baseline > 0 ? (additional / baseline) * 100 : null,
    costPerAdditional: additional > 0 ? payments / additional : null,
    invitationsLimitedBy: compareLimit(eligible, cap, 'eligible', 'invitationCap'),
    acceptancesLimitedBy: compareLimit(demanded, acceptancePlaces, 'uptake', 'budget'),
    later,
    outsideModel: additional - later,
    inconsistent: additional > baseline,
  }
}

function compareLimit(a: number, b: number, aName: Limit, bName: Limit): Limit {
  if (Math.abs(a - b) < EPSILON) return 'tie'
  return a < b ? aName : bName
}

export type TargetInput = {
  target: number
  eligible: number
  reward: number
  budget: number
  assumptions: Assumptions
}

export type TargetResult = {
  reachable: boolean
  placesNeeded: number
  invitationsNeeded: number
  budgetNeeded: number
  placesAvailable: number
  shortVehicles: number
  shortBudget: number
  shortPlaces: number
}

export function runTarget(input: TargetInput): TargetResult | null {
  const { target, eligible, reward, budget, assumptions } = input
  const { accept, complete, caused } = assumptions
  if (target <= 0 || accept <= 0 || complete <= 0 || caused <= 0 || reward <= 0) return null

  const placesNeeded = safeCeil(target / (complete * caused))
  const invitationsNeeded = safeCeil(placesNeeded / accept)
  const budgetNeeded = placesNeeded * reward
  const placesAvailable = safeFloor(budget / reward)

  const shortVehicles = Math.max(0, invitationsNeeded - eligible)
  const shortBudget = Math.max(0, budgetNeeded - budget)
  const shortPlaces = Math.max(0, placesNeeded - placesAvailable)

  return {
    reachable: shortVehicles === 0 && shortBudget === 0,
    placesNeeded,
    invitationsNeeded,
    budgetNeeded,
    placesAvailable,
    shortVehicles,
    shortBudget,
    shortPlaces,
  }
}

/** Distributes a window reduction across its bins in proportion to observed counts. */
export function distributeReduction(counts: number[], reduction: number): number[] {
  const total = counts.reduce((sum, c) => sum + c, 0)
  return counts.map((c) => (total > 0 ? (reduction * c) / total : 0))
}

/** Distributes later travel evenly by interval duration. */
export function distributeEvenly(binCount: number, amount: number): number[] {
  return Array.from({ length: binCount }, () => (binCount > 0 ? amount / binCount : 0))
}
