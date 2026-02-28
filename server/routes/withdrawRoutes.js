import express from "express"
import {
    requestWithdrawal,
    getMyWithdrawRequests,
    adminGetAllWithdrawals,
    adminUpdateWithdrawStatus
} from "../controllers/withdrawController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/request", protect, requestWithdrawal)
router.get("/my-requests", protect, getMyWithdrawRequests)

// Admin routes
router.get("/admin/all", protect, admin, adminGetAllWithdrawals)
router.put("/admin/:id", protect, admin, adminUpdateWithdrawStatus)

export default router
