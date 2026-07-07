# Second brain file templates

Copy these when creating files inside a brain. Everything in `{curly braces}` is a placeholder — fill it from the user's answers or leave it as a placeholder plus a question. Never fill a placeholder with an invented fact.

## .gitignore (Phase 1)

```gitignore
.env
.env.*
.tmp/
.obsidian/
__pycache__/
node_modules/
```

`.obsidian/` is UI state from reading the vault in Obsidian, not business memory.

## CLAUDE.md (Phase 3)

Start small — architecture, directory map, loading priority, and three standing rules. It grows with the system.

```markdown
# {Business name} — Operating Manual

You are the orchestration layer of this business's second brain. Read this file
first, every session, before any task.

## Architecture (DOE)

- DIRECTIVES (`directives/`)  — What to do: one SOP per workflow, in plain English.
- ORCHESTRATION (you)         — Parse the request, find the matching SOP, load
  context in priority order, execute, check quality gates, deliver.
- EXECUTION (`execution/`)    — How it gets done: deterministic scripts for API
  calls, formatting, file operations. If a step should produce the same output
  every time given the same input, it belongs in a script, not in you.

Respect the layer boundaries. Do not improvise a workflow that has a directive.
Do not hand-do work that has a script.

## Directory map

- `context/`    — Who we are: identity, voice, values. Loaded before any work.
- `directives/` — SOPs. One file per workflow, named by what it does.
- `execution/`  — Scripts called by directives. Usage documented at top of file.
- `skills/`     — Deep domain expertise: `SKILL_BIBLE_<topic>.md`.
- `clients/`    — One folder per client: profile, rules, preferences, history.
- `brain/`      — Dated, linked notes: decisions, notes, references, metrics, ideas.
- `sources/`    — Raw exports (transcripts, threads, exports) to be mined into brain notes.
- `.tmp/`       — Scratch space for drafts. Never committed.

## Context loading priority

1. `context/agency.md`        -> Always first (who we are)
2. `context/core_values.md`   -> Always (how we operate; check work against it)
3. `context/brand_voice.md`   -> For any content creation
4. `clients/{name}/*.md`      -> For client-specific work
5. `skills/` relevant files   -> Domain expertise for the task
6. `directives/` the SOP      -> The workflow itself

## Orchestration flow

Parse the request -> find the matching directive -> load context per the
priority above -> execute the steps -> run the directive's quality gates ->
deliver. If no directive matches, say so and offer to create one — do not
improvise a workflow silently.

## Standing rules

- Never fabricate numbers, results, or client names. Use placeholders and ask.
- Date everything, in the filename.
- Client work always loads that client's full folder first; never use a word
  from that client's ban list; never repeat a mistake recorded in their history.
- Secrets live in `.env` only. Never commit keys.
- Drafts go in `.tmp/`, finished work goes in the right folder, and every
  meaningful change gets committed to git.

## Self-annealing protocol

After every task:
- If a script errored, fix the script and update the directive that calls it.
- If a better approach was found, update the relevant skill file.
- If a new edge case appeared, add it to the SOP's edge cases section.
Nothing breaks the same way twice.
```

## Context files (Phase 2)

Four files, written like an onboarding doc for a sharp new hire. Draft them from the user's transcript or interview answers, then have the user correct them.

### context/agency.md (or company.md)

```markdown
# {Business name}

## What we do
{One paragraph: what you sell, who you serve, how you are positioned.}

## Offer(s)
- {Offer 1: what it is, who it is for, price point or range}

## Proof
- {Real, verifiable results only. If none provided, leave a placeholder and ask.}

## Current state
- Team: {size, roles}
- Stage: {e.g. solo / first hires / scaling}
- Priorities right now: {top 1–3}
```

### context/brand_voice.md

Be specific enough that two different models would produce recognizably similar output.

```markdown
# Brand voice

## Tone
{e.g. direct, warm, no hype. Formality level.}

## Words and phrasings we use
- {exact phrasings}

## Banned words and patterns
- {e.g. "game-changer", "unleash", em-dash chains, exclamation marks}

## Formatting rules
- {e.g. short paragraphs, no emoji in client docs, sentence-case headings}

## One good example
> {A real paragraph in the right voice.}

## One bad example
> {A paragraph in the wrong voice, with a note on what is wrong.}
```

### context/core_values.md

Not poster values — operating rules, each with a test the AI can check its own work against.

```markdown
# Core values (operating rules)

## {Value 1, phrased as a rule}
Test: {How to check a piece of work against this rule.}

## {Value 2}
Test: {...}
```

### context/owner.md

```markdown
# {Owner name}

## Background
{Career, expertise, credentials that matter.}

## Story
{The founding story and the personal facts that show up in content and sales conversations.}

## Positions
{Opinions and stances the owner is known for — usable in content.}
```

## Directive template (Phase 4 and Extend mode)

One file per workflow in `directives/`, named by what it does: `weekly_content_plan.md`, `client_onboarding.md`, `discovery_call_prep.md`.

```markdown
# {Workflow Name}

## What this workflow is
One paragraph: what it produces and when to use it.

## Prerequisites
Required API keys (all optional keys degrade gracefully), required context
files, required skill files.

## Inputs
| Field | Required | Description |
|-------|----------|-------------|
| {field} | yes/no | {what it is} |

## Process
Step 1: {Name} — {what happens; which script or judgment call}
Step 2: {Name} — ...
Step 3: {Name} — ...

## Quality gates
- [ ] {Check 1 — e.g. voice matches context/brand_voice.md}
- [ ] {Check 2 — e.g. no fabricated numbers; every figure traces to a source}

## Edge cases
- {Edge case} -> {what to do}
```

## Execution script conventions (Phase 4 and Extend mode)

Scripts live in `execution/`, are called by directives, and start with a docstring covering: what it does, what it reads and writes, which keys it needs (and how it degrades without them), and usage examples.

```python
#!/usr/bin/env python3
"""
{Script name} — {one line: what it does}.

Reads {input}, writes {output path convention}.

API keys (from .env, all optional — the pipeline degrades gracefully):
  {KEY_NAME}   # {what it is needed for; what happens if missing}

Usage:
  python execution/{script}.py
  python execution/{script}.py --date 2026-07-05
"""
```

Rule of thumb for what goes in a script: same input, same output → script. Judgment, taste, reading context → the AI.

## Skill file template (Phase 5 and Extend mode)

`skills/SKILL_BIBLE_<topic>.md`. Built by extracting the best source material in the niche (masterclass transcript, course, the user's own best work) into structure. One hour of video becomes a permanent, loadable skill.

```markdown
# SKILL BIBLE: {Topic}

Source: {creator, title, format}
Date: {of the source material — so conflicting advice can be arbitrated later}

## Core principles
- {Principle with the reasoning, not just the label.}

## Frameworks
### {Framework name}
{The exact steps, verbatim where it matters.}

## Specific examples
- {Concrete example with real numbers: "a specific number in the first line can 2x views".}

## Exact phrasings / templates
- {Copy-paste-able lines.}

## Common mistakes
- {Mistake} -> {what to do instead}

## Quality checklist
- [ ] {Check derived from the source material}
```

Honesty bar: if the file contains no numbers, no templates, and no exact phrasings, it is too shallow to change output quality. "Make good hooks" is worthless; "sentence two must confirm the hook within 5 seconds" is an asset.

## Client folder (Phase 6 and Extend mode)

```text
clients/{client_name}/
├── profile.md       - Who they are, their business, goals, stack
├── rules.md         - Hard rules (compliance, approvals, bans)
├── preferences.md   - Style, tone, formatting, pet peeves
└── history.md       - Every project, outcome, and lesson, dated
```

`history.md` is the file people skip and the one that matters most — it is the institutional memory that normally lives in one employee's head. Entry format:

```markdown
## {YYYY-MM-DD} — {event}
- What happened: {...}
- What was decided: {...}
- What to remember: {...}
```

## Brain structure (Phase 7 and Extend mode)

```text
brain/
├── INDEX.md         - One line per note, the master map. The AI reads this first.
├── decisions/       - Every meaningful business decision, with the reasoning
├── notes/           - Narrative memory: initiatives, builds, events, lessons
├── references/      - Durable facts: playbooks, rosters, case studies, pipelines
├── metrics/         - Dated snapshots of the numbers
└── ideas/           - Sparks worth keeping that are not commitments yet
```

Conventions that make it a brain instead of a file cabinet:

1. One fact per note, dated in the filename: `2026-06-13_productize-crm-wedge.md`.
2. Notes link to each other with `[[wikilinks]]`; link text matches the target filename exactly so it resolves in Obsidian.
3. `INDEX.md` holds one line per note; the AI reads the index first, then opens only what is relevant.
4. Decisions carry the reasoning: "We decided X because Y" — the highest-value sentence in the system. It stops re-litigating settled questions and repeating reversed ones.

Note template:

```markdown
# {Title}
Date: {YYYY-MM-DD}
Category: {decision | note | reference | metric | idea}

{The fact, decision + reasoning, or lesson. Specifics: numbers, names, dates.}

Related: [[{other-note-filename}]], [[{other-note-filename}]]
```

First three notes for any new brain: one recent decision with the reasoning, one reference fact the user keeps re-explaining, one lesson from the last month.

Recommend Obsidian to the user for reading the brain: point it at the brain folder as a vault — wikilinks become clickable, every note gets a backlinks panel, and the graph view shows which notes cluster and which float orphaned. The AI writes the notes and maintains the links; Obsidian is where the human reads them.
