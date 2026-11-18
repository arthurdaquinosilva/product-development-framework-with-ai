---
name: pdev-harden
description: Phase 9 of the pdev framework — verify critical flows end to end, run an adversarial pre-launch review, and triage findings.
disable-model-invocation: true
---

# Phase 9 — Verify & harden

Read `AGENTS.md`, `docs/mvp.md`, and `docs/test-plan.md`.

## 1. Verify

- Confirm every critical user flow in `docs/test-plan.md` has an end-to-end
  test and that it passes. Write any that are missing.
- Then use the product the way a new user would — drive it yourself if you can
  (CLI, browser, API) — following each MVP success criterion, including the
  manual ones. Report anything surprising, even if no test fails.
- Give me the exact steps to try the critical flows myself.

## 2. Harden

Review the codebase as an adversary who didn't write it. If you have a
dedicated security-review tool or a separate reviewer agent, use it. Go angle
by angle:

- **Security** — secrets handling, input validation, authn/authz, dependency risks.
- **Edge cases** — empty states, large inputs, concurrent use, network failure.
- **Error handling** — does it fail loudly and recoverably, or silently and badly?
- **Docs** — can a new person clone, run, and understand it from the README?
  Is `AGENTS.md` still accurate?

Rate each finding **blocker / should-fix / nice-to-have** and explain the risk.
**Don't fix anything yet** — give me the list so I can triage.

## 3. Fix

After I triage: fix the blockers (and whatever else I pick), each with a
regression test, rerunning every gate. Log what we deferred in
`docs/decisions.md`.

## Done when

- [ ] Every critical flow passes end-to-end, and I've used the product myself.
- [ ] No known blockers remain, and each fix has a regression test.
- [ ] Secrets and config are handled properly, not hard-coded.
- [ ] A new person could clone, run, and understand the project from the README.

Finish by checking these and telling me the next step: `/pdev-deploy`.
