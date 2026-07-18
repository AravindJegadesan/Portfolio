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
