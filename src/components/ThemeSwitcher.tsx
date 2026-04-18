'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, Zap, Moon } from 'lucide-react';

type Theme = 'default' | 'cyberpunk' | 'mono';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<Theme>('default');
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        setIsOpen(false);
    };

    const themes: { id: Theme; label: string; icon: any; color: string }[] = [
        { id: 'default', label: 'Deep Blue', icon: Moon, color: 'bg-blue-500' },
        { id: 'cyberpunk', label: 'Cyberpunk', icon: Zap, color: 'bg-[#ff00f7]' },
        { id: 'mono', label: 'Minimalist', icon: Palette, color: 'bg-white' },
    ];

    if (!mounted) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                suppressHydrationWarning
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-300 hover:text-white group"
            >
                <Sparkles className="w-4 h-4 text-[var(--accent-primary)] group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-medium hidden sm:inline">Theme</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-48 bg-[var(--bg-primary)] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 backdrop-blur-xl"
                    >
                        <div className="space-y-1">
                            {themes.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => toggleTheme(t.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
                                        theme === t.id 
                                        ? 'bg-white/10 text-white' 
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <div className={`w-2 h-2 rounded-full ${t.color} ${theme === t.id ? 'animate-pulse' : ''}`} />
                                    <span className="text-xs font-medium">{t.label}</span>
                                    {theme === t.id && (
                                        <div className="ml-auto w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
