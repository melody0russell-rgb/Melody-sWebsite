(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const year = document.getElementById('year');

  // Year
  year.textContent = String(new Date().getFullYear());

  // Theme
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    root.setAttribute('data-theme', saved);
  }

  btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Fallback handling: if an iframe errors, show fallback copy.
  // Note: cross-origin rules mean we can't reliably detect blocked embeds,
  // but we can handle obvious load errors.
  document.querySelectorAll('iframe').forEach((frame) => {
    frame.addEventListener('error', () => {
      const wrap = frame.closest('.embed');
      if (wrap) wrap.classList.add('is-fallback');
    });
  });

  // For Instagram embeds, if the script doesn't render within a few seconds,
  // show the fallback note.
  setTimeout(() => {
    document.querySelectorAll('.embed').forEach((wrap) => {
      const hasIframe = wrap.querySelector('iframe');
      const hasIg = wrap.querySelector('blockquote.instagram-media');
      if (hasIg && !hasIframe) {
        // If IG didn't inject anything visible, show fallback.
        // (Best-effort; harmless if IG does render.)
        wrap.classList.add('is-fallback');
      }
    });
  }, 3500);
})();
