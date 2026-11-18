---
name: pdev-stack
description: Phase 5 of the pdev framework — propose and record the tech stack, including verification tooling, in tech-stack.md.
disable-model-invocation: true
argument-hint: "[constraints: skills, hosting, budget, timeline]"
---

# Phase 5 — Choose the tech stack

Read `docs/project-scope.md`, `docs/mvp.md`, and `docs/spikes.md` (if it has
content). My constraints: $ARGUMENTS

If I haven't given constraints, ask me first: skills, hosting, budget,
timeline, expected scale, and anything else that limits the choice.

Then propose a stack. For each layer — language, framework, data store,
hosting, key libraries, and **verification tooling** (test runner, type
checker / linter, CI) — give one primary recommendation and one alternative,
with the trade-offs. Prefer tooling that gives fast, strict feedback: an agent
building this will rely on it constantly. Use what the spikes taught us. Flag
anything that's hard to change later. Don't pad the stack — fewer moving parts
is better for an MVP.

After I decide, write `docs/tech-stack.md` and log the significant,
hard-to-reverse calls in `docs/decisions.md`.

## Done when

- [ ] Every layer has a chosen option and a one-line rationale.
- [ ] Verification tooling (tests, types/lint, CI) is chosen.
- [ ] Hard-to-reverse choices were identified and made deliberately.
- [ ] I could explain the stack without your help.

Finish by checking these and telling me the next step: `/pdev-plan`.
