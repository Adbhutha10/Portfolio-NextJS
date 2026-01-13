'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Cloud, Sprout, Ticket } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "BVRIT Alumni-Student Connect",
        category: "Full-Stack Platform",
        description: "Role-based networking platform with dashboards, mentorship matching, and AI assistance (Gemini API). Tech: React, Vite, Firebase.",
        link: "https://minor-project-64ad1.web.app/",
        icon: GraduationCap
    },
    {
        id: 2,
        title: "NRSC Cloud & Shadow Masking",
        category: "Machine Learning / Research",
        description: "Automated pipeline for cloud/shadow masking from Resourcesat-2 images using unsupervised classification and ML enhancements.",
        link: "https://github.com/Adbhutha10/NRSC-project",
        icon: Cloud
    },
    {
        id: 3,
        title: "Crop Price Prediction",
        category: "Data Science",
        description: "Regression-based ML model forecasting crop prices using historical market data with Linear Regression and Decision Trees.",
        link: "https://github.com/Adbhutha10/Crop-price-prediction",
        icon: Sprout
    },
    {
        id: 4,
        title: "Event Ticket Booking System",
        category: "Web Application",
        description: "Steamlined event discovery and booking system with secure Java/MySQL backend and interactive frontend.",
        link: "https://github.com/Adbhutha10/event-ticket-booking-system",
        icon: Ticket
    }
];

export default function Projects() {
    return (
        <section className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-[#121212] text-white">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-16 tracking-tight"
                >
                    Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-500 min-h-[320px] flex flex-col"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Project Icon/Logo */}
                            <div className="absolute top-6 right-6 p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-blue-500/10 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
                                <project.icon className="w-8 h-8 text-blue-400/80 group-hover:text-blue-400 transition-colors" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between mt-8">
                                <div className="space-y-4">
                                    <div className="text-sm font-mono text-blue-400 tracking-widest uppercase">
                                        {project.category}
                                    </div>
                                    <h3 className="text-3xl font-bold group-hover:text-blue-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        {project.description}
                                    </p>
                                </div>


                                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-blue-400 transition-colors flex items-center gap-2">
                                        View Project
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
