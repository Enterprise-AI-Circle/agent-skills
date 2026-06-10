---
layout: doc
title: Architektur
description: Wie Layout, Navigation und Inhalte zusammenhängen.
eyebrow: Dokumentation
permalink: /architecture.html
---

## Seitenaufbau

Jede Seite nutzt ein **Shell-Layout**: feste Sidebar links, scrollbarer Inhalt rechts. Auf Mobilgeräten klappt die Sidebar ein.

```
default.html
├── doc.html      → Dokumentation & Listen
└── post.html     → Blog-Einzelbeiträge
```

Die Startseite (`index.md`) rendert Sektionen direkt — Hero, Karten, Schnellstart.

## Navigation

Die Sidebar liest `_data/nav.yml`. Aktive Einträge werden automatisch hervorgehoben.

## Styling

`assets/css/main.css` enthält XALT-Farben und -Typografie, angepasst für eine ruhige Docs-Oberfläche:

- **Montserrat** für Überschriften
- **Roboto** für Fließtext
- Akzentfarbe `#01FFCD` nur für Fokus und CTAs

## Deployment

Für GitHub Pages reicht ein Build-Workflow:

```bash
bundle exec jekyll build
# Ausgabe in _site/
```
