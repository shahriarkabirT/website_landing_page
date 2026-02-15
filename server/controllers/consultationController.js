import { Consultation, User } from "../models/index.js"

export const createConsultation = async (req, res) => {
    try {
        const { name, phone, email, address } = req.body

        if (!name?.trim() || !phone?.trim()) {
            return res.status(400).json({
                success: false,
                error: "Name and Phone Number are required",
            })
        }

        const consultation = await Consultation.create({
            user: req.user ? req.user._id : undefined,
            name,
            phone,
            email,
            address,
        })

        // Sync with User Profile if logged in
        if (req.user) {
            const user = await User.findById(req.user._id)
            if (user) {
                let updated = false
                if (!user.phone && phone) {
                    user.phone = phone
                    updated = true
                }
                if (!user.name && name) {
                    user.name = name
                    updated = true
                }
                if (updated) {
                    await user.save()
                }
            }
        }

        res.status(201).json({
            success: true,
            data: consultation,
            message: "Consultation request sent successfully!",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message || "Failed to process consultation request",
        })
    }
}

export const getConsultations = async (req, res) => {
    try {
        const consultations = await Consultation.find({}).sort({ createdAt: -1 })
        res.json(consultations)
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export const updateConsultationStatus = async (req, res) => {
    try {
        const { status } = req.body
        const consultation = await Consultation.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        )
        res.json(consultation)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
