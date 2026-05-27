# Enterprise AI Circle — Agent Skills

Open-source skills for AI coding agents, published by the [Enterprise AI Circle](https://www.xalt.de/) and curated by [XALT Business Consulting](https://www.xalt.de/).

These skills are designed for leaders and engineering teams who use AI coding agents (OpenClaw, Claude Code, Cursor, and compatible tools) in production environments and want practical safeguards without slowing the team down.

## Available Skills

### [`security-audit/`](./security-audit)

Audits a codebase for typical vibe-coding vulnerabilities, leaked secrets, dependency CVEs, and mismatches between the privacy/security promises a project makes and what its code actually does.

Works on your own repositories and on third-party code you cloned to extend with an AI agent.

**Supported stacks:** Node/TypeScript, Python, Go, Rust, Ruby, PHP (auto-detected).

## How to use these skills

Each skill folder contains a `SKILL.md` file that any compatible AI coding agent can load directly.

- **OpenClaw:** Drop the skill folder into your `skills/` directory. The skill is auto-discovered.
- **Claude Code:** Reference the `SKILL.md` from a `CLAUDE.md` instruction file, or load it directly via the skills loader.
- **Cursor:** Paste the `SKILL.md` content into a Custom Instructions block, or attach it as a project file.

Skill-specific setup notes are in each skill's own `README.md`.

## Context

These skills are released alongside the [Enterprise AI Circle](https://www.xalt.de/) goodie drops — practical materials for German-speaking enterprise leaders adopting AI in their organizations. The first goodie drop, "Vibe Coding for Leaders," is published on [xalt.de](https://www.xalt.de/).

## Contributing

Issues and pull requests welcome. Please open an issue first if you want to propose a new skill so we can discuss scope and direction.

## License

[MIT](./LICENSE) — use these skills in commercial and private projects without restrictions.
