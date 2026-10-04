# Synthetic wallet ledger and appeal cases

**Data status: synthetic funds transactions and support cases.** Packaged 4 October 2026 from existing research; no fresh online collection.

Aoife opening balance EUR 12; completed-day balance EUR 15; optional EUR 6 simulated transfer leaves EUR 9. No real bank, account, payment reference or funds. A transfer is not an additional reward. Enforce one EUR 3 reward per participant/day and idempotent retries.

```json
[
  {
    "data_status": "synthetic",
    "transaction_id": "DEMO-REWARD-HIST-01",
    "participant_token": "DEMO-P001",
    "date": "2026-09-28",
    "type": "daily_reward",
    "amount_eur": 3,
    "settlement": "demo_only"
  },
  {
    "data_status": "synthetic",
    "transaction_id": "DEMO-REWARD-HIST-02",
    "participant_token": "DEMO-P001",
    "date": "2026-09-29",
    "type": "daily_reward",
    "amount_eur": 3,
    "settlement": "demo_only"
  },
  {
    "data_status": "synthetic",
    "transaction_id": "DEMO-REWARD-HIST-03",
    "participant_token": "DEMO-P001",
    "date": "2026-09-30",
    "type": "daily_reward",
    "amount_eur": 3,
    "settlement": "demo_only"
  },
  {
    "data_status": "synthetic",
    "transaction_id": "DEMO-REWARD-HIST-04",
    "participant_token": "DEMO-P001",
    "date": "2026-10-01",
    "type": "daily_reward",
    "amount_eur": 3,
    "settlement": "demo_only"
  },
  {
    "data_status": "synthetic",
    "transaction_id": "DEMO-REWARD-20261005-P001",
    "participant_token": "DEMO-P001",
    "date": "2026-10-05",
    "type": "daily_reward",
    "amount_eur": 3,
    "settlement": "demo_only"
  },
  {
    "data_status": "synthetic",
    "transaction_id": "DEMO-TRANSFER-001",
    "participant_token": "DEMO-P001",
    "date": "2026-10-05",
    "type": "simulated_transfer",
    "amount_eur": -6,
    "settlement": "no_bank_contact"
  }
]
```

```json
[
  {
    "data_status": "synthetic",
    "appeal_id": "DEMO-APPEAL-001",
    "participant_token": "DEMO-P006",
    "reason": "coverage_unavailable",
    "status": "pending_review",
    "held_reward_eur": 3
  },
  {
    "data_status": "synthetic",
    "appeal_id": "DEMO-APPEAL-002",
    "participant_token": "DEMO-P005",
    "reason": "disputed_seen_result",
    "status": "needs_manual_review",
    "held_reward_eur": 3
  }
]
```

Presenter approval of an appeal adds EUR 3 once using a unique daily reward key; no real support request is sent. Cancellation earns nothing and has no penalty. Withdrawal stops future participation; production deletion and accounting retention remain unresolved.
