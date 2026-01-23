import jwt from "jsonwebtoken"
import { User } from "../models/index.js"

export const protect = async (req, res, next) => {
    let token

    // Check for cookie first (preferred)
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken
    }
    // Fallback to Bearer header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (token && token !== "undefined" && token !== "null") {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret")
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.error(error.message) // Log exact error
            res.status(401).json({ message: "Not authorized, token failed" })
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" })
    }
}

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role (${req.user ? req.user.role : 'none'}) is not authorized to access this resource`
            })
        }
        next()
    }
}

export const optionalProtect = async (req, res, next) => {
    let token

    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (token && token !== "undefined" && token !== "null") {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret")
            req.user = await User.findById(decoded.id).select("-password")
        } catch (error) {
            // Silently ignore
        }
    }
    next()
}
