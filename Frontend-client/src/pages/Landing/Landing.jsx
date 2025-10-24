import DonationContainer from "../../components/DonationContainer/DonationContainer";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import InfoCard from "../../components/InfoCard/InfoCard";
import Transparency from "../../components/Transparency/Transparency";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import "./Landing.css";

const card = {
  title: "The Wonders of Space",
  content:
    "Explore the vastness of the universe, from distant galaxies to the mysteries of black holes. Learn fascinating facts and keep your curiosity alive!",
  image_url:
    "https://images.unsplash.com/photo-1761162816810-fe0e8e36ea40?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
};

const Landing = () => {
  return (
    <div>
      <Header />
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-typography">
            We change the lives of those who have no hope.{" "}
          </div>
          <div className="hero-info-cards">
            <InfoCard info={card} />
            <InfoCard info={card} />
          </div>
        </div>
      </div>
      <WelcomeBanner />
      <Transparency />
      <Footer />
    </div>
  );
};

export default Landing;
