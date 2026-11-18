# Test Plan

<!--
  Written in Phase 6 (/pdev-plan) together with the implementation plan —
  BEFORE any code. It defines how the agent proves its work is done.
  Extended in Phase 9 (/pdev-harden) with end-to-end coverage.
  See FRAMEWORK.md → Phase 6 & 9.
-->

## Strategy

<!-- How much testing is enough for this MVP, and why? Be explicit. "Chase
     100% coverage" is not a strategy; "every success criterion and every
     risky area has an automated check" is. -->

## Gates

<!-- The commands every change must pass. These go into AGENTS.md's
     "Definition of done" and into CI in Phase 7. -->

| Gate | Command |
|------|---------|
| Tests | |
| Lint / format | |
| Type check | |

## MVP success criteria → checks

<!-- Map each success criterion from mvp.md to the task acceptance check(s)
     that prove it. A criterion with no check is a gap — fill it, or mark it
     manual and say how it will be checked. -->

| Success criterion (from mvp.md) | Proven by (task / test) | Automated? |
|---------------------------------|-------------------------|------------|
| | | |

## Critical user flows

<!-- The flows that must never break. These get end-to-end tests, at the
     latest in Phase 9. -->

-

## Coverage by level

| Level | What it covers here | Priority |
|-------|---------------------|----------|
| Unit | <!-- logic, edge cases --> | |
| Integration | <!-- components working together --> | |
| End-to-end | <!-- critical flows above --> | |

## Deliberately not tested

<!-- What you chose to leave untested, and the reasoning. Honesty here beats a
     misleading coverage number. -->

-
