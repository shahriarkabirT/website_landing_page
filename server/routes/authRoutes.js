import express from "express"
import passport from "passport"
import { registerUser, authUser, getUserProfile } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"
import jwt from "jsonwebtoken"

const router = express.Router()

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "30d",
    })
}

// Standard Auth
router.post("/register", registerUser)
router.post("/login", authUser)
router.get("/profile", protect, getUserProfile)

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }))

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Successful authentication
        const token = generateToken(req.user._id)
        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL || "http://localhost:3000"}/auth-success?token=${token}`)
    }
)

export default router
