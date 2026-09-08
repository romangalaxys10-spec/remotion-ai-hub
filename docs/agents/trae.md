# Trae × Remotion

Trae works with the same skills/rules approach. Since skill-directory support varies by Trae version, the reliable path is the **rules file**: paste this hub's [agent rules](../../tools/agent-rules/remotion-rules.md) into Trae's project rules (or `.trae/rules` equivalent), which encodes the critical Remotion constraints (deterministic frames, sequence timing, QA loop) for every session.

## Setup

```bash
npx create-video --yes --blank my-video && cd my-video && npm install
npm run dev     # terminal 1
trae            # terminal 2 (or Trae IDE opened at the project)
```

Then in Trae, add to your rules/instructions:

```text
Follow https://github.com/romangalaxys10-spec/remotion-ai-hub/blob/main/tools/agent-rules/remotion-rules.md
for all Remotion work in this project.
```

## Tips

- If your Trae build supports `npx skills add remotion-dev/skills`, prefer that — official skills stay updated.
- Trae's builder mode is good for scaffolding scenes; switch to chat mode for timing-sensitive fixes.
- Use the same QA loop as other agents: `node tools/remotion-qa.mjs out.mp4` after every render, paste findings back.

## References

- Patterns: [docs/patterns.md](../patterns.md)
- Gotchas: [docs/gotchas.md](../gotchas.md)
