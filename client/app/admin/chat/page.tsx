"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { MessageCircle, Send, User, Bell } from "lucide-react";
import AdminSidebar from "../../components/admin/admin-sidebar";

interface ChatSession {
    _id: string;
    name: string;
    phone: string;
    status: string;
    updatedAt: string;
    messages: {
        sender: string;
        content: string;
        timestamp: string;
    }[];
}

export default function AdminChatPage() {
    const { user, loading } = useAuth();
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch initial sessions
    const fetchSessions = async () => {
        try {
            const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5002";
            const res = await fetch(`${URL}/api/chat/sessions`);
            const data = await res.json();
            if (data.success) {
                setSessions(data.sessions);
            }
        } catch (error) {
            console.error("Failed to fetch sessions:", error);
        }
    };

    useEffect(() => {
        // Only admins should see this, but we'll setup socket assuming admin role
        if (user && user.role === "admin") {
            fetchSessions();

            socket.connect();
            socket.emit("admin_join");

            // Handle entirely new sessions
            socket.on("new_session", (session) => {
                setSessions((prev) => [session, ...prev]);
                // Also play a sound or show notification here in a real app
            });

            // Handle new messages (either to an active or inactive session)
            socket.on("new_message", ({ sessionId, message }) => {
                setSessions((prev) =>
                    prev.map((session) => {
                        if (session._id === sessionId) {
                            return {
                                ...session,
                                messages: [...session.messages, message],
                                updatedAt: new Date().toISOString()
                            };
                        }
                        return session;
                    }).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                );
            });

            return () => {
                socket.off("new_session");
                socket.off("new_message");
                socket.disconnect();
            };
        }
    }, [user]);

    // Scroll to bottom when messages change in active session
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [sessions, activeSessionId]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && activeSessionId) {
            socket.emit("admin_reply", { sessionId: activeSessionId, content: message });
            setMessage("");
        }
    };

    const activeSession = sessions.find((s) => s._id === activeSessionId);

    if (loading) {
        return <div className="p-8 text-center text-slate-500">Loading...</div>;
    }

    if (!user || user.role !== "admin") {
        return <div className="p-8 text-center text-slate-500">Unauthorized / Authenticating...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans">
            {/* Sidebar */}
            <AdminSidebar activeView="chat" />

            {/* Main Content */}
            <main className="flex-1 ml-64 p-10 overflow-hidden flex flex-col h-screen">
                <header className="mb-8 flex justify-between items-center shrink-0">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Live Chat</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage and respond to real-time customer inquiries</p>
                    </div>
                </header>

                <div className="flex flex-1 gap-6 w-full min-h-0 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-hidden">
                    {/* Sidebar: Session List */}
                    <Card className="w-1/3 flex flex-col overflow-hidden">
                        <CardHeader className="py-4 px-4 border-b bg-slate-50">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MessageCircle size={18} /> Chat Sessions
                            </CardTitle>
                        </CardHeader>
                        <ScrollArea className="flex-1">
                            {sessions.length === 0 ? (
                                <div className="p-8 text-center text-slate-400">
                                    <MessageCircle className="mx-auto mb-2 opacity-20" size={32} />
                                    No active chat sessions
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    {sessions.map((session) => (
                                        <button
                                            key={session._id}
                                            onClick={() => setActiveSessionId(session._id)}
                                            className={`p-4 text-left border-b transition-colors hover:bg-slate-50 flex items-start justify-between ${activeSessionId === session._id ? "bg-slate-100 border-l-4 border-l-primary" : ""
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="font-semibold text-sm truncate">{session.name}</div>
                                                <div className="text-xs text-slate-500 truncate mb-1">{session.phone}</div>
                                                <div className="text-xs text-slate-400 truncate">
                                                    {session.messages.length > 0
                                                        ? session.messages[session.messages.length - 1].content
                                                        : "No messages yet"}
                                                </div>
                                            </div>
                                            <div className="text-[10px] text-slate-400 shrink-0 ml-2">
                                                {format(new Date(session.updatedAt), "HH:mm")}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </Card>

                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/30">
                        {activeSession ? (
                            <>
                                <CardHeader className="py-4 px-6 border-b bg-white flex flex-row items-center justify-between shadow-sm z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <User className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{activeSession.name}</h3>
                                            <p className="text-xs text-slate-500">{activeSession.phone}</p>
                                        </div>
                                    </div>
                                </CardHeader>

                                <ScrollArea className="flex-1 p-6 bg-slate-50/50">
                                    <div className="space-y-4">
                                        {activeSession.messages.map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender === "admin" ? "justify-end" : "justify-start"
                                                    }`}
                                            >
                                                <div
                                                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${msg.sender === "admin"
                                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                        : "bg-white border text-slate-800 rounded-tl-sm"
                                                        }`}
                                                >
                                                    {msg.content}
                                                    <span className={`block text-[10px] mt-1 ${msg.sender === "admin" ? "text-primary-foreground/70" : "text-slate-400"
                                                        }`}>
                                                        {format(new Date(msg.timestamp), "h:mm a")}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>

                                <div className="p-4 bg-white border-t">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <Input
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder={`Reply to ${activeSession.name}...`}
                                            className="flex-1 bg-slate-50 focus-visible:ring-1 focus-visible:ring-primary"
                                        />
                                        <Button type="submit" disabled={!message.trim()} className="shrink-0 px-6 gap-2">
                                            Send <Send size={16} />
                                        </Button>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                                <div className="bg-white p-6 rounded-full shadow-sm mb-4">
                                    <MessageCircle size={48} className="text-blue-100" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">No Chat Selected</h3>
                                <p className="text-sm">Select a conversation from the left to start messaging</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
