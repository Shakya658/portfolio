/* ================================================================
   MAIN.JS — Shirish Man Shakya Portfolio
   Three responsibilities:
     1. Scroll-reveal animation trigger (IntersectionObserver)
     2. Nav "scrolled" class toggle
     3. Resume HTML file download generator
   No external dependencies. Pure vanilla JS.
   ================================================================ */

'use strict';

/* ----------------------------------------------------------------
   1. SCROLL-REVEAL
   Adds `.is-visible` to any element with `.reveal` once it enters
   the viewport. The CSS transitions then fade + slide it in.
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const THRESHOLD   = 0.12;   // 12% of element visible triggers animation
  const ROOT_MARGIN = '0px 0px -40px 0px'; // small negative bottom margin = earlier exit

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after reveal so it doesn't re-trigger on scroll-up
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: THRESHOLD, rootMargin: ROOT_MARGIN });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}


/* ----------------------------------------------------------------
   2. NAV SCROLL STATE
   Adds `.nav--scrolled` once the user scrolls past the hero fold.
   The CSS transitions the nav from transparent → frosted glass.
   ---------------------------------------------------------------- */
function initNavScroll() {
  const nav       = document.getElementById('nav');
  const THRESHOLD = 80; // px from top before nav solidifies

  function updateNav() {
    if (window.scrollY > THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  // Use passive listener for scroll performance
  window.addEventListener('scroll', updateNav, { passive: true });

  // Run once on load in case page is already scrolled
  updateNav();
}


/* ----------------------------------------------------------------
   3. RESUME DOWNLOAD
   Generates a clean, ATS-friendly resume as an HTML file that the
   browser downloads immediately. No server required.
   ---------------------------------------------------------------- */
function downloadResume() {
  const resumeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Shirish Man Shakya — Resume</title>
<style>
  /* ATS-safe minimal styles */
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Calibri', Arial, sans-serif;
    font-size: 10.5pt;
    line-height: 1.45;
    color: #1a1917;
    background: #fff;
    padding: 2cm 2.2cm;
    max-width: 210mm;
    margin: 0 auto;
  }
  h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 3px; }
  .tagline  { font-size: 10.5pt; color: #555; margin-bottom: 6px; }
  .contacts {
    font-size: 9.5pt; color: #444;
    display: flex; flex-wrap: wrap; gap: 6px 18px;
    margin-bottom: 18px;
  }
  .contacts a { color: #1A4FBA; text-decoration: none; }
  hr { border: none; border-top: 1.5px solid #1a1917; margin: 10px 0 8px; }
  .section-title {
    font-size: 10.5pt; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.8px;
    margin-bottom: 7px;
  }
  .section { margin-bottom: 14px; }
  .summary { font-size: 10pt; color: #333; line-height: 1.55; }
  .highlights {
    display: flex; flex-wrap: wrap;
    gap: 4px 20px; font-size: 9.5pt; color: #444; margin-top: 6px;
  }
  .highlights span::before { content: '✓ '; color: #1A4FBA; }
  /* Job */
  .job { margin-bottom: 11px; }
  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .job-title   { font-weight: 700; font-size: 10.5pt; }
  .job-company { font-weight: 600; color: #1A4FBA; }
  .job-meta    { font-size: 9pt; color: #666; text-align: right; }
  ul.bullets   { margin: 5px 0 0 14px; }
  ul.bullets li { font-size: 10pt; margin-bottom: 3px; line-height: 1.4; color: #333; }
  /* Projects */
  .project { margin-bottom: 10px; }
  .project-header { display: flex; justify-content: space-between; align-items: baseline; }
  .project-name   { font-weight: 700; font-size: 10.5pt; }
  .project-tag    { font-size: 8.5pt; color: #666; }
  .project-detail { font-size: 10pt; color: #444; margin-top: 2px; line-height: 1.45; }
  /* Skills */
  .skills-grid {
    display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px 20px;
  }
  .skill-row { font-size: 9.5pt; line-height: 1.5; }
  .skill-cat { font-weight: 700; }
  /* Education */
  .edu-item  { display: flex; justify-content: space-between; margin-bottom: 5px; }
  .edu-deg   { font-weight: 700; font-size: 10.5pt; }
  .edu-school{ font-size: 9.5pt; color: #555; }
  .edu-right { font-size: 9.5pt; color: #555; text-align: right; }
</style>
</head>
<body>

<h1>Shirish Man Shakya</h1>
<div class="tagline">Data Analyst · ML Engineer · Sydney, NSW</div>
<div class="contacts">
  <span>📍 Sydney, NSW 2000</span>
  <span>📞 0492 877 385</span>
  <a href="mailto:shirishshakya4@gmail.com">shirishshakya4@gmail.com</a>
  <a href="https://linkedin.com/in/shirish-man-shakya">linkedin.com/in/shirish-man-shakya</a>
  <a href="https://github.com/Shakya658">github.com/Shakya658</a>
  <span>ACS Member</span>
</div>

<hr>
<div class="section">
  <div class="section-title">Summary</div>
  <p class="summary">
    Master of Data Science graduate from UTS (GPA 6.09/7.0 · Academic Excellence Scholarship)
    with hands-on experience across the full data lifecycle — SQL pipelines, ML modelling,
    explainable AI, and stakeholder-facing dashboards. Four end-to-end projects covering retail
    analytics, telecom churn prediction ($120K revenue recovery), clinical AI, and cancer
    genomics (HD capstone). Seeking a junior data analyst, business analyst, or ML engineer role
    in Sydney.
  </p>
  <div class="highlights">
    <span>Python · SQL · XGBoost · SHAP</span>
    <span>Tableau · Power BI · Streamlit</span>
    <span>GCP · Snowflake · Apache Airflow</span>
    <span>A/B Testing · RFM · Cohort Analysis</span>
  </div>
</div>

<hr>
<div class="section">
  <div class="section-title">Projects</div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">Customer Churn Prediction &amp; Revenue Recovery</span>
      <span class="project-tag">Python · XGBoost · Scikit-learn · Streamlit</span>
    </div>
    <div class="project-detail">
      Built predictive churn model on 7,043 telecom customer records. Benchmarked Logistic
      Regression, Random Forest, and XGBoost; engineered 15+ behavioural features. Achieved
      ROC AUC 0.85 (81% accuracy, cross-validated). Quantified $120K annual revenue recovery
      opportunity. Delivered Streamlit dashboard for non-technical stakeholders.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">Retail Sales Analytics Pipeline</span>
      <span class="project-tag">PostgreSQL · Medallion Architecture · CTEs · Window Functions</span>
    </div>
    <div class="project-detail">
      Production-grade Medallion Architecture (Bronze→Silver→Gold) in PostgreSQL processing
      1.6M+ e-commerce transactions across 9 relational tables. Applied RFM segmentation and
      cohort analysis; identified that top 12.3% of customers drive 21.1% of revenue.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">30-Day Hospital Readmission Risk (Clinical AI)</span>
      <span class="project-tag">Python · XGBoost · SHAP · Optuna · Streamlit</span>
    </div>
    <div class="project-detail">
      Trained and explained clinical risk model on 101,766 patient records. Engineered 96
      features; addressed class imbalance with stratified 5-fold CV; Bayesian hyperparameter
      tuning (Optuna, 50 trials). ROC AUC 0.67 — consistent with published clinical benchmarks.
      SHAP-based explainability dashboard for clinical users.
    </div>
  </div>

  <div class="project">
    <div class="project-header">
      <span class="project-name">Cancer Risk Stratification via Multi-Omics (UTS Capstone · HD)</span>
      <span class="project-tag">Python · Scikit-learn · SHAP · Clustering</span>
    </div>
    <div class="project-detail">
      Multi-omics analysis of 1,200 colorectal cancer patients integrating four biological data
      types. Reduced dimensionality by 80% without loss of clinical signal; identified 3 distinct
      patient risk subgroups. SHAP surfaced top 15 biomarkers per subgroup. Graded High
      Distinction by UTS examiners.
    </div>
  </div>
</div>

<hr>
<div class="section">
  <div class="section-title">Experience</div>

  <div class="job">
    <div class="job-header">
      <span>
        <span class="job-title">Data Operations Specialist</span>
        · <span class="job-company">Invisible Technologies</span>
      </span>
      <span class="job-meta">Aug 2022 – Jul 2024 · Remote</span>
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
        <span class="job-title">IT Systems &amp; Data Supervisor</span>
        · <span class="job-company">Tripura Secondary School</span>
      </span>
      <span class="job-meta">Mar 2020 – Aug 2022 · Kathmandu, Nepal</span>
    </div>
    <ul class="bullets">
      <li>Designed and implemented relational database systems and network infrastructure from scratch, improving operational efficiency by ~25%.</li>
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
    <div class="skill-row"><span class="skill-cat">Cloud / Eng:</span> GCP, Airflow, ETL, Git, Linux</div>
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
    <div class="edu-right">Jun 2023 – Jun 2025<br>GPA 6.09 / 7.0 · Academic Excellence Scholarship</div>
  </div>
  <div class="edu-item">
    <div>
      <div class="edu-deg">Professional Year Program, Information Technology</div>
      <div class="edu-school">QIBA · Sydney, NSW</div>
    </div>
    <div class="edu-right">Jan 2026 – Present</div>
  </div>
  <div class="edu-item">
    <div>
      <div class="edu-deg">Bachelor of Engineering, Computer Science</div>
      <div class="edu-school">Nitte Meenakshi Institute of Technology · India</div>
    </div>
    <div class="edu-right">Jun 2017 – Jun 2021</div>
  </div>
</div>

</body>
</html>`;

  const blob = new Blob([resumeHTML], { type: 'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = 'Shirish_Man_Shakya_Resume.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


/* ----------------------------------------------------------------
   INIT — wire everything up once the DOM is ready
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
});

// Expose downloadResume globally so onclick="" attributes in HTML work
window.downloadResume = downloadResume;
