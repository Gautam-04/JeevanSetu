import { useState, useRef } from "react";
import "./JoinUs.css";

const CARDS = [
  {
    icon: "📚",
    title: "Most Trusted",
    desc: "Spend time with children, teaching them useful disciplines and life skills that shape their futures.",
  },
  {
    icon: "🌱",
    title: "Super Growth",
    desc: "Bring your ideas to improve our programs and help us scale our impact to more communities.",
  },
  {
    icon: "🏛️",
    title: "Our Foundation",
    desc: "Contribute your motivation and energy to support our mission through awareness and outreach.",
  },
  {
    icon: "✨",
    title: "Awesome Work",
    desc: "Participate financially or in-kind — every contribution, big or small, creates a real difference.",
  },
];

const ACTIVITIES = [
  "📖 Teaching and tutoring sessions",
  "🎨 Art, music & recreational activities",
  "💼 Skill development workshops",
  "📣 Awareness campaigns & fundraising",
  "🏕️ Weekend outreach programs",
];

const FORM_FIELDS = [
  {
    label: "Name",
    name: "user_name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    label: "Mobile Number",
    name: "user_mobile",
    type: "tel",
    placeholder: "Enter mobile number",
  },
  {
    label: "Email Address",
    name: "user_email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    label: "Location",
    name: "user_location",
    type: "text",
    placeholder: "Enter your location",
  },
];

const EMPTY_FORM = {
  user_name: "",
  user_mobile: "",
  user_email: "",
  user_location: "",
  user_role: "",
  user_comments: "",
};

export default function JoinUs() {
  const formRef = useRef();
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // NOTE: Make sure this URL matches your backend environment.
      // If you use a proxy in vite/CRA, you can just use "/api/join-us"
      const response = await fetch("http://127.0.0.1:8000/api/join-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          "Thank you for joining us! Your message has been sent successfully.",
        );
        setForm(EMPTY_FORM);
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert(
        "Oops! Something went wrong. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ju-root">
      {/* ── NEW CLEAN HERO ── */}
      <section className="ju-hero">
        <div className="ju-container ju-hero__inner">
          <div className="ju-hero__text-content">
            <span className="ju-tag">Jeevan Samvardhan Foundation</span>
            <h1>
              Become a Part of <br />
              <span className="ju-highlight">Our Mission</span>
            </h1>
            <p>
              Your time, energy, and resources can transform the lives of
              underprivileged children across India. Join our community of
              changemakers today.
            </p>
            <div className="ju-hero__actions">
              <a href="#join-form" className="ju-btn">
                Get Involved →
              </a>
              <a href="#how-to-help" className="ju-btn ju-btn--outline">
                Learn More
              </a>
            </div>
          </div>

          <div className="ju-hero__visual">
            <div className="ju-hero__image-card">
              <span className="ju-hero__icon">🤝</span>
              <div className="ju-hero__card-text">
                <strong>Together we rise</strong>
                <span>Join 500+ Volunteers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW YOU CAN HELP ── */}
      <section className="ju-section" id="how-to-help">
        <div className="ju-container">
          <h2 className="ju-section__title">How Can We Help You Help Us?</h2>
          <div className="ju-divider" />
          <p className="ju-section__sub">
            Everybody can help Jeevan Samvardhan Foundation. Check the different
            ways to get involved.
          </p>
          <div className="ju-cards">
            {CARDS.map((c) => (
              <div className="ju-card" key={c.title}>
                <span className="ju-card__icon">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE ── */}
      <section className="ju-section ju-section--alt">
        <div className="ju-container">
          <h2 className="ju-section__title">Make Something You Can Donate</h2>
          <div className="ju-divider" />
          <div className="ju-donate">
            <div className="ju-donate__text">
              <h3>Not All Needs Are Financial</h3>
              <p>
                Many charities collect and distribute clothing or handmade items
                for a variety of services.
              </p>
              <p>
                Your skills — however modest you think they are — can bring
                warmth, comfort, and dignity to someone in need.
              </p>
            </div>
            <div className="ju-donate__blob">
              <span>🤝</span>
              <p>Donate &amp; Make a Difference</p>
              <small>Your gift changes lives</small>
            </div>
          </div>
        </div>
      </section>

      {/* ── VOLUNTEER + FORM ── */}
      <section className="ju-section ju-section--navy" id="join-form">
        <div className="ju-container">
          <h2 className="ju-section__title ju-section__title--white">
            Become a Volunteer
          </h2>
          <div className="ju-divider ju-divider--orange" />
          <div className="ju-volunteer">
            {/* Left info */}
            <div className="ju-volunteer__info">
              <h3>Your Time Can Change Lives</h3>
              <p>
                Millions of underprivileged children in India are deprived of
                their basic rights.
              </p>
              <ul>
                {ACTIVITIES.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            {/* Right form */}
            <div className="ju-form-card">
              <h2>Join Us</h2>
              <form ref={formRef} onSubmit={handleSubmit}>
                {FORM_FIELDS.map(({ label, name, type, placeholder }) => (
                  <div className="ju-field" key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      value={form[name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="ju-field">
                  <label htmlFor="user_role">I want to be</label>
                  <select
                    id="user_role"
                    name="user_role"
                    value={form.user_role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Please Select --</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="donor">Donor</option>
                    <option value="mentor">Mentor</option>
                    <option value="partner">Partner Organization</option>
                  </select>
                </div>

                <div className="ju-field">
                  <label htmlFor="user_comments">Comments</label>
                  <textarea
                    id="user_comments"
                    name="user_comments"
                    placeholder="Type your comments here..."
                    value={form.user_comments}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="ju-btn ju-btn--submit"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Submit →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
