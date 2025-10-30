import { toast } from "react-toastify";
import "./ContactUs.css";
import { useState } from "react";

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
        <div className="title">
          Questions? <span>Ask.</span>
        </div>
        <div className="sub-title">
          When you donate to Jeevan Samvardhan, you can be sure that the money
          is used responsibly. If you have questions before you make a donation,
          please feel free to contact us.
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            placeholder="Your Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Question</label>
          <textarea
            name="question"
            placeholder="Your Question"
            rows="4"
            value={formData.question}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
