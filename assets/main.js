'use strict';

/* ================================================================
   MAIN.JS — Shirish Man Shakya Portfolio
   Responsibilities:
     1. Scroll-reveal animation (IntersectionObserver)
     2. Nav scroll-state (transparent → frosted glass)
     3. Active nav link tracking (highlights current section)
     4. Mobile hamburger menu toggle
     5. Resume HTML download generator
     6. Footer year auto-update
     7. Smooth external link safety (target="_blank" rel check)
   No external dependencies. Vanilla JS only.
   ================================================================ */

/* ----------------------------------------------------------------
   1. SCROLL REVEAL
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ----------------------------------------------------------------
   2. NAV SCROLL STATE
   ---------------------------------------------------------------- */
function initNavScroll() {
  const nav = document.getElementById('nav');
  const THRESHOLD = 80;

  function updateNav() {
    nav.classList.toggle('nav--scrolled', window.scrollY > THRESHOLD);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/* ----------------------------------------------------------------
   3. ACTIVE NAV LINK TRACKING
   Highlights the nav link for whichever section is most visible.
   ---------------------------------------------------------------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${id}`;
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
            // aria-current="false" is valid; remove if prefer no attribute
            if (!isActive) link.removeAttribute('aria-current');
          });
        }
      });
    },
    {
      rootMargin: `-${64}px 0px -55% 0px`,
      threshold: 0,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

/* ----------------------------------------------------------------
   4. MOBILE NAV TOGGLE
   ---------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById('navHamburger');
  const navLinks  = document.getElementById('navLinks');

  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.setAttribute('aria-expanded', 'true');
    navLinks.classList.add('is-open');
    document.addEventListener('keydown', handleEsc);
  }

  function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(e) {
    if (e.key === 'Escape') {
      closeMenu();
      hamburger.focus();
    }
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a nav link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('is-open') &&
      !hamburger.contains(e.target) &&
      !navLinks.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

/* ----------------------------------------------------------------
   5. FOOTER YEAR
   ---------------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------------
   6. RESUME DOWNLOAD
   Generates an ATS-friendly, clean resume as a downloadable HTML file.
   ---------------------------------------------------------------- */
function downloadResume() {
  const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Shirish Man Shakya — Resume</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Calibri', Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.45;
    color: #1a1917;
    background: #fff;
    padding: 1.8cm 2.2cm;
    max-width: 210mm;
    margin: 0 auto;
  }
  h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 3px; }
  .tagline { font-size: 10.5pt; color: #555; margin-bottom: 6px; }
  .contacts {
    font-size: 9.5pt; color: #444;
    display: flex; flex-wrap: wrap; gap: 5px 18px;
    margin-bottom: 16px;
  }
  .contacts a { color: #1A4FBA; text-decoration: none; }
  hr { border: none; border-top: 1.5px solid #1a1917; margin: 9px 0 8px; }
  .section-title {
    font-size: 10pt; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.8px;
    margin-bottom: 6px;
  }
  .section { margin-bottom: 13px; }
  .summary { font-size: 10pt; color: #333; line-height: 1.55; }
  .highlights {
    display: flex; flex-wrap: wrap;
    gap: 4px 20px; font-size: 9.5pt; color: #444; margin-top: 6px;
  }
  .highlights span::before { content: '✓ '; color: #1A4FBA; }
  .job { margin-bottom: 11px; }
  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .job-title   { font-weight: 700; font-size: 10.5pt; }
  .job-company { font-weight: 600; color: #1A4FBA; }
  .job-meta    { font-size: 9pt; color: #666; text-align: right; white-space: nowrap; }
  ul.bullets   { margin: 5px 0 0 14px; }
  ul.bullets li { font-size: 10pt; margin-bottom: 3px; line-height: 1.4; color: #333; }
  .project { margin-bottom: 10px; }
  .project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .project-name   { font-weight: 700; font-size: 10.5pt; }
  .project-tag    { font-size: 8.5pt; color: #666; white-space: nowrap; }
  .project-detail { font-size: 10pt; color: #444; margin-top: 2px; line-height: 1.45; }
  .skills-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px 20px;
  }
  .skill-row { font-size: 9.5pt; line-height: 1.5; }
  .skill-cat { font-weight: 700; }
  .edu-item  { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px; gap: 12px; }
  .edu-deg   { font-weight: 700; font-size: 10.5pt; }
  .edu-school{ font-size: 9.5pt; color: #555; margin-top: 1px; }
  .edu-right { font-size: 9.5pt; color: #555; text-align: right; white-space: nowrap; }
  @media print {
    body { padding: 1cm 1.5cm; }
  }
</style>
</head>
<body>

<h1>Shirish Man Shakya</h1>
<div class="tagline">Data Analyst &middot; ML Engineer &middot; Sydney, NSW</div>
<div class="contacts">
  <span>&#128205; Sydney, NSW 2000</span>
  <a href="mailto:shirishshakya4@gmail.com">shirishshakya4@gmail.com</a>
  <a href="https://linkedin.com/in/shirish-man-shakya">linkedin.com/in/shirish-man-shakya</a>
  <a href="https://github.com/Shakya658">github.com/Shakya658</a>
  <span>ACS Member &middot; Full Working Rights</span>
</div>

<hr>
<div class="section">
  <div class="section-title">Summary</div>
  <p class="summary">
    Master of Data Science graduate from UTS (GPA 6.09/7.0 &middot; Academic Excellence Scholarship)
    with hands-on experience across the full data lifecycle &mdash; SQL pipelines, ML modelling,
    explainable AI, and stakeholder-facing dashboards. Five end-to-end projects covering SaaS revenue
    analytics, retail analytics, telecom churn prediction ($120K revenue recovery), clinical AI, and
    cancer genomics (HD capstone). Seeking a junior data analyst, business analyst, or ML engineer role
    in Sydney.
  </p>
  <div class="highlights">
    <span>Python &middot; SQL &middot; XGBoost &middot; SHAP</span>
    <span>Tableau &middot; Power BI &middot; Streamlit</span>
    <span>GCP &middot; Snowflake &middot; Apache Airflow</span>
    <span>A/B Testing &middot; RFM &middot; Cohort Analysis</span>
  </div>
</div>

<hr>
<div class="section">
  <div class="section-title">Projects</div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">HarbourMetrics: SaaS Revenue &amp; Retention Analytics</span>
      <span class="project-tag">PostgreSQL &middot; Power BI &middot; DAX &middot; KPI Engineering</span>
    </div>
    <div class="project-detail">
      End-to-end SaaS BI platform simulating 2,000 customers across 24 months. Engineered MRR, churn,
      and cohort KPIs in PostgreSQL with window functions and CTEs. Built an executive Power BI dashboard
      with custom DAX measures and dynamic active subscriber tracking. Surfaced enterprise tier as primary
      revenue engine and identified February churn spike and Q4 recovery pattern.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">Customer Churn Prediction &amp; Revenue Recovery</span>
      <span class="project-tag">Python &middot; XGBoost &middot; Scikit-learn &middot; Power BI</span>
    </div>
    <div class="project-detail">
      Churn model on 7,043 telecom customer records; benchmarked Logistic Regression, Random Forest
      and XGBoost with 15+ engineered features. Achieved ROC AUC 0.85 (81% accuracy, cross-validated).
      Quantified $120K annual revenue recovery opportunity. Power BI dashboard for non-technical stakeholders.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">Retail Sales Analytics Pipeline</span>
      <span class="project-tag">PostgreSQL &middot; dbt &middot; Snowflake &middot; Power BI</span>
    </div>
    <div class="project-detail">
      Bronze&rarr;Silver&rarr;Gold Medallion Architecture processing 1.6M+ e-commerce transactions
      across 9 relational tables. RFM segmentation and cohort analysis identified top 12.3% of
      customers drive 21.1% of revenue. Flagged 86.82% on-time delivery in highest-volume market.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">30-Day Hospital Readmission Risk (Clinical AI)</span>
      <span class="project-tag">Python &middot; XGBoost &middot; SHAP &middot; Optuna &middot; Streamlit</span>
    </div>
    <div class="project-detail">
      Clinical risk model on 101,766 patient records; 96 engineered features, stratified 5-fold CV,
      Bayesian hyperparameter tuning (Optuna, 50 trials). ROC AUC 0.67 &mdash; consistent with published
      clinical benchmarks. SHAP-based explainability dashboard for clinical users.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">Cancer Risk Stratification via Multi-Omics &mdash; UTS Capstone (HD)</span>
      <span class="project-tag">Python &middot; Scikit-learn &middot; SHAP &middot; Clustering &middot; PCA</span>
    </div>
    <div class="project-detail">
      Multi-omics analysis of 1,200 colorectal cancer patients across four biological data types.
      80% dimensionality reduction; 3 distinct patient risk subgroups identified; top 15 biomarkers
      per subgroup via SHAP. Awarded High Distinction by UTS examiners.
    </div>
  </div>
</div>

<hr>
<div class="section">
  <div class="section-title">Experience</div>

  <div class="job">
    <div class="job-header">
      <span>
        <span class="job-title">Data Analyst</span>
        &nbsp;&middot;&nbsp;
        <span class="job-company">Invisible Technologies</span>
      </span>
      <span class="job-meta">Aug 2022 &ndash; Jul 2024 &middot; Remote</span>
    </div>
    <ul class="bullets">
      <li>Built Python automation scripts to extract and validate data from billing PDFs, eliminating manual entry across enterprise client workflows.</li>
      <li>Transformed unstructured billing records into clean, structured datasets for automated compliance reporting on a sustainability analytics platform.</li>
      <li>Performed large-scale dataset validation ensuring accuracy and consistency across multiple client engagements.</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span>
        <span class="job-title">Night Fill Team Member</span>
        &nbsp;&middot;&nbsp;
        <span class="job-company">Coles Supermarkets</span>
      </span>
      <span class="job-meta">Jul 2023 &ndash; Present &middot; Sydney, NSW</span>
    </div>
    <ul class="bullets">
      <li>Sustained 20 hours of paid work per week throughout full-time Masters study, consistently managing competing priorities across two years.</li>
    </ul>
  </div>

  <div class="job">
    <div class="job-header">
      <span>
        <span class="job-title">IT Systems &amp; Data Supervisor</span>
        &nbsp;&middot;&nbsp;
        <span class="job-company">Tripura Secondary School</span>
      </span>
      <span class="job-meta">Mar 2020 &ndash; Aug 2022 &middot; Kathmandu, Nepal</span>
    </div>
    <ul class="bullets">
      <li>Designed and implemented relational database systems from scratch, improving operational efficiency by ~25%.</li>
      <li>Led migration to remote systems during COVID-19, maintaining continuity for 50+ students and staff.</li>
    </ul>
  </div>
</div>

<hr>
<div class="section">
  <div class="section-title">Skills</div>
  <div class="skills-grid">
    <div class="skill-row"><span class="skill-cat">Languages:</span> Python, SQL, Bash</div>
    <div class="skill-row"><span class="skill-cat">ML / AI:</span> XGBoost, Scikit-learn, SHAP, Optuna</div>
    <div class="skill-row"><span class="skill-cat">Visualisation:</span> Tableau, Power BI, Streamlit</div>
    <div class="skill-row"><span class="skill-cat">Databases:</span> PostgreSQL, Snowflake, BigQuery</div>
    <div class="skill-row"><span class="skill-cat">Cloud / Eng:</span> GCP, Airflow, ETL/ELT, Git, Linux</div>
    <div class="skill-row"><span class="skill-cat">Analytics:</span> RFM, Cohort, A/B Testing, Bayesian Opt.</div>
  </div>
</div>

<hr>
<div class="section">
  <div class="section-title">Education</div>

  <div class="edu-item">
    <div>
      <div class="edu-deg">Master of Data Science and Innovation</div>
      <div class="edu-school">University of Technology Sydney (UTS)</div>
    </div>
    <div class="edu-right">Jun 2023 &ndash; Jun 2025<br>GPA 6.09 / 7.0 &middot; Academic Excellence Scholarship</div>
  </div>

  <div class="edu-item">
    <div>
      <div class="edu-deg">Professional Year Program, Information Technology</div>
      <div class="edu-school">QIBA &middot; Sydney, NSW</div>
    </div>
    <div class="edu-right">Jan 2026 &ndash; Present</div>
  </div>

  <div class="edu-item">
    <div>
      <div class="edu-deg">Bachelor of Engineering, Computer Science</div>
      <div class="edu-school">Nitte Meenakshi Institute of Technology &middot; India</div>
    </div>
    <div class="edu-right">Jun 2017 &ndash; Jun 2021</div>
  </div>
</div>

</body>
</html>`;

  const blob = new Blob([resumeHTML], { type: 'text/html;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Shirish_Man_Shakya_Resume.html';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Small delay before revoking so the download can start
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* ----------------------------------------------------------------
   7. EXTERNAL LINK SAFETY
   Ensures all target="_blank" links have the correct rel attribute.
   ---------------------------------------------------------------- */
function auditExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const rel = link.getAttribute('rel') || '';
    if (!rel.includes('noopener')) {
      link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
    }
  });
}

/* ----------------------------------------------------------------
   INIT
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initActiveNav();
  initMobileNav();
  initFooterYear();
  auditExternalLinks();
});

// Expose resume function globally for onclick attributes in HTML
window.downloadResume = downloadResume;
