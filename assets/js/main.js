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
