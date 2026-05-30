(function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const yearEl = document.getElementById("year");
  const contactForm = document.querySelector(".contact-form");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Sticky header shadow
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
    updateActiveNav();
  }

  // Highlight active nav link
  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    let current = "home";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").slice(1);
      link.classList.toggle("is-active", href === current);
    });
  }

  // Mobile menu
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle("is-open");
    document.body.style.overflow = expanded ? "" : "hidden";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  });

  // Contact form (demo — opens mail client)
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
