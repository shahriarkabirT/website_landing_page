import { Demo } from "../models/index.js"

// @desc    Get all visible demos
// @route   GET /api/demo
// @access  Public
export const getDemos = async (req, res) => {
    try {
        const demos = await Demo.find({ isVisible: true }).sort({ order: 1, createdAt: -1 })
        res.json(demos)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Get all demos (Admin)
// @route   GET /api/demo/admin
// @access  Private/Admin
export const getAllDemos = async (req, res) => {
    try {
        const demos = await Demo.find({}).sort({ order: 1, createdAt: -1 })
        res.json(demos)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Create a demo
// @route   POST /api/demo
// @access  Private/Admin
export const createDemo = async (req, res) => {
    try {
        const { title, description, imageUrls, order, isVisible } = req.body

        const demo = await Demo.create({
            title,
            description,
            imageUrls,
            order,
            isVisible
        })

        res.status(201).json(demo)
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Update a demo
// @route   PUT /api/demo/:id
// @access  Private/Admin
export const updateDemo = async (req, res) => {
    try {
        const { title, description, imageUrls, order, isVisible } = req.body

        const demo = await Demo.findById(req.params.id)

        if (demo) {
            demo.title = title || demo.title
            demo.description = description || demo.description
            demo.imageUrls = imageUrls || demo.imageUrls
            if (order !== undefined) demo.order = order
            if (isVisible !== undefined) demo.isVisible = isVisible

            const updatedDemo = await demo.save()
            res.json(updatedDemo)
        } else {
            res.status(404).json({ message: "Demo not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

// @desc    Delete a demo
// @route   DELETE /api/demo/:id
// @access  Private/Admin
export const deleteDemo = async (req, res) => {
    try {
        const demo = await Demo.findById(req.params.id)

        if (demo) {
            await demo.deleteOne()
            res.json({ message: "Demo removed" })
        } else {
            res.status(404).json({ message: "Demo not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}
