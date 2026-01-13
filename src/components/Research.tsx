'use client';

import { motion } from 'framer-motion';

export default function Research() {
    return (
        <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 p-8 md:p-12 rounded-3xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <svg className="w-24 h-24 text-white/5" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" /></svg>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        <div className="space-y-4 max-w-2xl">
                            <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-mono rounded-full uppercase tracking-wider">
                                IEEE Publication
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                                ICCPCT 2025: Research Paper
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Authored and presented a research paper officially accepted and published in IEEE Xplore.
                            </p>
                        </div>

                        <a
                            href="https://ieeexplore.ieee.org/document/11176562"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Read Paper
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
