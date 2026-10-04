# FlexPay customer demo

## What the customer gets

FlexPay purchases a voluntary change to a usual car commute. The customer gets a clear offer, practical alternatives, an understandable reward status and control over their plan. The app does not require someone to change every day.

The demonstration follows **Aoife Murphy**, a fictional Naas-to-Dublin commuter, through one daily offer on **Monday, 5 October 2026**. Use the prefilled sign-in fields to select the local demo persona. There is no backend authentication, and the sign-in password is not persisted.

## Customer journey

1. **Sign in.** One tap enters the fictional account. Incorrect demo credentials show an inline error and a restore-details action.
2. **Understand the offer.** Today explains a fixed **€3 total per day**, including outward and return journeys, with the times visible before the customer chooses.
3. **Choose a practical alternative.** Work from home; take public transport; ride as a passenger while leaving their own car at home; or travel after the peak windows. This is not a transport booking service.
4. **Review and save.** The customer sees their usual route, both windows and reward together, and confirms they would normally drive and can keep their own car out of both windows.
5. **Stay in control.** My plans shows the saved day. The travel choice can be changed before completion. Cancellation earns nothing and has no penalty.
6. **Complete the day.** The customer confirms both journeys. The labelled presenter shortcut skips time to run a simulated check. A clear result adds €3 once; an inconclusive result holds the reward for review.
7. **See the reward.** The wallet starts with €12 of fictional historical rewards. One completed day increases it to €15. A demo transfer creates a local receipt and reduces the available sample balance; it never contacts a bank.
8. **Get help.** An inconclusive check can be reviewed. The review request remains local; a labelled presenter action approves it. Help explains conditions, privacy, cancellation and the scope of the demonstration.

## UX decisions

- Four consistent tabs: Today, My plans, Wallet and You. Offer and plan details use a back button.
- Cream surfaces, forest-green text, lime reward cards, simple route illustration and native vector icons. No remote font or illustration is needed.
- Visible daily amount and both journey conditions prevent an ambiguous “€3 per trip” promise.
- Choices are alternatives, not a prescriptive recommendation. Share-a-lift eligibility specifically applies to a passenger’s car left at home.
- Buttons, inputs, checkboxes, radio choices and switches expose accessible roles, labels and states. Content scrolls and avoids system safe areas.
- Progress, travel preferences and reminder preference persist locally. Reminders are a saved demo setting; push notifications are not implemented.
- Plan completion, cancellation, review and transfer transitions are guarded in one reducer. Repeated actions cannot create duplicate daily rewards or an overdrawn wallet.
- Desktop browser preview frames the same mobile app beside a short explanation for presenting. Narrow screens show the app alone.

## 90-second walkthrough

1. Sign in with the prefilled details.
2. Today → Find my flexible day → choose Public transport (or Work from home).
3. Review my day → tick the conditions → Save my flexible day.
4. On the plan, tick “I kept my own car out of both peak windows” → Demo: complete my day.
5. See my reward. Show the €15 balance and new €3 activity item.
6. Try a demo transfer → confirm → show the simulated receipt.

For the review story, use **You → Reset demo**, select **Inconclusive demo check**, and repeat steps 2–4. Show the pending reward, request a demo review, then use **Demo: approve this review**. Cancelling a plan is another useful customer-control story.

For a phone rehearsal, run `npm run start:phone` from `mobile/` and scan its QR with Expo Go (SDK 57). Keep the development server and computer running. `npm run qr:phone` saves the live QR image for sharing. The standalone Android preview APK is the presentation fallback that runs without the server.

Reset restores the €12 opening balance, clears all sample plans and transfers, restores commute preferences and switches checks back to clear. It preserves sign-in. Signing out preserves progress.

## Evidence and boundaries

The N7 eastbound approach through Newlands Cross towards Red Cow is a **candidate** being researched, not an approved or operating FlexPay pilot. The 06:00–10:00 outward and 16:00–19:00 return windows are this prototype’s illustrative offer terms. The return window is a demo assumption. €3 total per participant per day is the team’s reward assumption, not approved funding.

All participants, eligibility, choices, verification, reviews, historical rewards and transfers are synthetic. The demo does not collect GPS, number plates, raw movements or banking details. It does not call TII cameras, use real participant matching, claim that absence of a detection proves avoidance, or calculate measured congestion, carbon or economic savings. No real support request is sent.

The UI deliberately omits traffic forecasts and government dashboards from the customer journey. A separate buyer/evaluation view, real authentication, eligibility rules, authorised verification, reward delivery, push notifications and pilot approvals remain future work.

## Engineering and validation

Screens are in `mobile/src/app/` and use Expo Router. Shared UI is in `mobile/src/components/`; the pure demo state machine is in `mobile/src/domain/demo.ts`; local storage is managed by `mobile/src/state/DemoProvider.tsx`.

From `mobile/` run `npm run typecheck`, `npm run lint`, `npm test`, `npm run export:android` and `npm run export:web`. Tests cover daily reward limits, cancellation/rebooking, inconclusive checks/review, preferences, changes, transfers, storage validation and reset/sign-out. CI runs the same checks.

Brand assets can be regenerated with `node scripts/generate-brand.mjs`. An Android preview APK runs without Metro or a backend. Browser validation does not replace installation and runtime testing on a physical Android phone.
