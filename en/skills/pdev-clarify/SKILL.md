---
name: pdev-clarify
description: Phase 2 of the pdev framework — interrogate project-scope.md with clarifying questions, then rewrite it.
disable-model-invocation: true
---

# Phase 2 — Clarify the requirements

Read `docs/project-scope.md`. Review it critically and ask me clarifying
questions. Find gaps, ambiguities, contradictions, and things I haven't thought
through — especially around users, edge cases, and what's explicitly out of
scope. Don't suggest solutions yet, and don't agree with me just to be
agreeable: your job is to find what I've missed.

Ask one focused batch of questions at a time (at most five or so), wait for my
answers, then ask the next batch. Prefer questions whose answers change what
gets built.

When you have no more first-order questions, say so, then update
`docs/project-scope.md` to reflect everything we concluded. Keep it concise.
Fill in "Out of scope" and "Open questions"; mark each open question as
resolved or explicitly parked. Log any significant decision in
`docs/decisions.md`.

## Done when

- [ ] You have no more first-order clarifying questions.
- [ ] "Out of scope" is written down, not just implied.
- [ ] Open questions are either resolved or explicitly parked.

Finish by checking these and telling me the next step: `/pdev-mvp`.
