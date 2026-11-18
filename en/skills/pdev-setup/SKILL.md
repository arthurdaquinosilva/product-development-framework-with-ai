---
name: pdev-setup
description: Phase 7 of the pdev framework — scaffold the project, wire the gates into CI, and fill in AGENTS.md.
disable-model-invocation: true
---

# Phase 7 — Set up the project

Read `docs/tech-stack.md`, `docs/implementation-plan.md`, and
`docs/test-plan.md`.

1. **Scaffold** the project per the tech stack: directory structure,
   dependency manifest, formatter/linter, type checker if the stack has one,
   test runner, a minimal runnable entry point, and `.gitignore`. Keep it
   minimal — no features yet. Don't overwrite the planning artifacts in
   `docs/`.
2. **Gates.** Make every gate command from `docs/test-plan.md` work and pass
   (a placeholder test is fine). Add CI that runs the same gates on every
   push. If I'd rather not set up CI yet, record that in `docs/decisions.md`.
3. **AGENTS.md.** Fill in every section of `AGENTS.md` at the repo root:
   overview, run commands, the gate commands as the definition of done,
   conventions, autonomy rules, human-review triggers, guardrails, and the
   artifact map. Keep it short — it's read at the start of every task.
   Remove the template comments. Leave `CLAUDE.md` as the `@AGENTS.md`
   import.
4. Update `docs/tech-stack.md` or `docs/decisions.md` if anything changed
   during setup, then show me the result and the exact commands to verify it.

Commit once I've looked at it.

## Done when

- [ ] The skeleton runs and every gate passes.
- [ ] CI runs the same gates and is green (or skipping it is a logged decision).
- [ ] `AGENTS.md` is filled in, including gates, autonomy rules, review
      triggers, and the artifact map.
- [ ] Everything is committed.

Finish by checking these and telling me the next step: `/pdev-build` with the
first task id from the plan.
