import express from "express"
import { getMyOrders } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/orders", protect, getMyOrders)

export default router
