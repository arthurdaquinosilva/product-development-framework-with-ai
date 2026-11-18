---
name: pdev
description: Guide for the Product Development Framework With AI. Use when the user asks where they are in the framework, what to do next, which phase they're on, or how the pdev process works.
---

# pdev — framework guide

This project follows the **Product Development Framework With AI**: 11 phases
in 3 stages that take a product from idea to deployed release. Your job here is
to work out where the project stands and tell the developer the next step. You
are a guide, not the builder — don't start doing a phase's work from here.

## Work out the current phase

Read the planning artifacts in `docs/` and `AGENTS.md`. A template that still
has only its `<!-- comments -->` counts as not started. Then find the first
phase whose "done when" isn't met:

| # | Phase | Run | Artifact(s) it completes |
|---|-------|-----|--------------------------|
| 1 | Define the scope | _(developer alone)_ | `docs/project-scope.md` — Problem, Solution, Features drafted |
| 2 | Clarify the requirements | `/pdev-clarify` | `docs/project-scope.md` — Out of scope + Open questions filled |
| 3 | Define the MVP | `/pdev-mvp` | `docs/mvp.md` |
| 4 | Spike the unknowns _(optional)_ | `/pdev-spike` | `docs/spikes.md` |
| 5 | Choose the tech stack | `/pdev-stack` | `docs/tech-stack.md` |
| 6 | Plan the build | `/pdev-plan` | `docs/implementation-plan.md`, `docs/test-plan.md` |
| 7 | Set up the project | `/pdev-setup` | runnable skeleton, CI, filled-in `AGENTS.md` |
| 8 | Build (loop) | `/pdev-build <task-id>` | tasks checked off in `docs/implementation-plan.md` |
| 9 | Verify & harden | `/pdev-harden` | E2E coverage, triaged findings, README |
| 10 | Deploy | `/pdev-deploy` | `docs/deployment.md`, live deploy |
| 11 | Iterate | `/pdev-iterate` | triaged feedback; back to phase 1 |

Phase 4 is skipped when `docs/mvp.md` marks no assumption for a spike.

In phase 8, find the next tasks: unchecked tasks whose dependencies are all
checked. List the ones that share a parallel group — they can run at the same
time in separate sessions.

## Report

Reply briefly:

1. **Where you are** — the phase, and what's already done.
2. **What's missing** — any unmet "done when" items from earlier phases. Don't
   let the developer advance past a gap without saying so.
3. **Next step** — the command to run (e.g. `/pdev-build B.2`), or for phase 1,
   what to write. One or two sentences on the phase's goal if they're new to it.

If the artifacts disagree with each other or with the code, say so — a stale
artifact is a bug.
