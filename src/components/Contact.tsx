'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Contact() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "c54efee8-e008-4551-a73f-4180066957d8",
                    ...formData,
                    subject: `New Portfolio Inquiry from ${formData.name}`,
                    from_name: "Portfolio Inquiry"
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                console.error("Submission failed:", data);
                throw new Error(data.message || 'Failed to send');
            }
        } catch (err) {
            console.error("Contact error:", err);
            setStatus('error');
        }
    };

    return (
        <footer id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-primary)] relative overflow-hidden transition-colors duration-500">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-primary)]/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    
                    {/* Left Side: Brand & Socials */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1] text-[var(--text-primary)]">
                                LET'S BUILD <br /> 
                                <span className="text-[var(--accent-primary)]">THE FUTURE.</span>
                            </h2>
                            <p className="text-[var(--text-secondary)] text-lg max-w-md leading-relaxed">
                                Currently seeking opportunities in Full-Stack Development and AI/ML. Let's collaborate on something extraordinary.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email</span>
                                <a href="mailto:23211a0533@bvrit.ac.in" className="text-2xl md:text-3xl font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors underline-offset-8 decoration-1">
                                    23211a0533@bvrit.ac.in
                                </a>
                            </div>

                            <div className="flex gap-8 pt-4">
                                <a href="https://linkedin.com/in/adbhutha" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 group">
                                    LinkedIn <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                                </a>
                                <a href="https://github.com/Adbhutha10" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-2 group">
                                    GitHub <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Professional Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl relative"
                    >
                        {status === 'success' ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                    <CheckCircle2 className="w-10 h-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-[var(--text-primary)]">Message Sent!</h3>
                                    <p className="text-[var(--text-secondary)]">Thanks for reaching out, Adbhutha will get back to you soon.</p>
                                </div>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="px-8 py-3 bg-[var(--bg-primary)] hover:bg-[var(--border-primary)] border border-[var(--border-primary)] rounded-full text-sm font-bold transition-all text-[var(--text-primary)]"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 px-1">Full Name</label>
                                        <input 
                                            required
                                            type="text"
                                            suppressHydrationWarning
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--accent-primary)]/50 transition-all text-[var(--text-primary)]"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 px-1">Email Address</label>
                                        <input 
                                            required
                                            type="email"
                                            suppressHydrationWarning
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--accent-primary)]/50 transition-all text-[var(--text-primary)]"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 px-1">Message</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-4 text-sm focus:outline-none focus:border-[var(--accent-primary)]/50 transition-all text-[var(--text-primary)] resize-none"
                                        placeholder="Hello! I'm interested in..."
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={status === 'loading'}
                                    suppressHydrationWarning
                                    className="w-full py-5 bg-[var(--accent-primary)] hover:opacity-90 text-[var(--text-on-accent)] rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-[var(--accent-primary)]/20 disabled:opacity-50"
                                >
                                    {status === 'loading' ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                                {status === 'error' && (
                                    <div className="flex items-center gap-2 text-red-400 text-xs mt-4 justify-center">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Oops! Something went wrong. Please try again.</span>
                                    </div>
                                )}
                            </form>
                        )}
                    </motion.div>
                </div>

                <div className="mt-24 pt-12 border-t border-white/5 text-center">
                    <div className="text-gray-600 text-xs font-mono tracking-widest uppercase">
                        © {new Date().getFullYear()} BEERE ADBHUTHA • Built with Next.js & Framer Motion
                    </div>
                </div>
            </div>
        </footer>
    );
}
