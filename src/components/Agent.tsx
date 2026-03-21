'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChatBubbleLeftRightIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    UserIcon,
    CommandLineIcon,
    ArrowPathIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import FAQS2 from '../data/chatbotFAQs.json';

// Premium "A" Monogram Logo Component
const ChatLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
    <div className={`${className} relative`}>
        <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full drop-shadow-2xl"
            animate={{
                filter: ["drop-shadow(0 0 2px rgba(59,130,246,0.5))", "drop-shadow(0 0 8px rgba(147,51,234,0.5))", "drop-shadow(0 0 2px rgba(59,130,246,0.5))"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
        >
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
            </defs>
            {/* Minimalist "A" structure */}
            <path
                d="M50 15 L85 85 L70 85 L50 45 L30 85 L15 85 Z"
                fill="url(#logoGradient)"
                stroke="white"
                strokeWidth="1"
            />
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        </motion.svg>
    </div>
);

// Customized FAQ Quick-Selectors for Adbhutha
const FAQS = [
    {
        q: "who is adbhutha",
        label: "👋 Introduction",
        a: "Adbhutha Beere is a CSE student at BVRIT specializing in Full Stack, ML, and Cloud. She's passionate about building scalable, AI-driven solutions!"
    },
    {
        q: "technical skills",
        label: "🛠️ Skills",
        a: "Adbhutha's expertise covers Python, JavaScript, Java, React, Node.js, and Machine Learning (TensorFlow/PyTorch). She also works with Docker and Cloud tools."
    },
    {
        q: "research paper",
        label: "📄 Research",
        a: "Adbhutha has published a research paper on 'Cloud Masking using resourcesat-2 images' in IEEE Xplore. It presents a robust method for cloud detection using multi-spectral satellite data."
    },
    {
        q: "major projects",
        label: "📂 Projects",
        a: "Key projects include 'BVRIT Alumni-Student Connect', 'NRSC Cloud Masking', and an 'ML Crop Price Prediction' model."
    },
    {
        q: "contact",
        label: "📩 Let's Connect",
        a: "You can find my contact details below or reach out via LinkedIn. I'm always open to talking about tech and opportunities!"
    }
];

// Smart text normalization
const normalize = (str: string) =>
    str
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, "")
        .replace(/\s+/g, " ")
        .trim();

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
    isError?: boolean;
}

export default function Agent() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',

            content: "Welcome! I'm Adbhutha's Portfolio Copilot. How can I assist you today?",
            timestamp: new Date().toISOString()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'recruiter' | 'tech'>('recruiter');
    const [showToast, setShowToast] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
    const toastHideTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Initial toast notification
    useEffect(() => {
        // Auto-toast has been disabled
    }, []);

    useEffect(() => {
        if (isOpen) {
            setShowToast(false);
            setHasUnread(false);
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const findLocalAnswer = (text: string) => {
        const query = normalize(text);

        // Extended stop words for cleaner keyword matching
        const stopWords = new Set(['what', 'is', 'the', 'her', 'she', 'does', 'did', 'do', 'can', 'you', 'tell', 'me', 'about', 'how', 'much', 'many', 'of', 'for', 'in', 'on', 'with', 'a', 'an', 'who', 'how', 'why', 'where', 'when', 'im', 'give', 'tell', 'me', 'only', 'has', 'have']);
        const queryKeywords = query.split(' ').filter(word => !stopWords.has(word));

        // 1. Check priority FAQS defined above (UI Buttons)
        for (let faq of FAQS) {
            const faqNorm = normalize(faq.q);
            if (query === faqNorm) return faq.a;
        }

        // If the query is long (conversational), let the AI handle it
        if (query.split(' ').length > 6) {
            return null;
        }

        // 2. Check comprehensive list with scoring
        let bestMatch = null;
        let bestScore = 0;


        for (let item of FAQS2) {
            let score = 0;
            for (let key of item.keys) {
                const keyNorm = normalize(key);
                const keyWords = keyNorm.split(' ').filter(word => !stopWords.has(word));

                // Exact phrase match (High Priority) - Use word boundaries to avoid false positives (e.g. 'hi' in 'machine')
                const isExactMatch = new RegExp(`\\b${keyNorm}\\b`, 'i').test(query);
                if (isExactMatch) score += 100;

                // Keyword intersections
                keyWords.forEach(kWord => {
                    if (queryKeywords.includes(kWord)) score += 30;
                });

                // Partial word match (for plurals/suffixes)
                keyWords.forEach(kWord => {
                    queryKeywords.forEach(qWord => {
                        if (qWord.length > 3 && kWord.length > 3) {
                            if (qWord.includes(kWord) || kWord.includes(qWord)) score += 10;
                        }
                    });
                });
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = item.a;
            }
        }

        // Threshold for a confident match
        // Higher threshold for local matches (requires at least 2 strong keyword matches or an exact phrase)
        return bestScore >= 60 ? bestMatch : null;
    };

    const handleSend = async (content = input) => {
        if (!content.trim() || isLoading) return;

        const userMsg = {
            role: 'user' as const,
            content,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const localAnswer = findLocalAnswer(content);
            if (localAnswer) {
                // Quick simulated response for local matches
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        role: 'assistant' as const,
                        content: localAnswer,
                        timestamp: new Date().toISOString()
                    }]);
                    setIsLoading(false);
                }, 600);
            } else {
                // Call Gemini API as fallback
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: [...messages, userMsg] })
                });

                if (!response.ok) throw new Error("API call failed");

                const data = await response.json();
                
                if (data.error) throw new Error(data.error);

                setMessages(prev => [...prev, {
                    role: 'assistant' as const,
                    content: data.content,
                    timestamp: new Date().toISOString()
                }]);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant' as const,
                content: "Hmm, I'm having a bit of trouble connecting to my AI brain. Try checking the sections below or ensure the API key is set!",
                timestamp: new Date().toISOString(),
                isError: true
            }]);
            setIsLoading(false);
        }
    };

    const reset = () => {
        setMessages([{
            role: 'assistant',
            content: "Session reset. Ask me about Adbhutha's projects, skills, or research!",
            timestamp: new Date().toISOString()
        }]);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[1000] font-sans">
            {/* Elegant Notification Toast */}
            <AnimatePresence>
                {showToast && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.8 }}
                        className="absolute bottom-20 right-0 w-72"
                    >
                        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl relative">
                            <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-white/40 hover:text-white">
                                <XMarkIcon className="w-4 h-4" />
                            </button>
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <SparklesIcon className="w-5 h-5 text-blue-400" />
                                </div>
                                <p className="text-xs text-blue-100/90 leading-relaxed">
                                    <span className="font-bold text-white uppercase tracking-wider text-[10px] block mb-1">Copilot Active</span>
                                    I can tell you about Adbhutha's IEEE research paper or her latest AI projects!
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Trigger Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="absolute bottom-0 right-0 w-16 h-16 rounded-3xl bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ChatLogo className="w-9 h-9 z-10" />
                    {hasUnread && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 z-20">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-[#111]"></span>
                        </span>
                    )}
                </motion.button>
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.9, originY: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        className="absolute bottom-0 right-0 mb-4 w-[90vw] md:w-[400px] bg-[#0c0c0c]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.6)] flex flex-col h-[650px] max-h-[80vh]"
                    >
                        {/* Premium Header */}
                        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <ChatLogo className="w-10 h-10" />
                                <div>
                                    <h3 className="font-black text-white text-sm tracking-tight">PORTFOLIO ASSISTANT</h3>
                                    <div className="flex items-center gap-1.5 leading-none">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-gray-400 tracking-wider">AI POWERED</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={reset} className="text-gray-500 hover:text-white p-2 rounded-xl transition-all hover:bg-white/5" title="Reset Chat">
                                    <ArrowPathIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white p-2 rounded-xl transition-all hover:bg-white/5">
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Persona Toggle */}
                        <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between bg-black/40">
                            <div className="flex bg-white/5 p-1 rounded-xl">
                                <button onClick={() => setMode('recruiter')} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-2 ${mode === 'recruiter' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}>
                                    <UserIcon className="w-3.5 h-3.5" /> RECRUITER
                                </button>
                                <button onClick={() => setMode('tech')} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-2 ${mode === 'tech' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}>
                                    <CommandLineIcon className="w-3.5 h-3.5" /> TECH
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <a href="https://linkedin.com/in/adbhutha" target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors"><FaLinkedin className="w-4 h-4" /></a>
                                <a href="https://github.com/Adbhutha10" target="_blank" className="text-gray-400 hover:text-white transition-colors"><FaGithub className="w-4 h-4" /></a>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-none">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className={`max-w-[85%] px-5 py-3 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-xl' : m.isError ? 'bg-red-500/10 border border-red-500/20 text-red-300' : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none shadow-sm'}`}>
                                        {m.content}
                                    </motion.div>
                                    <span className="text-[9px] font-black text-gray-600 mt-2 tracking-widest uppercase">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
                                        {[0, 0.2, 0.4].map(d => <motion.div key={d} animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: d }} className="w-1.5 h-1.5 rounded-full bg-blue-500" />)}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Dynamic FAQ Chips */}
                        <div className="px-6 py-3 border-t border-white/5 bg-black/40 flex gap-2 overflow-x-auto scrollbar-none no-scrollbar">
                            {FAQS.map((f, i) => (
                                <button key={i} onClick={() => handleSend(f.q)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-gray-400 whitespace-nowrap hover:bg-blue-600/10 hover:border-blue-500/30 hover:text-blue-400 transition-all">
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* Input System */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                            <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder={mode === 'recruiter' ? "Ask about experience or resume..." : "Ask about stack or research..."}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-5 pr-14 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-500 disabled:opacity-30 disabled:shadow-none transition-all"
                                >
                                    <PaperAirplaneIcon className="w-6 h-6" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
