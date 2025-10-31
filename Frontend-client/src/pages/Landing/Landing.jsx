import ContactUs from "../../components/ContactUs/ContactUs";
import DonationContainer from "../../components/DonationContainer/DonationContainer";
import FeaturedCampaigns from "../../components/FeaturedCampaigns/FeaturedCampaigns";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import InfoCard from "../../components/InfoCard/InfoCard";
import Transparency from "../../components/Transparency/Transparency";
import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import "./Landing.css";

const hero_cards = [
  {
    title: "Chala Ghari Jaudya",
    content:
      "We work to protect vulnerable children from child labor, trafficking, and exploitation by reuniting them with families or providing safe rehabilitation.",
    image_url: "/src/assets/lostandfound.jpg",
  },
  {
    title: "Aamhalahi shikudya",
    content:
      "Educational campaigns to guide underprivileged children towards learning, skill development, and a brighter future.",
    image_url: "/src/assets/q5.jpg",
  },
];

const Landing = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-typography">
            We change the lives of those who have no hope.{" "}
          </div>
          <div className="hero-info-cards">
            <InfoCard info={hero_cards[0]} />
            <InfoCard info={hero_cards[1]} />
          </div>
        </div>
      </div>
      <WelcomeBanner />
      <FeaturedCampaigns />
      <ContactUs />
      <Transparency />
      {/* <Footer /> */}
    </div>
  );
};

export default Landing;
