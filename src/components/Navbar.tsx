'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), { ssr: false });

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl rounded-3xl lg:rounded-full transition-all duration-300 border border-[var(--border-primary)] ${scrolled || isOpen
                ? 'bg-[var(--bg-primary)]/90 backdrop-blur-md shadow-lg shadow-black/20 py-3'
                : 'bg-[var(--bg-primary)]/40 backdrop-blur-sm py-4'
                }`}
        >
            <div className="px-6 flex items-center justify-between">
                {/* Logo / Name */}
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-xl font-bold tracking-tight hover:text-[var(--accent-primary)] transition-colors text-[var(--text-primary)]">
                    ADBHUTHA<span className="text-[var(--accent-primary)]">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent-primary)] transition-all group-hover:w-full" />
                        </a>
                    ))}
                    <div className="w-[1px] h-4 bg-[var(--border-primary)] mx-2" />
                    <ThemeSwitcher />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <ThemeSwitcher />
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden bg-transparent"
                    >
                        <div className="flex flex-col items-center gap-6 py-8 px-6 border-t border-[var(--border-primary)] mt-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="text-lg font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors tracking-widest uppercase"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
