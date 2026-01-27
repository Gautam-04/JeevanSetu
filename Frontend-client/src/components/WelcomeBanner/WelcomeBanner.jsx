import "./WelcomeBanner.css";

const WelcomeBanner = () => {
  return (
    <div
      className="welcome-banner-wrapper
  "
    >
      <div className="welcome-banner-title">Welcome to Jeevan Samvardhan</div>
      <div className="welcome-banner-desc">
        Jeevan Samvardhan Foundation (JSF), founded by Sadashiv Chavan, is
        dedicated to uplifting homeless and underprivileged children. Rooted in
        rural Maharashtra, JSF works to provide education, nutrition, health
        awareness, sanitation, and vocational training—empowering children,
        youth, and women towards a dignified and self-reliant future.
      </div>
      <div className="welcome-banner-buttons">
        <a
          className="welcome-banner-button buttonized-link get-involved-button"
          href="#"
        >
          Get Involved
        </a>
        <a
          className="welcome-banner-button buttonized-link donate-now-button"
          href="/donations"
        >
          Donate Now
        </a>
      </div>
    </div>
  );
};

export default WelcomeBanner;
