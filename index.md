---
layout: default
title: Übersicht
home: true
---

<header class="page-header">
  <p class="eyebrow">Dokumentation</p>
  <h1>Klar strukturiert.<br><em>Leicht zu navigieren.</em></h1>
  <p class="subtitle">Guides, Downloads und Blog — alles an einem Ort. Statisch gebaut, schnell geladen, im XALT-Look.</p>
  <div class="cta-row">
    <a class="btn btn-primary" href="{{ '/getting-started.html' | relative_url }}">Einstieg lesen</a>
    <a class="btn btn-ghost" href="{{ '/downloads/' | relative_url }}">Downloads</a>
  </div>
</header>

<section class="section">
  <div class="section-head">
    <h2>Was du hier findest</h2>
    <p>Drei Bereiche — jeweils mit eigenem Zweck, gleichem Layout.</p>
  </div>
  <div class="card-grid card-grid-3">
    <a class="card card-link" href="{{ '/getting-started.html' | relative_url }}">
      <span class="card-kicker">01</span>
      <h3>Dokumentation</h3>
      <p>Einstieg, Architektur und API-Referenz als lesbare Markdown-Seiten.</p>
      <span class="card-more">Öffnen →</span>
    </a>
    <a class="card card-link" href="{{ '/downloads/' | relative_url }}">
      <span class="card-kicker">02</span>
      <h3>Downloads</h3>
      <p>Setup Guide, Checkliste und FAQ — als Markdown zum Mitnehmen.</p>
      <span class="card-more">Öffnen →</span>
    </a>
    <a class="card card-link" href="{{ '/blog/' | relative_url }}">
      <span class="card-kicker">03</span>
      <h3>Blog</h3>
      <p>Beispielbeiträge mit Datum, Teaser und Einzelansicht.</p>
      <span class="card-more">Öffnen →</span>
    </a>
  </div>
</section>

<section class="section section-tint">
  <div class="split">
    <div class="split-text">
      <p class="eyebrow">Schnellstart</p>
      <h2>Lokal in drei Schritten</h2>
      <ol class="steps">
        <li><strong>Ordner öffnen</strong> — <code>agent-skills</code> im Projekt.</li>
        <li><strong>Dependencies</strong> — <code>bundle install</code> einmalig ausführen.</li>
        <li><strong>Vorschau</strong> — <code>bundle exec jekyll serve</code> starten.</li>
      </ol>
    </div>
    <pre class="code-block"><code><span class="prompt">$</span> bundle install
<span class="prompt">$</span> bundle exec jekyll serve

<span class="comment"># → http://127.0.0.1:4000</span></code></pre>
  </div>
</section>

<aside class="note">
  <p><strong>Hinweis:</strong> Dies ist eine Design-Vorschau mit Platzhalter-Inhalten — kein produktives System.</p>
</aside>
