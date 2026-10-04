# Data brief for the commuter experience

Status: provisional information requirements. Implementation choices remain with the technical workstream.

## Requested demonstration inputs

| Experience need | Requested information |
| --- | --- |
| Activate a council invitation | Example sponsor, synthetic invitation code and status, linked example vehicle, and voluntary activation state |
| Confirm a legitimate vehicle relationship | Owner or authorised-driver relationship and simulated enrolment-verification status; invitation possession kept separate from verified identity |
| Introduce the FlexZone | Exact road-section boundaries, map geometry or a labelled schematic, direction, and offer windows |
| Explain recent road conditions | One corridor, direction, measurement location, and five recent comparable weekdays of time-binned observations |
| Explain the metric | Vehicle volume, speed, or journey time, with units, aggregation interval, source, and missing-data flags |
| Play back a routine | A separate synthetic participant pattern, or a pattern explicitly reported by the person |
| Compare feasible alternatives | Departure or crossing window, arrival estimate where supported, walking, transfers, fare, and known limitations |
| Describe an offer | Zone boundaries, direction, date, window, reward, acceptance places remaining, successful reservation and an “offer full” state |
| Show progress | Separate commitments, verification results, and modelled additional reductions |
| Explain settlement | Pending, condition met, condition failed, or insufficient evidence; simulated reward amount and payment status |
| Demonstrate a counterfactual | Original observations alongside a separately labelled modelled intervention and any modelled displacement |

## Evidence and presentation rules

- Label information as **observed**, **self-reported**, **estimated**, or **simulated**. Attach its source and relevant time period.
- Aggregate road observations do not establish an individual’s historical travel pattern.
- Counts alone describe volume. Claims about congestion or delay need supporting measurements or an explicit model.
- A week of history can support exploration; it does not establish a robust personal baseline or tomorrow’s forecast.
- Timetables and arrival estimates do not establish spare public-transport capacity or guarantee a journey.
- A sensor miss or outage is not confirmed vehicle absence. Preserve an unresolved verification state.
- Keep original observations intact. Display intervention effects as modelled results.
- State whether changing travel times creates a new peak or whether that effect is outside the model.
- Keep reward value separate from travel expenses and estimated savings. Do not invent time, carbon, or cash benefits.

## Personalisation boundary

Start with a selected road and a confirmed routine. If personalised alternatives require an origin, destination, or arrival deadline, ask for that information explicitly and explain its use. Do not infer a complete journey from isolated vehicle observations.

For this hackathon, use synthetic participant histories and simulated verification and settlement. Access to historical registration records and production payment services is not established.

Vehicle enrolment verification is separate from offer-outcome verification. The first establishes the person’s right to enrol the vehicle; the second assesses its presence during an offer window. Do not reveal personal vehicle observations or activate rewards on the basis of a plate entry alone. See [vehicle verification](vehicle-verification.md).

## Suggested minimum scenario

Use one example commuter, one selected road window, one feasible primary change, and one conditional reward. The [commuter experience PRD](commuter-experience-prd.md) uses a later crossing as that change; add other alternatives only when their feasibility is supported. Demonstrate a successful simulated outcome and a changed-plans branch. Keep insufficient verification visible as a possible state.

The first-use entry is a synthetic council letter leading to voluntary invitation activation and a pre-linked vehicle. The main commuter demonstration starts after enrolment and learning; the entry stages are supporting sketches. Council sponsorship, access to owner/address records, and access to personal road observations are distinct production dependencies. An invitation does not establish a peak-use baseline or entitlement to a particular reward. See [council invitations](council-invitations.md).

## Sources checked during discussion

- [TII traffic-count data](https://www.tii.ie/en/roads-tolling/operations-and-maintenance/traffic-count-data/): describes published traffic volumes by vehicle class.
- [TII traffic-counter access guide](https://data.tii.ie/traffic-counter-readme.html): describes raw and aggregated files and possible gaps in observations.
- [TII data-protection notice](https://www.tii.ie/en/compliance/data-protection-notice/): describes encrypted ANPR records for journey-time measurement. It does not establish a FlexPay integration or access to personal commute histories.
- [NTA travel information services](https://www.nationaltransport.ie/ga/transport-technology/travel-information-systems-and-services-tiss/): describes journey-planning and real-time transport information.

These sources establish potential inputs, not confirmed access to a suitable corridor dataset or a validated intervention model.

## Council planning and verification route

The [council simulator PRD](council-simulator-prd.md) now separates invitations from funded acceptance places. Reserve the full reward when acceptance succeeds, preserve unresolved reservations and keep invitations, acceptances, fulfilments, assumed causal change and payments distinct. Recurring opportunities require separate daily acceptance and budgets.

The first infrastructure route to investigate is a partnership using suitable existing TII ANPR observations. The notice above establishes records for journey-time measurement, including on the N7; it does not establish usable historical baselines, suitable coverage or authorised FlexPay access. A new camera is a fallback. A prospective opt-in learning period remains necessary if usable authorised history is unavailable.

For the prototype, provide a synthetic vehicle baseline for a proposed crossing-frequency eligibility filter and label the causal share separately as assumed. Baseline frequency must not be treated as evidence that an incentive caused a change. The council screen can optionally simulate a share moving into a compatible later window; it must not describe lower historical volume as spare road capacity.
