---
name: pdev-spike
description: Phase 4 of the pdev framework — answer risky assumptions with throwaway prototypes and record findings in spikes.md.
disable-model-invocation: true
argument-hint: "[question to spike]"
---

# Phase 4 — Spike the unknowns

Read `docs/mvp.md` and find the assumptions marked **spike**. $ARGUMENTS

1. Propose the one to three questions most worth answering, phrased as yes/no
   or "how well" questions, and what the smallest prototype that answers each
   would be. Wait for me to confirm.
2. For each confirmed question, build the smallest possible prototype in a
   scratch location (a `spikes/` directory or a throwaway branch) — never in
   the real source tree. Ignore code quality entirely; optimize for learning
   fast. Don't build anything the question doesn't need.
3. Run it and show me the result. Where judgment is needed ("does this feel
   right?"), tell me exactly how to try it myself.
4. Record each spike in `docs/spikes.md`: the question, what was tried, the
   finding, and what it means for the MVP or the stack. Update the assumptions
   in `docs/mvp.md`, and log anything the spike settled in `docs/decisions.md`.
5. Delete the prototype code (or confirm with me that it's fenced off and
   won't be imported into the real project).

## Done when

- [ ] Each spike answered its question — yes, no, or "not like that".
- [ ] Findings are in `docs/spikes.md`, and `docs/mvp.md` reflects them.
- [ ] The spike code is deleted or clearly fenced off.

Finish by checking these and telling me the next step: `/pdev-stack`.
