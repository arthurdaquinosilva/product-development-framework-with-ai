# The Framework

This document is the methodology. It walks through eleven phases, grouped into
three stages — **Plan**, **Build**, **Ship** — that take a product from a rough
idea to a deployed release, with an AI coding agent as your collaborator
throughout.

Work through the phases in order the first time. After that, the process loops:
phase 11 feeds back into phase 1 for the next iteration.

## How to read this document

Each phase below follows the same shape:

- **Goal** — what the phase produces and why it matters.
- **Inputs** — what you need before starting.
- **Work** — what you and the agent actually do.
- **Prompt** — a starting prompt for your agent. Adapt it; don't treat it as magic.
- **Output** — the artifact created or updated. Templates live in [`templates/`](templates/).
- **Done when** — the checklist that tells you it's safe to move on.

## A note on artifacts

The artifacts are **living documents**, not paperwork. Keep them in your
project's version control. The agent reads them at the start of every task to
recover context, and updates them whenever reality drifts from the plan. An
artifact that's out of date is worse than no artifact — it lies to the agent.

A good habit: at the end of any phase, ask the agent _"what in our existing
artifacts is now wrong or incomplete?"_ and fix it before moving on.

---

# Stage 1 — Plan

The goal of this stage is to make every important decision _before_ code exists,
when changing your mind is free.

## Phase 1: Define the scope

**Goal.** Capture what you're building and why, in your own words, before
involving the agent. This is the seed everything else grows from.

**Inputs.** An idea. That's it.

**Work.** Open [`templates/project-scope.md`](templates/project-scope.md) and
fill in the Problem, Solution, and Features sections with your initial thinking.
Be rough. Don't polish. The point is to externalize what's in your head so it
can be examined.

**Prompt.** _(none — this phase is just you)_

**Output.** `project-scope.md`, first draft.

**Done when.**

- [ ] You can state the problem in one or two sentences.
- [ ] You've listed the features you imagine, even half-formed ones.

## Phase 2: Clarify the requirements

**Goal.** Turn your rough scope into something precise enough to build from.
Surface the gaps, contradictions, and unspoken assumptions now.

**Inputs.** `project-scope.md` first draft.

**Work.** Hand the scope to the agent and let it interrogate you. Its job here
is _not_ to agree with you — it's to find what you haven't thought through.
Answer its questions, discuss, and then have it rewrite `project-scope.md` to
reflect what you concluded together. Expect this to take a few rounds.

**Prompt.**

```
Read project-scope.md. Review it critically and ask me clarifying questions.
Find gaps, ambiguities, and things I haven't thought through — especially
around users, edge cases, and what's explicitly out of scope. Don't suggest
solutions yet. Ask one focused batch of questions at a time.
```

Then, once the discussion settles:

```
Update project-scope.md to reflect everything we just discussed. Keep it
concise. Add an "Out of scope" and an "Open questions" section if we have
material for them.
```

**Output.** `project-scope.md`, refined.

**Done when.**

- [ ] The agent has no more first-order clarifying questions.
- [ ] "Out of scope" is written down, not just implied.
- [ ] Open questions are either resolved or explicitly parked.

## Phase 3: Define the MVP

**Goal.** Find the smallest version that still solves the core problem — and is
worth shipping. Everything else becomes "later."

**Inputs.** Refined `project-scope.md`.

**Work.** With the agent, sort the features into "MVP" and "later." Pressure-test
the MVP line: for each feature you want to include, ask whether the product
still solves the core problem without it. If yes, it's not MVP. Record the
result in [`templates/mvp.md`](templates/mvp.md).

**Prompt.**

```
Based on project-scope.md, help me define the MVP — the smallest version that
still solves the core problem and is worth shipping. For each feature, argue
whether it's truly MVP or can wait. Challenge me when I'm gold-plating. Then
draft mvp.md with the MVP scope, what's deferred, and the success criteria that
tell us the MVP worked.
```

**Output.** `mvp.md`.

**Done when.**

- [ ] The MVP feature list is shorter than your instinct wanted it to be.
- [ ] You've written down what success looks like for the MVP.
- [ ] Deferred features are recorded so they aren't lost.

## Phase 4: Choose the tech stack

**Goal.** Decide what you're building it with — and why — before any setup.

**Inputs.** `project-scope.md`, `mvp.md`.

**Work.** Ask the agent to propose a stack that fits the MVP, your constraints
(team skills, hosting, budget, timeline), and the non-functional needs (scale,
latency, offline, etc.). Make it justify each choice and name the trade-offs.
You pick. Record the decision and the reasoning in
[`templates/tech-stack.md`](templates/tech-stack.md), and log the significant
calls in [`templates/decisions.md`](templates/decisions.md).

**Prompt.**

```
Based on project-scope.md and mvp.md, propose a tech stack. My constraints are:
[skills, hosting, budget, timeline, anything else]. For each layer (language,
framework, data store, hosting, key libraries) give one primary recommendation
and one alternative, with the trade-offs. Flag anything that's hard to change
later. Don't pad the stack — fewer moving parts is better for an MVP.
```

**Output.** `tech-stack.md`; entries in `decisions.md`.

**Done when.**

- [ ] Every layer of the stack has a chosen option and a one-line rationale.
- [ ] Hard-to-reverse choices were identified and made deliberately.
- [ ] You could explain the stack to someone else without the agent's help.

## Phase 5: Create the implementation plan

**Goal.** Break the MVP into small, ordered, independently verifiable tasks,
grouped into phases. This plan becomes the spine of the build stage.

**Inputs.** `project-scope.md`, `mvp.md`, `tech-stack.md`.

**Work.** Ask the agent to draft the plan into
[`templates/implementation-plan.md`](templates/implementation-plan.md). Review
it hard: tasks should be small enough to review in a single diff, ordered so
each builds on working code before it, and sequenced so something runs
end-to-end as early as possible. Rework anything vague.

**Prompt.**

```
Create an implementation plan in implementation-plan.md. Break the MVP into
small tasks — each one reviewable in a single sitting — and group them into
phases. Order them so we have something running end-to-end as early as
possible, and so every task builds on already-working code. Mark dependencies
between tasks. Each task should have a clear "done when" check.
```

**Output.** `implementation-plan.md`.

**Done when.**

- [ ] No task is so big you can't picture its diff.
- [ ] The ordering produces a runnable thing early, not only at the end.
- [ ] Each task has a verifiable completion check.

---

# Stage 2 — Build

Now code exists. The discipline here is to keep the build loop tight and the
artifacts in sync.

## Phase 6: Set up the project

**Goal.** Create the project's initial structure _and_ the agent's working
context, so every later task starts from solid ground.

**Inputs.** `tech-stack.md`, `implementation-plan.md`.

**Work.** Have the agent scaffold the repo per the tech stack: directory
structure, dependency manifest, formatter/linter, test runner, a "hello world"
that actually runs, and a `.gitignore`. Then create
[`templates/AGENTS.md`](templates/AGENTS.md) at the repo root — this is the file
the agent reads first on every future task. It points at the other artifacts and
records the conventions and guardrails for this project. Make the first commit.

**Prompt.**

```
Scaffold the project per tech-stack.md: directory structure, dependency
manifest, linter/formatter, test runner, a minimal runnable entry point, and a
.gitignore. Keep it minimal — no features yet. Then create AGENTS.md at the repo
root: a short project overview, how to run and test the project, the coding
conventions we'll follow, guardrails (what you should never do without asking),
and a map of where each planning artifact lives.
```

**Output.** A runnable, committed project skeleton; `AGENTS.md`.

**Done when.**

- [ ] The skeleton runs and the test command passes (even with zero real tests).
- [ ] `AGENTS.md` exists and points to every planning artifact.
- [ ] It's all committed.

## Phase 7: Implement — the build loop

**Goal.** Turn the plan into working software, one task at a time, without
losing control of what the agent is doing.

**Inputs.** `implementation-plan.md`, `AGENTS.md`, and the rest of the artifacts.

**Work.** This is a loop. For each task in the implementation plan:

1. **Frame.** Point the agent at the task and the artifacts it needs. One task
   at a time — resist bundling.
2. **Build.** Let the agent implement it.
3. **Review.** Read the diff yourself. Check it against the task's "done when"
   and the project's conventions. Push back on anything you wouldn't have
   written.
4. **Verify.** Run it. Run the tests. (Detailed testing is phase 8, but never
   advance a task that doesn't run.)
5. **Record.** Check the task off in `implementation-plan.md`. If anything
   changed — a decision, a deviation from the plan — update the relevant
   artifact and log it in `decisions.md`.
6. **Commit.** One task, one focused commit.

Then repeat. If a task turns out bigger than expected, stop and split it in the
plan rather than letting one diff balloon.

**Prompt.** _(per task)_

```
Read AGENTS.md and implementation-plan.md. Implement task [X.Y]: [name]. Use
only the context in our artifacts — if something is unspecified, ask before
assuming. Keep the change scoped to this task. When you're done, tell me how to
verify it and what to review.
```

**Output.** Working, committed code, task by task; `implementation-plan.md` kept
current; `decisions.md` updated as you go.

**Done when.**

- [ ] Every MVP task in the plan is checked off.
- [ ] Every task was reviewed and committed individually.
- [ ] The artifacts still match what was actually built.

## Phase 8: Test & verify

**Goal.** Prove the MVP does what `mvp.md` says it does — and keep it provable
as it changes.

**Inputs.** Working code; `mvp.md`; `implementation-plan.md`.

**Work.** Draft [`templates/test-plan.md`](templates/test-plan.md) with the
agent: what to test, at what level (unit, integration, end-to-end), and which
flows are critical enough to never break. Have the agent write the tests,
prioritizing the MVP success criteria and the risky parts. Run them. Fix what
breaks. Decide what level of automated coverage is enough for an MVP — and
write that decision down rather than chasing 100%.

**Prompt.**

```
Based on mvp.md and the code we've built, draft test-plan.md: what we test, at
what level, and which user flows are critical. Then write tests for the MVP
success criteria and the riskiest areas first. Tell me what you chose not to
test and why.
```

**Output.** `test-plan.md`; an automated test suite; a green test run.

**Done when.**

- [ ] Every MVP success criterion from `mvp.md` has a test or a deliberate,
      documented reason it doesn't.
- [ ] The critical user flows are covered end-to-end.
- [ ] The full suite passes.

---

# Stage 3 — Ship

The product works on your machine. This stage makes it safe to put in front of
real users.

## Phase 9: Review & harden

**Goal.** Close the gap between "it works" and "it's ready" — security, edge
cases, error handling, and documentation.

**Inputs.** Working, tested code; all artifacts.

**Work.** Run a deliberate review pass with the agent across these angles:

- **Security** — secrets handling, input validation, authn/authz, dependency risks.
- **Edge cases** — empty states, large inputs, concurrent use, network failure.
- **Error handling** — does it fail loudly and recoverably, or silently and badly?
- **Docs** — a README that lets someone else run it; `AGENTS.md` still accurate.

Triage what the review finds: fix what blocks launch now, log the rest in
`decisions.md` or as deferred items.

**Prompt.**

```
Do a pre-launch review of the codebase against mvp.md. Go angle by angle:
security, edge cases, error handling, and documentation. For each finding, rate
it blocker / should-fix / nice-to-have, and explain the risk. Don't fix anything
yet — give me the list first so I can triage.
```

**Output.** A triaged findings list; fixes for blockers; an accurate README.

**Done when.**

- [ ] No known blocker-level issues remain.
- [ ] Secrets and config are handled properly, not hard-coded.
- [ ] A new person could clone, run, and understand the project from the README.

## Phase 10: Deploy

**Goal.** Get the product running somewhere real users can reach it — repeatably,
not as a one-off.

**Inputs.** A hardened, tested codebase; `tech-stack.md`.

**Work.** Draft [`templates/deployment.md`](templates/deployment.md) with the
agent: target environment, build and release steps, environment variables and
secrets, how to roll back, and how you'll know it's healthy. Automate the
release path (CI/CD or a documented script) so deploying again is boring. Do a
real deploy. Verify it against `deployment.md`'s health checks.

**Prompt.**

```
Based on tech-stack.md, draft deployment.md: target environment, step-by-step
build and release process, required environment variables and how secrets are
managed, the rollback procedure, and the health checks that confirm a good
deploy. Then help me automate the release path so future deploys are repeatable.
```

**Output.** `deployment.md`; an automated/documented release path; a live deploy.

**Done when.**

- [ ] The product is reachable by its intended users.
- [ ] Deploying again is a repeatable process, not improvisation.
- [ ] You know how to roll back and how to tell if it's healthy.

## Phase 11: Iterate

**Goal.** Turn what you learn from real usage into the next iteration — and keep
the artifacts honest.

**Inputs.** A live product; user feedback; the full artifact set.

**Work.** Collect feedback and observed behavior. With the agent, triage it into
bugs, improvements, and new features. Bugs re-enter the build loop directly.
Improvements and new features go back to **Phase 1**: update `project-scope.md`,
revisit the MVP/scope line, and plan the next iteration. The deferred list from
phase 3 gets revisited here too.

**Prompt.**

```
Here is the feedback and usage data from the live product: [paste]. Help me
triage it into bugs, improvements, and new features. For each, note the user
impact and rough effort. Then recommend what the next iteration should focus on,
and which artifacts need updating to reflect it.
```

**Output.** A triaged backlog; updated artifacts; a focus for the next loop.

**Done when.**

- [ ] Feedback is triaged, not sitting in a pile.
- [ ] The next iteration's focus is decided and scoped.
- [ ] `project-scope.md` and the deferred list reflect current reality.

Then loop back to Stage 1 for the next iteration.

---

# Cross-cutting principles

These hold in every phase:

- **Context before code.** The agent reads the artifacts before it builds. If
  the artifacts are wrong, the build is wrong.
- **Small steps.** One task, one diff, one commit. Big diffs hide mistakes.
- **You decide, the agent drafts.** The agent proposes options and trade-offs;
  the decision and its rationale are yours, and they get written down.
- **Review every diff.** The agent is fast, not infallible. Reading its output
  is not optional.
- **Keep artifacts in sync.** The moment reality diverges from a document, fix
  the document. A stale artifact actively misleads the agent.
- **Log the why.** `decisions.md` captures decisions and reasoning across every
  phase. Future-you and the agent will both need it.
- **Make the agent disagree with you.** Its most valuable move is finding the
  flaw you can't see — ask for that explicitly.
