---
artifact_contract: "ce-handoff/v1"
created_at: "2026-10-04T14:31:36.969745+00:00"
title: "Consumer demo public data handover"
summary: "Verified consumer rail dataset, PRD mapping and outstanding N7 traffic work."
keywords: ["FlexPay", "consumer", "public-data", "FP-002"]
cwd: "/Users/tiernaugh/Documents/GitHub/FlexPay"
resume_focus: "Pick up public-data work for the commuter demo"
head: "ac2c8493b152c8ffedbec6d0ace9374b6a0eb0fa"
branch: "tiernan/planner-web"
---

# Consumer demo public data handover

The user asked for public-data options for the consumer hackathon demo, a visible ticket, and this handover for another agent. Research and a reusable rail dataset are complete. **The data is not connected to the app.** A usable real N7 traffic profile remains outstanding.

## Read these first

All repository paths below are relative to the FlexPay checkout recorded above.

- [FP-002 research ticket](../tickets/FP-002-consumer-public-data-research.md): source access results, coordination boundaries and mapping to consumer screens.
- [Commuter experience PRD](../experience/commuter-experience-prd.md): authoritative fictional scenario, five-screen journey and evidence requirements. Screen 2 is the main public-data opportunity.
- [Prepared rail dataset](../data/consumer-rail-2026-10-08.json): 14 real scheduled Sallins-to-Heuston services for the PRD date, station coordinates, provenance and limitations. This is the immediately reusable input.
- [Ranked public-data options](../ideation/2026-10-04-consumer-public-data-ideation.html): three surviving directions, tradeoffs and rejected/merged alternatives.
- [Data brief](../experience/data-brief.md): observed, reported, estimated and simulated information must remain distinct.
- `mobile/AGENTS.md`: Expo-specific instructions apply before changing mobile code. At research time, `mobile/App.tsx` was a branded starter; council-planner work was under `web/`. Recheck current files because other agents are working concurrently.

## What the user has asked for

The user wants real public data that adds a useful discovery moment to the consumer app, specifically the commuter PRD. They also requested a ticket and a handover. No implementation option has been selected in this conversation, and no app integration was performed. Recommendations below are the research agent's judgment, not a user-approved implementation plan.

## Verified train data ready for use

The official [NTA Irish Rail GTFS ZIP](https://www.transportforireland.ie/transitData/Data/GTFS_Irish_Rail.zip) returned HTTP 200 and was parsed. Its publisher page is [TFI public transport data](https://www.transportforireland.ie/transitData/PT_Data.html), which specifies CC BY 4.0 attribution to NTA.

The prepared JSON covers Thursday **8 October 2026**, departures from 06:00 up to but excluding 10:30. Service calendars and date exceptions were applied; Sallins must precede Heuston in stop sequence. Pickup at Sallins and dropoff at Heuston were checked and permitted for all 14 retained services.

Examples:

| Sallins departure | Heuston scheduled arrival | Time until reported 10:30 appointment |
| --- | --- | --- |
| 08:34 | 08:55 | 95 minutes |
| 08:52 | 09:26 | 64 minutes |
| 09:37 | 09:58 | 32 minutes |

The last column is arithmetic, not a validated onward journey. Home-to-Sallins access, Heuston-to-destination travel, fare and personal suitability are not supplied. The operator ZIP contains no fare tables. Do not describe a complete alternative as feasible until those missing legs are supported or explicitly reported and confirmed.

GTFS station IDs: Sallins and Naas `8260IR0060`; Dublin Heuston `8220IR0132`. The source agency timezone is `Europe/London`; the app scenario uses `Europe/Dublin`. Their offsets were checked as equal on the demo date. Preserve source metadata instead of silently changing it.

The source feed covers 3 October 2026–3 October 2027. Feed version, retrieval timestamp and original ZIP SHA-256 are recorded in the prepared JSON. A matching timetable is scheduled information, not evidence of actual travel or vehicle absence.

## N7 traffic history is not ready

The [TII counter-location GeoJSON](https://data.tii.ie/Datasets/TrafficCounters/tmu-traffic-counters.geojson) downloaded successfully and contains 308 features. Candidate N7 metadata includes Kill/Johnstown counter `20071` and Kingswood/Citywest `1071`. These are historical location candidates; current coverage, directional lanes and agreement boundaries have not been validated. A sensor point does not define a FlexZone.

[TII's access guide](https://data.tii.ie/traffic-counter-readme.html) documents public daily CSVs. Recent probes for 2 October 2026 and 26 September 2025 returned HTTP 403. Older example CSVs from June 2013 returned HTTP 200; only headers/small samples were inspected, not a complete N7 profile.

Important findings from actual headers:

- `per-site-class-aggr` is a **daily vehicle total by class**, not a time-binned morning curve.
- `per-site-minutes-aggr` contains daily **MinutesWithData**, not traffic counts for each minute.
- `per-vehicle-records` includes timestamps, lane, class and speed. Preparing a profile from it requires aggregation, reliable lane-to-direction mapping and completeness checks. Generic lane names such as “Channel 7” are insufficient by themselves.

The [TII traffic dashboard](https://trafficdata.tii.ie/publicmultinodemap.asp) exposes reports and export controls; a suitable export was not tested. This is the most promising remaining access route. A complete older period is acceptable if its actual dates are shown. Do not call it last week, current traffic or tomorrow's forecast. Counts alone do not establish faster travel; point speeds do not establish a whole-journey arrival estimate.

## Consumer PRD mapping and recommendation

The research recommendation is to start with the real train alternative and recognisable geography, then add the road-history comparison once a suitable dataset is available. Keep the PRD's later-crossing primary fixture; a train is an additional exploration branch until connecting-leg feasibility is established.

- Screen 1: real corridor context can sit beside Aoife's explicitly synthetic routine.
- Screen 2: the rail snapshot can support “Explore other ways”; real N7 time bins would support moving 08:15 to 09:15 over an unchanged historical profile.
- Screens 3–5: public data does not supply reward availability, reservations, verification or credit. Those stay simulated, with the same section and offer conditions throughout.

Aoife, DEMO-01, her three-of-four baseline, the offer and its €3 reward are fictional. The agreement concerns vehicle absence throughout 08:00–09:00, not precisely crossing at 09:15 or using a particular mode. Choosing a train is planning assistance, not reward acceptance or proof of absence.

Bundle the prepared evidence for a reproducible fixed-date demo. Display actual source dates and appropriate labels. Share a prepared corridor dataset between commuter and council views if useful, while keeping behavioural assumptions separate.

## Extras investigated and deferred

- Irish Rail's [public XML API](https://api.irishrail.ie/realtime/index.htm): station list returned HTTP 200 and identifies Sallins as `SALNS`. Current departure payload was not tested. Its 5–90-minute horizon cannot answer the PRD's tomorrow/fixed-date planning query.
- NTA realtime: requires issued tokens; the [current policy](https://developer.nationaltransport.ie/usagepolicy) limits each token to one request per 60 seconds. Static schedules avoid that integration dependency.
- Met Éireann [Dublin regional forecast JSON](https://www.met.ie/Open_Data/json/Dublin.json) and [warnings JSON](https://www.met.ie/Open_Data/json/warning_IRELAND.json) returned HTTP 200. The forecast was issued 4 October at 12:00Z; it cannot serve as an hourly Naas forecast for 8 October. Coordinate forecasts are separately documented as XML and were not tested. Weather adds less value to this specific demo than a credible alternative.
- OpenStreetMap geometry can support a small attributed map. Offline prefetch from the public OSM tile server is not appropriate; geometry and tile hosting have separate conditions.

## Remaining work and continuity

Research is complete; consumer integration is not started by this workstream. The next useful decision is whether to integrate the prepared train option, prioritise obtaining a real N7 profile, or combine them. That implementation choice remains with the user/current build workstream.

The repository artifacts are uncommitted local files, visible to agents sharing this checkout. They have not been pushed or published for agents on another machine. Other agents' requirements and planner changes were left untouched.

Machine-local supplementary evidence is at `/private/tmp/compound-engineering-501/ce-ideate/32fd7735/`: original rail ZIP, source probes, extracted service results and research dossiers. It is temporary and may disappear; the repository JSON, ticket and options document carry the essential handover information.

Validation performed: public endpoint status checks; ZIP parsing; service-date calendar/exception filtering; station sequence and pickup/dropoff checks; matching timezone offsets for the demo date; independent review of the data claims. No app code changed, so app lint/tests/builds were not run for this research.
