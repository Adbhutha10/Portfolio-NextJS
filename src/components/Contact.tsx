'use client';

import { motion } from 'framer-motion';

export default function Contact() {
    return (
        <footer className="py-24 px-6 md:px-12 lg:px-24 bg-[#121212] text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-12"
                >
                    LET'S BUILD <br /> THE FUTURE.
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8"
                >
                    <a
                        href="mailto:23211a0533@bvrit.ac.in"
                        className="text-2xl md:text-4xl text-gray-400 hover:text-white transition-colors border-b border-gray-700 hover:border-white pb-2"
                    >
                        23211a0533@bvrit.ac.in
                    </a>

                    <div className="flex gap-8 mt-8">
                        <a href="https://linkedin.com/in/adbhutha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-lg font-medium transition-colors">LinkedIn</a>
                        <a href="https://github.com/Adbhutha10" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-lg font-medium transition-colors">GitHub</a>
                        <a href="https://adbhutha10.github.io/Adbhutha-Portfolio/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-lg font-medium transition-colors">Old Portfolio</a>
                    </div>

                    <div className="mt-24 text-gray-600 text-sm">
                        © {new Date().getFullYear()} Beere Adbhutha. Built with Next.js & Framer Motion.
                    </div>
                </motion.div>

            </div>
        </footer>
    );
}
