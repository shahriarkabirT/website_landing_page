import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log("✗ Mail service error:", error)
  } else {
    console.log("✓ Mail service ready")
  }
})
