# Second Brain Skill

Ein Skill für AI Coding Agents (Claude Code, OpenClaw, Cursor und Compatible), der ein "Second Brain" für ein Business aufbaut, erweitert und wartet: ein AI-Betriebssystem, das komplett in einem Ordner aus Markdown-Dateien lebt — versioniert mit git, lesbar von jedem Modell, das je kommen wird.

Basiert auf dem "Second Brain Blueprint" von Doby Lanete (DobotAI): dieselbe Architektur, mit der eine echte Agentur täglich Content, Research, Client-Deliverables und Sales-Prep durch einen AI-Agenten erledigen lässt.

## Die Architektur (DOE)

```text
DIRECTIVES     (Markdown)   -> Was zu tun ist: SOPs, Schritt für Schritt
ORCHESTRATION  (der Agent)  -> Der Entscheider: liest Kontext, wählt die SOP, prüft Qualität
EXECUTION      (Scripts)    -> Wie es erledigt wird: deterministischer Code für APIs & Dateien
```

Warum die Trennung: AI-Modelle sind probabilistisch. Ein Modell mit 90 % Genauigkeit pro Schritt schafft eine 5-Schritte-Aufgabe nur in 59 % der Fälle fehlerfrei. Alles Deterministische wandert in Scripts; der Agent macht nur das, worin er einzigartig gut ist — Kontext lesen, Urteile fällen, Qualität prüfen.

## Was er macht

- **Build-Modus.** Baut das komplette Brain von einem leeren Ordner aus, Phase für Phase: Ordnerstruktur + git, Kontext-Dateien (per Interview, nicht erfunden), `CLAUDE.md` als Operating Manual, die ersten Directives + Scripts, Skill-Files, Client-Ordner, verlinkte Brain-Notes.
- **Extend-Modus.** Fügt einem bestehenden Brain neue Directives, Execution-Scripts, `SKILL_BIBLE`-Dateien, Client-Ordner oder Brain-Notes hinzu — und mined rohe Exports (Slack-History, Call-Transkripte, E-Mail-Threads) aus `sources/` in datierte Notes.
- **Maintain-Modus.** Relink-Pass für die Wikilinks (echte Beziehungen, keine Keyword-Matches), Contradiction-Audit (alte vs. neue Preise, gekippte Entscheidungen), Self-Annealing (jeder Fehler wird zu einem Edit am System).

## Was er nicht macht

- Er erfindet keine Fakten. Kontext-Dateien entstehen aus deinen Antworten und Korrekturen — Platzhalter plus Rückfrage schlagen selbstbewusste Fiktion.
- Er baut keine leere Perfekt-Taxonomie. Zehn echte Notes schlagen einen schönen leeren Ordnerbaum.
- Er verdrahtet keine Integrationen, bevor das Kernsystem läuft.

## Installation

### Claude Code — als Plugin (empfohlen)

```
/plugin marketplace add Enterprise-AI-Circle/agent-skills
/plugin install second-brain@xalt-skills
```

Danach: "Baue mir ein Second Brain für mein Business" — oder in einem bestehenden Brain: "Neue Directive für Weekly Content Plan."

### Andere Agenten (Codex, OpenClaw, Cursor & Co.) — per Direct-Link

> "Installiere den Second-Brain-Skill von hier: https://github.com/Enterprise-AI-Circle/agent-skills/tree/main/agent-skills/second-brain"

### Manuell ablegen

Kopiere den Ordner `second-brain/` in das Skills-Verzeichnis deines Agenten:

- **Claude Code (ohne Plugin):** `~/.claude/skills/second-brain/` (oder projektlokal `.claude/skills/second-brain/`)
- **OpenClaw:** `~/.openclaw/workspace/skills/second-brain/`
- **Cursor:** Inhalt der `SKILL.md` in einen Custom Instructions Block einfügen

## Der 7-Tage-Build

- **Tag 1:** Ordner, git, `CLAUDE.md`-Erstentwurf, die vier Kontext-Dateien
- **Tag 2:** Erste Directive + erstes Script für den meistwiederholten Workflow — einmal end-to-end laufen lassen
- **Tag 3:** Zwei weitere Directives, Client-Ordner für die Top 5
- **Tag 4:** Erste drei Skill-Files aus dem besten Quellmaterial
- **Tag 5:** Brain-Struktur + erste zehn Notes (Decisions zuerst)
- **Tag 6:** Rohe Exports in `sources/` sammeln und die erste Mining-Session fahren
- **Tag 7:** Self-Annealing-Regeln, Quality Gates, erster Contradiction-Check

Nach Tag 7 hörst du auf, das System zu bauen, und fängst an, es zu benutzen. Es wächst als Nebeneffekt der Arbeit.

## Dateien

- **SKILL.md** — Die Skill-Definition, die Agents laden (Modi, Regeln, Arbeitsweise).
- **references/build-order.md** — Alle 9 Phasen im Detail plus der 7-Tage-Plan.
- **references/templates.md** — Templates für jede Datei im Brain: `CLAUDE.md`, Kontext-Dateien, Directives, Scripts, Skill Bibles, Client-Ordner, Brain-Notes.
- **references/maintenance.md** — Relink-Prompt, Contradiction-Audit, Self-Annealing-Protokoll.

## Lizenz

[MIT](../../LICENSE)

---

## Skill ansehen & holen

- [Auf GitHub ansehen](https://github.com/Enterprise-AI-Circle/agent-skills/tree/main/agent-skills/second-brain)
- [Raw SKILL.md](https://raw.githubusercontent.com/Enterprise-AI-Circle/agent-skills/main/agent-skills/second-brain/SKILL.md)
