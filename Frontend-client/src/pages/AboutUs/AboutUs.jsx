import { useEffect, useRef, useState } from "react";
import "./AboutUs.css";
import { useTranslation } from "react-i18next";

/* ── Intersection-observer hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Focus-area icons ── */
const focusIcons = [
  /* Education */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>,
  /* Community */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  /* Health */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>,
  /* Vocational */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>,
  /* Livelihood */
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>,
];

const focusColors = ["#fca00c", "#0e926b", "#c0392b", "#0e926b", "#fca00c"];

/* ─────────── SECTION WRAPPER with reveal ─────────── */
function RevealSection({ className = "", children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`au-reveal ${visible ? "au-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────── STAT COUNTER ─────────── */
function StatCounter({ end, suffix = "", label }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1400;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end]);
  return (
    <div ref={ref} className="au-stat">
      <span className="au-stat-number">{count}{suffix}</span>
      <span className="au-stat-label">{label}</span>
    </div>
  );
}

/* ─────────── MAIN COMPONENT ─────────── */
export default function AboutUs() {
  const { t } = useTranslation();
  const [heroVisible, setHeroVisible] = useState(false);
  const basicNeedsPoints = t("basicNeedsPoints", { returnObjects: true });
  const missionPoints = t("missionPoints", { returnObjects: true });

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="au-page">

      {/* ═══════════ HERO ═══════════ */}
      <section className={`au-hero ${heroVisible ? "au-hero--in" : ""}`}>
        <div className="au-hero-bg">
          <div className="au-orb au-orb--1" />
          <div className="au-orb au-orb--2" />
          <div className="au-orb au-orb--3" />
          <div className="au-hero-grid" />
        </div>

        <div className="au-hero-content">
          <span className="au-eyebrow">{t("aboutHeroEyebrow") || "Our Story"}</span>
          <h1 className="au-hero-title">
            {t("aboutHeroTitle") || "Rooted in Service,"}
            <br />
            <em>{t("aboutHeroTitleEm") || "Driven by Purpose"}</em>
          </h1>
          <p className="au-hero-subtitle">
            {t("aboutHeroSubtitle") || "For decades, we have walked alongside tribal and marginalised communities — providing education, healthcare, and livelihoods where they are needed most."}
          </p>
        </div>

        {/* Stats bar */}
{/* Stats bar - Now focused on core pillars instead of numbers */}
<div className="au-hero-stats">
  <div className="au-stat">
    <span className="au-stat-number">{t("aboutStat1")}</span>
    <span className="au-stat-label">{t("aboutStat1Label")}</span>
  </div>
  
  <div className="au-stat-divider" />
  
  <div className="au-stat">
    <span className="au-stat-number">{t("aboutStat2")}</span>
    <span className="au-stat-label">{t("aboutStat2Label")}</span>
  </div>
  
  <div className="au-stat-divider" />
  
  <div className="au-stat">
    <span className="au-stat-number">{t("aboutStat3")}</span>
    <span className="au-stat-label">{t("aboutStat3Label")}</span>
  </div>
</div>
      </section>

      {/* ═══════════ MISSION & VISION ═══════════ */}
      <section className="au-mv-section">
        <RevealSection className="au-mv-grid">
          {/* Mission */}
          <div className="au-mv-card au-mv-card--mission">
            <div className="au-mv-card-accent" style={{ background: "#0e926b" }} />
            <span className="au-mv-tag" style={{ color: "#0e926b", borderColor: "rgba(14,146,107,0.25)", background: "rgba(14,146,107,0.06)" }}>
              Mission
            </span>
            <h2 className="au-mv-heading">{t("missionTitle") || "Our Mission"}</h2>
            <ul className="au-mission-list">
              {(Array.isArray(missionPoints) ? missionPoints : []).map((pt, i) => (
                <li key={i}>
                  <span className="au-mission-dot" style={{ background: "#0e926b" }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* Vision */}
          <div className="au-mv-card au-mv-card--vision">
            <div className="au-mv-card-accent" style={{ background: "#fca00c" }} />
            <span className="au-mv-tag" style={{ color: "#fca00c", borderColor: "rgba(252,160,12,0.25)", background: "rgba(252,160,12,0.06)" }}>
              Vision
            </span>
            <h2 className="au-mv-heading">{t("visionTitle") || "Our Vision"}</h2>
            <p className="au-vision-text">{t("visionText")}</p>
            <div className="au-vision-quote-mark">"</div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════ WHO WE ARE / FOUNDER ═══════════ */}
      <section className="au-founder-section">
        <RevealSection>
          <span className="au-section-eyebrow">Founding Story</span>
          <h2 className="au-section-heading">{t("whoWeAre") || "Who We Are"}</h2>
          <div className="au-heading-line" />
        </RevealSection>

        <RevealSection className="au-founder-grid" delay={100}>
          <div className="au-founder-image-col">
            <div className="au-founder-image-frame">
              <img
                src="/src/assets/sadashivchahan.jpg"
                alt="Founder"
                className="au-founder-img"
                onError={(e) => e.target.parentElement.classList.add("au-founder-image-frame--empty")}
              />
              <div className="au-founder-image-badge">
                <span>Founder</span>
              </div>
            </div>
          </div>

          <div className="au-founder-text-col">
            <div className="au-founder-open-quote">"</div>
            <h3 className="au-founder-subheading">{t("summaryTitle")}</h3>
            <p className="au-founder-body">{t("summaryText")}</p>
            <div className="au-founder-sig">
              <div className="au-founder-sig-line" />
              <span className="au-founder-name">{t("founderName")}</span>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════ FOCUS AREAS ═══════════ */}
      <section className="au-focus-section">
        <div className="au-focus-bg-stripe" />
        <RevealSection>
          <span className="au-section-eyebrow" style={{ color: "#fca00c", borderColor: "rgba(252,160,12,0.3)", background: "rgba(252,160,12,0.08)" }}>
            What We Do
          </span>
          <h2 className="au-section-heading">{t("basicNeedsTitle") || "Our Focus Areas"}</h2>
          <div className="au-heading-line" style={{ background: "#fca00c" }} />
        </RevealSection>

        <div className="au-focus-grid">
          {(Array.isArray(basicNeedsPoints) ? basicNeedsPoints : []).map((pt, i) => (
            <RevealSection key={i} className="au-focus-card" delay={i * 80}>
              <div
                className="au-focus-icon-wrap"
                style={{ color: focusColors[i % focusColors.length], borderColor: `${focusColors[i % focusColors.length]}30`, background: `${focusColors[i % focusColors.length]}0f` }}
              >
                {focusIcons[i] ?? focusIcons[0]}
              </div>
              <p className="au-focus-label">{pt}</p>
              <div className="au-focus-card-bar" style={{ background: focusColors[i % focusColors.length] }} />
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ═══════════ DOCUMENTS ═══════════ */}
      <section className="au-docs-section">
        <RevealSection>
          <span className="au-section-eyebrow">Official Records</span>
          <h2 className="au-section-heading">Documents</h2>
          <div className="au-heading-line" />
        </RevealSection>

        <RevealSection className="au-docs-gallery" delay={100}>
          {["/src/assets/img1.jpg", "/src/assets/img3.jpg"].map((src, i) => (
            <a
              key={i}
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="au-doc-card"
            >
              <div className="au-doc-img-wrap">
                <img src={src} alt={`Document ${i + 1}`} className="au-doc-img" />
                <div className="au-doc-overlay">
                  <span className="au-doc-view-btn">View</span>
                </div>
              </div>
              <p className="au-doc-caption">Official Document {i + 1}</p>
            </a>
          ))}
        </RevealSection>
      </section>

    </div>
  );
}
