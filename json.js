// ─── MENU MOBILE ─────────────────────────────────────────────────────────────
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── SKILL BARS (animam ao entrar na tela) ───────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 100);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('habilidades');
if (skillsSection) barObserver.observe(skillsSection);

// ─── SCROLL SPY ──────────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navAs.forEach(a => {
    const active = a.getAttribute('href') === '#' + current;
    a.style.color = active ? 'var(--text)' : '';
  });
}, { passive: true });

// ─── FORMULÁRIO ──────────────────────────────────────────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});