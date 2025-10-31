import ProgressBar from "../utilities/ProgressBar/ProgressBar";
import "./DonationCard.css";
import { IoShareSocialOutline } from "react-icons/io5";

const DonationCard = ({ donation }) => {
  return (
    <div className="donation-card-wrapper">
      <div className="donation-card-image">
        <img src={donation.logo} alt={donation.name} />
      </div>
      <div className="donation-card-content">
        <div className="donation-card-text">
          <div className="title">{donation.name}</div>
          <div className="description">{donation.description}</div>
          {donation.hasGoal && (
            <div className="donation-card-statistics">
              <div className="amount-total-bar">
                <ProgressBar
                  value={(donation.amountRaised / donation.goal) * 100}
                  text={"₹" + donation.amountRaised + " raised"}
                  background="var(--grey)"
                  foreground="var(--accent-01)"
                />
              </div>
              <div className="donation-stat-bottom">
                <div className="total-percentage">
                  <span>
                    {Math.round((donation.amountRaised / donation.goal) * 100)}%
                  </span>{" "}
                  goal reached <div>Target - ₹{donation.goal}</div>
                </div>
                <div className="donation-testimonials"></div>
              </div>
            </div>
          )}
        </div>
        <div className="donation-card-buttons">
          <a
            className="donation-card-button buttonized-link donate-now-button"
            href={`/donate-to-fundraiser/${donation._id}`}
          >
            Donate Now
          </a>
          <a
            className="donation-card-button buttonized-link share-button"
            href="#"
          >
            <IoShareSocialOutline
              color="var(--foreground-inverted)"
              width={"50px"}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
