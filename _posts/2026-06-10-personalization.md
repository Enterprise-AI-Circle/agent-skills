---
title: Anti-AI-Slop — Personalisiert eure Agenten
description: Hört auf, generische KI-Texte zu veröffentlichen. Gebt eurer KI eure Stimme.
permalink: /blog/personalization.html
---

## Das Problem

Ihr habt einen Agenten, der Euch hilft. Aber wenn ihr den Output lest, klingt er nicht nach Euch. Er klingt nach **KI**.

Generisch. Ausgewogen. Neutral. Langweilig.

Das ist das Gegenteil von dem, was ihr wollt. Denn wenn eure E-Mails, Präsis und Posts alle gleich klingen, verwässert eure Identität. Oder worse: Ihr hört aus wie die Konkurrenz.

## Warum das passiert

KI-Modelle sind auf **neutralen, sicheren Output** trainiert. Sie wollen niemanden beleidigen, keine Polemik, keine starke Meinung. Das ist gut für eine Suchmaschine. Schlecht für einen Menschen mit Persönlichkeit.

Der Agent macht das, was er gelernt hat: **Den Mittelweg finden**. Aber der Mittelweg ist langweilig.

## Die Lösung: Personalization durch Prompting

Ihr könnt euren Agenten beibringen, **euren** Stil zu schreiben. Nicht durch teure Fine-Tuning-Projekte. Sondern durch **gute Prompt-Templates**.

### Schritt 1: Eure Samples sammeln

Sammelt 10–20 Beispiele von **eurem** Schreibstil:
- E-Mails, die ihr geschrieben habt
- Präsis, die ihr gehalten habt
- Posts, die ihr veröffentlicht habt

Nicht perfekt. Nicht poliert. **Echt.**

### Schritt 2: Das Prompt-Template

Fügt die Samples in den System-Prompt eures Agents ein:

```
Du schreibst im Stil von [Name]. Hier sind Beispiele:

Beispiel 1: [Eure E-Mail]
Beispiel 2: [Eure Präsentation]
Beispiel 3: [Euer Post]

Richtlinien:
- Kurze Sätze. Max. 20 Wörter.
- Aktive Form. Kein "es wird angenommen".
- Direkte Ansprache. "Ihr" statt "Man".
- Keine Füllwörter. Kein "leider", "vielleicht", "anscheinend".
- Pro Absatz max. 3 Sätze.
```

### Schritt 3: Iterate

Lasst den Agenten einen Text schreiben. Vergleicht ihn mit eurem Original. Passt die Richtlinien an. Wiederholt, bis der Output nicht mehr nach KI klingt.

## Die 5 Prompt-Templates

Ich habe **5 fertige Prompt-Templates** erstellt, die ihr direkt nutzen könnt. Download unten.

Die Templates decken ab:
1. **E-Mails** — Direkt, klar, keine Floskeln
2. **Präsentationen** — Storytelling, nicht Slide-Text
3. **Social Media** — Kurz, prägnant, mit Charakter
4. **Code Reviews** — Konstruktiv, nicht belehrend
5. **Dokumentation** — Klar, nicht akademisch

## Warum das wichtig ist

In der KI-Revolution wird **Identität** zum Wettbewerbsvorteil. Wenn alle gleich klingen, gewinnt der, der sich unterscheidet.

Euer Schreibstil ist **euer** Asset. Nutzt ihn.


*Dieser Artikel ist Teil von Goodie Drop #03: Personalization — Dein Agent klingt wie du. 
Drop #01 zeigte, wie man Vibe Coding sicher betreibt. Drop #02 zeigte, wie man Agents wirtschaftlich einsetzt.*
