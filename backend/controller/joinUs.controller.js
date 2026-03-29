import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const submitJoinUsForm = async (req, res) => {
  const { user_name, user_mobile, user_email, user_location, user_role, user_comments } = req.body;

  try {
    // Email to the user
    const userMailOptions = {
      from: `"Jeevan Samvardhan Foundation" <${process.env.EMAIL_USER}>`,
      to: user_email,
      subject: "Welcome to Jeevan Samvardhan Foundation!",
      html: `
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        </style>
      </head>
      <body>
        <div style="font-family: 'Outfit', sans-serif; line-height: 1.6; max-width: 600px;">
          <h2 style="color: #0e926b;">Welcome to the <span style="font-weight: 700; color: #fca00c">Jeevan Samvardhan Foundation</span> Family!</h2>
          <p>Dear <strong>${user_name}</strong>,</p>
          <p>Thank you for stepping forward to join our mission as a <strong>${user_role}</strong>. Your willingness to contribute your time and energy means the world to us.</p>
          <p>Here is a copy of the details you submitted:</p>
          <ul>
            <li><strong>Mobile:</strong> ${user_mobile}</li>
            <li><strong>Location:</strong> ${user_location}</li>
            <li><strong>Role:</strong> ${user_role}</li>
            <li><strong>Comments:</strong> ${user_comments || "None"}</li>
          </ul>
          <p>Our team will review your application and get in touch with you shortly to discuss next steps.</p>
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
      from: `"Join Us Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Join Us Application from ${user_name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h3>New Join Us Submission</h3>
          <ul>
            <li><strong>Name:</strong> ${user_name}</li>
            <li><strong>Mobile:</strong> ${user_mobile}</li>
            <li><strong>Email:</strong> ${user_email}</li>
            <li><strong>Location:</strong> ${user_location}</li>
            <li><strong>Role:</strong> ${user_role}</li>
            <li><strong>Comments:</strong> ${user_comments || "None"}</li>
          </ul>
        </div>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    res.status(200).json({ success: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Error submitting Join Us form:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};