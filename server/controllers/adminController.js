import jwt from "jsonwebtoken"
import { User, Plan, Order } from "../models/index.js"

// Auth Controllers
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    const admin = await User.findOne({ email })

    if (admin && admin.role === "admin" && (await admin.matchPassword(password))) {
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "fallback_secret", {
            expiresIn: "30d",
        })

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            token,
        })
    } else {
        res.status(401).json({ message: "Invalid email or password" })
    }
}

// Plan Controllers
export const getPlans = async (req, res) => {
    try {
        const plans = await Plan.find({}).sort({ order: 1 })
        res.json(plans)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createPlan = async (req, res) => {
    try {
        const plan = await Plan.create(req.body)
        res.status(201).json(plan)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updatePlan = async (req, res) => {
    try {
        const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(plan)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deletePlan = async (req, res) => {
    try {
        await Plan.findByIdAndDelete(req.params.id)
        res.json({ message: "Plan removed" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Order Controllers
export const getOrders = async (req, res) => {
    try {
        const { archived } = req.query
        const filter = archived === 'true' ? { isActive: false } : { isActive: true }

        const orders = await Order.find(filter).populate('templateId').sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body)
        res.status(201).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        res.json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
export const toggleOrderArchive = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }

        order.isActive = !order.isActive
        await order.save()

        res.json({ message: `Order ${order.isActive ? 'restored' : 'archived'}`, order })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
