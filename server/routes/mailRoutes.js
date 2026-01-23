import express from "express"
import { handleMail } from "../controllers/mailController.js"
import { optionalProtect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/", optionalProtect, handleMail)

export default router
