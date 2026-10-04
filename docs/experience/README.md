# FlexPay experience working notes

> Pay people who can change their journey to create room for people who can’t.

FlexPay proposes to purchase voluntary reductions in vehicle demand at a specific road zone during a specific time window. Participants receive a conditional reward for keeping their registered vehicle outside that zone. If they need to drive, they receive no reward and incur no penalty.

These documents capture our current thinking for the Build for Ireland hackathon. They are working hypotheses, not a settled specification or evidence that the intervention works.

## The experience we are exploring

Help a regular peak commuter understand their routine, discover a feasible change, and decide whether a FlexPay offer makes trying it worthwhile.

Our working user has occasional flexibility. The same person may be able to change Tuesday’s journey and unable to change Wednesday’s.

## Hackathon scope

- One corridor, direction, and constrained window. The N7 is a candidate; the exact location and window remain open.
- One complete commuter journey, with a meaningful branch where plans change.
- Real aggregate road data where available; synthetic participant history and simulated rewards clearly labelled.
- A reliable demonstration of the experience and underlying mechanism, with explicit assumptions.

Real registration histories, payment integrations, and production vehicle verification are outside this prototype.

## Working together

| Workstream | Focus |
| --- | --- |
| Experience design | User needs, information, choices, trust, and prototype flows |
| Technical build and data | Usable observations, modelling, offer calculations, and simulated outcomes |
| Presentation | Evidence, narrative, and clear boundaries around what the demo proves |

Experience design can progress using labelled examples while data work establishes the actual values and feasible options.

## Documents

- [First experience](first-experience.md): user, job to be done, candidate journey, and open design decisions.
- [Data brief](data-brief.md): information the experience needs from the technical workstream.

## Important distinctions

An accepted offer, an undetected vehicle, and a journey prevented because of the reward are different quantities. The demo must keep commitments, verification, and estimated additional reductions separate.

Keeping one registered vehicle outside a zone does not by itself prove net traffic relief. Another vehicle, a neighbouring road, or a later peak could absorb the demand.
