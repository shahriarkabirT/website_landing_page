"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";
import { socket } from "@/lib/socket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

export const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Restore session on mount if exists in local storage
    useEffect(() => {
        const savedSessionId = localStorage.getItem("chatSessionId");
        const savedName = localStorage.getItem("chatName");
        const savedPhone = localStorage.getItem("chatPhone");

        if (savedSessionId && savedName && savedPhone) {
            setSessionId(savedSessionId);
            setName(savedName);
            setPhone(savedPhone);
            setIsRegistered(true);
        }
    }, []);

    useEffect(() => {
        if (isRegistered) {
            socket.connect();
            socket.emit("join_chat", { name, phone, sessionId });

            socket.on("session_restored", (session) => {
                setSessionId(session._id);
                setMessages(session.messages || []);
                localStorage.setItem("chatSessionId", session._id);
                localStorage.setItem("chatName", name);
                localStorage.setItem("chatPhone", phone);
            });

            socket.on("new_message", ({ message }) => {
                setMessages((prev) => [...prev, message]);
            });

            return () => {
                socket.off("session_restored");
                socket.off("new_message");
                socket.disconnect();
            };
        }
    }, [isRegistered]);

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && phone.trim()) {
            setIsRegistered(true);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && sessionId) {
            socket.emit("send_message", { sessionId, content: message });
            setMessage("");
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white border shadow-2xl rounded-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <MessageCircle size={18} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm">Live Support</h3>
                                    <p className="text-xs text-primary-foreground/80">We typically reply in minutes</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-primary-foreground/80 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content body */}
                        <div className="flex-1 overflow-hidden bg-slate-50 flex flex-col">
                            {!isRegistered ? (
                                <div className="p-6 flex-1 flex flex-col justify-center">
                                    <div className="text-center mb-6">
                                        <h4 className="font-semibold text-lg text-slate-800 mb-1">Welcome! 👋</h4>
                                        <p className="text-sm text-slate-500">Please provide your details to start the chat.</p>
                                    </div>
                                    <form onSubmit={handleRegister} className="space-y-4">
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                placeholder="Phone Number"
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                                className="bg-white"
                                            />
                                        </div>
                                        <Button type="submit" className="w-full font-medium bg-blue-600 text-white hover:bg-blue-700">
                                            Start Chatting
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <>
                                    <ScrollArea className="flex-1 p-4">
                                        {messages.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-3 mt-20">
                                                <MessageCircle size={32} className="opacity-20" />
                                                <p className="text-sm text-center">No messages yet.<br />Send a message to start.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {messages.map((msg, i) => (
                                                    <div
                                                        key={i}
                                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                                                            }`}
                                                    >
                                                        {msg.sender === "admin" && (
                                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center mr-2 shrink-0">
                                                                <User size={14} className="text-slate-500" />
                                                            </div>
                                                        )}
                                                        <div
                                                            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${msg.sender === "user"
                                                                ? "bg-blue-600 text-white shadow-md rounded-tr-sm"
                                                                : "bg-white border text-slate-700 shadow-sm rounded-tl-sm"
                                                                }`}
                                                        >
                                                            {msg.content}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div ref={scrollRef} />
                                    </ScrollArea>
                                    <div className="p-3 bg-white border-t">
                                        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                            <Input
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Type your message..."
                                                className="flex-1 bg-slate-50 border-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                                            />
                                            <Button type="submit" size="icon" disabled={!message.trim()} className="shrink-0 rounded-full h-10 w-10 bg-blue-600 text-white hover:bg-blue-700">
                                                <Send size={16} className="ml-0.5" />
                                            </Button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors h-14 w-14 rounded-full shadow-xl flex items-center justify-center overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.15 }}
                        >
                            <MessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
