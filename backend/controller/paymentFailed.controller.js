import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const notifyPaymentFailed = async (req, res) => {
  const { name, email, mobile, amount, fundraiserName, errorCode, errorDescription } = req.body;

  try {
    const adminMailOptions = {
      from: `"Payment Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `⚠️ Payment Failed — ${name} (₹${amount})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h3 style="color: #A32D2D;">⚠️ Payment Failed Notification</h3>
          <p>A donor attempted a payment that was <strong>not completed</strong>.</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Mobile</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${mobile}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Amount</strong></td><td style="padding: 8px; border: 1px solid #ddd;">₹${amount}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Fundraiser</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fundraiserName || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Error Code</strong></td><td style="padding: 8px; border: 1px solid #ddd; color: #A32D2D;">${errorCode || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Error Reason</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${errorDescription || "N/A"}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Time</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date().toLocaleString("en-IN")}</td></tr>
          </table>
          <p style="margin-top:16px; color:#888; font-size:12px;">This is an automated alert from Jeevan Samvardhan Foundation.</p>
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed payment email error:", error);
    res.status(500).json({ success: false });
  }
};