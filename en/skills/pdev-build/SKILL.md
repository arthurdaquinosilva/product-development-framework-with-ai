---
name: pdev-build
description: Phase 8 of the pdev framework — build one planned task check-first, iterate until every gate passes, self-review, and update the artifacts.
disable-model-invocation: true
argument-hint: "<task-id>"
---

# Phase 8 — Build task $ARGUMENTS

Read `AGENTS.md`, then task **$ARGUMENTS** in `docs/implementation-plan.md`,
and whatever other artifacts the task needs. If no task id was given, pick the
next unchecked task whose dependencies are all done and tell me which one.

If anything the task needs is unspecified, ask before assuming. Keep the change
scoped to this task.

1. **Check first.** Mark the task `[~]` in the plan. Write the task's
   acceptance check as an automated test (or confirm the command that verifies
   it) and run it — it should fail. If it passes already, tell me: either the
   task is done or the check doesn't test anything.
2. **Build until green.** Implement the task. Iterate until the acceptance
   check, the full test suite, and every gate in `AGENTS.md` pass.
   **Never weaken, skip, or delete a test or check to make it pass.** If a
   check looks wrong, stop and tell me why.
3. **Self-review.** Review your diff as a skeptical reviewer who didn't write
   it — use a separate review pass or reviewer agent if available. Check it
   against the task, the conventions in `AGENTS.md`, and
   `docs/project-scope.md`. Fix what you find and rerun the gates.
4. **Record.** Check the task off (`[x]`) in `docs/implementation-plan.md`.
   Log any decision or deviation in `docs/decisions.md` and the plan's
   "Deviations" section. Update any other artifact this task made wrong.
5. **Report**, briefly:
   - what changed (files, behavior)
   - the gate results
   - anything you were unsure about or chose without being told
   - for `Review: human` tasks: exactly which parts of the diff need my
     line-by-line attention, and why

Then wait for my review before committing (unless `AGENTS.md` says you may
commit on your own). One task, one focused commit, referencing the task id.

## Stop and ask instead of pushing on when

- the spec is ambiguous or contradicts another artifact
- the task is turning out much bigger than planned (propose a split)
- the change hits a human-review trigger from `AGENTS.md` the plan didn't
  anticipate
- the only way to pass a check is to change the check
