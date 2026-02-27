import { io, Socket } from "socket.io-client";

// URL of our separated backend server
const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";

// Create a single instance
export const socket: Socket = io(`${URL}/chat`, {
    autoConnect: false, // Don't connect until the user gives name/phone or admin logs in
    withCredentials: true,
});
