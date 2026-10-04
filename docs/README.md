# FlexPay research documents

Research snapshot for Alist, Grace and Tiernan, exported on 4 October 2026.

- [Government pilot viability working document](flexpay-government-pilot-viability-working-document.md): N7 planning scenarios, government appraisal, Singapore comparators, data access, participant verification and the remaining research queue.
- [Customer demo guide](CUSTOMER-DEMO.md): synthetic participant journey, presenter walkthrough, prototype boundaries and development checks.
- [Data and access register](research/data-foundation/data-register.json): dependencies, collection status and unresolved access requirements.
- [N7 baseline summary](research/data-foundation/baseline-summary.json): five weekday mornings, 28 September to 2 October 2026, with morning/hourly counts and reported full-day totals.
- [Normalized five-minute records](research/data-foundation/n7-morning-intervals.jsonl): 480 aggregate Any/CAR observations.
- [Proposed observation-result schema](research/data-foundation/proposed-observation-attestation.schema.json): a synthetic development contract; no TII matching API or production verification service is established.
- [Public source snapshots and access checks](research/n7/): aggregate reports, camera-access metadata and the performance-data access assessment.

The [live working document](https://chatgpt.com/space/page_d1ddfeefe73081918b7446d988fc329f) is maintained by the research task. This repository copy records the state at export; later Page edits are not automatically pushed here.

## Reproduce the aggregate preparation

From the repository root, with Python 3:

```sh
python docs/research/data-foundation/prepare_baseline.py
```

The script works offline from the preserved public-report snapshot and regenerates the normalized records and baseline summary. It checks unique interval keys, CAR being included within Any, morning totals against reported daily totals, and consistency with the earlier 1 October report.

Counts are passing vehicles, not measured arrival demand, capacity, eligible commuters or causal avoided journeys. Any includes CAR; do not add those series. The source clock convention, interval quality flags and lane/movement mapping remain unconfirmed. The 1,600 avoided-arrival scenario is illustrative, and EUR 3 is the assumed total daily participant reward covering both journeys.

## Official source reports

- [TII National Road and Greenway Network Indicators 2025](https://www.tii.ie/media/w4xns2ed/tii-national-road-and-greenway-network-indicators-2025.pdf)
- [A Study of Lane Capacity in the Greater Dublin Area](https://www.tii.ie/media/5ibeml3l/a-study-of-lane-capacity-in-the-greater-dublin-area.pdf)
- [TII Road Emissions Model development report, May 2024](https://cdn.tii.ie/publications/GE-ENV-01107-02.pdf)

The working document contains the supporting source links and applicability limits. This pack contains aggregate data and metadata, with no real participant identities, number plates, raw vehicle movements or camera-image archive.
