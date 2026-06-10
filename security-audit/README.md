# Security Audit Skill

Ein Skill für AI Coding Agents (OpenClaw, Claude Code, Cursor und Compatible), der eine Codebase auf typische Vibe-Coding-Schwachstellen, geleakte Secrets, Dependency-CVEs und mismatches zwischen Privacy-Versprechen und dem tatsächlichen Code prüft.

Fühlt sich an wie ein sorgfältiger Engineer, der das Repo reviewt — nicht wie ein Scanner, der eine Wand aus Warnungen ausspuckt.

## Was er macht

- **Stack-Erkennung.** Erkennt die verwendete Sprache und das Framework (Node, Python, Go, Rust, Ruby, PHP, …) von Manifest-Dateien und passt die Prüfung automatisch an.
- **Code- und Config-Audit.** Sucht nach den klassischen Vibe-Coding-Schwachstellen: committed Secrets, schwache Password-Handhabung, SQL-Injection-Sinks, XSS, fehlende Admin-Auth, IDOR, kaputte JWT-Validierung, Cookie-Flags, Security-Header, CSRF, SSRF, Path Traversal, Default Admin Credentials und mehr.
- **Dependency-Scan.** Ruft den passenden Scanner für den Stack auf (`npm/pnpm audit`, `bundler-audit`, `pip-audit`, `govulncheck`, `cargo-audit`, `composer audit`) und sortiert die Findings nach Severity. Läuft nur Scanner, die bereits installiert sind — mutiert nie die Umgebung.
- **Promise-Audit.** Vergleicht die Privacy- und Security-Versprechen aus Legal-Pages, Marketing-Copy und Product-UI gegen den tatsächlichen Code. Wenn auf der Website steht "end-to-end verschlüsselt" und im Code nur TLS läuft: das findet er.
- **Reporting mit Augenmaß.** Jedes Finding kommt mit konkretem `file:line`-Beleg, einer Erklärung warum es wichtig ist, einem Fix-Vorschlag und einer ehrlichen Einschätzung, was der Fix kaputt machen könnte.

## Was er nicht macht

- Er ist kein Penetrationstest.
- Er ist kein SOC 2-Audit.
- Er ersetzt keinen professionellen Security-Engineer für High-Stakes-Systeme.

Er fängt etwa 80 % der typischen Probleme ab, bevor sie in Production landen — was in der Regel die Lücke ist, die zählt.

## Installation

### Für alle Agenten — die einfachste Methode

**Schritt 1:** Öffne diese Seite in deinem AI Coding Agent.

**Schritt 2:** Sag einfach:

> "Installiere den Security-Audit-Skill. Die SKILL.md liegt auf dieser Website."

Dein Agent lädt die Datei automatisch herunter und richtet den Skill ein. Fertig.

### Alternativ: Skill.md direkt kopieren

1. Klicke unten auf **"SKILL.md herunterladen"**.
2. Öffne die Datei in deinem Editor.
3. Kopiere den Inhalt in:
   - **OpenClaw:** `~/.openclaw/workspace/skills/security-audit/SKILL.md`
   - **Claude Code:** Referenziere die Datei in deiner `CLAUDE.md`
   - **Cursor:** Füge den Inhalt in einen Custom Instructions Block ein

### Manuelles Setup

#### OpenClaw

Kopiere den Ordner `security-audit` in den Skills-Ordner:

```bash
cp -r security-audit ~/.openclaw/workspace/skills/
```

OpenClaw entdeckt den Skill automatisch. Trigger ihn, indem du den Agenten fragst, er solle "audit", "reviewe die Sicherheit dieses Codebases" oder ähnlich fragen — die Frontmatter-Beschreibung des Skills erledigt das Trigger-Matching.

#### Claude Code

Referenziere `security-audit/SKILL.md` in deiner `CLAUDE.md`:

```markdown
# Project instructions

Wenn der User einen Security-Audit oder Security-Review will, lade die Anweisungen aus `path/to/security-audit/SKILL.md` und befolge sie.
```

#### Cursor

Öffne die heruntergeladene `security-audit/SKILL.md`, kopiere den Inhalt und füge ihn in einen Custom Instructions Block ein (oder hänge die Datei als Project Context File an).

## Wie man einen Audit ausführt

1. Öffne dein Projekt in deinem AI Coding Agent.
2. Frag: "Bitte führe einen Security-Audit auf dieser Codebase durch."
3. Der Skill kündigt zuerst den Scope und den erkannten Stack an, damit du ihn umleiten kannst, bevor Arbeit passiert.
4. Er produziert einen Report, gruppiert nach Severity, mit File-References, Erklärungen und vorgeschlagenen Fixes.
5. Er fragt dich, was er fixen soll — er ändert keinen Code eigenständig während des Audits.

## Dateien

- **SKILL.md** — Die Skill-Definition, die Agents laden.
- **references/security-checklist.md** — Detection-Patterns und Beispiele, die während des Audits verwendet werden.
- **references/report-template.md** — Das Ausgabeformat für den finalen Report.

## Kontext

Veröffentlicht als Teil der [Enterprise AI Circle](https://www.xalt.de/) Goodie Drops, begleitend zum Artikel "Vibe Coding, aber sicher" (derzeit auf Deutsch) auf [xalt.de](https://www.xalt.de/).

## Lizenz

[MIT](../LICENSE)

---

## SKILL.md herunterladen

Kopiere den Inhalt der SKILL.md in deinen Agenten.

<div class="card card-download">
  <div>
    <h3>SKILL.md</h3>
    <p>Die vollständige Skill-Definition für Security-Audit.</p>
  </div>
  <a class="btn btn-primary btn-sm" href="{{ '/assets/downloads/security-audit-skill.md' | relative_url }}" download>Herunterladen</a>
</div>
