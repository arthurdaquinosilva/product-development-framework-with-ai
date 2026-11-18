---
name: pdev-plan
description: Phase 6 of the pdev framework — break the MVP into verifiable tasks with acceptance checks, parallel groups, and review levels; write the test plan.
disable-model-invocation: true
---

# Phase 6 — Plan the build

Read `docs/project-scope.md`, `docs/mvp.md`, and `docs/tech-stack.md`. Draft
two artifacts that together tell an agent exactly what to build and how to
prove it's done.

## `docs/implementation-plan.md`

Break the MVP into tasks, grouped into phases. Order them so something runs
end-to-end as early as possible (a walking skeleton first), and so every task
builds on already-working code. For every task:

- **Task** — what gets built. One coherent change.
- **Acceptance check** — a test or command that passes when the task is done,
  stated precisely enough to write the test from it. Not "works correctly".
- **Depends on** — tasks that must land first.
- **Parallel group** — tasks in the same group have no dependency on each
  other _and_ don't touch the same files, so they can be built at the same
  time.
- **Touches** — the main files or modules it changes (used to spot conflicts).
- **Review** — `auto` or `human`, with a reason for `human`. Mark `human`
  anything that changes data formats or schemas, auth or permissions, money,
  public interfaces, deployment, or deletes data.

Size tasks by verifiability: a task is right when it has one clear acceptance
check and an agent could finish it without coming back to ask. Split anything
bigger.

## `docs/test-plan.md`

- The **gates** every change must pass (test, lint, type check, … as exact
  commands from the tech stack).
- Each MVP success criterion from `docs/mvp.md` mapped to the task(s) whose
  acceptance checks prove it — or marked as a manual check.
- The critical user flows that need end-to-end coverage.
- What we deliberately won't test, and why.

Then review your own plan critically before showing it to me: point out the
riskiest tasks, any success criterion with weak coverage, and any parallel
tasks that might collide. I'll review it too — this is the most important
review in the framework.

## Done when

- [ ] Every task has a runnable acceptance check.
- [ ] Every MVP success criterion maps to a task's check or a manual check.
- [ ] Something runs end-to-end early in the order.
- [ ] Dependencies, parallel groups, and review levels are set on every task.
- [ ] I've read the whole plan and approved it.

Finish by checking these and telling me the next step: `/pdev-setup`.
