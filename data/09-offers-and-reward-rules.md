# Daily offer and reward fixture

**Data status: synthetic offer terms based on team planning assumptions.** Packaged 4 October 2026 from existing research; no fresh online collection.

Morning 06:00-10:00 and EUR 3 total/day match the research assumptions. Return 16:00-19:00 is the existing UX demo assumption, not a measured N7 intervention. Choices are not real transport timetables or bookings.

```json
{
  "data_status": "synthetic_terms",
  "offer_id": "DEMO-OFFER-20261005-N7",
  "date": "2026-10-05",
  "corridor_label": "N7 Newlands Cross towards Red Cow / M50",
  "morning_window": {
    "start": "06:00",
    "end_exclusive": "10:00",
    "direction": "East"
  },
  "return_window": {
    "start": "16:00",
    "end_exclusive": "19:00",
    "direction": "West",
    "basis": "prototype_assumption_no_real_return_baseline"
  },
  "time_basis": "Europe/Dublin_demo_terms_only_not_source_clock_conversion",
  "reward_eur_total_day": 3,
  "reward_basis": "one_total_daily_reward_covering_both_journeys",
  "alternatives": [
    "public_transport",
    "work_from_home",
    "travel_after_peak",
    "lift_passenger_own_car_left_home"
  ],
  "payment_method": "simulated_cash_wallet",
  "leap_credit_status": "concept_only_no_authorised_integration",
  "lottery_status": "excluded_from_fixed_reward_demo",
  "cancellation_penalty_eur": 0,
  "conditions": [
    "Would normally drive through the relevant morning window",
    "Keep own car out of both offer windows",
    "Passenger lift qualifies only if own car stays off the road",
    "Driver carrying passengers does not automatically remove their own car"
  ],
  "approved_government_funding": false
}
```
