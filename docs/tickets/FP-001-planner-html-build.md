# FP-001: Build the FlexZone planner prototype

Status: ready to build.
Spec: [FlexZone incentive planning screen PRD](../experience/council-simulator-prd.md).
Design: Paper file **FlexPay**, artboards **Planner — Budget-led, central** and **Planner — Target-led, gap**.
Plan: [Planner build plan](../plans/planner-build-plan.md).

## Goal

A working browser prototype of the council planning screen that a presenter can drive live in the hackathon demo. A planner chooses a window on the N7 morning profile, sets a reward and budget (or a target), and sees the estimated change, its cost and its limits update immediately.

The prototype must match the Paper designs closely. Design quality is a priority.

## Scope

### Must have

- Morning traffic chart for one FlexZone, with a draggable offer window snapped to 15-minute intervals and equivalent time inputs.
- Scenario overlay: avoided crossings in the window, plus the optional later-travel shift.
- Budget-led mode: reward presets (€2, €3, €5, custom) and daily reward budget.
- Target-led mode: target reduction input and a needed / have / short table with ways to close the gap.
- Eligibility filter (usual crossing frequency) driving a simulated eligible-vehicle count.
- Behaviour assumptions with cautious, central and optimistic presets, editable in a dialog.
- Results rail: hero estimate, scenario range, funnel, binding-limit note, reward cost, where the journeys go.
- Evidence labelling throughout: observed, simulated, assumed. Excluded costs stated beside every cost figure.

### Should have

- Save a named proposal and reload it after a page refresh.
- Compare two saved proposals side by side, with changed inputs and outcomes highlighted.

### Could have

- Recurring pilot panel shown as a static expanded state with a schedule summary.
- Commuter hand-off: a button that opens the simulated offer configured from the proposal.

### Out of scope

Live data feeds, real offer dispatch, payments, plate lookup, authentication, multi-zone planning, a calibrated traffic model, and mobile layouts below 1280px.

## Acceptance criteria

1. The budget-led central fixture (5,000 baseline, 1,000 eligible, €3, €1,000/day, 30/80/75%) shows 300 acceptances, 240 completions, 180 additional crossings, 3.6%, €720 expected payments and €4.00 per crossing.
2. A €500 budget gives 166 acceptance places, ~100 additional crossings and €398.40 payments, and the binding-limit note changes to the budget.
3. The cautious and optimistic presets give ~70 and ~255 at €1,000; the optimistic case reports that the budget binds.
4. A target of 250 shows 417 acceptances, 1,390 invitations and €1,251/day needed, with shortfalls of 84, 390 and €251.
5. Later travel at 50% moves 90 crossings into 09:00–10:00 and labels 90 as outside the model. Turning it off removes the amber overlay.
6. Changing the reward never changes the acceptance assumption.
7. Dragging the window updates the baseline, eligible pool and every result without a visible lag. Missing data is never drawn as zero.
8. Observed data is never overwritten; scenario values are a separate, labelled series distinguishable without colour.
9. Every control is keyboard operable with a visible label; the chart has a table alternative.
10. Side-by-side screenshots of the build and the Paper artboards match in layout, type, colour and spacing.
11. No action dispatches offers or moves money. The primary action is labelled "Save proposal".

## Definition of done

- Model unit tests pass, including every fixture above.
- Runs locally with one command and builds to static files that open in a browser tab for the demo.
- Reviewed against the Paper artboards at 1440×900.
- The demo script in the plan runs end to end without errors.
