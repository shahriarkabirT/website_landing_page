import express from "express"
import { processCheckout } from "../controllers/paymentController.js"

const router = express.Router()

router.post("/", processCheckout)
router.post("/checkout", processCheckout)

export default router
