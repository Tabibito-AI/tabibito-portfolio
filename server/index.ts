import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { saveMessage } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Nodemailer transporter
let transporter: nodemailer.Transporter | null = null;
let emailConfigured = false;

function initializeMailer() {
  // Check if email configuration is available
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;

  console.log("Checking email configuration...");
  console.log("SMTP_HOST:", smtpHost ? "set" : "not set");
  console.log("SMTP_PORT:", smtpPort ? "set" : "not set");
  console.log("SMTP_USER:", smtpUser ? "set" : "not set");
  console.log("SMTP_PASSWORD:", smtpPassword ? "set" : "not set");
  console.log("EMAIL_FROM:", emailFrom ? "set" : "not set");
  console.log("EMAIL_TO:", emailTo ? "set" : "not set");

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword || !emailFrom || !emailTo) {
    console.warn(
      "Email configuration not fully set. Email sending will be logged only."
    );
    emailConfigured = false;
    return null;
  }

  try {
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    console.log("Email transporter initialized successfully");
    emailConfigured = true;
    return transporter;
  } catch (error) {
    console.error("Failed to initialize email transporter:", error);
    emailConfigured = false;
    return null;
  }
}

async function sendContactEmail(
  name: string,
  email: string,
  message: string
): Promise<boolean> {
  const emailTo = process.env.EMAIL_TO;
  const emailFrom = process.env.EMAIL_FROM;

  // Log the contact message regardless of email configuration
  console.log("Contact form submission received:", {
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  });

  // If email is not configured, just log and return success
  if (!emailConfigured || !transporter || !emailTo || !emailFrom) {
    console.log("Email service not configured. Contact info logged only.");
    return true; // Return true to indicate successful logging
  }

  try {
    const mailOptions = {
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message:
${message}

Submitted at: ${new Date().toISOString()}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    // Return true anyway since we've logged the contact info
    return true;
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Initialize email transporter
  initializeMailer();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      console.log("Received contact form submission:", { name, email, message });

      // Validate input
      if (!name || !email || !message) {
        console.warn("Missing required fields");
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        console.warn("Invalid email format:", email);
        return res.status(400).json({
          success: false,
          error: "Invalid email format",
        });
      }

      // Validate message length
      if (message.trim().length < 10) {
        console.warn("Message too short");
        return res.status(400).json({
          success: false,
          error: "Message must be at least 10 characters long",
        });
      }

      // Save message to database
      try {
        await saveMessage({
          name,
          email,
          message,
          read: 0,
        });
        console.log("Message saved to database");
      } catch (dbError) {
        console.error("Failed to save message to database:", dbError);
        // Continue with email sending even if database save fails
      }

      // Send email (or log if not configured)
      const emailSent = await sendContactEmail(name, email, message);

      if (!emailSent) {
        console.error("Failed to process contact form");
        return res.status(500).json({
          success: false,
          error: "Failed to process contact form",
        });
      }

      console.log("Contact form processed successfully");
      return res.status(200).json({
        success: true,
        message: "Contact form submitted successfully",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      emailConfigured: emailConfigured,
    });
  });

  // Serve static files from dist in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
