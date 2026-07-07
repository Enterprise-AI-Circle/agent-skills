# Build order — phases and the seven-day schedule

Do not build alphabetically. Build in the order that compounds. Each phase below has what to create, why it exists, and its action step. All file templates are in [templates.md](templates.md).

## Phase 1: The foundation

Create the brain folder with its empty subfolders (`context/`, `directives/`, `execution/`, `skills/`, `clients/`, `brain/`, `sources/`, `.tmp/`), then two non-negotiable setup steps:

1. **Initialize git.** You are about to let an AI edit the business's memory; git is the undo button. Every change tracked and reversible.
2. **Create `.gitignore` before any key exists**, containing `.env`, `.tmp/`, and `.obsidian/`. Keys never get committed. Create an empty `.env` for the user to fill later.

Action step: folder, subfolders, `git init`, `.gitignore`, first commit.

## Phase 2: Teach it who you are (the context layer)

`context/` is loaded before any work happens. It is the difference between generic AI output and output that sounds like the user and serves their strategy. Four files first: `agency.md` (or `company.md`), `brand_voice.md`, `core_values.md`, `owner.md`.

The fastest way to write these is not to write them: have the user record themselves talking for 20 minutes about their business, transcribe it, and draft the four files from the transcript. Then the user corrects what you got wrong — **the corrections are where the real value gets encoded.**

Action step: interview or transcript → draft the four files → user corrects. Imperfect drafts today beat perfect drafts never; the system will refine them.

## Phase 3: Write the operating manual (CLAUDE.md)

`CLAUDE.md` sits at the root and is read automatically at the start of every session — the constitution of the system. It contains: the DOE architecture explanation, a directory map, the context loading priority, the orchestration flow, standing rules, and the self-annealing protocol.

Action step: write it from the template. Start small — architecture, directory map, loading priority, three standing rules. It grows with the system.

## Phase 4: The work engine (directives and execution)

Where the system starts doing work instead of just knowing things. A **directive** is an SOP in markdown: what the workflow is, what it needs, the steps in order, and the quality gates the output must pass. One file per workflow, named by what it does. An **execution script** codes any step that should be deterministic: pulling from an API, formatting a document, sending a notification, processing a file. The user does not need to know how to code — they describe it, you write it, you test it together once, and it works the same way forever after.

Rule of thumb: same output every time given the same input → script. Judgment, taste, reading context → the AI.

Start with the three workflows the user repeats most — usually some version of content production, lead/client research, and a client deliverable. Three SOPs that run clean beat twenty that half-work. For each: do the task once WITH the user while they narrate their standards, then write the directive from that session. Their habits become infrastructure.

Action step: first directive + first script for the single most repeated workflow. Run it end to end once before calling it done.

## Phase 5: Deep expertise (the skills library)

Context files cover who the user is; skill files cover what they know. A skill file (`skills/SKILL_BIBLE_<topic>.md`) is a dense, structured extraction of domain expertise on one topic: how to write hooks, how to run discovery calls, how to structure an offer, how to price.

Method: find the best material in the niche — a masterclass video, a purchased course, a podcast from a proven operator, the user's own best-performing work. Get the transcript. Extract it into: core principles, exact frameworks, specific examples with numbers, common mistakes, and a quality checklist.

Two rules that keep the library honest:

- **Always cite the source and date** at the top. When advice conflicts later, you need to know which source and which era it came from.
- **Extract specifics, not summaries.** If the file has no numbers, templates, or exact phrasings, it is too shallow to change output quality.

The AI loads relevant skill files before doing related work — writing a sales email loads the email skill files; prepping a call loads the sales call frameworks. Every course the user ever bought, applied on every task, forever.

Action step: the three skills that most drive revenue → best source for each → extract each into a skill file.

## Phase 6: Client intelligence (the clients layer)

One folder per client, four files each: `profile.md`, `rules.md`, `preferences.md`, `history.md`. Before any client work, the AI loads that client's folder — so it never uses a banned word for that client, never repeats a mistake recorded in the history file, and never needs the relationship re-explained.

`history.md` matters most: after every meaningful interaction, one dated entry — what happened, what was decided, what to remember. Six months later that file is the institutional memory that normally walks out the door when an employee leaves.

Action step: folders for the top five clients. Fill profiles from what the user knows; draft from call transcripts or email threads when they exist.

## Phase 7: The brain itself (linked notes)

The layer that makes it a second brain instead of a file cabinet: `brain/` with `INDEX.md` and five categories — `decisions/`, `notes/`, `references/`, `metrics/`, `ideas/`. Conventions: one dated fact per note, wikilinks between related notes, one INDEX line per note, decisions with the reasoning attached. Full conventions and the note template are in templates.md.

Recommend Obsidian for reading: pointed at the folder as a vault, links become clickable, backlinks appear automatically, and the graph view exposes structure a file list hides (an orphan note with no connections usually needs expanding or merging). The AI writes and links; the human reads and spots problems.

The shortcut that saves months: **do not write history by hand — feed the AI raw exports.** Slack/Teams history, call transcripts, email threads, old proposals go into `sources/`, and the AI mines them into dated brain notes. Company timeline, client roster history, founding journal — extracted, not remembered.

Action step: brain folders + `INDEX.md` + the first three notes today (one recent decision with reasoning, one fact the user keeps re-explaining, one lesson from last month). Then gather raw exports into `sources/` and schedule a mining session.

## Phase 8: Make it self-improving

Two mechanisms turn the folder from a static wiki into a system that compounds:

- **Self-annealing** — a standing rule in `CLAUDE.md`: after every task, if an error occurred, fix the script and update the directive; if a better approach was found, update the skill file; if a new edge case appeared, add it to the SOP. Nothing breaks the same way twice. "1 percent better every day," made mechanical.
- **Quality gates** — every directive ends with a checklist the output must pass before it reaches the user. Content checks against the brand voice file; client work checks against the client rules file; anything with numbers checks against the never-invent-numbers rule. The human still reviews, but the system catches routine failures first.

Also give the AI persistent memory for what it learns about working with the user — preferences, corrections, ongoing projects, facts not yet in any file — so corrections stick. Claude Code has this built in.

Action step: self-annealing protocol into `CLAUDE.md` as a standing rule; a quality gate section on each of the three directives.

## Phase 9: Delivery and integrations (optional, do this last)

Only once the core system works, connect it to where work gets delivered: a script that turns markdown outputs into shared docs, a notification script that posts when work is done, scheduled runs for recurring tasks (a daily news brief, a weekly content plan), and — if there is a team — a simple password-protected dashboard listing every workflow.

None of this is required to get value. The system runs for weeks on nothing but files and the AI. Add integrations when a real bottleneck demands them, not before.

## The seven-day schedule

- **Day 1:** Folder, git, `CLAUDE.md` first draft, the four context files (record-and-transcribe method).
- **Day 2:** First directive plus first script, for the single most repeated workflow. Run it end to end once.
- **Day 3:** Two more directives. Start the clients folder with the top five.
- **Day 4:** First three skill files from the best source material.
- **Day 5:** Brain structure plus first ten notes. Start with decisions — highest value per minute of effort.
- **Day 6:** Gather raw exports into `sources/` and run the first mining session. The day the brain gets deep.
- **Day 7:** Self-annealing rules, quality gates, first contradiction check. Then use the system on real work and let the corrections improve it.

After day 7, stop building the system and start using it. It grows as a side effect of the work.
