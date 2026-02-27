import { ChatSession } from "../models/index.js";

// Keep track of admin socket IDs to broadcast messages efficiently
const adminSockets = new Set();

export const setupChatSocket = (io) => {
    const chatNamespace = io.of('/chat');

    chatNamespace.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // Join admin room
        socket.on('admin_join', () => {
            adminSockets.add(socket.id);
            socket.join('admins');
            console.log(`Admin joined chat: ${socket.id}`);
        });

        // User joins or reconnects to a chat session
        socket.on('join_chat', async ({ name, phone, sessionId }) => {
            try {
                let session;
                if (sessionId) {
                    session = await ChatSession.findById(sessionId);
                }

                if (!session) {
                    // Create new session
                    session = await ChatSession.create({ name, phone, socketId: socket.id });
                    chatNamespace.to('admins').emit('new_session', session);
                } else {
                    // Update existing session socket ID
                    session.socketId = socket.id;
                    await session.save();
                }

                socket.join(session._id.toString());
                socket.emit('session_restored', session);
                console.log(`User ${name} joined session ${session._id}`);
            } catch (error) {
                console.error('Error joining chat:', error);
                socket.emit('error', 'Could not join chat');
            }
        });

        // Handle user sending a message
        socket.on('send_message', async ({ sessionId, content }) => {
            try {
                const session = await ChatSession.findById(sessionId);
                if (!session) return socket.emit('error', 'Session not found');

                const message = { sender: 'user', content, timestamp: new Date() };
                session.messages.push(message);
                await session.save();

                // Broadcast to user (if multiple tabs open) and admins
                chatNamespace.to(sessionId).emit('new_message', { sessionId, message });
                chatNamespace.to('admins').emit('new_message', { sessionId, message });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        });

        // Handle admin replying
        socket.on('admin_reply', async ({ sessionId, content }) => {
            try {
                const session = await ChatSession.findById(sessionId);
                if (!session) return socket.emit('error', 'Session not found');

                const message = { sender: 'admin', content, timestamp: new Date() };
                session.messages.push(message);
                await session.save();

                // Broadcast back to user and all admins
                chatNamespace.to(sessionId).emit('new_message', { sessionId, message });
                chatNamespace.to('admins').emit('new_message', { sessionId, message });
            } catch (error) {
                console.error('Error sending admin reply:', error);
            }
        });

        // Disconnect
        socket.on('disconnect', () => {
            adminSockets.delete(socket.id);
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
};
