/* ── SKILL.md Renderer ──────────────────────────────────────────
 * Renders a SKILL.md file (YAML frontmatter + markdown body) into
 * a styled preview section.
 *
 * Usage:
 *   SKILLRenderer.fetch(url, containerId)  — fetch + render
 *   SKILLRenderer.render(markdown, containerId) — render existing string
 *
 * Features:
 *   • YAML frontmatter → metadata card (name, version, description)
 *   • Task lists (- [ ] / - [x]) → styled checkboxes
 *   • Code blocks → syntax highlighting via highlight.js
 *   • Clean typography matching the site design
 */

/* ── Simple YAML frontmatter parser ──────────────────────────── */
function parseFrontmatter(raw) {
  const fm = {};
  const body = raw.replace(/^---\n([\s\S]*?)\n---/, (_, fmText) => {
    fmText.split('\n').forEach(line => {
      const colon = line.indexOf(':');
      if (colon > -1) {
        const key = line.slice(0, colon).trim();
        let val = line.slice(colon + 1).trim();
        // Strip surrounding quotes
        if ((val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        fm[key] = val;
      }
    });
    return '';
  }).trim();
  return { fm, body };
}

/* ── Marked.js custom renderer ───────────────────────────────── */
function createRenderer() {
  if (typeof marked === 'undefined') {
    console.warn('marked.js not loaded — SKILL preview will be plain text');
    return null;
  }

  const renderer = new marked.Renderer();

  // Override heading to add anchor links
  renderer.heading = function(text, level) {
    const escaped = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `<h${level} id="${escaped}">${text}<a class="anchor" href="#${escaped}" aria-label="Link to ${text}">#</a></h${level}>`;
  };

  // Override list item to handle task lists
  renderer.listitem = function(text) {
    const isTask = text.startsWith('☑ ') || text.startsWith('☐ ');
    if (isTask) {
      const checked = text.startsWith('☑ ');
      const content = checked ? text.slice(3) : text.slice(3);
      return `<li class="task-item"><input type="checkbox" disabled ${checked ? 'checked' : ''}><span>${content}</span></li>\n`;
    }
    return `<li>${text}</li>\n`;
  };

  // Override code to add language class for syntax highlighting
  renderer.code = function(code, language) {
    if (language && typeof hljs !== 'undefined') {
      const highlighted = hljs.highlight(code, { language, ignoreIllegals: true }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    }
    return `<pre><code class="code-block">${this.escape(code)}</code></pre>`;
  };

  return renderer;
}

/* ── Render frontmatter as a metadata card ───────────────────── */
function renderFrontmatter(fm) {
  if (!fm || Object.keys(fm).length === 0) return '';

  let html = '<div class="skill-meta">';
  html += '<div class="skill-meta-header">';

  if (fm.name) {
    html += `<h2 class="skill-name">${fm.name}</h2>`;
  }

  if (fm.version) {
    html += `<span class="skill-version">v${fm.version}</span>`;
  }

  html += '</div>';

  if (fm.description) {
    html += `<p class="skill-description">${fm.description}</p>`;
  }

  html += '</div>';
  return html;
}

/* ── Main render function ────────────────────────────────────── */
function renderSkillMarkdown(raw, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const { fm, body } = parseFrontmatter(raw);

  // Render frontmatter card
  const metaHtml = renderFrontmatter(fm);

  // Render markdown body
  let bodyHtml = '';
  if (typeof marked !== 'undefined' && body) {
    const renderer = createRenderer();
    if (renderer) {
      marked.setOptions({
        renderer: renderer,
        gfm: true,
        breaks: false,
        pedantic: false
      });
      bodyHtml = marked.parse(body);
    }
  }

  container.innerHTML = metaHtml + bodyHtml;
  container.dataset.loaded = '1';
}

/* ── Fetch + render convenience ──────────────────────────────── */
SKILLRenderer = {
  fetch: function(url, containerId) {
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(t => renderSkillMarkdown(t, containerId))
      .catch(() => {
        const c = document.getElementById(containerId);
        if (c) c.innerHTML = '<p class="error">Fehler beim Laden des Skills.</p>';
      });
  },

  render: renderSkillMarkdown
};
