# CLAUDE.md

Guidance for Claude Code (or any AI assistant) working in this repository.

## Project

Capstone project for the FlyRank AI Internship (AI/Tech track). Goal: ship one
real, portfolio-worthy AI-assisted project over 10 weeks.

## Stack (update as decisions are made)

- **Language/Runtime:** TBD
- **Package manager:** npm
- **Framework:** TBD
- **AI tooling:** Claude Code as the primary pair-programmer

## Conventions

- **Commits:** Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)
  (e.g. `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`). One logical change per commit.
- **Branching:** Work on `main` for now; introduce feature branches once the
  project has more than one contributor or concurrent workstreams.
- **Style:** Prefer small, readable functions. Add comments only where intent
  isn't obvious from the code itself.
- **Docs:** Keep README.md's "Getting Started" section accurate as the setup
  process evolves.

## What the AI assistant should do

- Ask before making destructive changes (deleting files, force-pushing, rewriting history).
- Explain non-obvious technical decisions in commit messages or PR descriptions.
- Flag when a requested change conflicts with something in this file.
