# Planner build plan

Ticket: [FP-001](../tickets/FP-001-planner-html-build.md).
Date: 4 October 2026.

## Stack

| Choice | Reason |
| --- | --- |
| Vite + React + TypeScript | Fast local loop; builds to static HTML, CSS and JS for a browser tab |
| [Base UI](https://base-ui.com) (`@base-ui/react`) | Unstyled, accessible behaviour for toggle groups, number fields, slider, switch, dialog and tooltip; we own every pixel |
| Plain CSS with custom properties | Tokens copied from the Paper file; no utility framework to fight |
| Hand-written SVG chart | The window brush is the signature interaction; a chart library would constrain it |
| Vitest | Unit tests for the scenario model against the PRD fixtures |
| `localStorage` | Saved proposals for the prototype only |

Fonts: Instrument Sans and Geist Mono from Google Fonts.

## Project layout

```text
web/
  index.html
  src/
    main.tsx
    App.tsx
    styles/tokens.css        Paper tokens as CSS custom properties
    styles/base.css
    data/n7-sample.ts        Sample weekday profile, labelled as sample
    data/cohort.ts           Simulated eligible-vehicle baseline
    model/scenario.ts        Pure calculation contract from the PRD
    model/scenario.test.ts   Fixture tests
    state/usePlanner.ts      Planner state and derived results
    components/
      TopBar.tsx
      SectionHeader.tsx
      TrafficChart.tsx       SVG chart, brush, overlays, table alternative
      WindowStrip.tsx
      OfferControls.tsx
      EligibilityControls.tsx
      AssumptionsPanel.tsx   Includes the edit dialog
      ResultsRail.tsx
      GapTable.tsx
      EvidenceTag.tsx
```

## Phases

### 1. Foundations

- Scaffold the Vite app in `web/` (alongside the Expo starter in `mobile/`).
- Port the Paper tokens to `tokens.css` and set up fonts and base styles.
- Add the sample N7 profile (20 × 15-minute bins, 06:00–11:00) and the simulated cohort.

### 2. Model, test first

- Implement `scenario.ts` exactly as the PRD contract: invitations, acceptance places, capped acceptances, completions, additional crossings, payments, reserved and maximum commitment, binding limits, target requirements and the later-travel split.
- Write fixture tests for every number in the ticket's acceptance criteria before building any UI.

### 3. Static layout

- Build each component against the Paper artboards, using fixture values.
- Compare screenshots at 1440×900 and fix any drift before adding interaction.

### 4. Interaction

- Wire state through `usePlanner`, so every control recalculates the results.
- Chart brush: drag the window or either edge, snap to bins, keyboard arrows on the handles, and keep the time inputs in sync.
- Mode switch between budget-led and target-led; reward presets; slider and switch; assumptions dialog with the three presets.
- Animate number changes and overlay heights briefly (about 150ms); respect reduced-motion settings.

### 5. Save and compare

- Save a named proposal snapshot with the data reference and model version.
- Saved proposals list; compare two proposals side by side, highlighting changed inputs and separating "bigger intervention" from "more optimistic assumptions".

### 6. Polish and demo readiness

- Edge states: no eligible vehicles, invalid inputs, inconsistent scenario.
- Accessibility pass: labels, focus order, announcements, chart table.
- Rehearse the demo script; build static files.

## Demo script

1. Open on budget-led, central: 180 fewer crossings, €720 a day, limited by uptake.
2. Drop the budget to €500: the limit switches to budget and the estimate falls to ~100.
3. Switch to cautious: 70. The assumptions changed, the road data didn't.
4. Turn on later travel: the 09:00–10:00 bars gain the shifted journeys.
5. Switch to target-led, 250: not reachable; 390 more vehicles and €251 more a day needed.
6. Save the proposal.

## Risks

| Risk | Mitigation |
| --- | --- |
| Real N7 data isn't ready | Ship with the labelled sample profile; the data module has the same shape as the expected real feed |
| Brush interaction takes too long | Time inputs work first; the brush layers on top |
| Drift from the Paper designs | Screenshot comparison at the end of phases 3 and 6 |
| Base UI API changes | Pin the version in `package.json` |
