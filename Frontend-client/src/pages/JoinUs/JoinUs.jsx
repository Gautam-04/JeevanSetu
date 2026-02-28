import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./JoinUs.css";

const cards = [
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

const volunteerActivities = [
  "📖 Teaching and tutoring sessions",
  "🎨 Art, music & recreational activities",
  "💼 Skill development workshops",
  "📣 Awareness campaigns & fundraising",
  "🏕️ Weekend outreach programs",
];

export default function JoinUs() {
  const formRef = useRef();
  
  // Updated state keys to match input 'name' attributes exactly
  const [form, setForm] = useState({
    user_name: "",
    user_mobile: "",
    user_email: "",
    user_location: "",
    user_role: "",
    user_comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_bg8o5l5";
    const templateID = "template_eh297h7";
    const publicKey = "HrIPMr_My63Nhc6wf";

    emailjs.sendForm(serviceID, templateID, formRef.current, publicKey).then(
      () => {
        alert("Thank you for joining us! Your message has been sent successfully.");
        // Reset form state using the correct keys
        setForm({
          user_name: "",
          user_mobile: "",
          user_email: "",
          user_location: "",
          user_role: "",
          user_comments: "",
        });
      },
      (error) => {
        console.error("FAILED...", error.text);
        alert("Oops! Something went wrong. Please check your connection and try again.");
      }
    );
  };

  return (
    <div className="jsf-root">
      {/* HERO SECTION */}
      <section className="jsf-hero">
        <div className="jsf-hero__content">
          <span className="jsf-hero__tag">Jeevan Samvardhan Foundation</span>
          <h1 className="jsf-hero__title">Join Now</h1>
          <p className="jsf-hero__sub">
            Be the change. Help us transform the lives of underprivileged children across India.
          </p>
          <a href="#join-form" className="jsf-btn jsf-btn--hero">
            Get Involved →
          </a>
        </div>
        <div className="jsf-hero__deco" aria-hidden="true">
          <span className="jsf-deco-circle jsf-deco-circle--1" />
          <span className="jsf-deco-circle jsf-deco-circle--2" />
          <span className="jsf-deco-circle jsf-deco-circle--3" />
        </div>
      </section>

      {/* HOW YOU CAN HELP */}
      <section className="jsf-section jsf-section--light">
        <div className="jsf-container">
          <div className="jsf-section-title">
            <h2>How Can We Help You Help Us?</h2>
            <div className="jsf-divider" />
            <p>
              Everybody can help Jeevan Samvardhan Foundation. Check the different ways to get involved.
            </p>
          </div>
          <div className="jsf-cards">
            {cards.map((c) => (
              <div className="jsf-card" key={c.title}>
                <div className="jsf-card__icon">{c.icon}</div>
                <h3 className="jsf-card__title">{c.title}</h3>
                <p className="jsf-card__desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE SECTION */}
      <section className="jsf-section">
        <div className="jsf-container">
          <div className="jsf-section-title">
            <h2>Make Something You Can Donate</h2>
            <div className="jsf-divider" />
          </div>
          <div className="jsf-donate">
            <div className="jsf-donate__text">
              <h3>Not All Needs Are Financial</h3>
              <p>
                Many charities collect and distribute clothing or handmade items for a variety of services.
              </p>
              <p>
                Your skills — however modest you think they are — can bring warmth, comfort, and dignity to someone in need.
              </p>
            </div>
            <div className="jsf-donate__visual">
              <div className="jsf-donate__blob">
                <span className="jsf-donate__emoji">🤝</span>
                <p>Donate &amp; Make a Difference</p>
                <small>Your gift changes lives</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOLUNTEER + FORM */}
      <section className="jsf-section jsf-section--green" id="join-form">
        <div className="jsf-container">
          <div className="jsf-section-title jsf-section-title--white">
            <h2>Become a Volunteer</h2>
            <div className="jsf-divider jsf-divider--white" />
          </div>
          <div className="jsf-volunteer">
            <div className="jsf-volunteer__info">
              <h3>Your Time Can Change Lives</h3>
              <p>Millions of underprivileged children in India are deprived of their basic rights.</p>
              <ul className="jsf-volunteer__list">
                {volunteerActivities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>

            {/* FORM */}
            <div className="jsf-form-card">
              <h2 className="jsf-form-card__heading">Join Us</h2>
              <form ref={formRef} onSubmit={handleSubmit}>
                {[
                  { label: "Name:", name: "user_name", type: "text", placeholder: "enter your name" },
                  { label: "Mobile Number:", name: "user_mobile", type: "tel", placeholder: "Mobile Number" },
                  { label: "Email address:", name: "user_email", type: "email", placeholder: "enter your email" },
                  { label: "Location:", name: "user_location", type: "text", placeholder: "enter your location" },
                ].map((f) => (
                  <div className="jsf-field" key={f.name}>
                    <label htmlFor={f.name}>{f.label}</label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={form[f.name]} // Now correctly matches state key
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="jsf-field">
                  <label htmlFor="role">I want to be :</label>
                  <select
                    id="role"
                    name="user_role"
                    value={form.user_role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">--Please Select--</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="donor">Donor</option>
                    <option value="mentor">Mentor</option>
                    <option value="partner">Partner Organization</option>
                  </select>
                </div>

                <div className="jsf-field">
                  <label htmlFor="comments">Comments:</label>
                  <textarea
                    id="comments"
                    name="user_comments"
                    placeholder="Type your comments"
                    value={form.user_comments}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="jsf-btn jsf-btn--submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}