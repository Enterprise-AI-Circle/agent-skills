---
layout: doc
title: Downloads
description: Markdown-Dateien zum direkten Herunterladen.
eyebrow: Ressourcen
permalink: /downloads/
---

<div class="card-grid card-grid-1">
{% for item in site.data.downloads %}
  <div class="card card-download">
    <div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
    <a class="btn btn-primary btn-sm" href="{{ '/assets/downloads/' | append: item.file | relative_url }}" download>Herunterladen</a>
  </div>
{% endfor %}
</div>
