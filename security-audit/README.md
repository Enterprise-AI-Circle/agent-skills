# Security Audit Skill

A skill for AI coding agents (OpenClaw, Claude Code, Cursor, and compatible tools) that audits a codebase for typical vibe-coding vulnerabilities, leaked secrets, dependency CVEs, and mismatches between privacy/security promises and what the code actually does.

Designed to feel like a careful engineer reviewed the repo — not like a scanner dumped a wall of warnings.

## What it does

- **Stack detection.** Identifies the language and framework (Node, Python, Go, Rust, Ruby, PHP, …) from manifest files and adapts the audit accordingly.
- **Code and config audit.** Looks for the classic vibe-coding issues: committed secrets, weak password handling, SQL injection, XSS sinks, missing admin auth, IDOR, broken JWT verification, cookie flags, security headers, CSRF, SSRF, path traversal, default admin credentials, and more.
- **Dependency scan.** Calls the right scanner for the stack (`npm/pnpm audit`, `bundler-audit`, `pip-audit`, `govulncheck`, `cargo-audit`, `composer audit`) and ranks findings by severity. Only runs scanners that are already installed — never mutates the environment.
- **Promise audit.** Compares the privacy and security claims in legal pages, marketing copy, and product UI against the actual code. If your website says "end-to-end encrypted" but the code only does TLS, this finds it.
- **Calibrated reporting.** Every finding comes with a concrete `file:line` reference, an explanation of why it matters, a fix suggestion, and an honest note about what the fix might break.

## What it does not do

- It is not a penetration test.
- It is not a SOC 2 audit.
- It does not replace a professional security engineer for high-stakes systems.

It catches about 80% of the typical problems before they reach production — which is usually the gap that matters.

## Use cases

- **Pre-deploy review** of your own projects.
- **Pre-clone audit** of third-party repositories before extending them with an AI agent.
- **Quarterly audits** of active products.
- **PR sanity check** for AI-generated code, alongside human review.

## Installation

### OpenClaw

Drop this folder into your `skills/` directory:

```bash
cp -r security-audit ~/.openclaw/workspace/skills/
```

OpenClaw discovers the skill automatically. Trigger it by asking your agent to "audit", "review the security of this codebase", "check if the code matches our privacy claims", or any similar phrasing — the skill's frontmatter description handles trigger matching.

### Claude Code

Reference `security-audit/SKILL.md` from your `CLAUDE.md`:

```markdown
# Project instructions

When the user asks for a security audit or security review, load the instructions from `path/to/security-audit/SKILL.md` and follow them.
```

### Cursor

Open `security-audit/SKILL.md`, copy its content, and paste it into a Custom Instructions block (or attach the file as a project context file).

## How to run an audit

1. Open your project in your AI coding agent.
2. Ask: "Please run a security audit on this codebase."
3. The skill announces the scope and detected stack first, so you can redirect it before any work happens.
4. It produces a report grouped by severity, with file references, explanations, and proposed fixes.
5. It asks you what to fix — it does not change code on its own during the audit.

## Files

- [`SKILL.md`](./SKILL.md) — The skill definition that agents load.
- [`references/security-checklist.md`](./references/security-checklist.md) — Detection patterns and examples used during the audit.
- [`references/report-template.md`](./references/report-template.md) — The output format used for the final report.

## Context

Published as part of the [Enterprise AI Circle](https://www.xalt.de/) goodie drops, alongside the German-language article "Vibe Coding, aber sicher" on [xalt.de](https://www.xalt.de/).

## License

[MIT](../LICENSE)
