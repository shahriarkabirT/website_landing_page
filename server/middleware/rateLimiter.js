import { rateLimit } from 'express-rate-limit'

/**
 * Global rate limiter: 100 requests per 15 minutes per IP.
 * Protects the overall server from basic flood attacks.
 */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    standardHeaders: 'draft-7', // Use standard RateLimit headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes',
    },
})

/**
 * Auth rate limiter: 5 requests per 15 minutes per IP.
 * Stricter limit for login, register, and magic link endpoints to prevent brute force.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many login attempts, please try again after 15 minutes',
    },
})

/**
 * Consultation rate limiter: 3 requests per hour per IP.
 * Prevents spamming the consultation submission system.
 */
export const consultationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 3,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Consultation request limit reached. Please try again later or contact support directly.',
    },
})

/**
 * Order rate limiter: 5 requests per hour per IP.
 * Prevents spamming the checkout/order system.
 */
export const orderLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 5,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Order limit reached. Please try again after an hour or contact support if you need assistance.',
    },
})
/**
 * Session rate limiter: 50 requests per 15 minutes per IP.
 * Used for non-sensitive utility endpoints like profile checks and OAuth redirects.
 */
export const sessionLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 50,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many session requests, please try again later.',
    },
})
