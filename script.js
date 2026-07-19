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
const downloadResume = document.querySelector("#downloadResume");
const resumePath = "assets/Aravind-Jegadesan-Resume.pdf";
const resumeFileName = "Aravind-Jegadesan-Resume.pdf";

const flashButtonLabel = (button, label) => {
  const originalLabel = button.textContent;
  button.textContent = label;
  window.setTimeout(() => {
    button.textContent = originalLabel;
  }, 1800);
};

if (copyEmail) {
  copyEmail.addEventListener("click", async () => {
    const email = copyEmail.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      flashButtonLabel(copyEmail, "Copied");
    } catch {
      window.location.href = `mailto:${email}`;
      flashButtonLabel(copyEmail, "Email Opened");
    }
  });
}

if (downloadResume) {
  downloadResume.addEventListener("click", async () => {
    try {
      const response = await fetch(resumePath);
      if (!response.ok) throw new Error("Resume download failed");

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeFileName;
      link.rel = "noopener";
      link.style.display = "none";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      flashButtonLabel(downloadResume, "Downloading");
    } catch {
      const link = document.createElement("a");
      link.href = resumePath;
      link.download = resumeFileName;
      link.rel = "noopener";
      link.style.display = "none";
      document.body.append(link);
      link.click();
      link.remove();
      flashButtonLabel(downloadResume, "Download Started");
    }
  });
}

const resumeModal = document.querySelector("#resumeModal");
const resumeOpeners = document.querySelectorAll("[data-open-resume]");
const resumeClosers = document.querySelectorAll("[data-close-resume]");

const openResume = () => {
  if (!resumeModal) return;
  resumeModal.classList.add("is-open");
  resumeModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeResume = () => {
  if (!resumeModal) return;
  resumeModal.classList.remove("is-open");
  resumeModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

resumeOpeners.forEach((button) => button.addEventListener("click", openResume));
resumeClosers.forEach((button) => button.addEventListener("click", closeResume));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeResume();
    closeCaseStudy();
  }
});

const roleContent = {
  lead: {
    title: "Lead Backend Engineer",
    text:
      "Strong fit for teams that need hands-on backend ownership, delivery discipline, mentoring, and reliable Java/Spring Boot execution across business-critical systems.",
  },
  staff: {
    title: "Staff-level IC",
    text:
      "Strong fit for teams that need senior individual contribution across architecture tradeoffs, cross-team technical alignment, production reliability, and measurable engineering outcomes.",
  },
  architect: {
    title: "Backend Architect",
    text:
      "Strong fit for teams shaping service boundaries, distributed workflows, integration patterns, data performance, and maintainable backend architecture.",
  },
  fde: {
    title: "Forward Deployed Engineer",
    text:
      "Strong fit for customer-facing or business-proximate engineering where backend execution, integration clarity, debugging, and delivery ownership all matter.",
  },
};

const rolePills = document.querySelectorAll("[data-role]");
const roleFocusTitle = document.querySelector("#roleFocusTitle");
const roleFocusText = document.querySelector("#roleFocusText");

rolePills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const content = roleContent[pill.dataset.role];
    if (!content || !roleFocusTitle || !roleFocusText) return;

    rolePills.forEach((item) => item.classList.toggle("is-active", item === pill));
    roleFocusTitle.textContent = content.title;
    roleFocusText.textContent = content.text;
  });
});

const caseStudies = {
  cicd: {
    category: "Release Engineering",
    title: "CI/CD modernization for faster, safer releases",
    problem:
      "Release flow depended on manual steps and inconsistent deployment confidence, slowing delivery and increasing operational risk.",
    action:
      "Implemented GitHub Actions pipelines, standardized build and deployment automation, and improved the release path for Java backend services.",
    result:
      "Improved release speed and reliability by 45%, reduced manual intervention, and made delivery more predictable for engineering teams.",
    tech: "GitHub Actions, CI/CD, Java, Spring Boot, release automation",
  },
  workflow: {
    category: "Distributed Systems",
    title: "Temporal-based backend orchestration",
    problem:
      "Multi-step backend operations needed clearer state handling, retries, traceability, and operational visibility.",
    action:
      "Designed Temporal workflow patterns around retries, long-running operations, backend integrations, and production support needs.",
    result:
      "Improved orchestration reliability and made distributed backend flows easier to reason about, monitor, and recover.",
    tech: "Temporal, Java, Spring Boot, distributed workflows, backend integrations",
  },
  risk: {
    category: "Financial Data",
    title: "Performance and ingestion improvements for risk systems",
    problem:
      "Risk and financial systems required dependable data movement and better backend performance under enterprise workloads.",
    action:
      "Built SEM ingestion flows and improved backend modules through refactoring, query optimization, and database indexing.",
    result:
      "Improved backend module performance by 30% and strengthened data correctness, throughput, and production readiness.",
    tech: "Java, Spring Boot, Oracle SQL, indexing, query optimization, data ingestion",
  },
};

const caseModal = document.querySelector("#caseModal");
const caseOpeners = document.querySelectorAll("[data-open-case]");
const caseClosers = document.querySelectorAll("[data-close-case]");
const caseModalCategory = document.querySelector("#caseModalCategory");
const caseModalTitle = document.querySelector("#caseModalTitle");
const caseProblem = document.querySelector("#caseProblem");
const caseAction = document.querySelector("#caseAction");
const caseResult = document.querySelector("#caseResult");
const caseTech = document.querySelector("#caseTech");

const openCaseStudy = (id) => {
  const content = caseStudies[id];
  if (!caseModal || !content) return;

  caseModalCategory.textContent = content.category;
  caseModalTitle.textContent = content.title;
  caseProblem.textContent = content.problem;
  caseAction.textContent = content.action;
  caseResult.textContent = content.result;
  caseTech.textContent = content.tech;
  caseModal.classList.add("is-open");
  caseModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

function closeCaseStudy() {
  if (!caseModal) return;
  caseModal.classList.remove("is-open");
  caseModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

caseOpeners.forEach((button) => {
  button.addEventListener("click", () => openCaseStudy(button.dataset.openCase));
});

caseClosers.forEach((button) => button.addEventListener("click", closeCaseStudy));

const architectureContent = {
  api: {
    title: "API Layer",
    text:
      "Build clear Java/Spring Boot service contracts with validation, error handling, maintainable service boundaries, and production-friendly APIs.",
    impact: "Impact: clearer ownership and safer backend change.",
  },
  workflow: {
    title: "Workflow Orchestration",
    text:
      "Model long-running backend processes with Temporal workflows, retries, traceable state transitions, and operational recovery paths.",
    impact: "Impact: more reliable distributed operations.",
  },
  data: {
    title: "Data Processing",
    text:
      "Design ingestion and batch flows where correctness, traceability, and timeliness matter for fintech and risk use cases.",
    impact: "Impact: dependable data movement for business-critical systems.",
  },
  persistence: {
    title: "Persistence",
    text:
      "Tune SQL access paths, indexing, data models, stored procedures, and query behavior for high-volume enterprise workloads.",
    impact: "Impact: better performance and predictable runtime behavior.",
  },
  delivery: {
    title: "Delivery & Observability",
    text:
      "Improve CI/CD, logging, monitoring, release quality, and zero-downtime deployment practices around backend systems.",
    impact: "Impact: faster releases with stronger production confidence.",
  },
};

const archNodes = document.querySelectorAll("[data-arch]");
const archDetailTitle = document.querySelector("#archDetailTitle");
const archDetailText = document.querySelector("#archDetailText");
const archDetailImpact = document.querySelector("#archDetailImpact");

archNodes.forEach((node) => {
  node.addEventListener("click", () => {
    const content = architectureContent[node.dataset.arch];
    if (!content || !archDetailTitle || !archDetailText || !archDetailImpact) return;

    archNodes.forEach((item) => item.classList.toggle("is-active", item === node));
    archDetailTitle.textContent = content.title;
    archDetailText.textContent = content.text;
    archDetailImpact.textContent = content.impact;
  });
});

const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const navSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveNav = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const updateActiveNav = () => {
  if (!navSections.length) return;

  const scrollMarker = window.scrollY + window.innerHeight * 0.42;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const nearPageEnd = window.scrollY >= maxScroll - 24;
  let activeSection = navSections[0];

  if (nearPageEnd) {
    activeSection = navSections[navSections.length - 1];
  } else {
    navSections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      if (sectionTop <= scrollMarker) {
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
