import { WithdrawRequest, User, ReferralSettings } from "../models/index.js"

// @desc    Create a withdrawal request
// @route   POST /api/withdraw/request
// @access  Private
export const requestWithdrawal = async (req, res) => {
    try {
        const { coins, paymentMethod, accountNumber } = req.body
        const user = await User.findById(req.user._id)

        if (user.coins < coins) {
            return res.status(400).json({ message: "Insufficient coins" })
        }

        const settings = await ReferralSettings.findOne() || { coinValue: 1 }
        const amount = coins * (settings.coinValue || 1)

        const withdrawRequest = await WithdrawRequest.create({
            user: req.user._id,
            coins,
            amount,
            paymentMethod,
            accountNumber
        })

        res.status(201).json(withdrawRequest)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get current user's withdrawal requests
// @route   GET /api/withdraw/my-requests
// @access  Private
export const getMyWithdrawRequests = async (req, res) => {
    try {
        const requests = await WithdrawRequest.find({ user: req.user._id }).sort({ createdAt: -1 })
        res.json(requests)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get all withdrawal requests (Admin)
// @route   GET /api/withdraw/admin/all
// @access  Admin
export const adminGetAllWithdrawals = async (req, res) => {
    try {
        const requests = await WithdrawRequest.find()
            .populate('user', 'name email phone avatar')
            .sort({ createdAt: -1 })
        res.json(requests)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update withdrawal request status (Admin)
// @route   PUT /api/withdraw/admin/:id
// @access  Admin
export const adminUpdateWithdrawStatus = async (req, res) => {
    try {
        const { status, coins, adminNote } = req.body
        const request = await WithdrawRequest.findById(req.params.id)

        if (!request) {
            return res.status(404).json({ message: "Request not found" })
        }

        if (request.status !== 'pending') {
            return res.status(400).json({ message: "Request already processed" })
        }

        const user = await User.findById(request.user)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (status === 'approved') {
            // Admin can change the coin number while approval
            const finalCoins = coins !== undefined ? Number(coins) : request.coins

            if (user.coins < finalCoins) {
                return res.status(400).json({ message: "User has insufficient coins for this adjusted amount" })
            }

            // Deduct coins from user
            user.coins -= finalCoins
            await user.save()

            // Update request with final coins and amount
            const settings = await ReferralSettings.findOne() || { coinValue: 1 }
            request.coins = finalCoins
            request.amount = finalCoins * (settings.coinValue || 1)
            request.status = 'approved'
        } else if (status === 'rejected') {
            request.status = 'rejected'
        }

        if (adminNote) request.adminNote = adminNote
        await request.save()

        res.json(request)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
