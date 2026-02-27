import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: String, // 'user' or 'admin'
        required: true,
        enum: ['user', 'admin']
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSessionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'closed'],
        default: 'active'
    },
    messages: [messageSchema],
    socketId: {
        type: String, // Current socketId of the user, can be updated on reconnect
        default: null
    }
}, { timestamps: true });

export const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
