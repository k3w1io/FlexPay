# FP-002: Find public data for the consumer demo

Status: research complete — consumer integration and feature choice remain open.
Date: 4 October 2026.
Owner: Codex consumer-data research workstream.
Requested by: Tiernaugh.
Experience: [Commuter first offer PRD](../experience/commuter-experience-prd.md).
Data requirements: [Data brief](../experience/data-brief.md).
Related work: [FP-001 council planner](FP-001-planner-html-build.md).

## Goal

Explore the current codebase and publicly available Irish data, then recommend a small set of ways to make the consumer hackathon demo feel useful and grounded in the real world. The user is choosing options; this ticket does not authorise implementation of a new consumer feature.

The scenario is a fictional Naas-to-Dublin commuter, an N7 inbound offer, and discovering a feasible change to an 08:15 usual crossing. The current PRD proposes a 09:15 later crossing and a simulated €3 reward for avoiding 08:00–09:00 on 8 October 2026.

## Coordination and boundaries

- This work owns this ticket and a public-data options artifact under `docs/ideation/`.
- Other agents can continue implementing consumer and council screens. No app code, dependencies, existing requirements or planner fixtures are being changed by this research.
- Consumer entry point: `mobile/App.tsx` is currently an Expo starter; `web/` contains council-planner work. The checkout is changing during research, so findings are tied to the files read.
- Prefer a shared, frozen local dataset that could serve the consumer and council views. Real data may be historical and bundled; live API access is optional.
- Personal routine, vehicle eligibility, verification, reward reservations and payments remain simulated. Aggregate public observations cannot establish individual vehicle history.

## Work in progress

- [x] Inspect consumer requirements and actual application entry points.
- [x] Identify public road, map, timetable, realtime and weather sources.
- [x] Probe TII location files and traffic CSV headers.
- [x] Verify transport and weather access sufficiently to distinguish documented feeds from tested downloads.
- [x] Compare candidate demo interactions, integration effort and limitations.
- [x] Publish ranked options, source links and a recommended smallest useful combination.
- [x] Update this ticket with the research outcome and remaining access questions.

## Findings so far

### Road history and geography

[TII's traffic-counter guide](https://data.tii.ie/traffic-counter-readme.html) documents daily public CSVs. The [counter-location GeoJSON](https://data.tii.ie/Datasets/TrafficCounters/tmu-traffic-counters.geojson) downloaded successfully and lists candidate N7 sites, including Kill/Johnstown (20071) and Kingswood/Citywest (1071). Treat these as historical metadata candidates until current coverage and direction are checked.

The 2013 example files downloaded successfully. Actual headers reveal an important constraint: the small class aggregate is a daily total, and the minutes aggregate is daily `MinutesWithData`. Neither is a ready-made 15-minute traffic curve. Timestamped per-vehicle records contain time, lane, class and speed; they require preprocessing or an appropriate export from the [TII traffic dashboard](https://trafficdata.tii.ie/publicmultinodemap.asp).

Probed CSVs for 2 October 2026 and 26 September 2025 returned HTTP 403. Recent usable road history has **not** been confirmed. Do not promise a last-week chart until a suitable export or download is actually obtained. Counts describe volume, and point speeds do not establish a whole-journey arrival estimate.

### Workable alternatives

[NTA/TFI public transport data](https://www.transportforireland.ie/transitData/PT_Data.html) supplies static GTFS schedules and stop information. A date-checked Sallins-to-Heuston itinerary is a promising consumer alternative, subject to origin/station access, destination access and supported fare information.

The [Irish Rail schedule ZIP](https://www.transportforireland.ie/transitData/Data/GTFS_Irish_Rail.zip) downloaded successfully (HTTP 200, approximately 7.7 MB). Its feed covers 3 October 2026–3 October 2027. Parsing trips, stop times, Thursday service calendars and date exceptions for **8 October 2026** found scheduled Sallins → Dublin Heuston services including **08:34–08:55**, **08:52–09:26** and **09:37–09:58**. These are station-to-station scheduled times, not a complete journey or an arrival guarantee. The feed contains no fare tables. Its agency timezone is Europe/London, equivalent to Europe/Dublin on this scenario date; preserve the original metadata when importing.

The [station XML endpoint](https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML) also returned HTTP 200 and identifies Sallins as `SALNS`. The current-departure payload is a separate integration and has not been tested.

[NTA realtime access](https://developer.nationaltransport.ie/usagepolicy) requires issued tokens and currently limits each token to one request per 60 seconds. The [Irish Rail XML API](https://api.irishrail.ie/realtime/index.htm) documents station coordinates and near-term train departures. Realtime departures do not answer a tomorrow-evening planning query; use static schedules for that story.

### Contextual extras

OpenStreetMap geometry can make the corridor recognisable. Map data and tile hosting have separate conditions; a bounded local geometry extract is preferable to an offline tile dependency.

Met Éireann's [Dublin regional forecast JSON](https://www.met.ie/Open_Data/json/Dublin.json) returned HTTP 200 with an issue time of 4 October 2026 at 12:00Z; [warnings JSON](https://www.met.ie/Open_Data/json/warning_IRELAND.json) returned HTTP 200 with an empty list at the time of retrieval. This is regional text for today/tonight/tomorrow, not an hourly Naas forecast for the PRD's 8 October morning. The separately documented coordinate forecast is XML and was not tested. Weather is secondary to genuine road history and a credible alternative; any forecast display needs the relevant warnings and freshness checks.

## Mapping to the commuter PRD

| PRD input or screen | Public-data opportunity | What remains fictional or unresolved |
| --- | --- | --- |
| Screen 1: routine and opportunity | Real corridor/counter location as context | Aoife, DEMO-01, three-of-four baseline, eligibility and €3 offer remain synthetic |
| Screen 2: road profile and later crossing | TII historical time bins for a selected counter/direction | Recent profile, lane direction, comparable dates and completeness still need preparation; 09:15 is a suggestion, not a supported departure/arrival estimate |
| Screen 2: explore other ways | Verified date-specific Sallins–Heuston scheduled trains, station coordinates and route shapes | Home-to-station and onward journey, fare and personal feasibility need supporting inputs; selecting train does not prove car absence |
| Screens 3–5: agreement, verification and credit | Preserve a consistent real corridor reference throughout | Agreement availability, reservation, verification and credit remain simulated; public feeds cannot settle them |
| Optional context | Timestamped forecast/warnings; near-term rail departures | Current conditions must not be relabelled as conditions for the fixed demo date |

The research supports the PRD's later-crossing primary path. A train card is an optional additional branch, pending confirmation of the remaining journey legs; it is not yet a second fully feasible option. No requirements or fixtures have been changed.

## Research acceptance criteria

1. Explain the current consumer app state and relevant data slots using repository evidence.
2. Present ranked options with a concrete consumer magic moment, primary source links, likely effort and material limitations.
3. Distinguish source documentation, successful endpoint probes and unresolved access.
4. Recommend a small, reliable hackathon combination without claiming personal observations or simulated rewards are real.
5. Keep observed history, timetable/forecast estimates and simulated outcomes distinguishable; do not infer savings or traffic relief from counts alone.
6. Link the options artifact here so other agents can work from the same findings.

## Handoff

Read the [consumer public-data handover](../handoffs/consumer-public-data.md) to pick up this work. It records verified inputs, remaining work and the app integration boundary.

The [ranked options](../ideation/2026-10-04-consumer-public-data-ideation.html) recommend a real train possibility, a conditional historical N7 crossing explorer and recognisable corridor geography. The [prepared rail JSON](../data/consumer-rail-2026-10-08.json) contains 14 date-checked morning services with provenance and limitations.

The data is for the consumer PRD but is not connected to the app. Feature choice and implementation scope remain for the user to decide after review. All artifacts are local and uncommitted.
