import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import "./News.css";

/* ── Intersection-observer reveal ── */
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

function RevealSection({ className = "", children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`news-reveal ${visible ? "news-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const newsLinks = [
  {
    href: "http://www.loksatta.com/mumbai-news/railway-policy-hit-care-and-rehabilitation-of-destitute-children-campaign-1191398/",
    label: "हजारो निराश्रित मुलांच्या शोधाचा शेवटच सापडत नाही",
    source: "Loksatta",
  },
  {
    href: "http://timesofindia.indiatimes.com/india/Chief-secretaries-DGPs-will-be-accountable-for-missing-children-SC/articleshow/44833604.cms",
    label: "Chief secretaries, DGPs will be accountable for missing children: SC",
    source: "Times of India",
  },
  {
    href: "http://timesofindia.indiatimes.com/india/Chhattisgarhs-efforts-sluggish-in-tracing-missing-children-SC/articleshow/44839406.cms",
    label: "Chhattisgarh's efforts sluggish in tracing missing children: SC",
    source: "Times of India",
  },
  {
    href: "http://www.abc.net.au/news/2015-01-31/child-slaves-in-india-rescued-by-police/6059384",
    label: "Hundreds of child slaves rescued by Indian police in shock raids in Hyderabad",
    source: "ABC News",
  },
  {
    href: "http://www.loksatta.com/mumbai-news/child-abuse-violence-increased-1081074/",
    label: "बालकांच्या अपहरणात वाढ",
    source: "Loksatta",
  },
  {
    href: "http://www.ibnlive.com/news/india/75000-children-have-gone-missing-in-india-govt-594849.php",
    label: "75,000 children have gone missing in India: Govt",
    source: "IBN Live",
  },
];

export default function News() {
  const { t } = useTranslation();
  const [heroVisible, setHeroVisible] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightboxSrc(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="news-page">

      {/* ── Hero ── */}
      <section className={`news-hero ${heroVisible ? "news-hero--visible" : ""}`}>
        <div className="news-hero-bg">
          <div className="news-hero-orb news-hero-orb--1" />
          <div className="news-hero-orb news-hero-orb--2" />
          <div className="news-hero-orb news-hero-orb--3" />
        </div>
        <div className="news-hero-content">
          <span className="news-hero-eyebrow">{t("NewsHeroEyebrow") || "Media & Press"}</span>
          <h1 className="news-hero-title">
            {t("NewsHeroTitle") || "In the"}
            <br />
            <em>{t("NewsHeroTitleEm") || "Spotlight"}</em>
          </h1>
          <p className="news-hero-subtitle">
            {t("NewsHeroSubtitle") || "Coverage, interviews, and data on the issues we fight for — missing children, tribal rights, and community welfare."}
          </p>
        </div>
        <div className="news-hero-scroll-hint">
          <span>{t("AwardsHeroScrollHint") || "Scroll to explore"}</span>
          <div className="news-hero-scroll-arrow" />
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="news-content-wrap">

        {/* ── Section: Press Coverage ── */}
        <RevealSection>
          <span className="news-section-eyebrow">Press Coverage</span>
          <h2 className="news-section-heading">{t("NewsPressTitle") || "Newspaper Clippings"}</h2>
          <div className="news-heading-line" />
        </RevealSection>

        <RevealSection className="news-press-grid" delay={80}>
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="news-press-card"
              onClick={() => setLightboxSrc(`/src/assets/News/news${n}.jpg`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxSrc(`/src/assets/News/news${n}.jpg`)}
            >
              <div className="news-press-img-wrap">
                <img
                  src={`/src/assets/News/news${n}.jpg`}
                  alt={`News Coverage ${n}`}
                  className="news-press-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add("news-press-img-wrap--empty");
                  }}
                />
                <div className="news-press-overlay">
                  <span className="news-press-zoom">⤢</span>
                </div>
              </div>
              <p className="news-press-caption">Press Clipping {n} — Click to enlarge</p>
            </div>
          ))}
        </RevealSection>

        {/* ── Two-column section: Interview + Links ── */}
        <div className="news-two-col">

          {/* Left: Interview */}
          <RevealSection className="news-interview-col" delay={0}>
            <span className="news-section-eyebrow news-section-eyebrow--amber">Interview</span>
            <h2 className="news-section-heading">{t("NewsInterviewTitle") || "Watch the Interview"}</h2>
            <div className="news-heading-line news-heading-line--amber" />

            <div className="news-interview-card">
              <a
                href="https://youtu.be/_N74zfGvctM"
                target="_blank"
                rel="noopener noreferrer"
                className="news-yt-link"
                aria-label="Watch interview on YouTube"
              >
                <div className="news-yt-thumb-wrap">
                  <img
                    src="https://img.youtube.com/vi/_N74zfGvctM/0.jpg"
                    alt="Interview thumbnail"
                    className="news-yt-thumb"
                  />
                  <div className="news-yt-play">
                    <span className="news-yt-play-icon" />
                  </div>
                  <div className="news-yt-badge">YouTube ↗</div>
                </div>
              </a>
              <div className="news-interview-meta">
                <p className="news-interview-name">{t("NewsInterviewName") || "Sadashiv Chavhan"}</p>
                <p className="news-interview-role">{t("NewsInterviewRole") || "President, Jan Seva Foundation"}</p>
              </div>
            </div>
          </RevealSection>

          {/* Right: Links */}
          <RevealSection className="news-links-col" delay={100}>
            <span className="news-section-eyebrow">Related Coverage</span>
            <h2 className="news-section-heading">{t("NewsLinksTitle") || "News Links"}</h2>
            <div className="news-heading-line" />

            <div className="news-links-card">
              {newsLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-link-row"
                >
                  <div className="news-link-arrow-icon">↗</div>
                  <div className="news-link-content">
                    <span className="news-link-source">{link.source}</span>
                    <span className="news-link-label">{link.label}</span>
                  </div>
                </a>
              ))}
            </div>
          </RevealSection>

        </div>

        {/* ── Data / Infographics ── */}
        <RevealSection style={{ marginTop: "5rem" }}>
          <span className="news-section-eyebrow news-section-eyebrow--red">Data</span>
          <h2 className="news-section-heading">{t("NewsDataTitle") || "Untraceable Children"}</h2>
          <div className="news-heading-line news-heading-line--red" />
        </RevealSection>

        <RevealSection className="news-infographic-grid" delay={80}>
          {["untraceble.png", "untraceable2.png"].map((file, i) => (
            <div key={i} className="news-infographic-card">
              <img
                src={`/src/assets/News/${file}`}
                alt={`Missing Children Data ${i + 1}`}
                className="news-infographic-img"
                onError={(e) => e.target.parentElement.classList.add("news-infographic-card--empty")}
              />
            </div>
          ))}
        </RevealSection>

      </div>

      {/* ── Lightbox ── */}
      {lightboxSrc && (
        <div
          className="news-lightbox"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image enlarged"
        >
          <img src={lightboxSrc} alt="Enlarged press clipping" className="news-lightbox-img" />
          <button className="news-lightbox-close" onClick={() => setLightboxSrc(null)}>✕</button>
        </div>
      )}

    </div>
  );
}
