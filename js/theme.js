const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const systemPrefersDark = systemTheme.matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
}

function syncThemeControl() {
    const dark = body.classList.contains('dark-mode');
    themeToggle?.setAttribute('aria-pressed', String(dark));
    themeToggle?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

syncThemeControl();

themeToggle?.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
    syncThemeControl();
});

systemTheme.addEventListener('change', (event) => {
    if (localStorage.getItem('theme')) return;
    body.classList.toggle('dark-mode', event.matches);
    syncThemeControl();
});
