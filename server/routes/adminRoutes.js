import express from "express"
import { loginAdmin, getPlans, createPlan, updatePlan, deletePlan, getOrders, updateOrderStatus, toggleOrderArchive } from "../controllers/adminController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

// Public
router.post("/login", loginAdmin)
router.get("/plans", getPlans)

// Protected (Admin only)
router.post("/plans", protect, authorize("admin"), createPlan)
router.put("/plans/:id", protect, authorize("admin"), updatePlan)
router.delete("/plans/:id", protect, authorize("admin"), deletePlan)
router.get("/orders", protect, authorize("admin"), getOrders)
router.put("/orders/:id/status", protect, authorize("admin"), updateOrderStatus)
router.put("/orders/:id/archive", protect, authorize("admin"), toggleOrderArchive)

export default router
