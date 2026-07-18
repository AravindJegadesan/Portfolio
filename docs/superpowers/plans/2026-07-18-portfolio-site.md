# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a professional, modern static portfolio site for Aravind Jegadesan and prepare it for GitHub Pages hosting.

**Architecture:** Use a dependency-free static site so it can be hosted from GitHub Pages with no build pipeline. Keep content in `index.html`, styling in `styles.css`, light interactions in `script.js`, and automated checks in `tests/verify-site.mjs`.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js for local verification.

## Global Constraints

- Present Aravind Jegadesan as a Senior Software Engineer - Backend with 10+ years of experience.
- Use resume-derived content: Java, Spring Boot, Temporal, Kubernetes, CI/CD, databases, distributed systems, and enterprise backend impact.
- Keep the first screen professional and portfolio-focused, not a marketing landing page.
- Make the site GitHub Pages-ready from the repository root.
- Avoid external runtime dependencies.
- Preserve the user's resume contact details: `aravindjegadesan@gmail.com` and `linkedin.com/in/aravind-jegadesan-11ba6269`.

---

### Task 1: Verification Guard

**Files:**
- Create: `tests/verify-site.mjs`

**Interfaces:**
- Consumes: `index.html`, `styles.css`, `script.js`
- Produces: A Node.js verification command that exits non-zero when required portfolio content or assets are missing.

- [ ] **Step 1: Write the failing test**

```javascript
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = ["index.html", "styles.css", "script.js"];
const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  throw new Error(`Missing required files: ${missing.join(", ")}`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");

const htmlChecks = [
  "Aravind Jegadesan",
  "Senior Software Engineer",
  "10+ years",
  "Backend",
  "Java",
  "Spring Boot",
  "Temporal",
  "Kubernetes",
  "CI/CD",
  "Professional Experience",
  "Oportun",
  "Societe Generale",
  "Accenture",
  "Infosys",
  "Chainsys",
  "aravindjegadesan@gmail.com",
  "linkedin.com/in/aravind-jegadesan-11ba6269",
];

const missingHtml = htmlChecks.filter((text) => !html.includes(text));
if (missingHtml.length) {
  throw new Error(`index.html is missing required content: ${missingHtml.join(", ")}`);
}

if (!html.includes('href="styles.css"')) {
  throw new Error("index.html must link styles.css");
}

if (!html.includes('src="script.js"')) {
  throw new Error("index.html must load script.js");
}

if (!css.includes("@media") || !css.includes(":focus-visible")) {
  throw new Error("styles.css must include responsive and focus-visible styling");
}

if (!js.includes("IntersectionObserver") || !js.includes("copyEmail")) {
  throw new Error("script.js must include reveal behavior and copyEmail handling");
}

console.log("Portfolio verification passed.");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/verify-site.mjs`
Expected: FAIL with missing required files.

- [ ] **Step 3: Keep the test unchanged for implementation**

The test remains as the acceptance guard for Task 2.

### Task 2: Static Portfolio

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `script.js`
- Create: `README.md`

**Interfaces:**
- Consumes: Required content from Task 1.
- Produces: A complete static portfolio site hosted from the repository root.

- [ ] **Step 1: Write `index.html`**

Create semantic sections for hero, metrics, backend strengths, skill matrix, professional experience, education, and contact.

- [ ] **Step 2: Write `styles.css`**

Create a polished, responsive visual system with professional colors, stable layout dimensions, keyboard focus styles, and print-friendly basics.

- [ ] **Step 3: Write `script.js`**

Add progressive reveal behavior and a copy-email button with graceful fallback.

- [ ] **Step 4: Write `README.md`**

Document that the site is static and can be hosted via GitHub Pages from the root of the default branch.

- [ ] **Step 5: Run verification**

Run: `node tests/verify-site.mjs`
Expected: PASS with `Portfolio verification passed.`

### Task 3: Local Git And Publishing Readiness

**Files:**
- Modify: Git index only

**Interfaces:**
- Consumes: Completed static site.
- Produces: A local commit ready to push to a GitHub repository.

- [ ] **Step 1: Inspect git status**

Run: `git status --short`
Expected: New portfolio files are visible.

- [ ] **Step 2: Commit**

Run: `git add index.html styles.css script.js README.md tests/verify-site.mjs docs/superpowers/plans/2026-07-18-portfolio-site.md && git commit -m "feat: build portfolio site"`
Expected: A commit is created.

- [ ] **Step 3: Publish route**

If a GitHub repository is available, push the commit and enable GitHub Pages from the default branch root. If no repository is available, report the exact blocker and the files are ready for GitHub Pages.
