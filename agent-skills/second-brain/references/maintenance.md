# Maintenance — relinking, contradiction audits, self-annealing

## The relink pass

Wikilinks do not appear on their own. Run this pass once the brain reaches about 20 notes, then again after every bulk import from `sources/`. Use this prompt as is:

```text
I read this vault in Obsidian. Go through every note in brain/ and add
[[wikilinks]] connecting notes that genuinely share a client, a decision,
a project, a person, or a lesson.

Rules:
- Link text must match the target note's filename exactly, so the link
  resolves in Obsidian.
- Only add a link where following it would teach the reader something
  real. Relationships, not keyword matches.
- Most notes should end up with 2 to 5 links. If a note honestly
  connects to nothing, leave it alone and report it instead of forcing
  a link.
- Add links only. Do not rewrite, trim, or improve any other content.

When you are done, report: how many links you added, which notes are
orphans with no connections, and the three most surprising connections
you found.
```

Why the rules matter: "as many links as possible" produces a brain where everything links to everything — as useless as one where nothing does. The rules cap the ambition (real relationships only), protect the content (add links only, so the git diff is pure and reviewable), and turn the leftovers into a to-do list (the orphan report — an orphan note is usually a note that needs expanding or merging).

## The contradiction audit

Every few weeks, read the brain looking for notes that disagree with each other:

- old pricing vs new pricing
- stale team rosters or client lists
- decisions that were later reversed but both still stand in the notes
- metrics snapshots that contradict narrative claims

For each conflict: quote both notes with their dates, state which is newer, and ask the user to rule. Apply the ruling by updating or superseding the losing note (a superseding note links back to what it replaces — do not silently delete history). The brain stays trustworthy because it gets audited like a real system.

Filename dates are what make this audit possible — which is why undated facts are banned.

## The self-annealing protocol

The standing rule that turns a one-time setup into a compounding asset. After every task run inside a brain:

- **A script errored** → fix the script, and update the directive that calls it if the fix changes usage.
- **A better approach was found** → update the relevant skill file so the improvement applies to every future task.
- **A new edge case appeared** → add it to the directive's edge cases section with what to do.
- **The user corrected the output** → encode the correction where it belongs: brand voice file (tone/wording), client preferences or rules (client-specific), skill file (craft), directive quality gates (recurring failure mode).

Then commit the edits with a message saying what broke or improved and which files encode the fix. Nothing breaks the same way twice.

## Quality gate hygiene

When a quality gate fails repeatedly for the same reason, that is a signal the gate is checking too late — move the constraint upstream into the directive's process steps or into a script. When output keeps passing gates but the user keeps correcting it, the gates are too weak — add a gate that would have caught the correction.
