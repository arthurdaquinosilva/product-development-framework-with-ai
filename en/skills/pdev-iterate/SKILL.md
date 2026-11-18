---
name: pdev-iterate
description: Phase 11 of the pdev framework — triage feedback and usage data, scope the next iteration, and update the artifacts.
disable-model-invocation: true
argument-hint: "[feedback, or a path to it]"
---

# Phase 11 — Iterate

Here is the feedback and usage data from the live product: $ARGUMENTS

If there's nothing above, ask me for it.

1. Read `docs/project-scope.md`, `docs/mvp.md` (especially the deferred list),
   and `docs/decisions.md`.
2. Triage the feedback into **bugs**, **improvements**, and **new features**.
   For each, note user impact, rough effort, and whether it was already on
   the deferred list or contradicts an earlier decision.
3. Recommend what the next iteration should focus on, and what needs scoping
   before anyone builds it.
4. For each bug to fix: add a task to `docs/implementation-plan.md` whose
   acceptance check is a test that reproduces the bug.
5. After I decide: update `docs/project-scope.md` and the deferred list in
   `docs/mvp.md`, and log the decisions in `docs/decisions.md`.

## Done when

- [ ] Feedback is triaged, not sitting in a pile.
- [ ] Every bug to fix has a task that starts with a reproducing test.
- [ ] The next iteration's focus is decided and scoped.
- [ ] `docs/project-scope.md` and the deferred list reflect current reality.

Finish by telling me the next step: bugs go straight to `/pdev-build`; new
scope goes back through `/pdev-clarify` and `/pdev-mvp`.
