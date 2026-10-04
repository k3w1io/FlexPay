# Data brief for the commuter experience

Status: provisional information requirements. Implementation choices remain with the technical workstream.

## Requested demonstration inputs

| Experience need | Requested information |
| --- | --- |
| Explain recent road conditions | One corridor, direction, measurement location, and five recent comparable weekdays of time-binned observations |
| Explain the metric | Vehicle volume, speed, or journey time, with units, aggregation interval, source, and missing-data flags |
| Play back a routine | A separate synthetic participant pattern, or a pattern explicitly reported by the person |
| Compare feasible alternatives | Departure or crossing window, arrival estimate where supported, walking, transfers, fare, and known limitations |
| Describe an offer | Zone boundaries, direction, date, window, reward, availability, and acceptance requirement |
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

## Suggested minimum scenario

Use one example commuter, one selected road window, two feasible alternatives, and one conditional reward. Demonstrate a successful simulated outcome and a changed-plans branch. Keep insufficient verification visible as a possible state.

## Sources checked during discussion

- [TII traffic-count data](https://www.tii.ie/en/roads-tolling/operations-and-maintenance/traffic-count-data/): describes published traffic volumes by vehicle class.
- [TII traffic-counter access guide](https://data.tii.ie/traffic-counter-readme.html): describes raw and aggregated files and possible gaps in observations.
- [TII data-protection notice](https://www.tii.ie/en/compliance/data-protection-notice/): describes encrypted ANPR records for journey-time measurement. It does not establish a FlexPay integration or access to personal commute histories.
- [NTA travel information services](https://www.nationaltransport.ie/ga/transport-technology/travel-information-systems-and-services-tiss/): describes journey-planning and real-time transport information.

These sources establish potential inputs, not confirmed access to a suitable corridor dataset or a validated intervention model.
