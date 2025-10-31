import "./Header.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";

const Header = () => {
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
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-title">
          <img src="/src/assets/JSLogoNoBG.png" alt="JeevanSamvardhan" />
          Jeevan Samvardhan
        </div>
        <div className="header-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="#">Drives</a>
          <a href="#">Join Us</a>
          <a href="#">Contact</a>
          <button className="header-donate-now">Donate Now</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
