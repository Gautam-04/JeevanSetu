import React from "react";
import "./Footer.css";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, YouTube, LinkedIn, Instagram } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <Box className="footer-container">

      {/* ── Main Content ── */}
      <Box className="footer-content">

        {/* Left – Logo & Socials */}
        <Box className="footer-left">
          <Box className="footer-logo-section">
            <img
              src="/src/assets/JSLogoNoBG.png"
              alt="Jeevan Samvardhan Logo"
              className="footer-logo"
            />
            <Typography className="footer-logo-text">
              {t("FooterLogoText")}
            </Typography>
          </Box>

          <Typography className="footer-tagline">
            {t("FooterTagline")}
          </Typography>

          <Typography className="connect-text">
            {t("FooterConnect")}
          </Typography>

          <Box className="social-icons">
            <IconButton href="https://www.youtube.com/@jeevansamvardhan5963" target="_blank" className="social-icon"><YouTube /></IconButton>
            <IconButton href="https://www.facebook.com/jeevan.samvardhanpriti" target="_blank" className="social-icon"><Facebook /></IconButton>
            <IconButton href="https://x.com/JeevanSamvardh1" target="_blank" className="social-icon"><XIcon /></IconButton>
            <IconButton href="https://www.linkedin.com/in/jeevan-samvardhan-172527326" target="_blank" className="social-icon"><LinkedIn /></IconButton>
            <IconButton href="https://www.instagram.com/jeevansamvardhan/" target="_blank" className="social-icon"><Instagram /></IconButton>
          </Box>

          <span className="footer-ngo-badge">✦ {t("FooterNGOBadge")}</span>
        </Box>

        {/* Quick Links */}
        <Box className="footer-links">
          <Typography className="footer-heading">
            {t("FooterQuickLinks")}
          </Typography>
          <Link href="#" underline="none" className="footer-link">{t("FooterAllCampaign")}</Link>
          <Link href="/joinus" underline="none" className="footer-link">{t("FooterWorkWithUs")}</Link>
          <Link href="/about" underline="none" className="footer-link">{t("FooterWhoWeAre")}</Link>
          <Link href="/news" underline="none" className="footer-link">{t("FooterNews")}</Link>
          <Link href="/donations" underline="none" className="footer-link">{t("FooterDonate")}</Link>
        </Box>

        {/* Address & Contact */}
        <Box className="footer-address">
          <Typography className="footer-heading">
            {t("FooterFindUs")}
          </Typography>
          <Box className="footer-contact-rows">
            <Box className="footer-contact-row">
              <span className="footer-contact-icon">◎</span>
              <Typography className="footer-contact-text">
                {t("FooterOffice")} 6, Aish Apartment, Near Nikki Nagar, Gandhari, Jail Road, Kalyan(W), Dist. Thane
              </Typography>
            </Box>
            <Box className="footer-contact-row">
              <span className="footer-contact-icon">✉</span>
              <Typography className="footer-contact-text">
                jeevansamvardhan@gmail.com
              </Typography>
            </Box>
            <Box className="footer-contact-row">
              <span className="footer-contact-icon">☏</span>
              <Typography className="footer-contact-text">
                +91 75069 27704
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="footer-divider" />

      {/* Bottom Bar */}
      <Box className="footer-bottom">
        <Typography className="footer-bottom-text">
          {t("FooterCopyright")}
        </Typography>
        <Typography className="footer-bottom-right">
          {t("FooterMadeWith") || "Made with ♥ for the community"}
        </Typography>
      </Box>

    </Box>
  );
}

export default Footer;