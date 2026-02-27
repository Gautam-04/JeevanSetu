import "./Header.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import LanguageDropdown from "../../utils/LanguageDropdown";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

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
            +91 75069 27704{" "}
          </div>
          <div className="headerTopLanguageDropDown">
            <LanguageDropdown />
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-title">
          <img src="/src/assets/JSLogoNoBG.png" alt="JeevanSamvardhan" />
          {t("headerTitle")}
        </div>
        <div className="header-links">
          <a href="/">{t("HeaderHomeLink")}</a>
          <a href="/about">{t("HeaderAboutUsLink")}</a>
          <a href="/news">{t("HeaderNewsLink")}</a>
          <a href="#">{t("HeaderJoinUsLink")}</a>
          <a href="#">{t("HeaderContactLink")}</a>
          <button
            className="header-donate-now"
            onClick={() => {
              navigate("/donations");
            }}
          >
            {t("HeaderDonateNowLink")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
