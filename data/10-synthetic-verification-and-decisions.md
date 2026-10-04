# Synthetic observation results and reward decisions

**Data status: proposed interface plus synthetic results only.** Packaged 4 October 2026 from existing research; no fresh online collection.

No TII matching API is available. `seen`, `not_seen`, `unknown` describe a vehicle observation, not who drove, additionality or compliance. No detection is not proof of an avoided journey. `partial`, `unavailable`, `unverified` coverage cannot establish absence. Approved outcomes below are explicit presenter fixtures with assumed reviewed declarations, not a production decision rule. No actual camera number should be represented as a functioning participant detector.

## Observation fixtures

```json
[
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P001-AM",
    "participant_token": "DEMO-P001",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P001-PM",
    "participant_token": "DEMO-P001",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P002-AM",
    "participant_token": "DEMO-P002",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P002-PM",
    "participant_token": "DEMO-P002",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P003-AM",
    "participant_token": "DEMO-P003",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P003-PM",
    "participant_token": "DEMO-P003",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P004-AM",
    "participant_token": "DEMO-P004",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P004-PM",
    "participant_token": "DEMO-P004",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "not_seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P005-AM",
    "participant_token": "DEMO-P005",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P005-PM",
    "participant_token": "DEMO-P005",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P006-AM",
    "participant_token": "DEMO-P006",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "unknown",
    "coverage_state": "unavailable",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P006-PM",
    "participant_token": "DEMO-P006",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "unknown",
    "coverage_state": "unavailable",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P007-AM",
    "participant_token": "DEMO-P007",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "unknown",
    "coverage_state": "unavailable",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P007-PM",
    "participant_token": "DEMO-P007",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "unknown",
    "coverage_state": "unavailable",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P008-AM",
    "participant_token": "DEMO-P008",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "not_seen",
    "coverage_state": "partial",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P008-PM",
    "participant_token": "DEMO-P008",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "not_seen",
    "coverage_state": "partial",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P009-AM",
    "participant_token": "DEMO-P009",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "unknown",
    "coverage_state": "unverified",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P009-PM",
    "participant_token": "DEMO-P009",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "unknown",
    "coverage_state": "unverified",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P010-AM",
    "participant_token": "DEMO-P010",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "unknown",
    "coverage_state": "unavailable",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P010-PM",
    "participant_token": "DEMO-P010",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "unknown",
    "coverage_state": "unavailable",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P011-AM",
    "participant_token": "DEMO-P011",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P011-PM",
    "participant_token": "DEMO-P011",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "seen",
    "coverage_state": "validated",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P012-AM",
    "participant_token": "DEMO-P012",
    "target_window_id": "DEMO-20261005-AM",
    "observation_state": "unknown",
    "coverage_state": "unverified",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  },
  {
    "data_status": "synthetic",
    "attestation_id": "DEMO-ATT-DEMO-P012-PM",
    "participant_token": "DEMO-P012",
    "target_window_id": "DEMO-20261005-PM",
    "observation_state": "unknown",
    "coverage_state": "unverified",
    "issued_at": "2026-10-05T19:05:00+01:00",
    "expires_at": "2026-10-06T19:05:00+01:00",
    "policy_version": "demo-1",
    "evidence_reference": null,
    "reason": "simulated_result_not_tii_or_public_camera"
  }
]
```

## Decision fixtures

```json
[
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P001",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "approved_demo",
    "participant_declaration": true,
    "reward_eur": 3,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P002",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "approved_demo",
    "participant_declaration": true,
    "reward_eur": 3,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P003",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "approved_demo",
    "participant_declaration": true,
    "reward_eur": 3,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P004",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "approved_demo",
    "participant_declaration": true,
    "reward_eur": 3,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P005",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "review_requested",
    "participant_declaration": true,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P006",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "pending_review",
    "participant_declaration": true,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P007",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "cancelled",
    "participant_declaration": false,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P008",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "pending_review",
    "participant_declaration": true,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P009",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "ineligible_baseline",
    "participant_declaration": false,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P010",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "withdrawn",
    "participant_declaration": false,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P011",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "not_qualifying_demo",
    "participant_declaration": true,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  },
  {
    "data_status": "synthetic",
    "participant_token": "DEMO-P012",
    "offer_id": "DEMO-OFFER-20261005-N7",
    "decision": "pending_review",
    "participant_declaration": true,
    "reward_eur": 0,
    "decision_basis": "explicit_presenter_fixture_not_automatic_no_detection_proof"
  }
]
```

## Proposed restricted partner interface

The production interface excludes the extra fixture-only `data_status` key. Example retention timestamps are synthetic demo values, not an agreed retention policy.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Proposed limited vehicle observation attestation",
  "description": "A proposed interface for an authorised partner, not an existing TII API. This participant-linked output is still personal data. No-read is not proof of an avoided journey. The final reward decision and causal evaluation are separate.",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "attestation_id",
    "participant_token",
    "target_window_id",
    "observation_state",
    "coverage_state",
    "issued_at",
    "expires_at",
    "policy_version"
  ],
  "properties": {
    "attestation_id": {
      "type": "string",
      "minLength": 1
    },
    "participant_token": {
      "type": "string",
      "minLength": 1,
      "description": "Purpose-limited identifier; no raw plate or owner name."
    },
    "target_window_id": {
      "type": "string",
      "minLength": 1
    },
    "observation_state": {
      "type": "string",
      "enum": [
        "seen",
        "not_seen",
        "unknown"
      ],
      "description": "Vehicle observation only; does not identify its driver or demonstrate additional behaviour change."
    },
    "coverage_state": {
      "type": "string",
      "enum": [
        "validated",
        "partial",
        "unavailable",
        "unverified"
      ],
      "description": "Coverage includes lane and direction scope, outages and read performance. A partial or unverified window must not establish compliant absence."
    },
    "issued_at": {
      "type": "string",
      "format": "date-time"
    },
    "expires_at": {
      "type": "string",
      "format": "date-time"
    },
    "policy_version": {
      "type": "string",
      "minLength": 1
    },
    "evidence_reference": {
      "type": [
        "string",
        "null"
      ],
      "description": "Restricted partner-side reference for an authorised appeal; not a public image or movement trail."
    },
    "reason": {
      "type": [
        "string",
        "null"
      ]
    }
  },
  "$comment": "Do not place real identifiers in developer fixtures. A production protocol also needs authentication, replay protection, attestation integrity and controller-approved retention, none of which is provided by this JSON schema."
}
```
