import jwt from "jsonwebtoken"
import crypto from "crypto"
import { User } from "../models/index.js"
import { sendMagicLinkEmail } from "../services/mailService.js"

// Constants
const ACCESS_TOKEN_EXPIRE = "7d"
const REFRESH_TOKEN_EXPIRE = "30d"

// Cookie Options
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
}

// Generate Tokens
const generateTokens = (id) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: ACCESS_TOKEN_EXPIRE,
    })

    const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret", {
        expiresIn: REFRESH_TOKEN_EXPIRE,
    })

    return { accessToken, refreshToken }
}

// Set Cookies
const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    res.cookie("refreshToken", refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create({
            name,
            email,
            password,
        })

        if (user) {
            const { accessToken, refreshToken } = generateTokens(user._id)

            // Save refresh token to DB
            user.refreshToken = refreshToken
            await user.save()

            setAuthCookies(res, accessToken, refreshToken)

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user._id)

            // Save refresh token to DB
            user.refreshToken = refreshToken
            await user.save()

            setAuthCookies(res, accessToken, refreshToken)

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
        } else {
            res.status(401).json({ message: "Invalid email or password" })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Send Magic Link
// @route   POST /api/auth/magic-link
// @access  Public
export const sendMagicLink = async (req, res) => {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            // For security, checking user existence shouldn't be revealed, 
            // but for UX in this specific app, we might want to say if not found.
            // Let's stick to secure: generic message, but log it.
            // For this specific 'non-tech client' requirement, I'll return user not found 
            // so they know to register, or auto-register logic could be here (optional).
            // Let's stick to standard flow: User must register first.
            return res.status(404).json({ message: "User not found. Please register first." })
        }

        // Generate random token
        const token = crypto.randomBytes(32).toString("hex")
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        // Save to DB
        user.magicLinkToken = hashedToken
        user.magicLinkExpires = Date.now() + 15 * 60 * 1000 // 15 minutes
        await user.save()

        // Create Verification URL
        // Currently hardcoded to localhost for dev, should beenv based
        const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000"
        const verificationUrl = `${frontendUrl}/verify-magic-link?token=${token}&email=${email}`

        await sendMagicLinkEmail(user.email, verificationUrl)

        res.json({ message: "Magic link sent to your email" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Email could not be sent" })
    }
}

// @desc    Verify Magic Link
// @route   POST /api/auth/verify-magic-link
// @access  Public
export const verifyMagicLink = async (req, res) => {
    try {
        const { email, token } = req.body

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        const user = await User.findOne({
            email,
            magicLinkToken: hashedToken,
            magicLinkExpires: { $gt: Date.now() },
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" })
        }

        // Clear magic link fields
        user.magicLinkToken = undefined
        user.magicLinkExpires = undefined

        // Generate auth tokens
        const { accessToken, refreshToken } = generateTokens(user._id)

        user.refreshToken = refreshToken
        await user.save()

        setAuthCookies(res, accessToken, refreshToken)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Refresh Access Token
// @route   POST /api/auth/refresh
// @access  Public (with Refresh Token Cookie)
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({ message: "Not authorized, no refresh token" })
        }

        // Verify token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret")

        const user = await User.findById(decoded.id)

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" })
        }

        // Generate new access token
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret", {
            expiresIn: ACCESS_TOKEN_EXPIRE,
        })

        // Set only access token cookie (refresh token stays same until logout or rotation)
        res.cookie("accessToken", accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.json({ message: "Token refreshed" })

    } catch (error) {
        console.error(error)
        res.status(401).json({ message: "Not authorized, token failed" })
    }
}

// @desc    Logout User / Clear Cookies
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = async (req, res) => {
    try {
        // Optional: Remove refresh token from DB if you want to invalidate it server-side too
        if (req.cookies.refreshToken) {
            const decoded = jwt.decode(req.cookies.refreshToken)
            if (decoded?.id) {
                await User.findByIdAndUpdate(decoded.id, { $unset: { refreshToken: 1 } })
            }
        }

        res.cookie("accessToken", "", { ...COOKIE_OPTIONS, maxAge: 0 })
        res.cookie("refreshToken", "", { ...COOKIE_OPTIONS, maxAge: 0 })

        res.json({ message: "Logged out successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error" })
    }
}

// @desc    Google OAuth Callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = async (req, res) => {
    try {
        const { accessToken, refreshToken } = generateTokens(req.user._id)

        // Save refresh token
        req.user.refreshToken = refreshToken
        await req.user.save()

        setAuthCookies(res, accessToken, refreshToken)

        // Wait a tick to ensure headers are set
        await new Promise(resolve => setTimeout(resolve, 100))

        // Redirect to frontend without token in URL
        res.redirect(`${process.env.FRONTEND_URL || "http://localhost:3000"}/auth-success`)
    } catch (error) {
        console.error(error)
        res.redirect(`${process.env.FRONTEND_URL || "http://localhost:3000"}/login?error=auth_failed`)
    }
}

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } else {
        res.status(404).json({ message: "User not found" })
    }
}
