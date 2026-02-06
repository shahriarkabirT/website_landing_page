import { Order, Consultation, User } from "../models/index.js"
import fs from "fs"
import path from "path"

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getMyConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(consultations)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (user) {
            user.name = req.body.name || user.name
            user.phone = req.body.phone || user.phone

            if (req.file) {
                // Delete old avatar if exists
                if (user.avatar) {
                    try {
                        const oldPath = path.join(process.cwd(), user.avatar)
                        if (fs.existsSync(oldPath)) {
                            fs.unlinkSync(oldPath)
                        }
                    } catch (err) {
                        console.error("Error deleting old avatar:", err)
                    }
                }
                user.avatar = `/uploads/${req.file.filename}`
            }

            if (req.body.password) {
                user.password = req.body.password
            }

            const updatedUser = await user.save()

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                avatar: updatedUser.avatar,
                role: updatedUser.role,
            })
        } else {
            res.status(404).json({ message: "User not found" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
