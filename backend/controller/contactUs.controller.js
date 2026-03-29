// controller/contactUs.controller.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitContactUsForm = async (req, res) => {
  const { name, mobile, email, question } = req.body;

  try {
    // Email to the user
    const userMailOptions = {
      from: `"Jeevan Samvardhan Foundation" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We received your question – Jeevan Samvardhan Foundation",
      html: `
        <html>
          <head>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
            </style>
          </head>
          <body>
            <div style="font-family: 'Outfit', sans-serif; line-height: 1.6; max-width: 600px;">
              <h2 style="color: #0e926b;">
                Thank you for reaching out to
                <span style="font-weight: 700; color: #fca00c">Jeevan Samvardhan Foundation</span>!
              </h2>
              <p>Dear <strong>${name}</strong>,</p>
              <p>We have received your question and our team will get back to you as soon as possible.</p>
              <p>Here is a copy of your submission:</p>
              <ul>
                <li><strong>Mobile:</strong> ${mobile}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Your Question:</strong> ${question}</li>
              </ul>
              <p>Warm regards,<br/>
              <strong>Jeevan Samvardhan Foundation</strong></p>
              <img src="https://www.jeevansamvardhan.org/images/my-images/logo3.png" width="150" alt="JSF Logo">
            </div>
          </body>
        </html>
      `,
    };

    // Notification email to admin
    const adminMailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Query from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h3>New Contact Us Submission</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Mobile:</strong> ${mobile}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Question:</strong> ${question}</li>
          </ul>
        </div>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: "Message sent successfully." });
  } catch (error) {
    console.error("Contact Us form error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};