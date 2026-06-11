---
title: Big T — Token-Effizienz im Vibe Coding
description: Wie ihr Coding Agents wirtschaftlich einsetzt — ohne dass die Rechnung explodiert.
permalink: /blog/token-effizienz.html
---

## Das Problem

Adobe hat es auf dem Enterprise AI Summit in San Jose auf den Punkt gebracht:

> *"Code vor dem Model = 92–99% Einsparung."*

Vibe Coding ist schnell. Aber schnell ≠ günstig. Ein Reasoning-Modell kann **20× teurer pro Aufgabe** sein als ein schnelles Modell, das nur als "günstig" vermarktet wird. Der Grund? Es denkt nach. Mehr Denken = mehr Tokens = mehr Kosten.

Und das ist erst der Anfang. Denn **$/token ≠ $/task**. Ein billiges Modell, das dreimal raten muss, bis es den richtigen Code liefert, kostet mehr als ein teureres, das es beim ersten Mal trifft.

Philipp aus unserem Team hat vor kurzem **3.500€/Monat gespart**, indem er lokale AI statt Cloud für Routine-Aufgaben eingesetzt hat. Gene Kim sagt es treffend: *"Token = Gehalt. Budgetiert ihr das schon?"*

Dan Neff von der Enterprise AI Circle bringt es auf den Punkt: *"Wer VORHER misst, muss nie dem Board erklären, warum die Rechnung explodiert ist."*

## Die 5 Quick Wins für Token-Effizienz

### 1. Code vor dem Model

Bevor ihr den Agent anfragt: **Den Code bereits strukturieren, Kommentare schreiben, Imports aufräumen**. Der Agent muss weniger Kontext lesen, um zu verstehen, was gemeint ist.

**Beispiel:**
```
❌ "Refaktorier die auth.js"
✅ "Refaktorier die auth.js. Die Datei ist 340 Zeilen, nutzt JWT, 
    hat 3 Endpunkte: login, refresh, logout. 
    Ziel: Split in auth-controller.js und auth-middleware.js."
```

Erster Prompt: **~10 Tokens**. Zweiter Prompt: **~3.000 Tokens**.

### 2. Prompt-Chunks statt Monologe

Schreibt lange Prompts in **kleine, sequenzielle Schritte**. Der Agent bearbeitet jeden Schritt isoliert und ihr könnt zwischendurch korrigieren, statt am Ende den ganzen Output verwerfen zu müssen.

```
Schritt 1: "Liste alle API-Endpunkte in routes/ auf."
→ [Agent listet auf]
Schritt 2: "Welche davon haben keine Rate-Limiting?"
→ [Agent antwortet]
Schritt 3: "Schlage Rate-Limiting-Patterns für die 3 Endpunkte vor."
→ [Agent antwortet]
```

**Total:** 3 × kleine Responses statt 1 × riesige Response mit vielen Richtigstellungen.

### 3. System-Prompts als Filter

Setzt einen **System-Prompt**, der den Agent auf effiziente Antworten trimmt. Das kostet einmalig Tokens, spart aber in jeder Interaktion danach.

```yaml
system:
  - "Antworte präzise. Keine Einleitungen."
  - "Wenn du unsicher bist, frage nach statt zu raten."
  - "Code-Snippets max. 20 Zeilen. Bei mehr: aufteilen."
  - "Erkläre nur, wenn der User fragt."
```

### 4. Lokale Models für Routine-Aufgaben

Nicht jede Aufgabe braucht ein teures Reasoning-Model. Für:
- Code-Formatierung
- Regex erstellen
- SQL-Queries schreiben
- Dokumentationen parsen

...eignet sich ein **lokales Model** (z.B. Qwen2.5-Coder, DeepSeek-Coder) oder ein schnelles Cloud-Model. Das spart bis zu **90% der Token-Kosten** bei repetitive Tasks.

**Philipp's Erfahrung:** 3.500€/Monat gespart durch lokale AI für Routine-Aufgaben.

### 5. Token-Monitoring einführen

Bevor ihr das Board überrascht: **Misst**.

- Pro Task: Wie viele Tokens wurden verbraucht?
- Pro Model: Kosten pro 1.000 Tokens?
- Pro Teammitglied: Wer verursacht die meisten Tokens?

Tools wie [LangSmith](https://smith.langchain.com/), [Arize Phoenix](https://docs.arize.com/phoenix/) oder einfach ein einfaches Logging in der `.env` geben euch die Daten, um zu optimieren.

## Die Token-Effizienz Checkliste

Ich habe die 5 Quick Wins als **Checkliste** aufbereitet. Download unten.

## Die Kernfrage

Wisst ihr, wie viele Tokens euer Team aktuell verbraucht? Wisst ihr, welches Model ihr für welche Aufgabe nutzt? Und wisst ihr, ob ihr das budgetiert habt, bevor die Rechnung kommt?

Wenn nicht: Startet mit Quick Win #5. Misst. Dann optimiert.

---

