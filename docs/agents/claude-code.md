# Claude Code × Remotion

Claude Code has first-class Remotion support: Remotion's docs are AI-ready (any doc URL + `.md` returns markdown, e.g. `remotion.dev/docs/player.md`), and Claude Code fetches them automatically when you paste doc links into prompts.

## Setup

```bash
npx create-video --yes --blank my-video && cd my-video && npm install
npx skills add remotion-dev/skills   # installs into .claude/skills/
npm run dev                          # terminal 1
claude                               # terminal 2
```

## Tips

- Paste official doc links directly in prompts — Claude reads the markdown automatically (`https://www.remotion.dev/docs/transactionsscope.md`).
- The official skills teach project structure, `<Sequence>` timing and rendering; keep them updated with `npx skills add remotion-dev/skills` again after Remotion upgrades.
- Use plan mode for multi-scene videos: approve the scene breakdown before code is written.
- Reuse this hub's QA loop: copy `tools/remotion-qa.mjs` into the project and instruct: *"After every render, run the QA script and fix all findings."*

## References

- Official: [remotion.dev/docs/ai/coding-agents](https://www.remotion.dev/docs/ai/coding-agents)
- Official skills: [remotion.dev/docs/ai/skills](https://www.remotion.dev/docs/ai/skills)
- Community skill: [haidrrrry/claude-remotion-skill](https://github.com/haidrrrry/claude-remotion-skill)
- Shared patterns: [docs/patterns.md](../patterns.md)
