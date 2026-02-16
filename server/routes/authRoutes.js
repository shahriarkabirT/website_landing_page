import express from "express"
import passport from "passport"
import {
    registerUser,
    authUser,
    getUserProfile,
    sendMagicLink,
    verifyMagicLink,
    refreshToken,
    logoutUser,
    googleCallback
} from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

import { authLimiter } from "../middleware/rateLimiter.js"

const router = express.Router()

// Standard Auth
router.post("/register", authLimiter, registerUser)
router.post("/login", authLimiter, authUser)
router.post("/logout", logoutUser)
router.post("/refresh", refreshToken)
router.get("/profile", protect, getUserProfile)

// Magic Link
router.post("/magic-link", authLimiter, sendMagicLink)
router.post("/verify-magic-link", authLimiter, verifyMagicLink)

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login", session: false }),
    googleCallback
)

export default router
