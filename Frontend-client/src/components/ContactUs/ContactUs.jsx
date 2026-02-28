import { toast } from "react-toastify";
import "./ContactUs.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

const galleryImages = [
  "/src/assets/q1.jpg",
  "/src/assets/q2.jpg",
  "/src/assets/q3.jpg",
  "/src/assets/q4.jpg",
  "/src/assets/q5.jpg",
  "/src/assets/q6.jpg",
];

const ContactUs = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false); // Track loading state
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    question: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = "service_bg8o5l5";
    const templateID = "template_sinqyly";
    const publicKey = "HrIPMr_My63Nhc6wf";

    // UPDATED: Changed keys to match your EmailJS Dashboard exactly
    const templateParams = {
      name: formData.name,      // Matches {{name}} in your template
      email: formData.email,    // Matches {{email}} in your template
      mobile: formData.mobile,  // You must add {{mobile}} to your template body
      message: formData.question, // Matches {{message}} in your template
      reply_to: formData.email,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        toast.success("Thank you! Your question has been submitted.");
        setFormData({ name: "", mobile: "", email: "", question: "" });
      })
      .catch((err) => {
        toast.error("Oops! Something went wrong. Please try again.");
        console.error("EmailJS Error:", err);
      })
      .finally(() => {
        setIsSending(false);
      });
  };



return (
    <div className="contact-us-wrapper">
      <div className="contact-us-gallery">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            className="contact-us-gallery-image"
            src={image}
            alt={`Gallery ${index + 1}`}
          />
        ))}
      </div>

      <div className="contact-us-form">
        <div className="title">{t("ContactTitle")}</div>
        <div className="sub-title">{t("ContactSubTitle")}</div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>{t("ContactNameLabel")}</label>
          <input
            type="text"
            name="name"
            placeholder={t("ContactNamePlaceholder")}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>{t("ContactMobileLabel")}</label>
          <input
            type="tel"
            name="mobile"
            placeholder={t("ContactMobilePlaceholder")}
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <label>{t("ContactEmailLabel")}</label>
          <input
            type="email"
            name="email"
            placeholder={t("ContactEmailPlaceholder")}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>{t("ContactQuestionLabel")}</label>
          <textarea
            name="question"
            placeholder={t("ContactQuestionPlaceholder")}
            rows="4"
            value={formData.question}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : t("ContactSubmitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
