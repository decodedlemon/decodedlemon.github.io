document.documentElement.classList.add('js');

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => observer.observe(el));
}

// Navbar scroll state
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
}

// Mobile menu
const menuBtn  = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        menuBtn.classList.toggle('open', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!navbar?.contains(e.target) && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            menuBtn.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.setAttribute('aria-label', 'Open menu');
            document.body.style.overflow = '';
        }
    });
}

// Selected Work — collapsed until "View all projects"
const projectsToggle = document.getElementById('projects-toggle');
const projectsGrid   = document.getElementById('all-projects');

if (projectsToggle && projectsGrid) {
    const toggleLabel = projectsToggle.querySelector('.projects-toggle-label');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const setExpanded = (expanded) => {
        projectsGrid.classList.toggle('is-collapsed', !expanded);
        projectsToggle.setAttribute('aria-expanded', String(expanded));
        if (toggleLabel) toggleLabel.textContent = expanded ? 'Show fewer projects' : 'View all projects';
        if (expanded) {
            projectsGrid.querySelectorAll('.project-extra.reveal').forEach(el => el.classList.add('visible'));
        }
    };

    projectsToggle.addEventListener('click', () => {
        const expanded = projectsGrid.classList.contains('is-collapsed');
        setExpanded(expanded);
        if (!expanded) {
            projectsToggle.scrollIntoView({ block: 'center', behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        }
    });

    if (window.location.hash === '#all-projects') setExpanded(true);
}
