# Data fields screen mapping and demo states

**Data status: integration guidance with real and synthetic fields separated.** Packaged 4 October 2026 from existing research; no fresh online collection.

| Screen / component | Data file | Required fields / states |
| --- | --- | --- |
| Route / map | 01-corridor-and-counter.md | site_id, label, displayed coordinates, candidate status |
| Camera context tile | 02-public-camera.md | camera_id, official label, view, historical check time; no live claim |
| Historical traffic charts | 03 / 04 / 05 | date, source-clock interval, class, count, coverage |
| Profile and vehicle entry | 07 / 08 | synthetic identity, invalid plate fixture token, usual commute |
| Today / offer / plan | 09 | EUR 3 total/day, both windows, alternative, acceptance, cancellation |
| Verification and help | 10 | seen / not_seen / unknown; validated / partial / unavailable / unverified |
| Wallet and appeals | 11 | available / held / paid / cancelled; idempotent daily reward |
| Buyer dashboard layout | 12 | synthetic performance; missing real outcomes remain null |
| Savings scenarios | 13 | real denominator; assumed reduction, distance and additionality |
| Loading / error / empty / stale states | 06 | unknown coverage, absent series, historical camera metadata |

Field rules: `site_id` is a string preserving leading zeros; counts are integers per interval; rates require an explicit duration; Any includes CAR. Participant tokens and attestation IDs are strings with no owner lookup. Money is EUR per participant-day, not per trip; a production money representation should use integer cents. Clock labels do not imply UTC. All synthetic participant timestamps are fictional demo terms. Separate data_status values: real_observed, derived_from_observed, synthetic, assumption, missing. Do not use public camera absence as participant verification.

Existing UX guide: [Customer demo](../docs/CUSTOMER-DEMO.md). This pack supplies fixtures; it does not modify the app or message Tiernan.
