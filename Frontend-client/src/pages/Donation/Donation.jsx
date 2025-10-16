import React from 'react';
import DonationContainer from '../../components/DonationContainer/DonationContainer';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './Donation.css';

import heroBg from "../../assets/figmachildrens.jpg";
import chalaGhariImg from "../../assets/lostandfound.jpg";
import aamlahiImg from "../../assets/4.png";
import empoweringImg from "../../assets/q1.jpg";

function Donation() {
  const donations = [
    {
      image: heroBg, // Replace with aamlahiImg
      title: "Aamhalahi shikudya",
      content: "Empowers underprivileged children through education and skill development, helping them build a brighter future.",
      amountRaised: 120000,
      goalAmount: 240000,
      memberCount: 900
    },
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
      title: "One time lunch or dinner for all",
      content: "Empowers underprivileged children through education and skill development, helping them build a brighter future.",
      amountRaised: 120000,
      goalAmount: 240000,
      memberCount: 900
    },
    {
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400",
      title: "Sponsor milk for 1 month",
      content: "Empowers underprivileged children through education and skill development, helping them build a brighter future.",
      amountRaised: 120000,
      goalAmount: 240000,
      memberCount: 900
    },
    {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
      title: "All festival celebration yearly",
      content: "Empowers underprivileged children through education and skill development, helping them build a brighter future.",
      amountRaised: 120000,
      goalAmount: 240000,
      memberCount: 900
    },
    {
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400",
      title: "Diwali dress for a child",
      content: "Empowers underprivileged children through education and skill development, helping them build a brighter future.",
      amountRaised: 120000,
      goalAmount: 240000,
      memberCount: 900
    },
    {
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400",
      title: "Child Sponsor",
      content: "Empowers underprivileged children through education and skill development, helping them build a brighter future.",
      amountRaised: 120000,
      goalAmount: 240000,
      memberCount: 900
    }
  ];

  return (
    <>
      <Header />
      
      <div className="donation-page">
        <div className="donation-page-container">
          <h1 className="donation-page-title">Donate Now</h1>
          
          <div className="donation-grid">
            {donations.map((donation, index) => (
              <DonationContainer 
                key={index}
                image={donation.image}
                title={donation.title}
                content={donation.content}
                amountRaised={donation.amountRaised}
                goalAmount={donation.goalAmount}
                memberCount={donation.memberCount}
              />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Donation;