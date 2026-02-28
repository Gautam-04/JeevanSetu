import { toast } from "react-toastify";
import "./ContactUs.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const galleryImages = [
  "/src/assets/q1.jpg",
  "/src/assets/q2.jpg",
  "/src/assets/q3.jpg",
  "/src/assets/q4.jpg",
  "/src/assets/q5.jpg",
  "/src/assets/q6.jpg",
];

const ContactUs = () => {
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
    console.log("Form submitted:", formData);
    // You can add API logic here (e.g., POST request)
    toast.success("Your question has been submitted!");
    setFormData({ name: "", mobile: "", email: "", question: "" });
  };

    const {t} = useTranslation();

  return (
    <div className="contact-us-wrapper">
      <div className="contact-us-gallery">
        {galleryImages.map((image, index) => {
          return (
            <img
              key={index}
              className="contact-us-gallery-image"
              src={image}
              alt={`Gallery ${index + 1}`}
            />
          );
        })}
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

          <button type="submit">{t("ContactSubmitButton")}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
