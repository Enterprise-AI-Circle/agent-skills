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

Kein ZIP, kein Copy-Paste: Der Skill lebt in diesem Repo, dein Agent zieht ihn direkt von dort.

### Claude Code — als Plugin (empfohlen)

Dieses Repo ist ein Claude-Code-Plugin-Marketplace:

```
/plugin marketplace add Enterprise-AI-Circle/agent-skills
/plugin install security-audit@xalt-skills
```

Danach startest du einen Audit mit `/security-audit` oder fragst einfach: "Führe einen Security-Audit durch."

### Andere Agenten (Codex, OpenClaw, Cursor & Co.) — per Direct-Link

Gib deinem Agenten den Direkt-Link, er lädt den Skill direkt aus dem Repo:

> "Installiere den Security-Audit-Skill von hier: https://github.com/Enterprise-AI-Circle/agent-skills/tree/main/agent-skills/security-audit"

### Manuell ablegen

Kopiere den Ordner `security-audit/` in das Skills-Verzeichnis deines Agenten:

- **OpenClaw:** `~/.openclaw/workspace/skills/security-audit/`
- **Claude Code (ohne Plugin):** `~/.claude/skills/security-audit/` (oder projektlokal `.claude/skills/security-audit/`)
- **Cursor:** Inhalt der `SKILL.md` in einen Custom Instructions Block einfügen

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

[MIT](../../LICENSE)

---

## Skill ansehen & holen

Der Skill lebt im Repo — die einzige Quelle der Wahrheit:

- [Auf GitHub ansehen](https://github.com/Enterprise-AI-Circle/agent-skills/tree/main/agent-skills/security-audit)
- [Raw SKILL.md](https://raw.githubusercontent.com/Enterprise-AI-Circle/agent-skills/main/agent-skills/security-audit/SKILL.md)
