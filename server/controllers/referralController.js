import { ReferralSettings, User, Order } from "../models/index.js"

// @desc    Validate referral code
// @route   GET /api/referral/verify/:code
// @access  Public
export const verifyReferralCode = async (req, res) => {
    try {
        const { code } = req.params
        const referrer = await User.findOne({ referralCode: code.toUpperCase() })

        if (!referrer) {
            return res.status(404).json({ message: "Invalid referral code" })
        }

        // Prevent self-referral
        if (req.user && req.user.referralCode === code.toUpperCase()) {
            return res.status(400).json({ message: "You cannot use your own referral code" })
        }

        const settings = await ReferralSettings.findOne() || { discountPercentage: 5, rewardCoins: 100 }

        res.json({
            valid: true,
            discountPercentage: settings.discountPercentage,
            referrerName: referrer.name
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Get referral settings
// @route   GET /api/referral/settings
// @access  Admin
export const getReferralSettings = async (req, res) => {
    try {
        let settings = await ReferralSettings.findOne()
        if (!settings) {
            settings = await ReferralSettings.create({})
        }
        res.json(settings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// @desc    Update referral settings
// @route   PUT /api/referral/settings
// @access  Admin
export const updateReferralSettings = async (req, res) => {
    try {
        const { coinValue, discountPercentage, rewardCoins } = req.body
        let settings = await ReferralSettings.findOne()

        if (!settings) {
            settings = new ReferralSettings({ coinValue, discountPercentage, rewardCoins, signupBonus: req.body.signupBonus })
        } else {
            settings.coinValue = coinValue !== undefined ? coinValue : settings.coinValue
            settings.discountPercentage = discountPercentage !== undefined ? discountPercentage : settings.discountPercentage
            settings.rewardCoins = rewardCoins !== undefined ? rewardCoins : settings.rewardCoins
            settings.signupBonus = req.body.signupBonus !== undefined ? req.body.signupBonus : settings.signupBonus
        }

        await settings.save()
        res.json(settings)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// @desc    Get current user's referral stats
// @route   GET /api/referral/my-stats
// @access  Private
export const getMyReferralStats = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        // Count successful referrals
        const successfulReferralsCount = await Order.countDocuments({
            referralCodeUsed: user.referralCode,
            status: 'completed'
        })

        // Count pending referrals
        const pendingReferralsCount = await Order.countDocuments({
            referralCodeUsed: user.referralCode,
            status: 'pending'
        })

        const settings = await ReferralSettings.findOne() || { coinValue: 1 }

        res.json({
            referralCode: user.referralCode,
            coins: user.coins || 0,
            coinValue: settings.coinValue,
            rewardCoins: settings.rewardCoins,
            signupBonus: settings.signupBonus,
            successfulReferrals: successfulReferralsCount,
            pendingReferrals: pendingReferralsCount,
            totalEarnings: (user.coins || 0) * settings.coinValue
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
