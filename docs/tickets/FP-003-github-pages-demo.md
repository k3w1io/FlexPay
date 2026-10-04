# FP-003: Publish the HTML demo on GitHub Pages

Status: deployment research complete; workflow not installed and site not published.
Date: 4 October 2026.
Related build: [FP-001 planner](FP-001-planner-html-build.md).
Consumer experience: [Commuter PRD](../experience/commuter-experience-prd.md).

## Goal

Give the hackathon team a stable HTTPS link for the browser demo, with GitHub Actions building the HTML conversion and publishing the compiled site.

The user's request is to investigate deployment while other agents convert the Paper designs. This ticket is a concrete deployment proposal; it does not change repository settings, push code or publish a site.

Expected project URL, if enabled using the existing repository: **https://k3w1io.github.io/FlexPay/**. This is a proposed URL, not a live deployment.

## Verified current state

- GitHub repository: `k3w1io/FlexPay`, private, owned by a personal account. Default branch: `main`.
- Read-only repository API returned `has_pages: false`. The Pages endpoint returned HTTP 404; no Pages site is currently configured.
- The authenticated account has push permission, but neither admin nor maintainer permission.
- `web/` is the Vite/React/TypeScript HTML build. Its build command includes TypeScript checking and outputs to `web/dist/` by default.
- `web/src/main.tsx` currently opens the new commuter prototype. Other agents are still writing screens and styles; this is a source inspection, not a build readiness check.
- `web/vite.config.ts` uses `base: './'`. Relative paths can serve the current single entry point; the recipe below overrides the deployment build base to the explicit project path.
- The existing `.github/workflows/ci.yml` checks `mobile/` and uploads an Expo export from `mobile/dist/`. That artifact is not the new HTML demo and does not publish a website.
- Current commuter screens switch through React state rather than URL-path routing. They require no server-side route rewrites. Demo state is stored in the visitor's browser using localStorage.

## Recommended route

Use a dedicated GitHub Actions Pages workflow for `web/`. Build and check the prototype, upload only `web/dist/`, then deploy that artifact. Publish changes on `main`, with a manual rerun button.

[Vite's deployment guide](https://vite.dev/guide/static-deploy) documents the build output and repository-path base. [GitHub's workflow guide](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) documents Pages artifact deployment, environment and token permissions.

### One-time owner setup

The owner needs to confirm that their plan supports Pages from this private repository. For a personal private repository, GitHub Pro or a suitable Enterprise arrangement supports Pages. Free accounts support Pages from public repositories. Eligibility has not been verified for this owner's subscription.

An admin or maintainer enables **Settings → Pages → Build and deployment → Source: GitHub Actions** at:

https://github.com/k3w1io/FlexPay/settings/pages

The current authenticated account cannot perform that setup with its existing permissions. This is a GitHub permission requirement, not an automatic approval rejection.

The resulting standard project site is publicly accessible even when the source repository remains private. Only the compiled demo directory should be uploaded. If the owner lacks a suitable plan, a separately authorised public repository containing just the demo is a GitHub Pages fallback; changing the current repository's visibility is not required or proposed.

Source: [GitHub Pages publishing-source and availability documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

### Proposed workflow

This is a reviewable recipe, **not an installed workflow**. When implementation is authorised, the proposed destination is `.github/workflows/deploy-pages.yml`. Commit the HTML app and `web/package-lock.json` with it; GitHub builds committed files, not this workstation's untracked conversion.

```yaml
name: Deploy HTML demo

on:
  push:
    branches: [main]
    paths:
      - 'web/**'
      - '.github/workflows/deploy-pages.yml'
  workflow_dispatch:

permissions:
  contents: read

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    timeout-minutes: 15
    defaults:
      run:
        working-directory: web
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
          cache-dependency-path: web/package-lock.json
      - run: npm ci
      - run: npm test
      - run: npm run build -- --base=/FlexPay/
      - uses: actions/upload-pages-artifact@v4
        with:
          path: web/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    timeout-minutes: 10
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/configure-pages@v5
      - name: Deploy demo
        id: deployment
        uses: actions/deploy-pages@v4
```

Action versions follow GitHub's documented Pages examples and the existing repository's Node setup. Before installing the workflow, recheck their supported versions and the current app build contract.

## Guidance for the HTML build agents

- Keep the consumer and council experiences in one published artifact. Pages gives this repository one project site. If two experiences need distinct entry points, agree their locations and assemble both in the same output rather than having two workflows replace each other's site.
- The current consumer can run at the project root. If a separate council entry is added, a hash-based selector or real generated HTML entry avoids unsupported server-side route rewrites. A typed URL such as `/FlexPay/planner` will not automatically resolve to a React screen on Pages.
- Imported assets and data are the simplest way to bundle resources. Files fetched by URL must use the deployment base; root-absolute `/data/...` links would address the account site root rather than `/FlexPay/`.
- Files under repository `docs/data/` are not automatically shipped by a Vite build. Import the required snapshot or explicitly put a published copy in the app's static assets.
- Keep demo outcomes browser-local and use bundled evidence. Pages hosts static files; any future secret-bearing API call would need a separate service.
- Google Fonts currently loads over the network. Retain readable fallback fonts; bundle fonts if exact typography must work without that external request.
- The live site is available over the network. Keep a rehearsed local production build and screenshots as presentation fallbacks.

## Acceptance checks once the conversion is ready

1. From `web/`, dependency installation, existing tests and the production build succeed.
2. Preview the production build at `/FlexPay/`; check scripts, CSS, fonts, maps and data paths.
3. Demonstrate the full consumer journey, alternate states and reset on desktop and phone widths. If the council entry is included, check its entry and refresh behavior too.
4. GitHub Actions builds committed sources and deploys only the compiled artifact. No app publishing job runs from pull requests.
5. The deployed URL opens in a fresh browser without GitHub login. Reload/reset behavior is predictable, and each visitor's demo state is browser-local.
6. Record the actual deployed URL and commit used for the rehearsal.

## Outstanding work

- Owner confirms private-repository Pages eligibility and enables Actions publishing.
- HTML conversion is completed and passes its build/checks.
- Team confirms whether the first deployment includes only the current commuter entry or both commuter and council entries.
- Install and validate the workflow when deployment setup is requested, then publish only within the user's authorised scope.

No app tests or build were run for this research while conversion was in progress. No workflow, repository setting or hosted site was changed.
