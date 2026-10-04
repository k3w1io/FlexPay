# FlexZone incentive planning screen PRD

Status: draft product requirements for the hackathon prototype.
Date: 4 October 2026.
Audience: product design, technical and data workstreams, and the presentation team.

This screen helps a council or transport agency configure an incentive pilot for one road section and compare its possible participation, reward cost and effect on peak crossings. It combines historical road observations with explicit behavioural assumptions. It saves a proposal; it does not launch offers or predict proven congestion relief.

The shared purpose remains: **Pay people who can change their journey to create room for people who can’t.**

## User and problem

The primary user is a transport planner or programme manager acting for the public-sector sponsor. The responsible sponsor for a particular N7 section has not been established; the prototype must not imply that a named council has authorised the scheme.

Their job to be done is: “Help me choose a specific pressure point, understand what an incentive budget might achieve, and design a pilot we can evaluate.”

Today’s design problem is the gap between a broad ambition to reduce traffic and a concrete intervention: which direction and window, how many relevant participants, what reward, and what outcomes would make the pilot worthwhile?

The screen must help the user answer:

- What do the available road observations show?
- What can we offer within our reward budget?
- What would have to be true for the intervention to meet our target?
- Which estimates depend on assumptions we have not yet tested?

## Product context

The proposed service starts with voluntary vehicle enrolment and investigates a partnership using existing TII ANPR infrastructure at suitable verification points. TII describes encrypted plate records for journey-time measurement, including on the N7. This establishes an infrastructure lead, not access to usable plate histories or an authorised FlexPay integration. A new camera is a fallback if a suitable existing route cannot support the pilot. See the [TII notice](https://www.tii.ie/en/compliance/data-protection-notice/).

Personalised offers require a sufficient authorised baseline. A prospective 30-day learning period is an illustrative option when usable history is unavailable. Its length depends on coverage, comparable days and evidence quality; existing retention does not alone establish that records are matchable, accessible or usable for this purpose. Start prospective learning after voluntary enrolment. Do not imply that opting in automatically unlocks earlier observations.

Coverage, integration, authorised use, vehicle authorisation and reward settlement remain production dependencies. The screen uses a synthetic eligible-vehicle pool, a simulated baseline and assumed verification outcomes for the hackathon. Infrastructure and integration costs remain unknown, rather than definitely requiring a new installation.

An accepted offer, a verified fulfilment and a journey changed because of the offer are separate quantities. A departure from someone’s historical routine does not alone establish that the reward caused it.

## Scope

### Included in the first prototype

- One preconfigured FlexZone with a labelled boundary or schematic, direction and counter location.
- One historical weekday profile, with selectable windows aligned to the available data intervals.
- Budget-led and target-led entry into the same scenario form.
- A flat reward, invitation cap, eligible-vehicle count and daily reward commitment cap, reserved when an offer is accepted.
- A proposed baseline-frequency eligibility filter, with a simulated count of matching vehicles.
- Cautious, central and optimistic behavioural assumptions.
- Expected acceptances, fulfilments, additional peak crossings avoided and reward payments.
- A historical chart and a separately labelled scenario overlay.
- An optional simulated share of additional avoided crossings moving into a selected later window.
- Saving a draft and comparing two scenario snapshots.
- A lightweight recurrence choice and schedule summary; no working scheduler is required for the demo.
- Clear observed, simulated and assumed labels.

### Outside the first prototype

Live pilot operation, real offer dispatch, camera integration, plate lookup, payments, a participant management system, procurement, automated pricing, multi-zone optimisation and a calibrated traffic simulation are outside scope. Alternative travel planning remains part of the commuter experience.

Recurring proposals are in scope as a planning concept. Automated dispatch, calendar administration and a full recurring-pilot management flow remain outside the prototype.

The first prototype can show a simple assumed shift into a later window. Neighbouring-road effects, other modes, public transport capacity and network feedback remain outside the model. It must not claim a net reduction in all-day travel or network traffic.

## User journey

```text
Open a FlexZone
      ↓
Review the historical profile and its source
      ↓
Choose a direction and intervention window
      ↓
Start with a budget or a reduction target
      ↓
Set reward, invitation cap and behavioural assumptions
      ↓
Optionally repeat the opportunity on selected weekdays
      ↓
Compare scenario outcomes and limitations
      ↓
Save a draft or compare with a second proposal
```

Budget-led entry asks: “What might this reward budget achieve?”

Target-led entry asks: “What participation and reward commitment would this target require?” It estimates requirements under the selected assumptions; it does not find an optimal reward or guarantee a result.

## Screen hierarchy

The desktop layout places the selected road and historical chart above three working areas: intervention controls, scenario results, and the assumptions supporting those results. The primary action is **Save pilot proposal**; the secondary action is **Compare scenario**.

```text
FlexZone planner                     Historical scenario · Demo
Road section · direction · counter · source dates

[Map or schematic]    [Historical traffic profile]
                      [Selected window and scenario overlay]

INTERVENTION          SCENARIO RESULTS          ASSUMPTIONS
Window               Cautious / Central /     Acceptance
Reward               Optimistic               Fulfilment
Reward budget        Acceptances              Change caused by offer
Invitation cap       Fulfilments              Later travel share
Eligible pool        Additional crossings
Target, if selected  Reward payments
                     Maximum commitment

Coverage and model limitations
[Compare scenario]                  [Save pilot proposal]
```

This is a planning tool, not a real-time command centre. Avoid a traffic-light “success” state that implies the intervention is validated.

## Prototype concepts for review

These are experience-design proposals for review, not additional agreed scope. Prototype one direction first. Both use the calculation contract below and save proposals rather than launch a programme.

### Recommended concept A chart led workbench

The planner keeps the historical picture, intervention and estimated consequences together. The central interaction is selecting a window on the chart and changing the offer while the results update. A small location schematic provides context; the chart gets most of the space.

All numbers in this sketch are illustrative. The curve is schematic, not a plotted dataset. In the HTML prototype, replace it with the selected historical series and its actual source dates. Keep the sample-data label until that substitution happens.

```text
+-------------------------------------------------------------------------------------------------+
| FLEXPAY / FLEXZONE PLANNER                                   Draft / Demo   [Saved proposals]   |
| Pay people who can change their journey to create room for people who can't.                    |
+-------------------------------------------------------------------------------------------------+
| [1] FOCUS: N7 section [v] / inbound [v] / historical weekday profile [v]                        |
| Boundaries and counter: [to confirm]   Source dates: [to confirm]                               |
| Sample road data / simulated vehicle baseline / assumed behaviour                               |
+------------------------+------------------------------------------------------------------------+
| LOCATION               | [2] CHOOSE THE WINDOW                                                  |
|                        | Crossings per source interval / schematic chart                        |
| Naas --- o ---> City   |                       /\                                               |
|          |             |                  ____/  \___                                           |
| Measurement point      |             ____/           \____                                      |
| Verification coverage  |           06:00  07:00 [08:00--09:00] [09:00--10:00]                   |
| remains unconfirmed    |                                                                        |
| [View boundaries]      | Historical: solid / scenario: dashed / selected window: shaded         |
|                        | [08:00 v] to [09:00 v]    [View source and data table]                 |
+------------------------+------------------------------------------------------------------------+
| [3] CONFIGURE                                    | [4] EXPLORE THE ESTIMATE                     |
| Start with (o) Budget ( ) Target                  | Cautious       CENTRAL       Optimistic     |
| Reward      [EUR 2] [EUR 3 *] [EUR 5]             | Additional peak crossings avoided           |
| Daily cap   [EUR 1,000]                           |    70            180             ~255       |
| Invitations [1,000]                              |                                              |
| Baseline filter: crosses on at least [60%]        | Central: 5,000 -> 4,820 crossings           |
| Eligible vehicles: 1,000 / simulated              | 3.6% fewer in the selected peak window      |
|                                                  |                                              |
| INVITATIONS: 1,000 possible                       | Reward payments / estimate       EUR 720    |
| ACCEPTANCE PLACES: 333                            | Reserved rewards / estimate      EUR 900    |
| Reward reserved when someone accepts             | Maximum reservable commitment    EUR 999     |
| Invitation limit: eligible pool + invitation cap | Per additional crossing            EUR 4     |
| Central acceptance limit: assumed uptake         |                                              |
+--------------------------------------------------+----------------------------------------------+
| [5] ASSUMPTIONS: 30% accept / 80% fulfil / 75% of fulfilments caused by incentive               |
| 1,000 invitations -> 300 acceptances -> 240 rewarded fulfilments -> 180 additional changes      |
| [Edit assumptions] [How this is calculated]                                                     |
| Optional later travel [on]: assume [50%] -> 90 added to 09:00-10:00                             |
| Later illustrative baseline: 4,000 -> 4,090. Remaining 90: destination outside this model.      |
| Infrastructure, integration and operating costs excluded. Congestion relief not predicted.      |
+-------------------------------------------------------------------------------------------------+
| [6] SCHEDULE: (o) One day ( ) Repeat weekly   [Choose dates]                                    |
| [Compare scenario]                                                    [Save pilot proposal]     |
+-------------------------------------------------------------------------------------------------+
```

The screen should keep the estimate visible when the planner edits controls. On smaller screens, stack the same areas in numbered order and repeat a compact results summary near the controls.

### Jobs to be done within the workbench

| Area | Planner JTBD | Design response |
| --- | --- | --- |
| 1 Location and evidence | “Help me confirm this is the right section, direction and evidence period.” | Show boundary, counter, dates and evidence status before any result. |
| 2 Window | “Help me choose a period where a targeted intervention could be useful.” | Let the planner select a chart interval or use equivalent time fields. Keep the rest of the morning visible. Counts alone do not establish a congestion threshold. |
| 3 Offer | “Help me put together an offer we can fund.” | Separate invitations from acceptance places. Reserve rewards on acceptance and explain the limiting factors. |
| 4 Consequences | “Help me understand the scale of the possible change and compare it with the cost.” | Lead with additional peak crossings, then reduction percentage, expected payments and maximum commitment. |
| 5 Assumptions | “Help me judge whether the estimate is credible enough to propose a trial.” | Keep the three central percentages and the participation funnel visible. Provide explanations and editing on demand. |
| 6 Proposal | “Help me retain a version I can discuss with colleagues.” | Save a named snapshot, preserve its evidence reference and compare it with another draft. |
| Recurrence | “Help me plan a repeatable intervention without rebuilding the same offer every morning.” | Add a one-day or weekly choice, a finite date range and a reviewable schedule summary. |
| Later travel | “Help me see whether relief here could create pressure in the next hour.” | Optionally add an assumed share of additional crossings to a later window on the same chart. |

### Interaction to prototype first

Use a short exploration that exposes a real trade-off in the model:

1. Select the illustrative 08:00–09:00 window and inspect the baseline and source status.
2. Start at €3 per reward, a €1,000 commitment cap and 1,000 eligible vehicles/invitations. There are 333 acceptance places. Inspect the central approximation of 300 acceptances, 180 additional crossings and €720 reward payments.
3. Reduce the commitment cap to €500. Places fall to 166, the central additional-crossing estimate becomes approximately 100 and projected payments become €398.40. Invitations remain separate from those places. Save this as “Smaller pilot.”
4. Compare it with the €1,000 proposal. Then increase that proposal's cap to €3,000: its central outcome remains 180 crossings because the assumed demand from 1,000 invitations is only 300 acceptances. Display the limiting factor.
5. Return to €1,000 and select the cautious case: 70 additional crossings. The assumptions changed; historical road data did not.
6. Enable the illustrative later-travel scenario at 50%: subtract 180 crossings from the selected peak window and add 90 to the chosen later window. Keep the remaining 90 as “Outside this displacement model,” not proven eliminated journeys.

The magic moment is: **“I can see what my budget can support, what outcome we are assuming, and what we need to learn.”**

Do not demonstrate increased reward as automatically producing increased participation. With a fixed commitment cap, a higher flat reward allows fewer acceptance places. That is a useful planning insight, not an interface error.

### Alternative concept B guided pilot builder

This direction leads with one decision at a time, while retaining a compact preview. It may work better for a sponsor who is reviewing the idea for the first time and needs more explanation. It is a design alternative, not a second build requirement.

```text
+------------------------------------------------------------------------------+
| BUILD A FLEXZONE PILOT                                      Draft / Demo     |
| 1 Focus -> 2 Offer -> 3 Explore -> 4 Review                                  |
+-------------------------------------+----------------------------------------+
| WHAT CAN YOU FUND?                  | YOUR PROPOSAL SO FAR                   |
| Daily reward cap [EUR 1,000]         | N7 selected section / inbound         |
| Reward [EUR 2] [EUR 3 *] [EUR 5]     | Historical window 08:00-09:00         |
| Invitations [1,000]                 | 1,000 invitations / 333 places         |
| Eligible vehicles: 1,000            | Rewards reserved on acceptance         |
| Baseline and eligibility simulated  | Maximum reservable: EUR 999            |
|                                     | Central: ~180 additional crossings     |
| Repeat: one day / weekly [v]        | Estimated reward payments: EUR 720     |
| [Back]          [Explore scenarios] | [View assumptions]                     |
+-------------------------------------+----------------------------------------+
```

Its JTBD is: “Help me assemble a pilot proposal without needing to understand every model input at once.” Its trade-off is more navigation when comparing several configurations.

For the hackathon, start with concept A and add a short prompt above each working area. It offers a complete planning view for reviewers and makes the data-to-decision relationship visible during the demo. Keep concept B as an alternative if user review shows the workbench is too dense.

### Design influences and how to use them

These are recommendations for interaction patterns, not claims that the references validate FlexPay’s model.

| Reference | Pattern to borrow | FlexPay application |
| --- | --- | --- |
| [En-ROADS simulator guide](https://docs.climateinteractive.org/projects/en-roads/en/latest/) | Policy controls beside baseline and scenario graphs, with explanations of the model. | Let the planner explore a change and inspect its assumptions in the same view. FlexPay has a much simpler, unvalidated model; borrow the interaction, not the authority of its outputs. |
| [Observable linked brushing](https://old.observablehq.com/blog/linked-brushing) | Selecting a time range while retaining its wider context. | Select the intervention window on the morning chart and update the relevant baseline and results. Include equivalent time inputs for keyboard use. |
| [GOV.UK summary lists](https://design-system.service.gov.uk/components/summary-list/) and [details](https://design-system.service.gov.uk/components/details/) | Clear review summaries and supplementary explanations on demand. | Review saved proposal fields in a summary list; use a table for scenario comparisons. Keep essential assumption values visible and collapse only supporting explanations. |

The proposed visual direction is calm and precise: a light neutral background, dark text, one restrained accent for the current scenario and explicit evidence labels. Use clear units, generous spacing and readable tabular numbers. Show historical and modelled series through line styles as well as colour. A compact location schematic and a large time chart should provide orientation without a decorative map consuming the screen.

### Questions for design review

- Can a reviewer find the zone and window, explain the cost and identify an assumption without being coached?
- Does “maximum reward commitment” read clearly, or would “reward budget reserved” work better with the same definition?
- Do the three scenarios help understanding, or should the central result lead with cautious and optimistic cases in a compact comparison row?
- Can the reviewer explain why changing the reward does not automatically change uptake?
- Is the workbench easier to explore than the guided alternative?

## Controls and behaviour

| Control | Required behaviour |
| --- | --- |
| FlexZone | Show exact section, counter position and direction. Start with one available zone; do not present unsupported locations as usable choices. |
| Historical profile | Show dates, weekday selection, aggregation method, interval, metric, vehicle class and completeness. Historical observations must never be labelled as tomorrow’s forecast. |
| Window | Snap start and end to source intervals. Require end after start. Recalculate the baseline and eligible cohort for the selected window. |
| Repeat | Default to one day. Weekly recurrence reveals weekday choices and start/end dates, using the same road, direction and local-time window. Show the resulting intervention-day count. |
| Reward | Provide illustrative €2, €3 and €5 presets plus a positive custom amount in whole cents. These are design choices, not calibrated incentive prices. |
| Reward commitment cap | Enter a positive euro amount in whole cents per intervention day. It limits accepted reward agreements, not invitations, expected spend or total programme cost. Show `floor(cap / reward)` acceptance places. |
| Invitation cap | Enter a non-negative whole number. Invitations cannot exceed this cap or the eligible-vehicle pool. Sending an invitation does not reserve money. |
| Eligible pool | Show distinct eligible vehicles, not people, and the count's basis. For the hackathon, label it simulated. Never derive it directly from aggregate traffic volume. |
| Baseline eligibility | Offer a proposed minimum crossing frequency, such as 60% of comparable observed days. Apply it to a simulated vehicle baseline and show how many vehicles remain eligible. Label this threshold as a design assumption. |
| Target | In target-led mode, enter either a count or a percentage of baseline crossings; show the equivalent value. Require a target above zero and no greater than the baseline. |
| Assumptions | Expose acceptance, fulfilment and the share of fulfilments caused by the incentive as separate percentages from 0 to 100. State that these are scenario assumptions. |
| Later travel | Default off. When enabled, select a non-overlapping later window and a 0–100% assumed share of additional avoided peak crossings shifting there. Require comparable counts at the same counter, direction and vehicle class. |

Use a full-width selected-window highlight on the chart. Tooltips and a table alternative must expose values, units and evidence labels. Colour must not be the sole way to distinguish historical observations from the scenario.

Changing the reward does not silently increase the assumed acceptance rate. If a future model estimates a relationship between reward and uptake, it must identify its evidence and applicable cohort. For this prototype, the user can change the assumption explicitly.

The eligible pool and assumptions must be tied to the selected zone, direction and window. If a window has no cohort fixture, show “Participant estimate unavailable” instead of reusing an unrelated count.

## Recurring pilot planning

The recurring option repeats an **offer opportunity**, not a commuter’s acceptance. A saved proposal can describe a weekly programme while each actual intervention date would still require a separate offer, budget allocation, acceptance and verification outcome.

Planner JTBD: “When the same road needs relief on several mornings, help me schedule a consistent programme and understand its funding envelope without configuring each day separately.”

Commuter JTBD: “Let me see upcoming opportunities, but keep my choice specific to the day because my responsibilities change.”

### Lightweight prototype treatment

Add **One day / Repeat weekly** beside the intervention window. Selecting Repeat weekly reveals a compact inline panel and updates the proposal summary. For the hackathon, showing this expanded state, a selected example and the saved summary is sufficient. Do not build automated scheduling or a full calendar experience.

The following dates, weekday selections and amounts are illustrative:

```text
+--------------------------------------------------------------------------+
| WHEN SHOULD THIS OPPORTUNITY REPEAT?                                     |
| ( ) One day     (o) Repeat weekly                                        |
|                                                                          |
| Weekdays       [ ] Mon  [x] Tue  [ ] Wed  [x] Thu  [ ] Fri               |
| Start          [06 Oct 2026]       End [23 Oct 2026]                     |
| Window         [08:00] to [09:00]  Europe/Dublin local time              |
| Daily reward commitment cap       [EUR 1,000]                            |
|                                                                          |
| PROPOSAL SUMMARY                                                         |
| Tuesdays and Thursdays, 6-23 October: 6 intervention days                |
| Same selected FlexZone, direction, window and reward each day            |
| Reward funding envelope: up to EUR 6,000 across the selected dates       |
| Projected payments: EUR 4,320 / same daily assumptions repeated          |
|                                                                          |
| People choose whether to accept each day's offer.                        |
| [Back to one day]                                       [Apply to draft] |
+--------------------------------------------------------------------------+
```

The proposed schedule contains 6, 8, 13, 15, 20 and 22 October. It is a finite proposal; no indefinite renewal is implied. Saving the draft does not activate any of those dates.

### Recurrence rules

- Require at least one selected weekday, an end date on or after the start date and at least one matching date. Count both endpoints when they match the selected weekdays.
- Preserve the chosen local crossing window in Europe/Dublin time on each date, including across clock changes.
- Treat the reward commitment cap as **per intervention day**. Do not carry unused daily funding into a later day without a separate policy.
- Deduplicate dates. Multiple proposals must not be represented as funding the same vehicle and window twice; resolving overlapping live programmes is outside this prototype.
- The same vehicle can participate on several dates, but can receive only one reward for the same agreement on a particular date. A pilot total counts crossing opportunities and outcomes, not unique vehicles.
- Programme enrolment and notification preferences can persist. Neither constitutes advance acceptance of every daily offer.
- Public holidays, road disruptions and changed participant eligibility require date-specific review in a production service. Exception editing, pause/resume and renewal are future capabilities; do not imply they work in the hackathon prototype.

### Funding and outcome summary

Let `D` be the number of intervention dates, `B` the daily reward commitment cap, `P` expected daily reward payments and `M` the maximum reservable daily reward commitment under acceptance-based reservation.

```text
Reward funding envelope             D × B
Projected reward payments           D × P
Projected maximum reward commitment D × M
Projected additional crossings      D × J
```

These are simple repeated-scenario projections, not forecasts. Label them **Same daily scenario repeated across selected dates**. They assume unchanged cohort, uptake, fulfilment and additionality, with no effects from learning, fatigue or changing habits. The envelope is not expected spend, and all amounts exclude infrastructure, integration and operating costs.

Keep daily outcomes visible beside pilot totals. Do not multiply daily percentages by the day count, or describe a total of avoided crossing events as that many distinct commuters. A selected historical weekday profile is still one reference profile; repeating its scenario on other weekdays must be labelled as an assumption, not as observed evidence for those days.

Recurrence uses acceptance-based reservation independently for each date. It does not reserve every scheduled offer opportunity, automatically accept for a commuter or allow one date to consume another date's reward cap.

Under the central daily fixture below, six days project €4,320 reward payments and 1,080 additional avoided peak-crossing events. The six-day funding envelope is €6,000 and the maximum reservable reward commitment is €5,994. These are repeated assumptions, not six independent observed results or 1,080 distinct vehicles.

### Save and review

Store the recurrence mode, selected weekdays, start/end dates, time zone, generated dates and day count with the draft. Show a plain-language summary alongside the road, window, reward and daily cap. Comparing drafts should expose different schedules as well as different daily configurations.

The saved-state copy can be: “Recurring pilot proposal saved. Tuesdays and Thursdays, 6–23 October, 08:00–09:00. Six intervention days. Offers are not live.”

## Scenario calculation contract

The first model estimates one intervention day. `E` counts distinct eligible vehicles, with at most one rewarded agreement per vehicle/date/window. A vehicle may cross on some comparable days and not others; eligibility does not mean it would definitely cross on the intervention date. Other household vehicles and route substitution are outside the simplified model.

### Baseline and additionality

For vehicle `i`, show `u_i`: the fraction of comparable, sufficiently observed baseline days on which it crossed the selected section/direction/window. It estimates usual crossing frequency, not a known probability for tomorrow. Missing observations must not become non-crossing days. Show the baseline dates, comparable-day count, coverage and simulated status.

A proposed `u_i >= 60%` filter makes eligibility tangible. Apply it to the synthetic vehicle baseline, deduplicate vehicles and recalculate `E`. If no baseline fixture exists, show eligibility unavailable rather than inventing a matching pool.

Keep `q` as a separate assumed causal share among rewarded fulfilments: the proportion whose absence would not have happened without the offer. Baseline frequency alone cannot identify this share, especially because acceptors may differ from the enrolled pool. Do not multiply `u_i` into `q` automatically: that requires a separately defined, conditional model and could discount the same uncertainty twice. A pilot design with an appropriate comparison group is needed to estimate causal change.

Let:

- `V` be historical vehicle crossings in the selected window, using the displayed class and aggregation method.
- `V_car` be the comparable count for the vehicle class targeted by the eligible pool, when available.
- `E` be distinct eligible vehicles for that window after baseline filtering.
- `r` be the flat reward in euros.
- `B` be the daily reward commitment cap in euros.
- `C` be the requested invitation cap.
- `a` be assumed acceptance probability.
- `f` be assumed fulfilment probability among acceptances.
- `q` be the assumed share of fulfilments that would not have happened without the incentive.

```text
Invitations available             N = min(E, C)
Acceptance places                 K = floor(B / r)
Modelled acceptances               A = min(N × a, K)
Expected rewarded fulfilments      F = A × f
Expected additional crossings      J = F × q
Expected reward payments           P = F × r
Modelled reserved rewards          R = A × r
Maximum reservable commitment      M = min(N, K) × r
Expected reduction in window       J / V × 100
Reward cost per additional crossing P / J
```

`A = min(N × a, K)` is a deterministic capped approximation for scenario exploration. It is not the exact expected value of a stochastic acceptance process, especially near the cap. Label the results as approximate scenario estimates; a production model may require stochastic simulation or a capped acceptance distribution. The reservation guarantee comes from the operational cap, not from this approximation.

Sending an invitation does not promise or reserve a reward. Accepting must atomically secure one of the remaining places and reserve `r` euros before confirming the agreement. Duplicate acceptance is idempotent. When no place remains, show **Offer full** and create no agreement. If eligible invitation capacity exists, more invitations may be sent while acceptance places remain. The planning screen previews these rules but does not dispatch offers or implement reservation services.

Retain a reservation while fulfilment or verification is unresolved. Release it only under a defined settlement or cancellation policy; do not assume a missing plate read frees money. Exact expiry and re-offer rules remain an operational decision.

Show two limits: **Invitations limited by: eligible vehicles / invitation cap** and **Modelled acceptances limited by: assumed uptake / reward budget**. List both in a tie. Available places and modelled uptake must remain distinct.

Calculate monetary caps and actual reservations in integer cents so fractional currency does not create an extra place or lose one through floating-point rounding. Retain full precision for scenario estimates, displaying agreements and crossings as approximate whole numbers and currency to two decimal places where needed. Do not independently round intermediate calculations.

The fulfilment assumption represents outcomes that meet the agreement and can be verified sufficiently for a payout. Insufficient observations would remain unresolved in the production service. Fulfilment is not automatically equal to “plate not detected.”

For target `T`, calculate required acceptance places as `ceil(T / (f × q))`, required invitations as `ceil(required acceptance places / a)` and required reward commitment as required acceptance places multiplied by `r`. These are scenario requirements, not guaranteed delivery. If any required probability is zero, show the target cannot be reached under those assumptions. Explain separately whether the eligible pool, invitation cap or budget prevents the proposed target. Do not silently increase any limit.

Warn if the eligible distinct-vehicle pool exceeds the comparable daily vehicle-class count, but do not automatically reject it: a pool accumulated across many days can legitimately exceed one morning's crossings. Where the baseline supports it, compare `sum(u_i)` with `V_car`, using the same time window, direction, coverage and comparable days. A mismatch requires an explanation or cohort correction. If class counts or compatible baseline data are missing, say the compatibility check is unavailable.

If `J` exceeds `V` or the available matching-class count, mark the scenario inconsistent and suppress the overlay. For a zero baseline, suppress percentages and disallow a positive reduction target. For zero additional crossings, show cost per additional crossing as “Not applicable.”

### Illustrative fixture

All values in this fixture are hypothetical. They do not describe an established N7 pilot or measured behaviour.

| Input or output | Value |
| --- | --- |
| Historical window crossings in the matching vehicle class | 5,000 |
| Eligible vehicles and invitation cap | 1,000 each, after the simulated baseline filter |
| Flat reward | €3 |
| Daily reward commitment cap | €1,000 |
| Acceptance places | 333 |
| Central acceptance / fulfilment / incentive-caused share | 30% / 80% / 75% |
| Expected acceptances | 300 |
| Expected rewarded fulfilments | 240 |
| Expected additional peak crossings avoided | 180 |
| Expected reduction in the window | 3.6% |
| Expected reward payments | €720 |
| Modelled reserved rewards | €900 |
| Maximum reservable commitment | €999 |
| Reward cost per additional crossing | €4 |

With a €500 cap and the same invitations and assumptions, there are 166 acceptance places. Modelled acceptances are 166, fulfilments 132.8, additional crossings 99.6 and payments €398.40; maximum commitment is €498.

A larger pool of 2,000 eligible vehicles/invitations at €1,000 produces 333 modelled acceptances, 266.4 fulfilments, 199.8 additional crossings and €799.20 payments under the central assumptions. The original 1,000-vehicle pool must not be presented as filling all 333 places at a 30% acceptance rate.

A target of 250 additional crossings requires 417 acceptance places, 1,390 invitations and €1,251 reward commitment under the central assumptions. With 1,000 eligible vehicles and a €1,000 cap, both the pool and budget are insufficient.

Suggested illustrative presets are cautious 20% / 70% / 50%, central 30% / 80% / 75%, and optimistic 40% / 90% / 85%. At €1,000 and 1,000 invitations, they produce 70, 180 and 254.745 additional crossings, displayed as approximately 70 / 180 / 255. The optimistic case is constrained by the 333-place cap. At €3,000 it instead produces 306. These are sensitivity cases, not a statistical confidence interval or behavioural forecast.

## Chart and results

Preserve the historical series. Display the modelled result as a second series labelled **Scenario estimate**. Never overwrite observations with simulated values.

Distribute `J` proportionally across historical crossing counts inside the selected window. This is an explicit simplifying assumption about vehicle timing. The overlay must sum to the calculated reduction; the original observations remain intact.

### Optional later travel scenario

When enabled, let `s` be the assumed share of additional avoided peak crossings that move into a chosen later window. Compute `L = J × s`. Add exactly `L` crossing events to that later window, distributed by interval duration as an illustrative timing assumption. The two windows must not overlap and must use the same counter, direction, vehicle class and comparable historical profile. Keep all other bins unchanged.

Require complete later-window observations. Otherwise disable the overlay and explain the missing data; do not invent a later baseline. When switched off, label displacement as not modelled. When enabled, label the later series **Simulated later travel**, and the remaining `J - L` crossings **Destination outside this displacement model**. That remainder is not proven eliminated traffic.

With the central fixture and a hypothetical later baseline of 4,000 crossings, `s = 50%` removes 180 from 08:00–09:00 and adds 90 to 09:00–10:00: 5,000 → 4,820 and 4,000 → 4,090. These counts are illustrative, not sourced N7 measurements. A lower historical count is not spare capacity, and the model cannot establish whether the added journeys create congestion.

```text
Additional peak crossings avoided: 180 / scenario estimate
                  |
                  +-- 90 -> selected later window / assumed 50%
                  |
                  +-- 90 -> outside this displacement model
```

The results table shows all three scenarios, including their assumptions. These estimates can differ because of assumptions alone; the interface must make that relationship visible.

Do not display predicted minutes saved, congestion eliminated, carbon saved or a monetary public benefit unless the technical workstream supplies a separately validated model and appropriate inputs. Lower observed volume alone does not establish less congestion. If the data supports only counts, use “Historical crossings,” not “Congestion level.”

Always distinguish reward payments from total programme costs. Show **Infrastructure, integration, administration and other operating costs not included** beside financial results; unknown costs must not appear as zero. Existing infrastructure may still incur integration or operating costs; new installation is only one possible cost route.

## Save and compare

Saving creates a named draft containing the zone, direction, historical dataset reference, selected window, inputs, all three assumption sets, model version, calculated outputs and any recurring schedule. Preserve saved drafts across reloads in the prototype. Show a clear success state or a recoverable save error.

Save must not issue commuter offers, activate observation or move money. Keep the action labelled “Save pilot proposal,” rather than “Launch.”

Comparing shows two saved snapshots side by side with changed inputs and outcomes highlighted. The user must be able to distinguish a better outcome caused by a larger intervention from one caused by more optimistic assumptions. Allow copying a draft into an editable scenario while retaining the original.

## Data requested from the technical workstream

| Input | Required information |
| --- | --- |
| Zone | Identifier, name, boundary or schematic, direction and counter coordinates |
| Traffic observations | Timestamped counts, units, vehicle class, interval, source dates, source URL, retrieval time and completeness flags |
| Historical profile | Comparable days used, aggregation method and handling of missing observations |
| Vehicle baseline fixture | Anonymous synthetic vehicle identifiers, crossing frequencies, comparable-day counts and coverage by zone/direction/window; enough information to apply the eligibility threshold and deduplicate vehicles |
| Eligible pool | Distinct vehicles remaining after filtering, the threshold and the compatible estimated daily baseline crossings; class-compatibility status |
| Behaviour assumptions | Three named sets with percentage values, basis and evidence status |
| Recurring schedule | Mode, local time zone, weekdays, start/end dates, generated intervention dates, day count and labelled repeated-scenario totals |
| Calculation results | Invitations, acceptance places, capped approximate acceptances, fulfilments, additional crossings, payments, reserved rewards, maximum reservable commitment, limiting factors and target feasibility |
| Later travel | Enabled status, assumed share, receiving window, complete compatible baseline and redistributed crossing count |
| Saved proposal | Snapshot of inputs, assumptions, data reference and model version |

Prefer a complete historical weekday or clearly described average of comparable weekdays. If recent data is unavailable, select an older complete period and display its actual dates. Do not imply “last week” unless that is the dataset used.

Real traffic records have not yet been selected and prepared for this screen. If unavailable at build time, use a clearly labelled sample dataset and retain the same data contract.

## States and validation

| State | Experience |
| --- | --- |
| Loading | Show chart and result placeholders; retain the selected zone. |
| No road data | Explain which source or period is unavailable and offer a sample dataset clearly labelled as such. |
| Incomplete selected window | Mark gaps, explain coverage and suppress baseline-dependent reductions and targets. Never treat missing bins as zero traffic. |
| No eligible vehicles | Show zero invitations and explain that no eligible cohort is available for this window. |
| Invalid inputs | Identify the field and correction; do not calculate with stale values. |
| Target beyond available pool | Show required versus available vehicles/invitations, acceptance places and commitment; preserve the proposal for further exploration. |
| Pool compatibility warning | Explain a distinct-vehicle versus daily-crossing mismatch. Show the frequency-weighted comparison if supported; do not present `E > V` alone as impossible. |
| Acceptance capacity | Show available acceptance places in the planner. A simulated commuter branch shows “Offer full” when none remain, without confirming an unfunded agreement. |
| Later window unavailable | Disable the later overlay and explain missing or incompatible observations. Preserve the chosen assumption. |
| Invalid recurring schedule | Explain missing weekdays, invalid date order or a range containing no selected weekdays; preserve the entered values. |
| Save failure | Keep the current configuration and provide retry. |
| Historical data changed | Retain a saved draft’s reference and values; flag any comparison using a different baseline. |

Controls must be keyboard accessible, have visible labels and announce validation errors. Offer a readable table equivalent for chart data. Preserve input values when validation fails.

## Acceptance criteria

1. A planner can identify the road section, direction, counter, source period, metric and units without a presenter explaining them.
2. Selecting a valid window updates its historical baseline and associated eligible cohort; unsupported cohort windows show an unavailable state.
3. Changing reward or budget updates acceptance places, capped approximate acceptances, payments and maximum reservable commitment; invitations remain distinct. No confirmed acceptance can exceed the reward cap.
4. Assumptions remain visible and changing reward alone does not change acceptance probability.
5. The central €1,000 fixture produces 300 approximate acceptances, 240 fulfilments, 180 additional crossings, €720 payments, €900 modelled reservations and €999 maximum reservable commitment.
6. A €1,000 cap and €3 reward support 333 acceptance places, not 333 invitations. A €500 cap gives 166 places, 99.6 additional crossings and €398.40 payments in the central fixture. The €1,000 optimistic fixture gives approximately 255 additional crossings because the acceptance cap binds.
7. Target-led mode identifies a 250-crossing target as requiring 417 acceptance places, 1,390 invitations and €1,251 commitment. It explains both the pool and budget gaps against the default fixture.
8. All three scenario outputs can be compared without presenting their range as statistical certainty.
9. The historical chart remains intact. With later travel enabled at 50%, the central fixture adds 90 to a compatible later window while removing 180 from the peak. It labels the remaining destination as unmodelled and makes no congestion or network-relief guarantee.
10. Missing traffic observations never become zeroes, and invalid or inconsistent scenarios never show a plausible-looking stale result.
11. Saving and reloading preserves a draft’s inputs and evidence references. Comparing two drafts makes differing assumptions and baselines visible.
12. The screen performs no dispatch or payment and labels synthetic participants, assumed behaviour and excluded programme costs.
13. The recurring concept shows weekday selection, a finite date range, a day count and a per-day reward cap. A prototype may demonstrate this with the selected example state and saved summary; a full scheduler is not required.
14. The Tuesday/Thursday example from 6–23 October 2026 contains six intervention dates and shows a €6,000 reward funding envelope at a €1,000 daily cap. It labels repeated-scenario projections and requires separate daily acceptance.
15. The proposed crossing-frequency filter recalculates distinct eligible vehicles from a coverage-labelled simulated baseline. It does not automatically multiply baseline frequency into the causal share.
16. The screen identifies which invitation and acceptance limits bind. It warns about cohort/class incompatibility, suppresses impossible additional-crossing overlays and preserves unavailable checks explicitly.

## Demo and evaluation

The hackathon demonstration should show a planner selecting a historical window, configuring a reward, inspecting three scenarios, changing the commitment cap and saving a proposal. A second saved scenario demonstrates a clear trade-off.

As a short optional extension, reveal Repeat weekly, select the Tuesday/Thursday example and show the six-day summary before saving. This demonstrates the recurring concept without a complete scheduling flow.

The optional presentation connection is to switch to a commuter receiving a simulated offer configured from the proposal. An acceptance in that demonstration counts as an acceptance only; it must not immediately alter the historical traffic series or become measured relief. Building that connection is outside this screen’s first scope.

Ask reviewers to explain the budget commitment, identify which values are observed versus assumed, and choose between two proposals with reasons. Successful evaluation means they can do this without confusing acceptances with verified outcomes or causal impact.

Production pilot evaluation would separately assess enrolment, uptake, fulfilment, additional change, verification reliability, cost and traffic outcomes. Historical replay cannot establish those effects.

## Open decisions

- Exact N7 section, direction, counter, historical period and interval.
- Which traffic class best matches the intervention’s participant pool.
- Proposed sponsor and camera operator.
- How the opt-in baseline establishes eligibility and handles shared vehicles.
- Evidence for uptake, fulfilment and additionality assumptions; trial design to estimate them.
- Evidence for the proposed eligibility threshold, adequacy of the learning period and a future conditional model relating baseline frequency to causal response.
- Operational reservation expiry, cancellation and re-offer policies; confirmation must secure funding before an acceptance succeeds.
- Sourced reduction target: the transcript's approximately 800 crossings over 07:00–09:00 remains unverified. Do not replace the illustrative fixture until the original report establishes location, direction, period, class and the meaning of that target.
- Whether the next iteration extends the optional later-window scenario to earlier travel, neighbouring roads and public transport capacity.
- Operational recurrence policies for exceptions, overlapping programmes, pause/resume and changes to accepted agreements.

These decisions do not block a clearly labelled prototype of the planning screen. They do block presenting its outputs as validated operational forecasts.

## Supporting context

- [Commuter data brief](data-brief.md) establishes evidence labels, vehicle verification boundaries and counterfactual presentation rules.
- [Council invitations](council-invitations.md) captures the voluntary entry experience.
- [TII data-protection notice](https://www.tii.ie/en/compliance/data-protection-notice/) describes encrypted ANPR records for journey-time measurement on routes including the N7. Retention, suitable coverage and authorised FlexPay access remain unconfirmed.
- [NTA Regional Multi Modal Models](https://www.nationaltransport.ie/planning-and-investment/transport-modelling/regional-modelling-system/regional-multi-modal-models/) describes models accounting for road congestion and public transport crowding. It does not validate this prototype or establish access to those models.
- [DfT uncertainty toolkit](https://www.gov.uk/government/publications/tag-uncertainty-toolkit) supports exploring and presenting uncertainty through scenarios. It does not supply FlexPay’s assumed response rates.
