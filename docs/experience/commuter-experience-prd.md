# Commuter first offer experience PRD

Status: draft product requirements for the hackathon prototype.
Date: 4 October 2026.
Audience: product design, technical and data workstreams, and the presentation team.

This PRD defines a mobile app experience, prototyped in HTML, for a regular commuter receiving their first useful FlexPay offer. The main journey starts after enrolment and the learning period. It helps the person recognise their routine, explore a feasible change, accept a funded agreement and understand verification and reward status. Invitation and enrolment are supporting sketches; the technical build and presentation remain separate workstreams.

The shared purpose is: **Pay people who can change their journey to create room for people who can’t.**

## User and scenario

Aoife is a fictional commuter living near Naas and usually driving towards Dublin for work. She regularly crosses the selected N7 FlexZone around 08:15. Driving accommodates errands and family responsibilities. Her flexibility varies by day; Tuesdays and Thursdays can allow a later arrival, while other mornings have a fixed start.

For the demonstration, tomorrow is Thursday 8 October 2026. Her first appointment is at 10:30. She has reported that travelling later could fit that morning. This is a scenario assumption, not a verified travel-time estimate. The app must not promise arrival by 10:30 without suitable journey data.

The council invitation, sponsor, vehicle, personal observations, agreement verification and payments are simulated. Use vehicle identifier **DEMO-01**, deliberately labelled as a demo identifier rather than a real registration. The mock FlexZone is a bounded schematic section between **Entry A** and **Exit B**, inbound. Real N7 boundaries and measurement locations remain to be selected.

Aoife has already voluntarily joined, completed simulated owner or authorised-driver verification, and reviewed her baseline. The illustrative learning period is 7 September–6 October. Four comparable Thursdays were sufficiently observed; her vehicle crossed during 08:00–09:00 on three of them. The synthetic baseline frequency is 75%, above the council planner's proposed 60% threshold. The fourth day is a valid non-crossing observation, not missing data.

This demonstrates why an offer is relevant; it does not establish whether a particular absence was caused by the incentive.

## Jobs to be done

Primary JTBD: “When I have room to change my usual commute, help me find an option that fits tomorrow's responsibilities, understand the agreement and earn the reward without extra hassle.”

| Moment | Person's job | Experience response |
| --- | --- | --- |
| Recognise my routine | “Help me understand why this opportunity is relevant to me.” | Show the specific crossing pattern, its source and a correction action. |
| Understand the offer | “Tell me exactly where, when and which vehicle the agreement concerns.” | Keep the section, direction, date, window and reward together. |
| Explore a change | “Help me judge what could fit my morning.” | Compare crossing windows in the same road context, with arrival confidence stated honestly. |
| Accept | “Give me a clear commitment and confirm the reward is available.” | Secure a funded place before showing confirmation. |
| Follow through | “Let me go about my day and see what happens next.” | Show agreement status without repeated check-ins or mode declarations. |
| Understand the outcome | “Explain whether I earned the reward and what happens if evidence is incomplete.” | Separate agreement verification from payment and preserve unresolved states. |
| Recurring opportunities | “Help me hear about relevant days without committing me to every morning.” | Offer optional weekday notifications and separate acceptance for each dated offer. |

Potential magic moments are recognition (“That looks like my morning”), possibility (“That change could work”), confidence (“I know what earns the reward”) and payoff (“The agreement was confirmed and the reward arrived”).

## Prototype scope

Build one complete happy-path interaction through five main screens, with companion states for unavailable offers and uncertain outcomes. Use a phone-sized responsive HTML experience. Include accessible controls and a readable chart alternative; the exact framework is left to the technical workstream.

Include a routine correction, a selected later-crossing option, acceptance and reservation, an agreement summary, verification and simulated credit. Add a compact recurring-notification preference, not a complete recurring commuter journey.

Support invitation, vehicle confirmation, observation authorisation and learning with sketches rather than full identity verification or account creation. These stages are prerequisites, not optional production checks.

Exclude real plate histories, government authentication, camera feeds, live payment, a full wallet, continuous phone tracking, route optimisation and real offer dispatch. No cash-out, banking or document-upload flow is required. Public transport details require actual supporting inputs; they must not be invented to fill a card.

## Journey and entry

```text
SUPPORTING FIRST USE
Council invitation -> voluntary activation -> confirm authorised vehicle
       -> introduce section and observation purpose -> learning period
       -> review and correct routine

MAIN DEMONSTRATION
1 Routine and opportunity
       ↓
2 Find a workable change
       ↓
3 Review and accept the agreement
       ↓
4 Reserved reward and agreement status
       ↓
5 Verified outcome and simulated credit

BRANCHES
Decline / full / expired / ineligible / changed plans / insufficient evidence
```

The demo opens on Wednesday 7 October with tomorrow's offer. Use a controlled demonstration clock and explicit preview controls outside the app to move between evening, offer window and settlement. Do not make a historical demonstration depend on the real current time.

## Screen concepts and ASCII sketches

These sketches define information hierarchy and interactions, not a finished visual design. All personal and offer values are fictional. Real aggregate observations may replace the sample road chart once a complete dataset is supplied, with its actual dates and source shown.

### Screen 1 Routine and opportunity

JTBD: “Show me why this offer fits my usual travel, without making assumptions about my whole day.”

```text
+---------------------------------------------+
| FLEXPAY                       Demo          |
| A little flexibility tomorrow?              |
|                                             |
| Your usual Thursday                         |
| Vehicle DEMO-01 / simulated baseline        |
| N7 Demo Section A-B / inbound               |
| Usually crosses around 08:15                |
| 3 of 4 comparable Thursdays, 08:00-09:00    |
| [View baseline] [Correct my routine]        |
|                                             |
| THURSDAY 8 OCTOBER                          |
| Earn EUR 3                                  |
| Keep this vehicle out of the section        |
| between 08:00 and 09:00.                    |
|                                             |
| [See how I could flex]                      |
| [Not tomorrow]                              |
+---------------------------------------------+
```

Show a short explanation of relevance based on the source-labelled baseline. Do not infer work location or appointment times from the plate observations. The 10:30 appointment is reported by Aoife, shown as such where relevant. A routine correction records her input separately; it must not rewrite camera observations or instantly grant eligibility. Explain that eligibility would be reviewed before an offer can be accepted.

### Screen 2 Find a workable change

JTBD: “Let me compare a change with my usual crossing and decide whether it fits tomorrow.”

```text
+---------------------------------------------+
| < Back                  FIND YOUR FLEX      |
| N7 Demo Section A-B / inbound               |
| Entry A ===== [selected section] ==== Exit B|
|                                             |
| SAME HISTORICAL ROAD PROFILE                |
| 07:00  [08:00=======09:00]  10:00           |
| Usual crossing:     ^ 08:15                 |
| Proposed crossing:             ^ 09:15      |
| [View source dates and values]              |
|                                             |
| (o) Cross after the offer window            |
|     Suggested crossing: 09:15               |
|     Leave-home time not estimated           |
|                                             |
| You told us: first appointment 10:30        |
| Arrival estimate unavailable                |
| Check that this change fits your journey.   |
|                                             |
| [Explore other ways]                        |
| [Review EUR 3 offer]                        |
+---------------------------------------------+
```

The 09:15 crossing is an illustrative planning suggestion; the agreement concerns the full 08:00–09:00 avoidance window, not hitting 09:15 precisely. Keep the historical series fixed while the selected crossing marker changes. Lower counts alone must not become “faster” or “congestion-free.”

Distinguish crossing time from leaving home. Ask for origin, destination and arrival deadline only if needed to support a journey estimate, explaining their use. If that estimate is unavailable, the user can still assess a crossing-window offer without a manufactured arrival claim.

“Explore other ways” can show earlier travel, public transport or working remotely when supported by available data or the person's reported circumstances. Earlier travel still requires avoiding the whole window. Public transport needs a route, service date, walking/transfers and supported fare or arrival information; a timetable does not establish spare capacity. Working remotely requires the person to say it is possible. Show unsupported alternatives as unavailable with a useful explanation, or omit them. For the main fixture, only later crossing is assumed feasible; do not claim a second feasible alternative without evidence.

Choosing an option is planning assistance. It does not reserve money, require proof of a particular mode or change the purchased condition.

### Screen 3 Review and accept

JTBD: “Make the agreement precise enough that I can confidently choose.”

```text
+--------------------------------------------+
| < Back                  REVIEW YOUR OFFER  |
|                                            |
| Reward                          EUR 3      |
| Vehicle                         DEMO-01    |
| Date                            Thu 8 Oct  |
| Section                         Entry A-B  |
| Direction                       Inbound    |
| Avoid this section              08:00-09:00|
| Times                           Ireland    |
|                                            |
| Your plan: cross around 09:15              |
| Choose another plan if you need to.        |
| The agreement stays the same.              |
|                                            |
| Accept by 07:30 on Thursday                |
| A place is secured when acceptance succeeds|
| Reward depends on verified fulfilment.     |
| [How the agreement is checked]             |
|                                            |
| [Accept and reserve EUR 3]                 |
| [Not tomorrow]                             |
+--------------------------------------------+
```

The 07:30 deadline is an illustrative prototype policy, before the window starts. Store and show the full date and local time zone, Europe/Dublin; shortened dates in cards must still be accessible in the agreement details.

The vehicle must stay out of the section in the specified direction for the entire window. Any other authorised driver using that vehicle in the window affects the same agreement. Show this in the explanation rather than implying only Aoife's actions matter.

Availability can change between opening the screen and accepting. Confirm only after a funded place is secured. A repeated tap or retry returns the same agreement, not another reservation. An interrupted request with an unknown result must reconcile the acceptance status before asking the person to try again. Show “Offer full” or “Offer ended” when appropriate, without a success animation or reserved-money claim.

The verification explanation describes the proposed authorised observations, exact section/window and the need for reliable coverage. Insufficient evidence remains pending or unresolved; a missed plate read is not proof of absence. This is simulated in the demo.

### Screen 4 Agreement status

JTBD: “Confirm what I accepted, then let me get on with my day.”

```text
+---------------------------------------------+
| YOUR FLEX MORNING                 Demo      |
|                                             |
| EUR 3 reserved                              |
| Available if the agreement is verified      |
|                                             |
| Thursday 8 October / 08:00-09:00            |
| N7 Demo Section A-B / inbound / DEMO-01     |
| Your planned crossing: around 09:15         |
|                                             |
| [View agreement] [My plans changed]         |
|                                             |
| After 09:00 we'll check the agreement.      |
| We'll show the result here.                 |
|                                             |
| Optional: hear about future opportunities   |
| [Choose days]                               |
+---------------------------------------------+
```

Reserved is a conditional reward, not money already earned or paid. Do not require a daily check-in, departure confirmation or mode declaration. Reminders are optional and must not become distracting requests to interact while driving.

After the window ends, change to “Checking your agreement” until the verification fixture returns an outcome. The demo control advances time explicitly; elapsed time alone must not create successful verification.

“My plans changed” acknowledges the person's circumstances and preserves the original agreement and evidence status. It is not a self-report that earns or rejects a reward. The prototype may record a note and show that the final outcome depends on verification. Do not automatically release reservations, pay, or amend the window; cancellation and release policies remain operational decisions.

### Screen 5 Outcome and reward

JTBD: “Tell me what was verified and whether the reward is actually available.”

```text
+---------------------------------------------+
| YOUR FLEX RESULT                  Demo      |
|                                             |
| Agreement verified                          |
| Thu 8 October / 08:00-09:00                 |
| N7 Demo Section A-B / inbound / DEMO-01     |
|                                             |
| EUR 3 credited                              |
| Simulated reward                            |
|                                             |
| Thanks for making room.                     |
| [View agreement and outcome]                |
| [See future opportunities]                  |
+---------------------------------------------+
```

The successful fixture includes sufficient observations and a simulated fulfilled condition. A late crossing alone cannot prove the vehicle was absent during the whole earlier window. Agreement verification and credit are separate events: if verified but not yet credited, show “Reward confirmed · Credit pending.” Do not show a bank transfer, real cash balance or cash-out action.

“Thanks for making room” expresses the shared purpose. Do not claim a personal number of minutes saved for others, a causal reduction of exactly one car, carbon savings or measurable road relief without supporting evaluation. Commuter fulfilment can update a fulfilment count; it cannot become a measured causal outcome in the council simulator.

## Supporting first use sketches

Keep these outside the main demo path but available for review:

| Frame | JTBD and required content |
| --- | --- |
| Council invitation | “Help me recognise the sender and understand the opportunity.” Show example sponsor, official entry route, alternative to QR, pilot purpose and voluntary activation. Do not claim prior knowledge of a commute without authorised observations. |
| Vehicle confirmation | “Help me enrol the right vehicle with permission.” Show linked demo vehicle and owner/authorised-driver relationship; verification is explicitly simulated. Invitation possession or typing a plate cannot unlock personal history. |
| Observation and learning | “Explain what will be observed and when offers become relevant.” Show section, purpose, observation scope, proposed learning period and progress. Avoid implying city-wide tracking or automatic access to past records. |
| Baseline review | “Let me recognise and correct the pattern.” Show comparable-day counts, coverage and the difference between observed and reported routine. A linked vehicle is not automatically reward-eligible. |

The first infrastructure route to investigate is suitable existing TII ANPR through a partnership; a new camera is a fallback. Neither route is integrated in the prototype. Production enrolment and observation arrangements remain separate dependencies, as captured in the linked documents.

## Recurring opportunities

Use a small preference sheet, not auto-acceptance or a full scheduling flow:

```text
+---------------------------------------------+
| HEAR ABOUT FUTURE FLEX MORNINGS             |
| Which days might work for you?              |
| [ ] Mon [x] Tue [ ] Wed [x] Thu [ ] Fri     |
|                                             |
| [ ] Send me reminders                       |
| You still choose each dated offer.          |
| Offers depend on eligibility and places.    |
| [Save preferences] [Not now]                |
+---------------------------------------------+
```

The council's recurring proposal and the commuter's preferences are different records. Preferences filter notifications; they do not create eligibility, guarantee an offer, reserve money or accept future agreements. Default reminders off. Real device permissions and notification delivery are outside the prototype; show an honest simulated preference confirmation.

A Tuesday and a Thursday acceptance create two separate agreements, each with its own date, funding and verification. Changing notification preferences must not silently cancel an already accepted agreement.

## State and reward contract

| State | What the person sees | Reward consequence |
| --- | --- | --- |
| Available | Specific dated offer and acceptance deadline | Nothing reserved yet |
| Accepting | Progress; prevent duplicate taps | Do not claim a reservation until confirmed |
| Acceptance unknown | “Checking whether your offer was accepted” | Reconcile the existing request; do not create another |
| Accepted | Agreement summary and conditional reserved reward | One funded reservation per vehicle/date/window |
| Declined | Ordinary acknowledgement and future opportunities | No agreement or reservation |
| Full or expired | Explain that the offer is unavailable | No agreement or reserved reward |
| Not eligible / learning | Explain eligibility or learning status | No acceptance enabled; public road history may remain explorable |
| Checking | Agreement is awaiting observations/assessment | Preserve reservation |
| Insufficient evidence | “We couldn't confirm the result yet” and a route to review | Unresolved, not automatically fulfilled or failed; preserve reservation pending policy |
| Condition not met | Factual explanation of the agreement outcome and a review action | No reward from this agreement; no penalty or charge |
| Verified, credit pending | Agreement verified; credit processing | Reward confirmed; not yet credited |
| Credit error | “Your reward is confirmed; we couldn't add the credit yet” with status/retry information | Preserve the earned reward and reconcile credit before retry; never treat a payment issue as failed fulfilment |
| Credited | Simulated credit and agreement details | No duplicate credit on refresh or retry |

Every outcome must retain the original section, direction, date, window, vehicle and amount. A changed-plan note does not replace verification. A dispute/review action can open a supporting frame; no actual support message is sent by the prototype.

The council PRD reserves at acceptance and counts invitations, acceptances, fulfilments, assumed additional change and payments separately. The commuter experience must use the same contract. Full payment capacity is not inferred from an uptake forecast, and no accepted agreement can be confirmed without a secured place.

## Data requested from the technical workstream

| Input | Required information and evidence status |
| --- | --- |
| Participant | Fictional name, demo vehicle, simulated enrolment/authorisation status and eligible state |
| Routine | Synthetic comparable days, sufficient-coverage flags, crossings, summary and baseline frequency; self-reported appointment kept separate |
| FlexZone | Zone identifier, bounded schematic or selected geometry, direction, counter and known coverage limits |
| Road history | Time-binned counts/class/units, actual source dates, completeness and source link; sample fixture until prepared |
| Offer | Unique identifier/version, zone, direction, vehicle, dated window, local time zone, 300-cent reward, acceptance deadline and availability |
| Planning option | Selected crossing time, optional reported deadline, journey inputs and confidence if estimates are supported |
| Acceptance | Confirmed agreement and reservation identifiers, or full/expired/ineligible/unknown status; duplicate requests reconcile to the same result |
| Verification | Separate pending, fulfilled, not fulfilled and insufficient-evidence fixtures, with coverage and reason |
| Credit | Separate pending/credited/error status and amount, explicitly simulated and deduplicated |
| Preferences | Relevant weekdays and optional reminder choice; no automatic acceptance |

Use integer cents for money and dated Europe/Dublin windows. For the sample agreement, start 08:00 and end 09:00 on 8 October 2026; the avoided interval is start-inclusive and end-exclusive. A crossing at 08:00 is within the window; at 09:00 it is outside. Production observation uncertainty and boundary handling require the verification design to resolve ambiguous cases rather than claiming unwarranted precision.

The source labels **observed**, **self-reported**, **estimated** and **simulated** must appear where the relevant data is shown. Put demo controls, data-call illustrations and chronology shortcuts outside the app surface; ordinary commuter screens should explain decisions rather than implementation details.

Persist simulated agreements and preferences across reloads in the interactive HTML prototype. Separate saved state from reset/demo controls. The happy path and alternative states must be reproducible without changing real participant records or issuing real offers.

## Design cues

Use a calm, personal app layout: one main action per screen, readable itinerary-style summaries, a compact road schematic and a consistent timeline. Keep the same vehicle, section, direction and window recognisable through every state. Use textual status alongside colour; distinguish historical data from a selected plan through labels and line styles.

Make routine correction, declining and viewing evidence easy to find. Avoid urgency countdowns, guilt, competitive rankings or claims that a person is “part of the problem.” The reward is a useful opportunity, and practical fit should lead the choice.

All controls need accessible names, visible focus and usable touch targets. Provide textual equivalents for maps and chart values. Announce reservation, availability and validation changes accessibly. Do not hide the agreement conditions solely in an expandable explanation.

## Acceptance criteria

1. The main demo starts with the fictional enrolled participant and makes simulated history, verification and payment clear.
2. A reviewer can explain why the Thursday offer is relevant using the three-of-four synthetic baseline, without interpreting it as proof of causal change.
3. Every offer, review, accepted and outcome view retains the same vehicle, bounded section, inbound direction, 8 October date, 08:00–09:00 window and €3 amount.
4. Later travel is a planning option, not a new contract: a 09:15 suggestion does not imply a leave-home time, guaranteed arrival or required exact crossing.
5. The source-labelled historical chart stays fixed when a crossing marker changes; missing observations never become zero and counts alone never become congestion claims.
6. Declaring a transport mode is optional. Public transport or remote-working alternatives appear only with supporting inputs or clearly reported feasibility.
7. Acceptance secures a funded place before confirmation. Full/expired states and repeated taps do not create reservations or unfunded success states. Unknown outcomes reconcile before retry.
8. €3 reserved, agreement verified, credit pending and €3 simulated credit are distinct states; no real cash-out or banking connection is implied.
9. Changed plans and insufficient coverage do not automatically settle the agreement or release a reservation. A failed agreement has no penalty or charge.
10. A routine correction stays separate from observations and cannot instantly create eligibility or expose another vehicle's history.
11. Recurring weekday preferences do not auto-accept, guarantee offers or cancel accepted agreements. A supporting preference sheet is sufficient.
12. The supporting first-use sketches include voluntary council invitation, authorised vehicle confirmation, observation explanation/learning and baseline review.
13. Keyboard and text alternatives expose the same conditions and outcomes as the visual screens, and the phone layout retains those details.
14. The demo can reproducibly show success, full, declined, changed-plan, insufficient-evidence and credit-pending branches. Only simulated data is mutated.

## Demo and experience validation

Show the routine, move to the later crossing, review and accept, then advance the demo clock to checking and a simulated verified/credited outcome. Briefly show the recurring preference sheet. Keep invitation and learning available as supporting frames rather than stretching the main demonstration into a full onboarding session.

Use a second pass for the offer-full state and insufficient-evidence result. The council view may count a simulated acceptance or fulfilment separately; neither becomes measured traffic relief or a proven journey prevented by the offer.

Ask reviewers to explain the reward condition, distinguish crossing from departure, identify whether arrival is guaranteed, explain reserved versus earned money and predict what happens if plans change. They should also understand that selecting Tuesday/Thursday notifications is not accepting those days.

Success means people can make and explain those decisions without coaching. Acceptance rate alone is not sufficient experience validation or evidence of programme impact.

## Open decisions

- Final real road boundaries, direction, counter and comparable historical dataset.
- A real commuter's routine, arrival constraints and feasible alternatives to validate Aoife's fictional scenario.
- Sponsor, authorised observation route, baseline sufficiency and vehicle-sharing policy.
- Acceptance deadline, reservation expiry, cancellation/re-offer rules and review handling.
- Evidence needed for supported arrival estimates and useful public transport alternatives.
- Reward settlement timing and any eventual payout method; the first prototype shows euro-denominated simulated credit only.

These do not block the labelled prototype PRD. They must be resolved before treating this as an operational scheme.

## Related documents

- [Council simulator PRD](council-simulator-prd.md): acceptance-based funding, eligibility, uncertainty and recurring sponsor proposals.
- [First experience notes](first-experience.md): earlier exploration and the chosen acceptance direction.
- [Data brief](data-brief.md): source labels and available versus simulated inputs.
- [Council invitations](council-invitations.md): voluntary pilot entry and sponsor positioning.
- [Vehicle verification](vehicle-verification.md): person, authorised vehicle relationship and eligibility boundaries.
