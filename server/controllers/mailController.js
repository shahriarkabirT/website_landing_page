import { sendMail } from "../services/mailService.js"

export const handleMail = async (req, res) => {
  try {
    const { name, businessName, phone, message } = req.body

    // Validation
    if (!name?.trim() || !businessName?.trim() || !phone?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      })
    }

    // Phone validation (basic - allows +880 and 10+ digits)
    const phoneRegex = /^[\+]?[0-9]{10,}$/
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ''))) {
      return res.status(400).json({
        success: false,
        error: "Invalid phone number format",
      })
    }

    await sendMail({ name, businessName, phone, message })

    res.json({
      success: true,
      message: "Message sent successfully! We will contact you soon.",
    })
  } catch (error) {
    console.error("Mail error:", error)
    res.status(500).json({
      success: false,
      error: error.message || "Failed to send message",
    })
  }
}
