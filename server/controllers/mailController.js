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

    // If not logged in and email/password provided, create account
    if (!currentUser && email && password) {
      const userExists = await User.findOne({ email })
      if (userExists) {
        return res.status(400).json({
          success: false,
          error: "A user with this email already exists. Please log in first.",
        })
      }

      currentUser = await User.create({
        name,
        email,
        password,
        role: "user"
      })
      token = generateToken(currentUser._id)
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
      message: "Order placed successfully!",
      user: currentUser ? {
        _id: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
        token: token || undefined
      } : null
    })
  } catch (error) {
    console.error("Mail error:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Failed to process order",
    })
  }
}
