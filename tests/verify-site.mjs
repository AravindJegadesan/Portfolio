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
