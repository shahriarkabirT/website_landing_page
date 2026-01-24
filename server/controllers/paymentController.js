import crypto from "crypto"
import { User, Order } from "../models/index.js"
import { sendMagicLinkEmail } from "../services/mailService.js"

// @desc    Process Checkout & Auto-provision User
// @route   POST /api/payment/checkout
// @access  Public
export const processCheckout = async (req, res) => {
    try {
        const { name, email, planId, planName, planPrice, planPeriod } = req.body

        // 1. Mock Payment Processing (Always success for now)
        // In real app: await stripe.paymentIntents.create(...)

        // 2. Check or Create User
        let user = await User.findOne({ email })
        let isNewUser = false

        if (!user) {
            isNewUser = true
            // Create passwordless user
            user = await User.create({
                name,
                email,
                password: crypto.randomBytes(16).toString("hex"), // Random secure password
                role: "user"
            })
        }

        // 3. Generate Magic Link (for both new and existing users to "claim" or login)
        const token = crypto.randomBytes(32).toString("hex")
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        user.magicLinkToken = hashedToken
        user.magicLinkExpires = Date.now() + 24 * 60 * 60 * 1000 // 24 hours for welcome link
        await user.save()

        // 4. Create Order
        const order = await Order.create({
            user: user._id,
            name: name, // Required by schema
            businessName: "Not Provided", // Required by schema, but not in new simplified form
            phone: "Not Provided", // Required by schema, but not in new simplified form
            subscriptionType: planName || "Subscription", // Required by schema
            plan: {
                name: planName,
                price: planPrice,
                period: planPeriod
            },
            amount: parseFloat(planPrice?.replace(/[^0-9.]/g, '') || 0),
            status: "completed", // Assumed success
            paymentMethod: "card"
        })

        // 5. Send Email
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
        const verificationUrl = `${frontendUrl}/verify-magic-link?token=${token}&email=${email}`

        // You might want a specific "Welcome + Magic Link" email template here
        // Reusing standard magic link service for now
        await sendMagicLinkEmail(user.email, verificationUrl)

        res.status(200).json({
            success: true,
            message: "Payment successful. Account created/linked.",
            orderId: order._id
        })

    } catch (error) {
        console.error("Checkout Error:", error)
        res.status(500).json({ message: "Transaction failed" })
    }
}
