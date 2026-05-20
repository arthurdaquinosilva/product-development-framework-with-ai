# Product Development Framework With AI

<!-- TOC -->

- [Why this exists](#why-this-exists)
- [The lifecycle](#the-lifecycle)
- [How to use it](#how-to-use-it)
- [Guided mode](#guided-mode)
- [Repository layout](#repository-layout)
- [Principles](#principles)
- [License](#license)
<!-- /TOC -->

A repeatable, agent-agnostic framework for taking a product from a rough idea
all the way to a deployed release — with an AI coding agent as your collaborator
at every step.

This is not a tool or a library. It is a **process**, plus a set of **artifact
templates** and **prompts**. Use it with any capable coding agent (Claude Code,
Cursor, or similar).

## Why this exists

AI agents are excellent at producing code, but they are only as good as the
context they are given. Jumping straight to _"build me an app"_ produces
throwaway work: the agent guesses at scope, invents requirements, and picks a
stack you never agreed to.

This framework front-loads the thinking — scope, requirements, MVP, stack, plan
— into durable documents the agent reads _before_ it writes a line of code. Then
it keeps those documents in sync through build, test, and deploy, so the agent
never loses the plot.

## The lifecycle

Three stages, eleven phases. Each phase has a goal, a prompt, and an artifact.

### Plan

1. **Define the scope** — what are we building and why?
2. **Clarify the requirements** — what exactly should it do?
3. **Define the MVP** — what is the smallest version that still solves the problem?
4. **Choose the tech stack** — what do we build it with?
5. **Create the implementation plan** — what gets built first, second, third?

### Build

6. **Set up the project** — scaffold the repo and the agent's working context.
7. **Implement (the build loop)** — one task at a time, reviewed and committed.
8. **Test & verify** — prove each piece works.

### Ship

9. **Review & harden** — security, edge cases, error handling, docs.
10. **Deploy** — get it running where users can reach it.
11. **Iterate** — gather feedback and feed it back into the plan.

Read [FRAMEWORK.md](FRAMEWORK.md) for the full phase-by-phase walkthrough.

## How to use it

1. Clone this repository.
2. Install the `pdev-init` command (one time, from the repo root):
   ```
   bash install.sh
   ```
3. From inside any project directory, scaffold the framework files:
   ```
   pdev-init
   ```
   (No install? Run `bash setup.sh` from the repo root instead — it will ask
   for the target project directory.)
4. Open [FRAMEWORK.md](FRAMEWORK.md) and work through the phases in order.
5. At each phase: fill in what you already know, then hand the artifact to your
   agent with the phase's prompt to refine it together.
6. Commit the artifacts. They are **living documents** — the agent reads them for
   context on every task and updates them as the product evolves.

See [EXAMPLE.md](EXAMPLE.md) for a complete end-to-end walkthrough.

## Guided mode

Prefer to be walked through the framework instead of reading it yourself?
Two options:

- **Claude Code (automatic):** copy `templates/CLAUDE.md` to your project root.
  Claude Code reads it automatically and acts as your framework guide from the
  first session.
- **Any other agent:** open [GUIDE.md](GUIDE.md), paste its contents into your
  AI session, and the agent will guide you phase by phase.

## Repository layout

```
README.md                      you are here
FRAMEWORK.md                   the methodology, phase by phase
EXAMPLE.md                     a complete worked example
GUIDE.md                       paste this into any AI to start guided mode
templates/
  project-scope.md             phases 1–2 output
  mvp.md                       phase 3 output
  tech-stack.md                phase 4 output
  implementation-plan.md       phase 5 output, updated through build
  AGENTS.md                    phase 6 output — the agent's working context
  CLAUDE.md                    phase 6 output — Claude Code native version
  test-plan.md                 phase 8 output
  deployment.md                phase 10 output
  decisions.md                 running log, updated across every phase
LICENSE
```

## Principles

- **Context before code.** The agent reads the artifacts before it builds.
- **Small steps.** One task at a time, each one reviewable in a single diff.
- **Living documents.** Artifacts are updated as reality changes, not written once.
- **You decide, the agent drafts.** The agent proposes; you own every decision.
- **Review every diff.** The agent is fast, not infallible.

## License

MIT — see [LICENSE](../LICENSE).
