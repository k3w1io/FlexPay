# FlexPay

Build for Ireland hackathon workspace. FlexPay explores buying voluntary reductions in vehicle demand at a specific congested road and time window.

Repository: https://github.com/k3w1io/FlexPay (private).

Expo project: https://expo.dev/accounts/aliflexpayteam/projects/aliflexpay, owned by the `aliflexpayteam` organization. The owner's Expo login is `ali.gnv`.

Initial Android starter build (superseded by the customer demo):

- [Build details and installation](https://expo.dev/accounts/aliflexpayteam/projects/aliflexpay/builds/7c205e5b-1a50-4e5b-b336-7e47f1773c36)
- [Download the APK](https://expo.dev/artifacts/eas/nWfwS36X4sU9bF--K1cgumMPMazNxCN5Wib6kD9ljvc.apk)

Those links are the original setup check, not the full customer demo. Device installation and runtime testing remain to be done on an Android phone.

The app in `mobile/` now contains the FlexPay customer demo: prefilled login, daily offer, travel choices, plan changes and cancellation, simulated completion/review, wallet, simulated transfer, commute preferences and help. Android is the only native target; the browser is a presentation fallback.

**Demo login:** `aoife.demo` / `FlexPayDemo!` (both prefilled). Sign-in selects a fictional local persona. No real payments, bank access, GPS or number-plate data are used. Progress persists locally; use **You → Reset demo** to replay.

See [the customer journey and 90-second walkthrough](docs/CUSTOMER-DEMO.md) for how the app should work, UX choices, assumptions and presentation steps.

## Start developing

Use Node.js 22.13 or newer in the Node 22 series and npm. Accept the repository invitation before cloning.

```sh
git clone https://github.com/k3w1io/FlexPay.git
cd FlexPay/mobile
npm ci
npm run web
```

Edit screens in `mobile/src/app/` (Expo Router). Shared UI, demo logic and local state live alongside them in `mobile/src/`. The browser reloads as you work. For a native development client, run `npm start` after installing a development build.

```sh
npm run typecheck
npm run lint
npm test
npm run export:android
npm run export:web
```

GitHub Actions runs TypeScript, lint, demo state tests, Android bundle and browser export checks on pushes to `main` and pull requests, and saves the exported web demo as a downloadable artifact. An artifact is an export, not a hosted URL.

## Expo cloud builds

Run these commands from `mobile/`, using an Expo account with access to the project:

```sh
npx eas-cli@latest login
npx eas-cli@latest whoami
npm run build:android
```

The app is linked to the team's existing EAS project. Teammates must use that project rather than creating another. Initially the owner runs cloud builds and shares the finished APK; GitHub write access does not grant Expo access.

The `preview` profile makes a standalone Android APK. EAS provides an installation link when the build succeeds; it runs without a development server. Allow EAS to generate and manage the Android signing keystore on the first build.

For a native client that supports live development:

```sh
npm run build:development
npm start
```

Android is the only native target for this hackathon. No Google Play developer account is needed to install the APK directly. The browser path is available as a presentation fallback.

## Team workflow

`gracemcginn` and `tiernaugh` both have write access. Each person authenticates Git using their own account. The owner manages access at https://github.com/k3w1io/FlexPay/settings/access.

Use a short branch per feature, push it, then open a pull request. GitHub checks give a quick confidence check before merging. No mandatory branch-protection or review rules have been added for this hackathon.

```sh
git switch -c codex/feature-name
git add <files-you-changed>
git commit -m "Describe the change"
git push -u origin codex/feature-name
```

GitHub access and Expo build access are separate. The project already belongs to the `aliflexpayteam` Expo organization. To let teammates run builds, invite their own Expo accounts as Developers at https://expo.dev/accounts/aliflexpayteam/settings/members. Keep individual accounts and credentials separate.

## Customer demo and next steps

The customer journey uses a fixed **€3 total daily reward**, covering both journeys. The illustrative Monday offer uses 06:00–10:00 outward and 16:00–19:00 return windows on the candidate N7 corridor. The app presents these as demo terms, not measured capacity or an approved programme.

1. Rehearse the completed customer flow using [the walkthrough](docs/CUSTOMER-DEMO.md).
2. Install the new demo APK on an Android phone and check navigation, keyboard and accessibility.
3. Develop the buyer/evaluation view separately if the pitch needs procurement or traffic-model outputs.
4. Before a live pilot, establish real authentication, agreed eligibility, authorised verification and reward delivery.

The demo is deterministic and runs with bundled synthetic data. Reminder settings and review requests stay local. A backend, live payments, GPS tracking and production vehicle verification are outside this customer prototype. If AI calls are added, keep the API key on a backend; Expo public environment variables are included in the app bundle.

## References

- [Expo SDK 57 reference and runtime requirements](https://docs.expo.dev/versions/v57.0.0/)
- [EAS first build](https://docs.expo.dev/build/setup/)
- [Internal distribution and Android APKs](https://docs.expo.dev/build/internal-distribution/)
- [Expo account and organization roles](https://docs.expo.dev/accounts/account-types/)
- [Expo Go version compatibility](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/)

## Dependency audit

The SDK 57 dependency tree has outstanding npm audit findings in upstream packages. Expo Doctor checks compatibility separately; audit findings are not resolved by that check. Do not force a major SDK downgrade to silence the audit. Recheck upstream patches and run a fresh audit before extending this prototype into a live service.
