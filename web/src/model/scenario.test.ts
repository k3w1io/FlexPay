import { describe, expect, it } from 'vitest'
import { PRESETS, distributeReduction, runScenario, runTarget, type ScenarioInput } from './scenario'

// Fixtures from docs/tickets/FP-001-planner-html-build.md and the PRD.
const central: ScenarioInput = {
  baseline: 5000,
  eligible: 1000,
  reward: 3,
  budget: 1000,
  assumptions: PRESETS.central,
  laterShare: null,
}

describe('runScenario', () => {
  it('reproduces the budget-led central fixture', () => {
    const r = runScenario(central)
    expect(r.invitations).toBe(1000)
    expect(r.acceptancePlaces).toBe(333)
    expect(r.acceptances).toBeCloseTo(300)
    expect(r.completions).toBeCloseTo(240)
    expect(r.additional).toBeCloseTo(180)
    expect(r.reductionPct).toBeCloseTo(3.6)
    expect(r.payments).toBeCloseTo(720)
    expect(r.reserved).toBeCloseTo(900)
    expect(r.maxCommitment).toBe(999)
    expect(r.costPerAdditional).toBeCloseTo(4)
    expect(r.acceptancesLimitedBy).toBe('uptake')
  })

  it('switches the binding limit to budget at €500', () => {
    const r = runScenario({ ...central, budget: 500 })
    expect(r.acceptancePlaces).toBe(166)
    expect(r.acceptances).toBe(166)
    expect(r.additional).toBeCloseTo(99.6)
    expect(r.payments).toBeCloseTo(398.4)
    expect(r.maxCommitment).toBe(498)
    expect(r.acceptancesLimitedBy).toBe('budget')
  })

  it('reproduces the cautious and optimistic presets', () => {
    expect(runScenario({ ...central, assumptions: PRESETS.cautious }).additional).toBeCloseTo(70)
    const optimistic = runScenario({ ...central, assumptions: PRESETS.optimistic })
    expect(optimistic.additional).toBeCloseTo(254.745)
    expect(optimistic.acceptancesLimitedBy).toBe('budget')
    expect(runScenario({ ...central, budget: 3000, assumptions: PRESETS.optimistic }).additional).toBeCloseTo(306)
  })

  it('fills the budget with a larger pool', () => {
    const r = runScenario({ ...central, eligible: 2000 })
    expect(r.acceptances).toBe(333)
    expect(r.additional).toBeCloseTo(199.8)
    expect(r.payments).toBeCloseTo(799.2)
  })

  it('splits later travel from the remainder', () => {
    const r = runScenario({ ...central, laterShare: 0.5 })
    expect(r.later).toBeCloseTo(90)
    expect(r.outsideModel).toBeCloseTo(90)
  })

  it('never lets the reward change the acceptance assumption', () => {
    const r2 = runScenario({ ...central, reward: 2, budget: 10000 })
    const r5 = runScenario({ ...central, reward: 5, budget: 10000 })
    expect(r2.acceptances).toBeCloseTo(r5.acceptances)
  })

  it('handles empty pools and zero outcomes', () => {
    const r = runScenario({ ...central, eligible: 0 })
    expect(r.additional).toBe(0)
    expect(r.costPerAdditional).toBeNull()
    expect(runScenario({ ...central, baseline: 0 }).reductionPct).toBeNull()
  })

  it('flags scenarios that avoid more crossings than the baseline', () => {
    expect(runScenario({ ...central, baseline: 100 }).inconsistent).toBe(true)
  })
})

describe('runTarget', () => {
  it('reproduces the 250-crossing target fixture', () => {
    const t = runTarget({ target: 250, eligible: 1000, reward: 3, budget: 1000, assumptions: PRESETS.central })
    expect(t).not.toBeNull()
    expect(t!.placesNeeded).toBe(417)
    expect(t!.invitationsNeeded).toBe(1390)
    expect(t!.budgetNeeded).toBe(1251)
    expect(t!.shortVehicles).toBe(390)
    expect(t!.shortBudget).toBe(251)
    expect(t!.shortPlaces).toBe(84)
    expect(t!.reachable).toBe(false)
  })

  it('reports reachable targets', () => {
    const t = runTarget({ target: 100, eligible: 1000, reward: 3, budget: 1000, assumptions: PRESETS.central })
    expect(t!.reachable).toBe(true)
  })

  it('returns null when an assumption is zero', () => {
    expect(runTarget({ target: 100, eligible: 1000, reward: 3, budget: 1000, assumptions: { ...PRESETS.central, accept: 0 } })).toBeNull()
  })
})

describe('distributeReduction', () => {
  it('sums to the reduction and follows the observed shape', () => {
    const parts = distributeReduction([1230, 1290, 1270, 1210], 180)
    expect(parts.reduce((a, b) => a + b, 0)).toBeCloseTo(180)
    expect(parts[1]).toBeGreaterThan(parts[0])
  })
})
