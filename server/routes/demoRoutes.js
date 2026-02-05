import express from "express"
import { getDemos, getAllDemos, createDemo, updateDemo, deleteDemo } from "../controllers/demoController.js"
import { protect, authorize } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
    .get(getDemos)
    .post(protect, authorize('admin'), createDemo)

router.get("/admin", protect, authorize('admin'), getAllDemos)

router.route("/:id")
    .put(protect, authorize('admin'), updateDemo)
    .delete(protect, authorize('admin'), deleteDemo)

export default router
