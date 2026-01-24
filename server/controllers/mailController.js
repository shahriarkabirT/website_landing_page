import { sendMail } from "../services/mailService.js"
import { User, Order } from "../models/index.js"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
    expiresIn: "30d",
  })
}

export const handleMail = async (req, res) => {
  try {
    const { name, businessName, phone, subscriptionType, message, email, password } = req.body

    // Validation
    if (!name?.trim() || !businessName?.trim() || !phone?.trim() || !subscriptionType?.trim()) {
      return res.status(400).json({
        success: false,
        error: "Required fields: Name, Business Name, Phone, and Subscription Type",
      })
    }

    // Phone validation
    const phoneRegex = /^[\+]?[0-9]{10,}$/
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ''))) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number format",
      })
    }

    let currentUser = req.user
    let token = null
    let isNewUser = false

    // If not logged in and email provided, check/create account
    if (!currentUser && email) {
      const userExists = await User.findOne({ email })

      if (userExists) {
        currentUser = userExists
        // We do NOT log them in automatically if they didn't provide credentials
        // just attach the order to their account
      } else {
        // Create new user
        const crypto = await import("crypto")
        const generatedPassword = crypto.randomBytes(16).toString("hex")

        currentUser = await User.create({
          name,
          email,
          password: generatedPassword,
          role: "user"
        })
        isNewUser = true

        // Generate Magic Link
        const magicToken = crypto.randomBytes(32).toString("hex")
        const hashedToken = crypto.createHash("sha256").update(magicToken).digest("hex")

        currentUser.magicLinkToken = hashedToken
        currentUser.magicLinkExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        await currentUser.save()

        // Send Magic Link Email
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
        const verificationUrl = `${frontendUrl}/verify-magic-link?token=${magicToken}&email=${email}`

        // Dynamically import to avoid circular dependency issues or just use the imported one
        const { sendMagicLinkEmail } = await import("../services/mailService.js")
        await sendMagicLinkEmail(email, verificationUrl)
      }
    }

    // Save Order
    await Order.create({
      user: currentUser?._id,
      name,
      businessName,
      phone,
      subscriptionType,
      message
    })

    await sendMail({ name, businessName, phone, subscriptionType, message })

    res.json({
      success: true,
      message: isNewUser
        ? "Order placed! Check your email for login link."
        : "Order placed successfully!",
      user: null // Don't return user/token to frontend for security unless they actually logged in
    })
  } catch (error) {
    console.error("Mail error:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process order",
    })
  }
}
