import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    // Token management
    refreshToken: { type: String },
    magicLinkToken: { type: String },
    magicLinkExpires: { type: Date },
    // Profile
    phone: { type: String },
    avatar: { type: String },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    resetPasswordOTP: { type: String },
    resetPasswordExpires: { type: Date },
    // Referral System
    referralCode: { type: String, unique: true, sparse: true },
    coins: { type: Number, default: 0 },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function () {
    if (this.isModified('password') && this.password) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

    // Generate referral code if it doesn't exist
    if (!this.referralCode) {
        this.referralCode = Math.random().toString(36).substring(2, 8).toUpperCase()
    }
})

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String },
    features: [{ type: String }],
    highlight: { type: Boolean, default: false },
    order: { type: Number, default: 0 }
}, { timestamps: true })

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Demo' }, // Selected Template
    name: { type: String, required: true },
    businessName: { type: String }, // Made optional in schema, though UI might require
    phone: { type: String, required: true },
    email: { type: String },
    subscriptionType: { type: String, required: true },
    message: { type: String },
    transactionId: { type: String },
    status: { type: String, default: 'pending', enum: ['pending', 'completed', 'canceled'] },
    isActive: { type: Boolean, default: true },
    // Referral System
    referralCodeUsed: { type: String },
    discountAmount: { type: Number, default: 0 },
    referrerRewardPaid: { type: Boolean, default: false }
}, { timestamps: true })

const consultationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    status: { type: String, default: 'pending', enum: ['pending', 'handled', 'canceled'] }
}, { timestamps: true })

const demoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrls: [{ type: String }],
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true })

const referralSettingsSchema = new mongoose.Schema({
    coinValue: { type: Number, default: 1 }, // 1 Coin = 1 Taka
    discountPercentage: { type: Number, default: 5 }, // 5% discount for user
    rewardCoins: { type: Number, default: 100 }, // 100 coins for sharer
    signupBonus: { type: Number, default: 10 }, // 10 coins for the new user who signs up with a code
}, { timestamps: true })

const withdrawRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coins: { type: Number, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // e.g., Bkash, Nagad, Bank
    accountNumber: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'approved', 'rejected'] },
    adminNote: { type: String },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)
export const Plan = mongoose.model("Plan", planSchema)
export const Order = mongoose.model("Order", orderSchema)
export const Consultation = mongoose.model("Consultation", consultationSchema)
export const Demo = mongoose.model("Demo", demoSchema)
export const ReferralSettings = mongoose.model("ReferralSettings", referralSettingsSchema)
export const WithdrawRequest = mongoose.model("WithdrawRequest", withdrawRequestSchema)
export { ChatSession } from "./Chat.js"

