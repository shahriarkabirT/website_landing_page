import express from "express";
import { ChatSession } from "../models/index.js";

const router = express.Router();

// GET all active chat sessions (Admin only)
router.get("/sessions", async (req, res) => {
    try {
        const sessions = await ChatSession.find().sort({ updatedAt: -1 });
        res.json({ success: true, sessions });
    } catch (error) {
        console.error("Error fetching sessions:", error);
        res.status(500).json({ success: false, message: "Error fetching sessions" });
    }
});

// GET a specific session by ID
router.get("/sessions/:id", async (req, res) => {
    try {
        const session = await ChatSession.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found" });
        }
        res.json({ success: true, session });
    } catch (error) {
        console.error("Error fetching session:", error);
        res.status(500).json({ success: false, message: "Error fetching session" });
    }
});

export default router;
