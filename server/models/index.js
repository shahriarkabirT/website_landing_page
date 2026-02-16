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
}, { timestamps: true })

userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) {
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
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
    isActive: { type: Boolean, default: true }
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
    imageUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)
export const Plan = mongoose.model("Plan", planSchema)
export const Order = mongoose.model("Order", orderSchema)
export const Consultation = mongoose.model("Consultation", consultationSchema)
export const Demo = mongoose.model("Demo", demoSchema)
