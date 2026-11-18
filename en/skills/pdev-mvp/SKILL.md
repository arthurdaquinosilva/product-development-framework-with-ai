---
name: pdev-mvp
description: Phase 3 of the pdev framework — define the MVP, testable success criteria, and the risky assumptions in mvp.md.
disable-model-invocation: true
---

# Phase 3 — Define the MVP

Based on `docs/project-scope.md`, help me define the MVP — the smallest version
that still solves the core problem and is worth shipping.

1. For each feature, argue whether it's truly MVP or can wait. The test: does
   the product still solve the core problem without it? If yes, it's not MVP.
   Challenge me when I'm gold-plating.
2. Draft success criteria that are concrete enough to become automated tests
   later ("streak count is correct across a month boundary", not "streaks
   work"). Anything that can only be checked by a person, mark as **manual**.
3. List the assumptions the MVP is betting on. For each, note how risky it is
   and whether a quick throwaway prototype could test it. Mark the risky,
   testable ones **spike**.

Then write `docs/mvp.md`: core problem, MVP scope, deferred features, success
criteria, and assumptions & risks. Log significant calls in `docs/decisions.md`.

## Done when

- [ ] The MVP feature list is shorter than my instinct wanted it to be.
- [ ] Every success criterion is checkable automatically, or marked manual.
- [ ] Deferred features are recorded so they aren't lost.
- [ ] Risky assumptions are listed, and the ones worth a spike are marked.

Finish by checking these and telling me the next step: `/pdev-spike` if any
assumption is marked spike, otherwise `/pdev-stack`.
