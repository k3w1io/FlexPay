# First experience: discover your flexibility

Status: council-led invitation, the FlexZone concept and explicit daily acceptance are the chosen prototype direction. Final screen design remains exploratory.

The [commuter experience PRD](commuter-experience-prd.md) now defines the proposed main demonstration around Aoife's first useful offer, starting after enrolment and learning. These notes retain the broader first-use exploration; invitation and learning are supporting sketches in the PRD.

## Working user and job to be done

A regular peak commuter who drives because it makes their day work, with occasional discretion over departure time, working location, or sharing a lift.

> When planning my usual journey, help me understand a worthwhile change that fits my responsibilities, so I can earn something useful without putting my day at risk.

The experience should support practical decisions and confidence. People with fixed journeys benefit from potential road relief; declining an offer should feel ordinary and carry no penalty.

## Candidate first journey

Start with a council letter inviting the owner to a local pilot, with a vehicle link prepared by an authorised records partner. The person activates the invitation voluntarily and confirms the linked vehicle. The hackathon uses a synthetic invitation and simulated verification. See [council invitations](council-invitations.md).

Before revealing personal vehicle observations or enabling rewards, establish the participant’s relationship to the vehicle. The proposed route supports a registered owner or an authorised regular driver; see [vehicle verification](vehicle-verification.md). Public road observations can be explored without enrolment. For the hackathon, vehicle verification and personal history remain explicitly simulated.

Introduce the FlexZone before routine exploration: show the exact road section, direction, and the time window for any offer. Explain it as a local opportunity to help make room. The connection is to the person’s confirmed journey; it does not imply continuous location tracking.

1. **Confirm the routine.** Show a small summary of usual crossing times and days, with its source. Let the person correct it. Distinguish reported habits from authorised vehicle observations.
2. **Explore the road history.** Overlay that crossing window on recent aggregate observations. Last week is an understandable introduction, not a sufficient personal baseline or a guarantee about tomorrow.
3. **Compare feasible changes.** Show a small number of useful options, with the information needed to judge them: crossing window or departure, arrival estimate where supported, walking, transfers, fare, and reward conditions.
4. **Understand the exchange.** Explain the exact zone, direction, window, reward, and how completion is assessed. Present the reward separately from estimated travel savings or additional costs.
5. **Choose participation.** Accept or decline. Successful acceptance reserves the reward before confirming the agreement. If places are exhausted, show “Offer full” and do not confirm a reward. Declaring an alternative mode remains optional; the purchased condition concerns the registered vehicle’s presence.
6. **Receive the outcome.** Explain verification and reward status. Include a branch where plans change and the person drives, and a state where verification is unresolved.

Crossing a zone and leaving home are different events. A suggested departure time needs journey information beyond a road crossing window.

## Potential magic moments

- “That alternative would actually work for me.”
- “You’ve shown me something about my routine that I hadn’t noticed.”
- “I understand the offer, and I’m still in control if my plans change.”
- “My small change counted, and the reward arrived as promised.”

The current frontrunner is discovering a feasible alternative through a recognisable playback of the person’s routine and the road’s recent history.

## Daily participation and recurring opportunities

The current prototype requires explicit acceptance for each dated offer. Programme enrolment and receiving a recurring invitation do not constitute acceptance. A lightweight acceptance can lead into deeper alternative exploration; it does not require the person to declare a mode.

The council can propose repeating opportunities on selected weekdays. Each date has its own availability, reward reservation and verification outcome. See the [council simulator PRD](council-simulator-prd.md). A repeat schedule does not commit the commuter to every morning.

The following approaches remain useful references for future exploration:

| Approach | Experience | Main design tension |
| --- | --- | --- |
| Ambient | Programme opt-in; offers made known in advance; no daily acceptance | Minimal effort, but limited advance indication of intended changes |
| Active | Review and accept each offer | Explicit agency, with possible decision fatigue |
| Hybrid | Lightweight acceptance; deeper exploration available | Keep the simple interaction sufficient while making evidence accessible |

Automatic ambient participation is outside the current prototype. The depth of the acceptance interaction remains to explore. None of these approaches proves additionality on its own.

## Illustrative offer copy

> A little flexibility tomorrow?
>
> Earn €3 by keeping your registered car outside the selected inbound N7 FlexZone between 08:00 and 09:00.
>
> Accept offer · Not tomorrow
>
> Plans can change. If you need to drive, you simply won’t receive this reward.

The zone, time, and amount are placeholders, not validated pilot parameters.

## Proposed first prototype storyboard

The entry now follows the chosen council-invitation direction; the remaining interaction details are still to explore. Use one synthetic commuter whose schedule can accommodate a later crossing on the example day.

| Moment | Content to explore | Design question |
| --- | --- | --- |
| Council invitation | Letter with local purpose, example linked vehicle, official entry address, QR code, and invitation code | Does the person understand the invitation and recognise the sender? |
| Activate and confirm | Voluntary account activation, pre-linked vehicle, relationship confirmation, and simulated verification | Does the person understand how the vehicle link was established? |
| Meet the FlexZone | Bounded road map, direction, and offer window | Can the person identify exactly where and when an offer applies? |
| Recognise the routine | Source-labelled crossing pattern over recent road observations, with a correction action | Does the person recognise the pattern and trust its source? |
| Find a workable change | Original crossing window and two supported alternatives, with reward conditions and trade-offs | Can they assess whether the change fits their responsibilities? |
| Accept the offer | Exact zone, direction, date, window, reward, and changed-plans explanation | Can they explain the commitment in their own words? |
| See the outcome | Simulated verification result and reward status | Does the outcome match what they expected? |

The main interaction to explore is moving between the usual crossing window and a feasible alternative while retaining the same road-history context. A shifted window must not be labelled congestion-free without supporting evidence.

Prepare alternate states for an unverified vehicle, an already-enrolled vehicle, a declined offer, an offer that is full, changed plans, and insufficient verification. They can be companion frames rather than separate full journeys.

Keep the first prototype focused on discovery and a first accepted offer. Recurring opportunities can be acknowledged without a full commuter scheduling flow. Do not build a full wallet or imply a live ownership, payment, or registration-history integration.

## Questions to resolve

- Whose real morning are we designing around, and where does flexibility exist?
- How much activation and verification detail should the first prototype show before introducing the FlexZone?
- Which alternatives are genuinely feasible for the selected journey?
- What evidence and explanation establish trust without overwhelming the person?
- How do we explain availability and a reserved reward without adding unnecessary effort to acceptance?
- What should happen when observation coverage is insufficient?

## What the prototype should help us assess

Can a person recognise and correct their routine, judge an alternative, explain the reward condition, and understand what happens if their plans change? Acceptance alone is not evidence that the experience or intervention succeeds.
