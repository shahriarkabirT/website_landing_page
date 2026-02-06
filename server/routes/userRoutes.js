import express from "express"
import { getMyOrders, getMyConsultations, updateProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddleware.js"

const router = express.Router()

router.get("/orders", protect, getMyOrders)
router.get("/consultations", protect, getMyConsultations)
router.put("/profile", protect, upload.single("avatar"), updateProfile)

export default router
