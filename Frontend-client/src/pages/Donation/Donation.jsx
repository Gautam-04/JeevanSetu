import { useEffect, useRef, useState } from "react";
import "./Donation.css";
import DonationCard from "../../components/DonationCard/DonationCard";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { useTranslation } from "react-i18next";

const DUMMY_DONATIONS_FLAG = false;

const dummyDonationData = [
  {
    name: "Save the Oceans",
    description:
      "A global initiative to clean and protect our oceans from plastic waste.",
    logo: "/src/assets/gal-2.jpg",
    hasGoal: true,
    goal: 500000,
    amountRaised: 235000,
    donations: [
      "6720a2d9b8c1d2a4f8e3a912",
      "6720a2e7b8c1d2a4f8e3a913",
      "6720a2f3b8c1d2a4f8e3a914",
    ],
  },
  {
    name: "Feed the Hungry",
    description:
      "Helping underprivileged families get access to nutritious food.",
    logo: "/src/assets/gal-3.jpg",
    hasGoal: false,
    goal: 9007199254740991,
    amountRaised: 12000,
    donations: ["6720a310b8c1d2a4f8e3a915", "6720a320b8c1d2a4f8e3a916"],
  },
  {
    name: "Education for All",
    description:
      "Providing scholarships and resources to children in rural areas.",
    logo: "/src/assets/bhuk.jpg",
    hasGoal: true,
    goal: 1000000,
    amountRaised: 754320,
    donations: [
      "6720a332b8c1d2a4f8e3a917",
      "6720a345b8c1d2a4f8e3a918",
      "6720a358b8c1d2a4f8e3a919",
      "6720a36cb8c1d2a4f8e3a91a",
    ],
  },
];

/* ── Intersection-observer reveal (same pattern as News.jsx) ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function RevealSection({ className = "", children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`dn-reveal ${visible ? "dn-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

function Donation() {
  const { t } = useTranslation();
  const [fundraisers, setFundraisers] = useState(dummyDonationData);
  const [heroVisible, setHeroVisible] = useState(false);
  const upiId = "jeeva75069@barodampay";

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(upiId)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: "dark",
        });
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  const getAllFundraisers = async () => {
    try {
      const fundraiserURL = "http://127.0.0.1:8000/api/donation/get-fundraisers";
      const response = await axios({
        method: "get",
        url: fundraiserURL,
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      setFundraisers(response.data.fundraisers);
    } catch (error) {
      console.log("Error fetching fundraisers:", error);
    }
  };

  useEffect(() => {
    if (DUMMY_DONATIONS_FLAG === false) {
      getAllFundraisers();
    }
  }, []);

  const bankDetails = [
    { label: t("BankAccountNameLabel"),  value: "Jeevan Samvardhan Foundation Bank" },
    { label: t("BankBankNameLabel"),      value: "State Bank of India" },
    { label: t("BankAccountNumberLabel"), value: "123456789012" },
    { label: t("BankAccountTypeLabel"),   value: "Current Account" },
    { label: t("BankIFSCLabel"),          value: "SBIN0001234" },
    { label: t("BankBranchLabel"),        value: "Shivaji Nagar Branch, Pune" },
    { label: t("BankMICRLabel"),          value: "411002345" },
  ];

  return (
    <div className="dn-page">

      {/* ── Hero ── */}
      <section className={`dn-hero ${heroVisible ? "dn-hero--visible" : ""}`}>
        <div className="dn-hero-bg">
          <div className="dn-hero-orb dn-hero-orb--1" />
          <div className="dn-hero-orb dn-hero-orb--2" />
          <div className="dn-hero-orb dn-hero-orb--3" />
        </div>
        <div className="dn-hero-content">
          <span className="dn-hero-eyebrow">{t("donateEyebrow") || "Make a Difference"}</span>
          <h1 className="dn-hero-title">
            {t("donateTitle") || "Donate"}
            <br />
            <em>{t("donateHeroEm") || "To Us"}</em>
          </h1>
          <p className="dn-hero-subtitle">
            {t("donateHeroSubtitle") || "Your generosity powers our mission — protecting children, supporting tribal communities, and building a better tomorrow."}
          </p>
        </div>
        <div className="dn-hero-scroll-hint">
          <span>{t("AwardsHeroScrollHint") || "Scroll to explore"}</span>
          <div className="dn-hero-scroll-arrow" />
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="dn-content-wrap">

        {/* ── Section: Ongoing Campaigns ── */}
        <RevealSection>
          <span className="dn-eyebrow">{t("FeaturedPreTitle") || "Active Now"}</span>
          <h2 className="dn-section-heading">{t("ongoingCampaigns") || "Our Ongoing Campaigns"}</h2>
          <div className="dn-heading-line" />
        </RevealSection>

        {fundraisers && (
          <div className="dn-cards-grid">
            {fundraisers.map((donation, index) => (
              <RevealSection key={index} delay={index * 100} className="dn-card-wrap">
                <DonationCard donation={donation} />
              </RevealSection>
            ))}
          </div>
        )}

        {/* ── Section: Bank Details ── */}
        <RevealSection style={{ marginTop: "5rem" }}>
          <span className="dn-eyebrow dn-eyebrow--amber">{t("BankEyebrow") || "Transfer Directly"}</span>
          <h2 className="dn-section-heading">{t("BankTitle") || "Bank Details"}</h2>
          <div className="dn-heading-line dn-heading-line--amber" />
        </RevealSection>

        <RevealSection className="dn-bank-layout" delay={80}>

          {/* Left: NEFT Details */}
          <div className="dn-neft-card">
            <p className="dn-bank-intro">{t("BankIntro") || "You can transfer funds directly to our bank account using NEFT / RTGS / IMPS:"}</p>
            <div className="dn-bank-rows">
              {bankDetails.map((row, i) => (
                <div className="dn-bank-row" key={i}>
                  <span className="dn-bank-label">{row.label}</span>
                  <span className="dn-bank-value">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="dn-bank-note">
              💡 {t("BankNote") || "Please email us after transferring so we can acknowledge your donation."}
            </p>
          </div>

          {/* Right: UPI */}
          <div className="dn-upi-col">
            <div className="dn-upi-card">
              <div className="dn-upi-badge">UPI / QR Pay</div>
              <div className="dn-upi-qr">
                <img
                  src="https://cdn.qrcode-ai.com/qrcode/preview/33e0a6f0cad9822a49ecf1c58385051a-1761940257840.png"
                  alt="UPI QR Code"
                />
              </div>
              <button className="dn-upi-id" onClick={handleCopy} aria-label="Copy UPI ID">
                <span>{upiId}</span>
                <MdOutlineContentCopy className="dn-copy-icon" />
              </button>
              <p className="dn-upi-hint">Tap to copy UPI ID</p>
            </div>
          </div>

        </RevealSection>

      </div>
    </div>
  );
}

export default Donation;
