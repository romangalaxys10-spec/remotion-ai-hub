# Contributing

The bar for PRs: **does this help an AI agent make a better video?**

## What we accept

- New prompts (with a real before/after story)
- Agent guides for combos not yet listed (agent + model + OS)
- Gotchas (symptom → cause → fix, from a real failure)
- Tool improvements (QA checks, scaffolders)
- Template upgrades

## How

1. Fork, branch (`feat/...` / `docs/...`)
2. Keep docs in the existing tone: terse, practical, no hype
3. Prompts must be copy-pasteable and tested with at least one agent
4. Tool changes must not add heavy dependencies

## The QA rule

If your change affects rendering behavior, run the QA tool on a sample render and include the output in the PR description.
