import crypto from "crypto"
import { User, Order } from "../models/index.js"
import { sendMagicLinkEmail } from "../services/mailService.js"

// @desc    Process Checkout & Auto-provision User
// @route   POST /api/payment/checkout
// @access  Public
export const processCheckout = async (req, res) => {
    try {
        const { name, email, phone, businessName, transactionId, templateId, message, subscriptionType, planName, planPrice, amount } = req.body

        // Manual Order Validation
        if (transactionId) {
            if (!name || !phone || !transactionId) {
                return res.status(400).json({ message: "Name, Phone, and Transaction ID are required" })
            }
            if (transactionId.length < 6) {
                return res.status(400).json({ message: "Invalid Transaction ID" })
            }
        }

        // 1. Mock Payment Processing (Always success for now)
        // In real app: await stripe.paymentIntents.create(...)

        // 2. Check User (Only if logged in)
        let user = req.user || null

        // OLD LOGIC: Auto-create user. 
        // NEW LOGIC: Treat as guest if not logged in (user remains null)

        /* 
        let magicLinkToken = null 
        if (email && !user) {
             // ... Code removed to enforce Guest Mode ...
        } 
        */

        // 4. Create Order
        const order = await Order.create({
            user: user ? user._id : undefined, // Link user if exists
            name,
            email,
            phone: phone || "Not Provided",
            businessName: businessName,
            subscriptionType: subscriptionType || planName || "Standard",
            templateId: templateId || undefined,
            transactionId: transactionId,
            message: message,
            status: transactionId ? "pending" : "completed", // Manual orders are pending
            paymentMethod: transactionId ? "Manual" : "Card"
        })

        // 5. Send Email (Only if email is provided and user was created/found)
        if (email && user && magicLinkToken) {
            try {
                const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
                const verificationUrl = `${frontendUrl}/verify-magic-link?token=${magicLinkToken}&email=${user.email}`

                // You might want a specific "Welcome + Magic Link" email template here
                // Reusing standard magic link service for now
                await sendMagicLinkEmail(user.email, verificationUrl)
            } catch (emailError) {
                console.error("Failed to send email:", emailError)
                // Continue without failing the request
            }
        }


        res.status(200).json({
            success: true,
            message: "Payment successful. Account created/linked.",
            orderId: order._id
        })

    } catch (error) {
        console.error("Checkout Error:", error)
        res.status(500).json({ message: error.message || "Transaction failed" })
    }
}

