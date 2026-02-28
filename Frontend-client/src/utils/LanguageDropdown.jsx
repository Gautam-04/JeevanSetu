import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import "./LanguageDropdown.css"
function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  const getCurrentLanguage = () => {
    if (i18n.language === "hi") return "हिंदी";
    if (i18n.language === "mr") return "मराठी";
    return "English";
  };

  // Close dropdown when clicking Aoutside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }

      console.log("Clicked outside dropdown", i18n.language, event.target); // Debug log
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <span
        className="language-current"
        onClick={() => setOpen(!open)}
      >
        🌐 {getCurrentLanguage()}
      </span>

      {open && (
        <div className="language-options">
          <div onClick={() => changeLanguage("en")}>English</div>
          <div onClick={() => changeLanguage("hi")}>हिंदी</div>
          <div onClick={() => changeLanguage("mr")}>मराठी</div>
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;