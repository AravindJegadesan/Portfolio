const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const copyEmail = document.querySelector("#copyEmail");

if (copyEmail) {
  copyEmail.addEventListener("click", async () => {
    const email = copyEmail.dataset.email;
    const originalLabel = copyEmail.textContent;

    try {
      await navigator.clipboard.writeText(email);
      copyEmail.textContent = "Copied";
    } catch {
      window.location.href = `mailto:${email}`;
      copyEmail.textContent = "Email Opened";
    }

    window.setTimeout(() => {
      copyEmail.textContent = originalLabel;
    }, 1800);
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
  });
};

const updateActiveNav = () => {
  if (!navSections.length) return;

  const scrollMarker = window.scrollY + window.innerHeight * 0.78;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const nearPageEnd = window.scrollY >= maxScroll - 8;
  let activeSection = navSections[0];

  if (nearPageEnd) {
    activeSection = navSections[navSections.length - 1];
  } else {
    navSections.forEach((section) => {
      if (section.offsetTop <= scrollMarker) {
        activeSection = section;
      }
    });
  }

  setActiveNav(activeSection.id);
};

if (navSections.length) {
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  window.addEventListener("resize", updateActiveNav);
}
