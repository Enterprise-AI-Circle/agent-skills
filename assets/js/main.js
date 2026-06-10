const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.nav-toggle');

toggle?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.addEventListener('click', (e) => {
  if (!sidebar?.classList.contains('open')) return;
  if (sidebar.contains(e.target) || toggle.contains(e.target)) return;
  sidebar.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
});

const input = document.getElementById('doc-search');
input?.addEventListener('input', () => {
  const q = input.value.trim().toLowerCase();
  document.querySelectorAll('.nav-group').forEach((sec) => {
    let any = false;
    sec.querySelectorAll('.nav-link').forEach((a) => {
      const m = !q || a.textContent.toLowerCase().includes(q);
      a.style.display = m ? 'block' : 'none';
      if (m) any = true;
    });
    sec.style.display = any ? 'block' : 'none';
  });
});

document.querySelectorAll('.prose pre, .code-block').forEach((pre) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'copy';
  btn.textContent = 'Copy';
  btn.addEventListener('click', async () => {
    const code = pre.querySelector('code')?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(code);
      btn.textContent = 'Copied';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 1400);
    } catch {
      btn.textContent = 'Failed';
      setTimeout(() => { btn.textContent = 'Copy'; }, 1400);
    }
  });
  pre.appendChild(btn);
});
