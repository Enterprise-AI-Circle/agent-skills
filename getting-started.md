---
layout: doc
title: Einstieg
description: So startest du die Docs-Site lokal.
eyebrow: Dokumentation
permalink: /getting-started.html
---

## Voraussetzungen

Ruby und Bundler auf dem Rechner.

## Installation

```bash
cd agent-skills
bundle install
bundle exec jekyll serve
```

Die Vorschau läuft unter **http://127.0.0.1:4000**.

## Ordnerstruktur

| Ordner | Inhalt |
|--------|--------|
| `_layouts/` | Seiten-Templates |
| `_includes/` | Sidebar, Footer |
| `_posts/` | Blog-Beiträge |
| `assets/css/` | Styling |
| `assets/downloads/` | Markdown-Downloads |

## Weiter

- [Architektur]({{ '/architecture.html' | relative_url }}) — Aufbau von Layout und Navigation
- [Downloads]({{ '/downloads/' | relative_url }}) — Markdown-Dateien
- [Blog]({{ '/blog/' | relative_url }}) — Beispielartikel
