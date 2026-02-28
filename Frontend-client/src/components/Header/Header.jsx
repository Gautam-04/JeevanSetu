import { useState } from "react"; // Added useState
import "./Header.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneVolume, FaBars, FaXmark } from "react-icons/fa6"; // Added Icons
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../../utils/LanguageDropdown";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // State to handle mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="header-wrapper">
      <div className="header-top">
        <div className="header-contacts">
          <div className="header-contact">
            <MdOutlineMailOutline />
            jeevansamvardhan@gmail.com
          </div>
          <div className="header-contact">
            <FaPhoneVolume />
            +91 75069 27704
          </div>
          <div className="headerTopLanguageDropDown">
            <LanguageDropdown />
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="header-title">
<Link to="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
    <img src="/src/assets/JSLogoNoBG.png" alt="JeevanSamvardhan" />
    <span className="company-name">{t("headerTitle")}</span>
  </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <FaXmark /> : <FaBars />}
        </div>

        {/* Conditionally add 'active' class based on state */}
        <div className={`header-links ${isMenuOpen ? "active" : ""}`}>
          <a href="/" onClick={closeMenu}>{t("HeaderHomeLink")}</a>
          <a href="/about" onClick={closeMenu}>{t("HeaderAboutUsLink")}</a>
          <a href="/news" onClick={closeMenu}>{t("HeaderNewsLink")}</a>
          <a href="/joinus" onClick={closeMenu}>{t("HeaderJoinUsLink")}</a>
          {/* Change the href and ensure it closes the mobile menu */}
<a href="/#contact-section" onClick={closeMenu}>
  {t("HeaderContactLink")}
</a>
          <button
            className="header-donate-now"
            onClick={() => {
              navigate("/donations");
              closeMenu();
            }}
          >
            {t("HeaderDonateNowLink")}
          </button>
            <div className="mobile-language-dropdown">
            <LanguageDropdown />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;