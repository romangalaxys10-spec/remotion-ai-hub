# OpenCode × Remotion

OpenCode is one of the four agents Remotion officially documents, and Remotion's docs content-negotiation works out of the box (requesting `text/markdown` returns markdown).

## Setup

```bash
npx create-video --yes --blank my-video && cd my-video && npm install
npx skills add remotion-dev/skills
npm run dev     # terminal 1
opencode        # terminal 2
```

## Tips

- OpenCode reads Remotion docs natively — paste doc URLs in prompts.
- Load this hub's rules file once per project: add [`tools/agent-rules/remotion-rules.md`](../../tools/agent-rules/remotion-rules.md) to your OpenCode rules/instructions file (e.g. `AGENTS.md`).
- OpenCode's terminal-first flow suits the render → QA loop: run `node tools/remotion-qa.mjs out.mp4` after each render and feed findings back.
- GLM models work via OpenCode's provider configuration if you prefer GLM over Claude here — the prompting patterns in [zcode-glm.md](zcode-glm.md) apply unchanged.

## References

- Official: [remotion.dev/docs/ai/coding-agents](https://www.remotion.dev/docs/ai/coding-agents)
- Patterns: [docs/patterns.md](../patterns.md)
