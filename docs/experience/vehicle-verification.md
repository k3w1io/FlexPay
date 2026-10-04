# Vehicle verification: legitimate enrolment

Status: proposed requirements and research findings. No production verification integration has been established.

## The problem

A registration number is publicly visible. Entering it does not establish ownership, permission to enrol, or eligibility for rewards. Someone could attempt to claim another vehicle’s rewards or access its personal travel observations.

The proposed requirement is an **owner or authorised regular driver**, rather than an owner-only rule. A partner’s vehicle, leased vehicle, or company car may have a legitimate regular driver who is not the registered owner. These cases need an appropriate authorisation route.

## Three separate checks

| Check | What it establishes | What it does not establish |
| --- | --- | --- |
| Person | The enrollee’s identity | Their relationship to the vehicle |
| Vehicle relationship | Registered ownership or permission to enrol | A regular peak journey or additionality |
| Reward eligibility | Relevant baseline use under the programme’s criteria | That an absence was caused by an offer |

## Irish precedent and access boundary

The Department of Transport’s online ownership-transfer service checks the registration and Vehicle Registration Certificate (VRC) number against the National Vehicle and Driver File (NVDF), then sends a one-time transfer PIN to the owner’s recorded email address. This is a precedent for combining document information with an independently recorded contact.

A dedicated FlexPay verification service could potentially use a comparable authentication pattern and return a limited confirmation. This is a proposed partnership capability, not an available integration. NVDF access is governed by defined arrangements for approved parties.

The existing ownership-transfer transaction must not be triggered for FlexPay enrolment. FlexPay must not ask participants to provide government login credentials, motor-tax PINs, or ownership-transfer codes.

## Pilot fallback to investigate

- Registered owner: review the VRC against verified identity.
- Authorised regular driver: obtain approval from a verified owner or an appropriate company or leasing authorisation route.
- Explain why evidence is needed and request only what is necessary. Define document handling and retention before collecting real documents.

Manual review has limitations, including forged or outdated documents. A photo beside a car, a plate photo, or a VIN may support access to a vehicle but does not establish ownership or permission on its own.

## Proposed enrolment experience

The chosen first-use direction is a council invitation with a vehicle link prepared by an authorised records partner. See [council invitations](council-invitations.md).

1. Receive a vehicle-linked invitation and activate it voluntarily.
2. Confirm the pre-linked vehicle and the relationship: registered owner or authorised regular driver.
3. Complete any identity or owner-authorisation check required by the pilot’s verification design.
4. Show verified enrolment before enabling rewards or revealing authorised personal vehicle observations.
5. Assess reward eligibility separately.

Possession of a code delivered to the registered owner’s address supports access to that invitation, not conclusive identity verification. Another household member could receive or activate it. The invitation code must not silently bypass the pilot’s vehicle-relationship checks.

Manual registration and document review remain fallback routes to investigate, rather than the primary prototype entry.

Suggested explanation:

> Let’s confirm this vehicle is yours to enrol.
>
> This helps prevent someone else claiming rewards for your car.

Public aggregate road data and self-reported routines can be explored before vehicle verification.

## Duplicate claims and changes

Propose one active reward enrolment per vehicle, with a recovery and dispute process. The first person entering a registration must not permanently control enrolment. Duplicate responses should not reveal the existing participant’s identity or history.

Ownership or authorisation changes need re-verification. Shared use, multiple vehicles, transfers of participation, and fleet authorisation require further design work.

## Hackathon prototype

Use a synthetic council invitation, a pre-linked example vehicle, and explicitly simulated verification. Show vehicle confirmation, a successful example verification, and an unverified or already-enrolled state. Do not collect real vehicle documents or present this as a live government connection.

This demonstrates the trust requirement and user experience; it does not validate a production fraud-control mechanism.

## Sources checked during discussion

- [Department of Transport: motor tax and vehicle ownership](https://www.gov.ie/en/department-of-transport/policy-information/motor-tax-and-vehicle-ownership-nvdf/): describes the registration/VRC check and PIN delivery in the ownership-transfer process.
- [Department of Transport: data protection and data exchange](https://www.gov.ie/en/department-of-transport/publications/motortax-data-protection-and-data-exchange/): describes NVDF data access arrangements.
