---
layout: doc
title: API-Referenz
description: Dummy-Endpunkte zur Demonstration von Code-Blöcken und Tabellen.
eyebrow: Dokumentation
permalink: /api-reference.html
---

## Status

```http
GET /api/status
```

```json
{
  "status": "ok",
  "version": "0.0.1"
}
```

## Eintrag erstellen

```http
POST /api/items
```

| Feld | Typ | Pflicht |
|------|-----|---------|
| `title` | string | ja |
| `body` | string | nein |

## Hinweis

Diese API existiert nicht — sie dient nur als Layout-Beispiel.
