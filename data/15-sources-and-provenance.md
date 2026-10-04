# Source links provenance and reproduction

**Data status: existing research provenance with no new browsing.** Packaged 4 October 2026 from existing research; no fresh online collection.

| Local source | SHA256 |
| --- | --- |
| research/n7/tii-n7-1070-east-2026-09-28-to-2026-10-02-morning-source.json | 569278d0341b932a715f47cdbcc02034dcb328942c9138695196dd19d4fb5261 |
| research/data-foundation/n7-morning-intervals.jsonl | 46fed62bb93b62361d2866ab33972c070de551a879318c13db9e1b9e19c8b241 |
| research/data-foundation/baseline-summary.json | 9ddd7d704cd2e3e27dd06fa8afd109e4635b494e74304ac2be628fea68487071 |
| research/n7/public-camera-checks.json | ba68a238b27f7e637e1d38e1541df990feb5edd7d83cf439613da589c79e2af4 |
| research/n7/n7-performance-access-check-2026-10-04.json | 113f4b7c119fbb47bd747f5eaae962dc2cfc0733cae0c28edbb9e0d00813d64c |
| research/data-foundation/data-register.json | fca1f5059ef2fb9967274e275f78d7b0c9ab106d9b77215ad1f438e98b2c7bd0 |
| research/data-foundation/proposed-observation-attestation.schema.json | 4d1aac8bf92584bddc9ce5fc939aa26f3102dc3a6604433c9c67cbe7294bba0e |
| docs/CUSTOMER-DEMO.md | 5d04688b6325bd455fa8c7f9140a3155c4f1e27d62d7c31e9554eb0fd817ecfb |
| docs/flexpay-government-pilot-viability-working-document.md | 2f70eb7360d955c436f34b5232d9da17f053148987d31193067f101f710de2ff |

The preserved public browser tables were transcribed into an immutable source snapshot; offline preparation produced normalized records and sums. Independent source flags and unattended export remain unverified. Attribution: Transport Infrastructure Ireland, trafficdata.tii.ie, reported dates 28 September to 2 October 2026, observed 4 October 2026. Existing licence evidence: [TII counter readme](https://data.tii.ie/traffic-counter-readme.html), [TII reuse policy](https://www.tii.ie/en/compliance/reuse-of-public-sector-information/). Counter licensing does not establish camera-image or official-logo reuse rights.

Official report links:

- [CAR morning report](https://trafficdata.tii.ie/tfdaysreport.asp?sgid=XzOA8m4lr27P0HaO3_srSB&spid=ABEB430EAE98&reportdate=2026-09-28&enddate=2026-10-02&dir=%2D1&intval=2&dim1bin=2)
- [Any morning report](https://trafficdata.tii.ie/tfdaysreport.asp?sgid=XzOA8m4lr27P0HaO3_srSB&spid=ABEB430EAE98&reportdate=2026-09-28&enddate=2026-10-02&dir=%2D1&intval=2&dim1bin=0)

Existing access observations: camera and count reports were available when checked; access and freshness have not been rechecked for this packaging task. No real plates, personal movement histories, imagery archive, credentials or financial account details are included.

Reproduce the existing aggregate preparation: `python docs/research/data-foundation/prepare_baseline.py`. Rebuild this Markdown pack offline: `python research/build_n7_demo_pack.py` (the builder is a local workspace helper; data delivery contains Markdown only).

The exact local working-document and benefits snapshots used are included as [research context](17-working-research-context.md) and [benefit areas](16-benefit-areas-and-scenarios.md). Their hypotheses remain hypotheses; their source findings retain their original dates. The local source hashes describe inputs at packaging time, which may differ from earlier docs exports.
