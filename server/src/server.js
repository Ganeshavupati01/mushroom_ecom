// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Send Email Helper Function
const sendEmail = (to, subject, message) => {
    return transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: `<div style="font-family: Arial, sans-serif;">
            <h2>${subject}</h2>
            <p>${message}</p>
        </div>`
    });
};

// API Endpoints
app.get("/", (req, res) => {
    res.send("Mushroom E-commerce Server is Running");
});

app.post("/api/send-message", async (req, res) => {
    try {
        const { userName, userEmail, userPhone, sellerEmail, orderId, amount } = req.body;

        // Validate required fields
        if (!userName || !userEmail || !sellerEmail || !orderId || !amount) {
            return res.status(400).send({ success: false, message: "All fields are required" });
        }

        // Buyer Email
        const buyerMessage = `
            <h3>Order Confirmation</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Buyer:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Phone:</strong> ${userPhone || "N/A"}</p>
            <p><strong>Amount Paid:</strong> ₹${amount}</p>
        `;

        // Seller Email
        const sellerMessage = `
            <h3>New Order Received</h3>
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Buyer:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Phone:</strong> ${userPhone || "N/A"}</p>
            <p><strong>Amount Paid:</strong> ₹${amount}</p>
        `;

        // Send to Buyer
        await sendEmail(userEmail, "Your Mushrooms Order Confirmation", buyerMessage);
        console.log("✅ Email sent to buyer");

        // Send to Seller
        await sendEmail(sellerEmail, "New Mushrooms Order Received", sellerMessage);
        console.log("✅ Email sent to seller");

        res.status(200).send({ success: true, message: "Emails sent successfully" });
    } catch (error) {
        console.error("❌ Error sending emails:", error);
        res.status(500).send({ success: false, message: "Failed to send emails", error: error.message });
    }
});

// Error Handling
app.use((req, res) => {
    res.status(404).send({ success: false, message: "Route not found" });
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
