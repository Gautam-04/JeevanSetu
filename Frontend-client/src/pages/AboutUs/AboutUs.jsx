import "./AboutUs.css";
import PageBlueprint from "../../components/utilities/PageBlueprint/PageBlueprint";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <PageBlueprint title={t("aboutTitle")}>
      <div className="about-page-wrapper">

        {/* ===== MISSION & VISION ===== */}
        <section className="mission-vision-section">
          <div className="mission-block">
            <h2>{t("missionTitle")}</h2>
            <ul>
              {t("missionPoints", { returnObjects: true }).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="vision-block">
            <h2>{t("visionTitle")}</h2>
            <p>{t("visionText")}</p>
          </div>
        </section>

        {/* ===== WHO WE ARE ===== */}
        <section className="who-we-are-section">
          <span className="au-section-label">Our Story</span>
          <h3>{t("whoWeAre")}</h3>
          <div className="who-we-are-heading-bar" />

          <div className="about-summary">
            <div className="summary-text">
              <h4>{t("summaryTitle")}</h4>
              <p>{t("summaryText")}</p>
              <span className="founder-name">{t("founderName")}</span>
            </div>
            <div className="summary-image">
              <img src="/src/assets/sadashivchahan.jpg" alt="Founder" />
            </div>
          </div>
        </section>

        {/* ===== BASIC NEEDS ===== */}
        <section className="basic-needs-section">
          <h4>{t("basicNeedsTitle")}</h4>
          <ul>
            {t("basicNeedsPoints", { returnObjects: true }).map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </section>

        {/* ===== DOCUMENTS ===== */}
        <section className="documents-section">
          <span className="au-section-label">Official Records</span>
          <p className="documents-section-title">Documents</p>
          <div className="documents-heading-bar" />

          <div className="documents-gallery">
            <a
              href="/src/assets/img1.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/img1.jpg" alt="Document 1" />
            </a>
            <a
              href="/src/assets/img3.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/src/assets/img3.jpg" alt="Document 2" />
            </a>
          </div>
        </section>

      </div>
    </PageBlueprint>
  );
}

export default AboutUs;
