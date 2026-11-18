---
name: pdev-deploy
description: Phase 10 of the pdev framework — write deployment.md, automate the release path, and verify a real deploy with runnable health checks.
disable-model-invocation: true
---

# Phase 10 — Deploy

Read `docs/tech-stack.md` and `AGENTS.md`.

1. Draft `docs/deployment.md`: target environment, step-by-step build and
   release process, required environment variables and how secrets are
   managed (names only — never values), the rollback procedure, and the
   health checks that confirm a good deploy.
2. Make the health checks **runnable** — a script or command that exits
   non-zero when the deploy is unhealthy.
3. Automate the release path (CI/CD or a single script) so future deploys are
   repeatable.
4. Prepare the first real deploy, but **let me trigger or approve the actual
   production release** — it's outward-facing and may be hard to undo.
   Afterwards, run the health checks and report.
5. Log significant choices (hosting, secrets management, release strategy) in
   `docs/decisions.md`.

## Done when

- [ ] The product is reachable by its intended users.
- [ ] Deploying again is a repeatable, automated process.
- [ ] Rollback is written down, and the health checks run as a command.

Finish by checking these and telling me the next step: `/pdev-iterate` once
there's feedback.
