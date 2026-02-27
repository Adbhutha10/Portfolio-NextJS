'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
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
            className={`fixed top-6 left-1/2 z-50 w-[95%] max-w-5xl rounded-full transition-all duration-300 border border-white/10 ${scrolled
                ? 'bg-[#121212]/80 backdrop-blur-md shadow-lg shadow-black/20 py-3'
                : 'bg-[#121212]/40 backdrop-blur-sm py-4'
                }`}
        >
            <div className="px-6 flex items-center justify-between">

                {/* Logo / Name */}
                <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-xl font-bold tracking-tight hover:text-blue-400 transition-colors">
                    ADBHUTHA<span className="text-blue-500">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button (Simple implementation for now) */}
                <div className="md:hidden">
                    {/* Add hamburger menu logic if needed later, for now just hidden on mobile or simplified */}
                </div>
            </div>
        </motion.nav>
    );
}
