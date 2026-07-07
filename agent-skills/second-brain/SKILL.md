---
name: second-brain
version: "1.0"
description: Use when the user wants to build, extend, or maintain a "second brain" — an AI operating system for a business that lives in one folder of markdown files. Triggers on "second brain", "business brain", "AI operating system", "AI OS", "build a brain for my business/agency", setting up CLAUDE.md + context/directives/skills structure, adding SOPs/directives, skill bibles, client intelligence folders, brain notes, relinking a vault, or running a contradiction audit.
---

# Second brain

Build and operate an AI operating system for a business that fits in one folder. The folder is the asset: plain markdown files under git that any capable model can read, understand, and do real work inside — content, research, client deliverables, sales prep. Models get replaced; the folder survives every migration.

The architecture is DOE — three layers with a hard boundary:

```text
DIRECTIVES     (markdown files)  -> What to do: step-by-step SOPs in plain English
ORCHESTRATION  (the AI agent)    -> The decision maker: reads context, picks the SOP, checks quality
EXECUTION      (scripts)         -> How it gets done: deterministic code for API calls and file work
```

Why the split matters: AI models are probabilistic. A model that is 90 percent accurate per step completes a five-step task correctly only 59 percent of the time. Everything that can be deterministic (API calls, formatting, file operations, data processing) goes into scripts that work the same way every time. The AI does only what it is uniquely good at: reading context, making judgment calls, checking quality.

Two more principles govern everything below:

- **Plain text is forever.** Every artifact is a markdown file. No proprietary database, no vendor lock-in, no app that can shut down.
- **The system improves itself.** Every failure becomes an edit to a script, SOP, or skill file — the self-annealing protocol.

## Pick the mode

Look at the target folder before doing anything:

- **No brain exists** (no `CLAUDE.md` with the DOE structure at the target location) → **Build mode**. Ask the user where the brain should live if it is not obvious; default to a new folder, not inside an existing codebase.
- **Brain exists and the user wants something added** (a directive, a skill file, a client folder, notes, mining `sources/`) → **Extend mode**.
- **Brain exists and the user wants housekeeping** (relink the vault, contradiction audit, tighten quality gates) → **Maintain mode**.

Announce the mode and the target folder before writing anything.

## Build mode

Follow the phases in order — they compound. Load [references/build-order.md](references/build-order.md) for the full phase-by-phase detail and the seven-day schedule, and [references/templates.md](references/templates.md) when writing any file. Do not read both up front; load each when you need it.

Progress:

- [ ] Phase 1 — Foundation: folder tree, `git init`, `.gitignore` with `.env`, `.tmp/`, `.obsidian/`.
- [ ] Phase 2 — Context: interview the user, then draft the four context files.
- [ ] Phase 3 — `CLAUDE.md`: the operating manual, from the template.
- [ ] Phase 4 — Work engine: the user's single most repeated workflow as a directive plus script; run it end to end once.
- [ ] Phase 5 — Skills: extract the first skill files from the user's best source material.
- [ ] Phase 6 — Clients: folders for the top five clients.
- [ ] Phase 7 — Brain: `brain/` structure, `INDEX.md`, first three notes.
- [ ] Phase 8 — Self-improvement: self-annealing rule in `CLAUDE.md`, quality gates on every directive.
- [ ] Commit after every phase with a message naming the phase.

The folder every brain starts from:

```text
your-business-brain/
├── CLAUDE.md          - The operating manual the AI reads first, every session
├── context/           - Who you are: identity, voice, values, services
├── directives/        - SOPs: what to do, step by step
├── execution/         - Scripts: the deterministic work
├── skills/            - Deep domain expertise files
├── clients/           - One folder per client
├── brain/             - Linked notes: decisions, history, lessons
├── sources/           - Raw exports the brain is built from
└── .tmp/              - Scratch space for drafts (never committed)
```

Interview before drafting. The context files (Phase 2) encode who the business is; you cannot invent that. Ask for a raw brain-dump — a 20-minute voice-note transcript beats a questionnaire — or ask directly: what do you sell, to whom, how are you positioned, what results can you prove, how do you sound, what words do you ban, how do you operate. Draft from their answers, then have them correct the drafts. The corrections are where the real value gets encoded. Imperfect drafts today beat perfect drafts never.

Scope discipline: three SOPs that run clean beat twenty that half-work. For most businesses the first three are some version of content production, lead or client research, and a client deliverable. Do the task once WITH the user narrating their standards, then write the directive from that session.

## Extend mode

Load the brain's own `CLAUDE.md` first and follow its context loading priority — the brain's rules outrank this skill's defaults. Then, per request type (templates for each are in [references/templates.md](references/templates.md)):

- **New directive**: one file per workflow in `directives/`, named by what it does (`weekly_content_plan.md`, `client_onboarding.md`). Use the directive template; every directive ends with quality gates. If a step should produce the same output every time given the same input, it belongs in an execution script; if it needs judgment, taste, or context, it stays with the AI.
- **New execution script**: lives in `execution/`, called by a directive. Document usage at the top of the file. Scripts degrade gracefully when optional API keys are missing. Keys come from `.env`, never hardcoded, never committed.
- **New skill file**: `skills/SKILL_BIBLE_<topic>.md`. Extract from the best source material in the niche — a masterclass transcript, a course, the user's own best-performing work. Cite the source and date at the top. Extract specifics, not summaries: numbers, templates, exact phrasings, common mistakes, a quality checklist. If it contains no numbers, templates, or exact phrasings, it is too shallow to change output quality — go back to the source.
- **New client**: `clients/<name>/` with `profile.md`, `rules.md`, `preferences.md`, `history.md`. Draft from call transcripts or email threads when available. After every meaningful client interaction, append a dated entry to `history.md`: what happened, what was decided, what to remember.
- **New brain notes**: one fact per note, dated in the filename (`2026-06-13_productize-crm-wedge.md`), in the right category (`decisions/`, `notes/`, `references/`, `metrics/`, `ideas/`). Decisions carry the reasoning: "We decided X because Y." Add one line per note to `brain/INDEX.md`. Link related notes with `[[wikilinks]]` whose text matches the target filename exactly.
- **Mining sources/**: the user drops raw exports (Slack history, call transcripts, email threads, old proposals) into `sources/`; you mine them into dated brain notes. Never write history from memory when an export exists.

## Maintain mode

- **Relink pass**: run once the brain reaches about 20 notes, and again after every bulk import into `sources/`. Use the relink prompt in [references/maintenance.md](references/maintenance.md) verbatim — its rules (real relationships only, 2–5 links per note, add links only, report orphans) are what keep the graph useful.
- **Contradiction audit**: every few weeks, read the brain for notes that disagree (old pricing vs new pricing, stale rosters, reversed decisions), flag each pair, and let the user rule on each one. The brain stays trustworthy because it gets audited like a real system.
- **Self-annealing**: after every task inside a brain — if a script broke, fix the script and update the directive; if a better approach appeared, update the skill file; if a new edge case showed up, add it to the SOP. Nothing breaks the same way twice.

## Standing rules

These apply in every mode and get written into every brain's `CLAUDE.md`:

- **Never fabricate numbers, results, or client names.** Placeholders plus a question beat confident fiction every time.
- **Date everything, in the filename.** An undated fact becomes a landmine the first time the business changes its mind.
- **Specifics, not summaries.** A note or skill file with no numbers, names, dates, or exact phrasings adds nothing the AI could not already do.
- **git is the undo button.** The AI edits the business's memory; every change must be tracked and reversible. Commit in meaningful units.
- **Secrets never get committed.** `.env` and `.tmp/` go into `.gitignore` in Phase 1, before any key exists.
- **Operator, not archive.** The test of the system is whether the AI can pick up a task cold, load the right files, and produce work that passes the quality bar. Store less, operationalize more.

## Common mistakes

- Building the perfect structure before putting anything in it. Ten messy but real notes beat a beautiful empty folder tree.
- Reading every reference file up front. Load `build-order.md` when building, `templates.md` when writing files, `maintenance.md` when relinking or auditing.
- Writing context files for the user instead of from the user. Interview first; their corrections are the product.
- Putting judgment in scripts or determinism in the AI. Same input, same output → script. Taste, context, quality → AI.
- Adding integrations early. Document delivery, notifications, scheduled runs, and dashboards come only after the core system works and a real bottleneck demands them — the system runs for weeks on nothing but files and the AI.
- Skipping the end-to-end run. A directive that has never executed once is a guess, not an SOP.
