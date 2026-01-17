import express from "express"
import { handleMail } from "../controllers/mailController.js"

const router = express.Router()

router.post("/", handleMail)

export default router
