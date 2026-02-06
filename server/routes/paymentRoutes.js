import express from "express"
import { processCheckout } from "../controllers/paymentController.js"
import { optionalProtect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", optionalProtect, processCheckout)
router.post("/checkout", optionalProtect, processCheckout)

export default router
