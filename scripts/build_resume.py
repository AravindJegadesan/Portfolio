from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
)


OUTPUT = "assets/Aravind-Jegadesan-Resume.pdf"
PAGE_WIDTH, PAGE_HEIGHT = LETTER


def p(text, style):
    return Paragraph(text, style)


def bullets(items, style):
    return [Paragraph(f"- {item}", style) for item in items]


def draw_background(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.white)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)
    canvas.setStrokeColor(colors.HexColor("#d7dee8"))
    canvas.setLineWidth(0.45)
    canvas.rect(0.34 * inch, 0.34 * inch, PAGE_WIDTH - 0.68 * inch, PAGE_HEIGHT - 0.68 * inch, stroke=1, fill=0)
    canvas.setStrokeColor(colors.HexColor("#12355b"))
    canvas.setLineWidth(1.1)
    canvas.line(0.5 * inch, PAGE_HEIGHT - 0.35 * inch, PAGE_WIDTH - 0.5 * inch, PAGE_HEIGHT - 0.35 * inch)
    canvas.setStrokeColor(colors.HexColor("#c8a24a"))
    canvas.setLineWidth(0.8)
    canvas.line(0.5 * inch, PAGE_HEIGHT - 0.38 * inch, 2.15 * inch, PAGE_HEIGHT - 0.38 * inch)
    canvas.restoreState()


def build():
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=LETTER,
        rightMargin=0.56 * inch,
        leftMargin=0.56 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.48 * inch,
        title="Aravind Jegadesan Resume",
        author="Aravind Jegadesan",
    )

    styles = getSampleStyleSheet()
    title = ParagraphStyle(
        "Title",
        parent=styles["Title"],
        fontName="Helvetica-Bold",
        fontSize=21.3,
        leading=23.2,
        textColor=colors.HexColor("#111827"),
        alignment=TA_LEFT,
        spaceAfter=1,
    )
    headline = ParagraphStyle(
        "Headline",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=9.5,
        leading=10.8,
        textColor=colors.HexColor("#12355b"),
        spaceAfter=2.2,
    )
    contact = ParagraphStyle(
        "Contact",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.45,
        leading=8.55,
        textColor=colors.HexColor("#4b5563"),
        spaceAfter=3,
    )
    target = ParagraphStyle(
        "Target",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=7.55,
        leading=8.7,
        textColor=colors.HexColor("#243447"),
        backColor=colors.HexColor("#f4f7fb"),
        borderPadding=(2.5, 4, 2.5, 4),
        spaceAfter=4,
    )
    section = ParagraphStyle(
        "Section",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=8.7,
        leading=9.6,
        textColor=colors.HexColor("#12355b"),
        spaceBefore=5,
        spaceAfter=1.2,
        uppercase=True,
    )
    body = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.35,
        leading=8.4,
        textColor=colors.HexColor("#1f2937"),
        spaceAfter=1.8,
    )
    role = ParagraphStyle(
        "Role",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=8.05,
        leading=9.05,
        textColor=colors.HexColor("#111827"),
        spaceBefore=2.6,
        spaceAfter=0.6,
    )
    meta = ParagraphStyle(
        "Meta",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=6.95,
        leading=7.95,
        textColor=colors.HexColor("#6b7280"),
        spaceAfter=1,
    )

    story = []
    story.append(p("Aravind Jegadesan", title))
    story.append(p("Senior Software Engineer", headline))
    story.append(
        p(
            "Chennai, India | Open to Remote and Hybrid roles | aravindjegadesan@gmail.com | +91 9626034710 | "
            "linkedin.com/in/aravind-jegadesan-11ba6269",
            contact,
        )
    )
    story.append(p("Target roles: Lead Backend Engineer | Staff-level IC | Backend Architect | Forward Deployed Engineer", target))
    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#12355b"), spaceAfter=4))

    def section_heading(text):
        story.append(p(text, section))
        story.append(HRFlowable(width="100%", thickness=0.45, color=colors.HexColor("#c8a24a"), spaceAfter=2.6))

    section_heading("Professional Summary")
    story.append(
        p(
            "Senior Software Engineer with 10+ years of experience building enterprise Java, Spring Boot, distributed "
            "workflow, CI/CD, integration, and data-intensive systems across telecom, fintech, and financial "
            "services environments. Strong fit for Lead Backend Engineer, Staff-level IC, Backend Architect, "
            "and Forward Deployed Engineer roles requiring hands-on execution, architecture judgment, customer-facing "
            "implementation, release maturity, system reliability, and performance optimization.",
            body,
        )
    )

    section_heading("Core Technical Strengths")
    story.append(
        p(
            "<b>Architecture:</b> Distributed systems, Temporal workflows, event-driven design, fault tolerance, "
            "service boundaries, scalability tuning<br/>"
            "<b>Backend:</b> Java, Spring Boot, Spring Batch, Hibernate, REST APIs, design patterns, system design<br/>"
            "<b>Cloud and Delivery:</b> Docker, Kubernetes, GitHub Actions, Jenkins, CI/CD, zero-downtime deployments, monitoring<br/>"
            "<b>Data:</b> Oracle SQL, PostgreSQL, MySQL, query optimization, indexing, data modeling, stored procedures",
            body,
        )
    )

    section_heading("Engineering Outcomes")
    story.extend(
        bullets(
            [
                "Improved release speed and reliability by 45% by implementing CI/CD pipelines with GitHub Actions.",
                "Designed Temporal-based distributed workflows for automated backend orchestration and operational visibility.",
                "Improved backend module performance by 30% through refactoring, database indexing, and query optimization.",
                "Built SEM data ingestion pipelines supporting fraud and risk detection use cases.",
                "Reduced manual deployment intervention by 35% through build and deployment automation.",
            ],
            body,
        )
    )

    section_heading("Professional Experience")
    experiences = [
        (
            "Senior Software Engineer - Oportun",
            "Dec 2024 - Present | Chennai, India | Remote",
            [
                "Own backend reliability, CI/CD maturity, Temporal orchestration, SEM ingestion pipelines, integrations, and production readiness for fintech risk systems.",
                "Implemented GitHub Actions pipelines that improved release speed and reliability by 45%.",
                "Designed scalable Temporal workflows for distributed backend orchestration, retries, and operational traceability.",
                "Strengthened service resilience through logging, monitoring, fault tolerance, and zero-downtime deployment practices.",
            ],
        ),
        (
            "Specialist Software Engineer - Societe Generale",
            "Mar 2022 - Dec 2024 | Chennai, India | Hybrid",
            [
                "Delivered scalable and secure backend modules for high-volume financial transaction systems.",
                "Improved backend performance by 30% through code refactoring, database indexing, and query path optimization.",
                "Supported architecture reviews and guided stronger Spring Boot, CI/CD, code quality, and maintainability practices.",
                "Mentored junior engineers through code review, design guidance, and production-quality engineering standards.",
            ],
        ),
        (
            "Application Development Specialist - Accenture Solutions Pvt Ltd",
            "Sep 2019 - Mar 2022 | Chennai, India | Onsite - 5 days office",
            [
                "Built enterprise-grade APIs using Spring Boot, Hibernate, and Oracle SQL.",
                "Improved production stability through structured exception handling, monitoring, and error tracking.",
                "Collaborated in agile delivery teams to ship secure, maintainable backend services.",
            ],
        ),
        (
            "Senior System Engineer - Infosys Limited",
            "Jan 2019 - Sep 2019 | Chennai, India | Onsite - 5 days office",
            [
                "Built cloud-compatible Java backend modules across Windows and Linux environments.",
                "Automated build and deployment tasks, reducing manual intervention by 35%.",
                "Optimized multithreaded services and database queries for improved runtime performance.",
            ],
        ),
        (
            "Programmer - Chainsys India Pvt Ltd",
            "Jun 2016 - Jan 2019 | Chennai, India | Onsite - 5 days office",
            [
                "Developed Java backend workflows and database-backed application modules for enterprise data processing use cases.",
                "Built data pipelines and batch processing flows, increasing processing efficiency by 20%.",
                "Created and optimized stored procedures, triggers, indexes, and SQL queries for high-volume database operations.",
                "Supported production issue analysis by debugging application flows, validating data movement, and correcting failed processing scenarios.",
                "Collaborated with QA and implementation teams to deliver stable releases, defect fixes, and client-specific enhancements.",
            ],
        ),
    ]

    for title_text, meta_text, items in experiences:
        story.append(p(title_text, role))
        story.append(p(meta_text, meta))
        story.extend(bullets(items, body))

    section_heading("Education")
    story.append(p("B.Tech in Computer Science and Engineering - B.S. Abdur Rahman University, Chennai | 2012 - 2016", body))

    doc.build(story, onFirstPage=draw_background, onLaterPages=draw_background)


if __name__ == "__main__":
    build()
