import express from "express"
import { verifyReferralCode, getReferralSettings, updateReferralSettings, getMyReferralStats } from "../controllers/referralController.js"
import { protect, admin, optionalProtect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/verify/:code", optionalProtect, verifyReferralCode)
router.get("/settings", protect, admin, getReferralSettings)
router.put("/settings", protect, admin, updateReferralSettings)
router.get("/my-stats", protect, getMyReferralStats)

export default router
