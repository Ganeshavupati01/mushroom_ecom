// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
  })
);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (to, subject, message) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  });
};

app.post("/send-message", (req, res) => {
  const { userName, userEmail, userPhone, sellerEmail, orderId, amount } = req.body;

  console.log("📦 Received POST data:", req.body); // Debug: log input

  const message = `
    <h3>Order Confirmation</h3>
    <p><strong>Order ID:</strong> ${orderId}</p>
    <p><strong>Buyer:</strong> ${userName}</p>
    <p><strong>Email:</strong> ${userEmail}</p>
    <p><strong>Amount Paid:</strong> ₹${amount}</p>
  `;

  sendEmail(userEmail, "Your Mushrooms Order Confirmation", message) // Send to buyer
    .then(() => {
      console.log("✅ Email sent to buyer");
      return sendEmail(sellerEmail, "New Mushrooms Order Received", message); // Send to seller
    })
    .then(() => {
      console.log("✅ Email sent to seller");
      res.status(200).send({ success: true, message: "Emails sent successfully" });
    })
    .catch((error) => {
      console.error("❌ Error sending emails:", error); // Debug: log full error
      res.status(500).send({
        success: false,
        message: "Failed to send emails",
        error: error.message, // Optional: send error back to frontend
      });
    });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
