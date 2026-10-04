# FlexPay

Build for Ireland hackathon workspace. FlexPay explores buying voluntary reductions in vehicle demand at a specific congested road and time window.

Repository: https://github.com/k3w1io/FlexPay (private).

Expo project: https://expo.dev/accounts/aliflexpayteam/projects/aliflexpay, owned by the `aliflexpayteam` organization. The owner's Expo login is `ali.gnv`.

First verified Android starter build:

- [Build details and installation](https://expo.dev/accounts/aliflexpayteam/projects/aliflexpay/builds/7c205e5b-1a50-4e5b-b336-7e47f1773c36)
- [Download the APK](https://expo.dev/artifacts/eas/nWfwS36X4sU9bF--K1cgumMPMazNxCN5Wib6kD9ljvc.apk)

This build verifies the starter and cloud build pipeline. It shows the FlexPay starter screen; the product demo flow remains to be implemented. A local copy is saved at `artifacts/FlexPay-starter.apk` in the owner's workspace. Device installation and runtime testing remain to be done on an Android phone.

The app in `mobile/` is an Android-only Expo TypeScript starter with cloud-build profiles and a browser demo fallback. The market, traffic model, verification and rewards are still to be implemented. This starter does not make real payments or use vehicle records.

## Start developing

Use Node.js 22.13 or newer in the Node 22 series and npm. Accept the repository invitation before cloning.

```sh
git clone https://github.com/k3w1io/FlexPay.git
cd FlexPay/mobile
npm ci
npm run web
```

Edit `mobile/App.tsx`. The browser reloads as you work. For a native development client, run `npm start` after installing a development build.

```sh
npm run typecheck
npm run lint
npm run export:android
npm run export:web
```

GitHub Actions runs TypeScript, lint, Android bundle and browser export checks on pushes to `main` and pull requests, and saves the exported web demo as a downloadable artifact. An artifact is an export, not a hosted URL.

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

`gracemcginn` and `tiernaugh` have been invited with write access. Each person accepts their invitation and authenticates Git using their own account. The owner manages access at https://github.com/k3w1io/FlexPay/settings/access.

Use a short branch per feature, push it, then open a pull request. GitHub checks give a quick confidence check before merging. No mandatory branch-protection or review rules have been added for this hackathon.

```sh
git switch -c codex/feature-name
git add <files-you-changed>
git commit -m "Describe the change"
git push -u origin codex/feature-name
```

GitHub access and Expo build access are separate. The project already belongs to the `aliflexpayteam` Expo organization. To let teammates run builds, invite their own Expo accounts as Developers at https://expo.dev/accounts/aliflexpayteam/settings/members. Keep individual accounts and credentials separate.

## Demo scope and remaining work

1. Select the evidenced corridor, period and traffic inputs from the research.
2. Define and test the traffic reduction calculation and flexibility market.
3. Build a narrow 60–90 second demo showing the constraint, procurement and result.
4. Label observed data, assumptions and simulated outcomes in the UI.
5. Rehearse the browser version and a completed APK; keep screenshots as a fallback.

Keep the demo deterministic and able to run with bundled data. A backend, live payments, GPS tracking and production vehicle verification are outside this initial demo setup. If AI calls are added, keep the API key on a backend; Expo public environment variables are included in the app bundle.

## References

- [Expo SDK 57 reference and runtime requirements](https://docs.expo.dev/versions/v57.0.0/)
- [EAS first build](https://docs.expo.dev/build/setup/)
- [Internal distribution and Android APKs](https://docs.expo.dev/build/internal-distribution/)
- [Expo account and organization roles](https://docs.expo.dev/accounts/account-types/)
- [Expo Go version compatibility](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/)

## Dependency audit

The official SDK 57 dependency tree currently reports 23 npm audit findings (16 high, 7 moderate). Compatible patches have been applied. Remaining findings involve transitive build tooling; npm's proposed forced fix downgrades Expo to SDK 44 and is incompatible with this app. Recheck upstream fixes before using the starter beyond the hackathon.
