import React from "react";
import Header from "../../components/Header-legacy/Header-legacy";
import Footer from "../../components/Footer/Footer";
import "./News.css";
import PageBlueprint from "../../components/utilities/PageBlueprint/PageBlueprint";

function News() {
  // Helper to open image in a new tab
  const openImage = (src) => {
    window.open(src, "_blank", "noopener,noreferrer");
  };

  return (
    <PageBlueprint title={"NEWS"}>
      <div className="news-main">
        <div className="news-grid">
          {/* Left: Newspaper screenshots and news links */}
          <div className="news-left">
            <div className="news-carousel">
              {/* Make each image clickable */}
              <img
                src="/src/assets/News/news1.jpg"
                alt="News Screenshot 1"
                className="news-img-clickable"
                onClick={() => openImage("/src/assets/News/news1.jpg")}
                title="Click to enlarge"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              />
              <img
                src="/src/assets/News/news2.jpg"
                alt="News Screenshot 2"
                className="news-img-clickable"
                onClick={() => openImage("/src/assets/News/news2.jpg")}
                title="Click to enlarge"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              />
              <img
                src="/src/assets/News/news3.jpg"
                alt="News Screenshot 3"
                className="news-img-clickable"
                onClick={() => openImage("/src/assets/News/news3.jpg")}
                title="Click to enlarge"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              />
              <img
                src="/src/assets/News/news4.jpg"
                alt="News Screenshot 4"
                className="news-img-clickable"
                onClick={() => openImage("/src/assets/News/news4.jpg")}
                title="Click to enlarge"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="news-links">
              <h3>HERE ARE SOME NEWS LINKS</h3>
              <ul>
                <li>
                  <a
                    href="http://www.loksatta.com/mumbai-news/railway-policy-hit-care-and-rehabilitation-of-destitute-children-campaign-1191398/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    हजारो निराश्रित मुलांच्या शोधाचा शेवटच सापडत नाही
                  </a>
                </li>
                <li>
                  <a
                    href="http://timesofindia.indiatimes.com/india/Chief-secretaries-DGPs-will-be-accountable-for-missing-children-SC/articleshow/44833604.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chief secretaries, DGPs will be accountable for missing
                    children: SC
                  </a>
                </li>
                <li>
                  <a
                    href="http://timesofindia.indiatimes.com/india/Chhattisgarhs-efforts-sluggish-in-tracing-missing-children-SC/articleshow/44839406.cms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chhattisgarh’s efforts sluggish in tracing missing children
                    : SC
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.abc.net.au/news/2015-01-31/child-slaves-in-india-rescued-by-police/6059384"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hundreds of child slaves rescued by Indian police in shock
                    raids in Hyderabad
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.loksatta.com/mumbai-news/child-abuse-violence-increased-1081074/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    बालकांच्या अपहरणात वाढ
                  </a>
                </li>
                <li>
                  <a
                    href="http://www.ibnlive.com/news/india/75000-children-have-gone-missing-in-india-govt-594849.php"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    75,000 children have gone missing in India: Govt
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Right: Interview and Untraceable Kids images */}
          <div className="news-right">
            <div className="news-interview">
              <h4>Interview of Sadashiv Chavhan- President JSF</h4>
              <div className="news-video-wrapper">
                <a
                  href="https://youtu.be/_N74zfGvctM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="yt-fallback-link"
                >
                  <div className="yt-thumbnail-container">
                    <img
                      src="https://img.youtube.com/vi/_N74zfGvctM/0.jpg"
                      alt="Watch Interview on YouTube"
                      className="yt-thumbnail"
                    />
                    <span className="yt-play-btn"></span>
                  </div>
                </a>
              </div>
            </div>
            <div className="news-kids">
              <img
                src="/src/assets/News/untraceble.png"
                alt="Untraceable Kids Infographic 1"
                className="kids-img"
              />
              <img
                src="/src/assets/News/untraceable2.png"
                alt="Untraceable Kids Infographic 2"
                className="kids-img"
              />
            </div>
          </div>
        </div>
      </div>
    </PageBlueprint>
  );
}

export default News;
