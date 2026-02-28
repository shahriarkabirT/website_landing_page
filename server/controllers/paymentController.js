import crypto from "crypto"
import { User, Order, ReferralSettings } from "../models/index.js"
import { sendMagicLinkEmail, sendOrderConfirmationEmail, sendOrderNotificationToAdmin } from "../services/mailService.js"

// @desc    Process Checkout & Auto-provision User
// @route   POST /api/payment/checkout
// @access  Public
export const processCheckout = async (req, res) => {
    try {
        const {
            name, email, phone, businessName, transactionId, templateId, message,
            subscriptionType, planPrice, amount,
            referralCode
        } = req.body

        // ... (Manual Order Validation unchanged)

        // 1. Calculate discount if referral code is provided
        let finalDiscountAmount = 0
        let validatedReferralCode = undefined

        if (referralCode) {
            const referrer = await User.findOne({ referralCode: referralCode.toUpperCase() })
            // Ensure referrer exists and is not the same person (if logged in)
            if (referrer && (!req.user || req.user.referralCode !== referralCode.toUpperCase())) {
                const settings = await ReferralSettings.findOne() || { discountPercentage: 5 }
                const priceNum = parseInt(amount?.toString().replace(/,/g, '') || planPrice?.toString().replace(/,/g, '') || "0")
                finalDiscountAmount = Math.round((priceNum * settings.discountPercentage) / 100)
                validatedReferralCode = referralCode.toUpperCase()
            }
        }

        // 2. Check User (Only if logged in)
        let user = req.user || null

        // ...

        // 4. Create Order
        const order = await Order.create({
            user: user ? user._id : undefined, // Link user if exists
            name,
            email,
            phone: phone || "Not Provided",
            businessName: businessName,
            subscriptionType: subscriptionType || "Standard",
            templateId: templateId || undefined,
            transactionId: transactionId,
            message: message,
            status: transactionId ? "pending" : "completed",
            paymentMethod: transactionId ? "Manual" : "Card",
            referralCodeUsed: validatedReferralCode,
            discountAmount: finalDiscountAmount
        })

        // 5. Send Emails
        if (email) {
            const orderDetails = {
                name,
                email,
                phone: phone || "Not Provided",
                businessName,
                subscriptionType: subscriptionType || planName || "Standard",
                transactionId,
                message
            }

            try {
                // To Customer
                await sendOrderConfirmationEmail(email, orderDetails)

                // To Admin
                await sendOrderNotificationToAdmin(orderDetails)

                // Magic Link (if guest account was ever created)
                if (user && magicLinkToken) {
                    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
                    const verificationUrl = `${frontendUrl}/verify-magic-link?token=${magicLinkToken}&email=${user.email}`
                    await sendMagicLinkEmail(user.email, verificationUrl)
                }
            } catch (emailError) {
                console.error("Failed to send emails:", emailError)
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
