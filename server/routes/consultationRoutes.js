import express from "express"
import { createConsultation, getConsultations, updateConsultationStatus } from "../controllers/consultationController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

// Public request submission
router.post("/", createConsultation)

// Admin-only retrieval
router.get("/", protect, authorize("admin"), getConsultations)
router.put("/:id/status", protect, authorize("admin"), updateConsultationStatus)

export default router
