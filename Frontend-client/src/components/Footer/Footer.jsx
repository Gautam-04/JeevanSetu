import React from "react";
import "./Footer.css";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, YouTube, LinkedIn } from "@mui/icons-material";
import XIcon from "@mui/icons-material/X"; // You can replace this with a Twitter icon if needed
import GoogleIcon from "@mui/icons-material/Google";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  return (
    <Box className="footer-container">
      {/* Top Section */}
      <Box className="footer-content">
        {/* Left - Logo and Socials */}
        <Box className="footer-left">
          <Box className="footer-logo-section">
            <img
              src="/src/assets/JSLogoNoBG.png"
              alt="Jeevan Samvardhan Logo"
              className="footer-logo"
            />
            <Typography variant="h6" className="footer-logo-text">
              {t("FooterLogoText")}
            </Typography>
          </Box>

          <Typography variant="body2" className="connect-text">
            {t("FooterConnect")}
          </Typography>
          <Box className="social-icons">
            <IconButton href="#" className="social-icon">
              <GoogleIcon />
            </IconButton>
            <IconButton href="#" className="social-icon">
              <YouTube />
            </IconButton>
            <IconButton href="#" className="social-icon">
              <Facebook />
            </IconButton>
            <IconButton href="#" className="social-icon">
              <XIcon />
            </IconButton>
            <IconButton href="#" className="social-icon">
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>

        {/* Middle - Quick Links */}
        <Box className="footer-links">
          <Typography variant="h6" className="footer-heading">
            {t("FooterQuickLinks")}
          </Typography>
          {/* {[
            "Aamhalahi shikudya",
            "Titwala Campaign",
            "Chala Ghari",
            "All campaign",
            "Work With Us",
            "Who we are",
          ].map((text, index) => (
            <Link key={index} href="#" underline="none" className="footer-link">
              {text}
            </Link>
          ))} */}
          <Link href="#" underline="none" className="footer-link">
            {t("FooterAllCampaign")}
          </Link>
          <Link href="#" underline="none" className="footer-link">
            {t("FooterWorkWithUs")}
          </Link>
          <Link href="#" underline="none" className="footer-link">
            {t("FooterWhoWeAre")}
          </Link>
        </Box>

        {/* Right - Address */}
        <Box className="footer-address">
          <Typography variant="h6" className="footer-heading">
            {t("FooterFindUs")}
          </Typography>
          <Typography variant="body2">
            {t("FooterOffice")}<br />
            6, Aish Apartment, Near Nikki Nagar, Gandhari, Jail Road, Kalyan(W),
            Dist. Thane
          </Typography>
        </Box>
      </Box>

      {/* Bottom Bar */}
      <Box className="footer-bottom">
        <Typography variant="body2" className="footer-bottom-text">
          C{t("FooterCopyright")}
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
