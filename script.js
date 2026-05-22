const body = document.body;
const navLinks = document.getElementById("navLinks");
const navToggle = document.getElementById("navToggle");
const sections = [...document.querySelectorAll("section[id]")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const reveals = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-bar-fill");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setMenuState(isOpen) {
  if (!navLinks || !navToggle) {
    return;
  }

  navLinks.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  body.classList.toggle("menu-open", isOpen && window.innerWidth <= 640);
}

function closeMenu() {
  setMenuState(false);
}

function updateActiveLink() {
  let currentSection = sections[0]?.id ?? "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      currentSection = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    const isActive = anchor.getAttribute("href") === `#${currentSection}`;
    anchor.classList.toggle("active", isActive);
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") !== "true";
    setMenuState(isOpen);
  });

  navAnchors.forEach((anchor) => anchor.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 640 &&
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
}

if (prefersReducedMotion) {
  reveals.forEach((element) => element.classList.add("visible"));
  skillBars.forEach((bar) => bar.classList.add("animated"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => {
            entry.target.classList.add("visible");
          }, index * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  reveals.forEach((element) => revealObserver.observe(element));

  const skillsSection = document.getElementById("habilidades");
  if (skillsSection) {
    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillBars.forEach((bar, index) => {
              window.setTimeout(() => {
                bar.classList.add("animated");
              }, index * 90);
            });
            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    barObserver.observe(skillsSection);
  }
}

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const targetEmail = contactForm.dataset.contactEmail || "";

    const subject = encodeURIComponent(`Contato pelo portfólio - ${name}`);
    const bodyText = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
    const body = encodeURIComponent(bodyText);

    formSuccess.hidden = false;

    if (!targetEmail) {
      formSuccess.textContent = "Defina um e-mail de destino para ativar o formulário.";
      return;
    }

    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    formSuccess.textContent = "Rascunho de e-mail preparado no seu aplicativo de e-mail.";
    contactForm.reset();
  });
}

document.querySelectorAll("[data-current-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

window.addEventListener("scroll", updateActiveLink, { passive: true });
window.addEventListener("load", updateActiveLink);
updateActiveLink();
