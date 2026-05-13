'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Cloud, Sprout, Ticket, MessageSquare, Smartphone, X } from 'lucide-react';
import TiltCard from './TiltCard';

const projects = [
    {
        id: 1,
        title: "BVRIT Alumni-Student Connect",
        category: "Full-Stack Platform",
        description: "Role-based networking platform with dashboards, mentorship matching, and AI assistance (Gemini API). Tech: React, Vite, Firebase.",
        longDescription: "A comprehensive networking platform designed to bridge the gap between alumni and current students. Built with a React frontend and Firebase backend, it features distinct dashboards, seamless mentorship matching algorithms, and integrated AI assistance to help students craft professional messages and resumes.",
        techStack: ["React", "Vite", "Firebase", "Gemini API", "Tailwind CSS"],
        highlights: [
            "Role-based access control for Students, Alumni, and Admins",
            "Real-time chat and mentorship matching features",
            "AI-powered professional development assistant"
        ],
        link: "https://minor-project-64ad1.web.app/",
        icon: GraduationCap
    },
    {
        id: 2,
        title: "NRSC Cloud & Shadow Masking",
        category: "Machine Learning / Research",
        description: "Automated pipeline for cloud/shadow masking from Resourcesat-2 images using unsupervised classification and ML enhancements.",
        longDescription: "A sophisticated machine learning pipeline developed at the National Remote Sensing Centre (ISRO). It automates the detection and masking of clouds and cloud shadows in Resourcesat-2 satellite imagery. The system utilizes advanced unsupervised classification techniques, specifically K-means and ISODATA algorithms, outperforming traditional thresholding methods in accuracy and reliability.",
        techStack: ["Python", "K-Means", "ISODATA", "Multi-spectral Analysis", "GIS Tools"],
        highlights: [
            "Achieved >95% accuracy in cloud detection",
            "Published research paper in IEEE Xplore (ICCPCT 2025)",
            "Significantly reduced manual masking efforts for ISRO scientists"
        ],
        link: "https://github.com/Adbhutha10/NRSC-project",
        icon: Cloud
    },
    {
        id: 3,
        title: "Crop Price Prediction",
        category: "Data Science",
        description: "Regression-based ML model forecasting crop prices using historical market data with Linear Regression and Decision Trees.",
        longDescription: "An agricultural technology solution aimed at helping farmers make informed decisions. By analyzing historical market data and seasonal trends, this machine learning project provides accurate price forecasts for various crops. It leverages robust regression algorithms to predict future market values, enabling better financial planning for the agricultural community.",
        techStack: ["Python", "Scikit-Learn", "Pandas", "Linear Regression", "Decision Trees"],
        highlights: [
            "Trained on extensive historical agricultural market datasets",
            "Provides actionable insights for harvest timing and pricing",
            "Designed for scalability and integration into broader ag-tech platforms"
        ],
        link: "https://github.com/Adbhutha10/Crop-price-prediction",
        icon: Sprout
    },
    {
        id: 4,
        title: "Event Ticket Booking System",
        category: "Web Application",
        description: "Steamlined event discovery and booking system with secure Java/MySQL backend and interactive frontend.",
        longDescription: "A full-stack web application that simplifies the process of discovering and booking event tickets. The system features a robust Java-based backend connected to a MySQL database, ensuring secure transactions and reliable data management. The intuitive frontend provides users with a seamless browsing and purchasing experience.",
        techStack: ["Java", "MySQL", "JavaScript", "HTML/CSS", "JDBC"],
        highlights: [
            "Secure user authentication and booking workflows",
            "Efficient database schema for high-concurrency ticket sales",
            "Responsive and user-friendly interface design"
        ],
        link: "https://github.com/Adbhutha10/event-ticket-booking-system",
        icon: Ticket
    },
    {
        id: 5,
        title: "Query Management System",
        category: "Full Stack Web Application",
        description: "Comprehensive query management platform with OTP-based authentication for Users, Admins, and Mentors, featuring intelligent priority detection, real-time status tracking, email notifications, and Excel report generation using Spring Boot, React, and MySQL.",
        longDescription: "An enterprise-grade solution for managing and resolving organizational queries. This comprehensive platform supports distinct roles (Users, Admins, Mentors) with secure OTP-based authentication. It automates query triaging through intelligent priority detection, keeps stakeholders informed via real-time tracking and email alerts, and provides powerful administrative tools including bulk data export to Excel.",
        techStack: ["Spring Boot", "React", "MySQL", "JWT/OTP Auth", "Tailwind CSS"],
        highlights: [
            "Intelligent priority detection mechanism for efficient query routing",
            "Real-time status tracking and automated email notifications",
            "Comprehensive Admin dashboard with Excel report generation"
        ],
        link: "https://github.com/Adbhutha10/Query-Management-System",
        icon: MessageSquare
    },
    {
        id: 6,
        title: "Real-Time Court Case Tracking",
        category: "Mobile Application",
        description: "Cross-platform mobile app for advocates that fetches live court case data, compares it with a master case list, and generates real-time alerts.",
        longDescription: "A specialized mobile application designed to assist legal professionals in tracking their cases. Built with Flutter for a smooth cross-platform experience, it interfaces with a Python backend to fetch live, real-time court data. The standout feature is its intelligent alert system, which provides color-coded and haptic feedback to advocates as their specific cases approach hearing times, preventing missed appearances.",
        techStack: ["Flutter", "Python", "REST APIs", "Dart", "Haptic Integration"],
        highlights: [
            "Live data fetching and master list comparison",
            "Innovative color-coded and vibration-based alert systems",
            "Cross-platform support (iOS & Android) via Flutter"
        ],
        link: "https://github.com/Adbhutha10/court-monitoring-app",
        icon: Smartphone
    }
];

export default function Projects() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject = projects.find(p => p.id === selectedId);

    return (
        <section id="projects" className="relative min-h-screen py-24 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500">
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
                            className="w-full h-full"
                        >
                            <TiltCard className="w-full h-full">
                                <motion.div
                                    layoutId={`card-${project.id}`}
                                    onClick={() => setSelectedId(project.id)}
                                    className="group relative p-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-500 min-h-[320px] flex flex-col justify-between cursor-pointer w-full h-full"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    {/* Project Icon/Logo */}
                                    <motion.div layoutId={`icon-${project.id}`} className="absolute top-6 right-6 p-3 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)] group-hover:bg-[var(--accent-primary)]/10 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
                                        <project.icon className="w-8 h-8 text-blue-400/80 group-hover:text-blue-400 transition-colors" />
                                    </motion.div>

                                    <div className="relative z-10 flex flex-col h-full pointer-events-none">
                                        <div className="space-y-4">
                                            <motion.div layoutId={`category-${project.id}`} className="text-sm font-mono text-[var(--accent-primary)] tracking-widest uppercase">
                                                {project.category}
                                            </motion.div>
                                            <motion.h3 layoutId={`title-${project.id}`} className="text-3xl font-bold group-hover:text-[var(--accent-primary)] transition-colors pr-12 text-[var(--text-primary)]">
                                                {project.title}
                                            </motion.h3>
                                            <motion.p layoutId={`desc-${project.id}`} className="text-[var(--text-secondary)] leading-relaxed text-lg line-clamp-3">
                                                {project.description}
                                            </motion.p>
                                        </div>

                                        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between pointer-events-none">
                                            <span className="text-sm font-medium text-[var(--accent-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2">
                                                View Case Study
                                                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Full-Screen Modal Overlay */}
            <AnimatePresence>
                {selectedId && selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 lg:p-12 overflow-y-auto overflow-x-hidden"
                    >
                        {/* Dramatic Blurred Backdrop */}
                        <div 
                            className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl"
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Expanding Modal Card */}
                        <motion.div
                            layoutId={`card-${selectedProject.id}`}
                            className="relative w-full max-w-5xl bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-primary)] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden z-10 my-auto flex flex-col max-h-[90vh] transition-colors duration-500"
                        >
                            {/* Premium Header Gradient */}
                            <div className="absolute top-0 left-0 right-0 h-24 md:h-40 bg-gradient-to-b from-[var(--accent-primary)]/20 via-[var(--accent-secondary)]/10 to-transparent pointer-events-none" />

                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-[var(--bg-secondary)] hover:bg-[var(--border-primary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all transform hover:scale-105 z-20"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Scrollable Content */}
                            <div className="p-6 md:p-12 overflow-y-auto flex-grow custom-scrollbar">
                                
                                <motion.div layoutId={`icon-${selectedProject.id}`} className="mb-6 md:mb-8 inline-block p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 shadow-lg">
                                    <selectedProject.icon className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                                </motion.div>

                                <motion.div layoutId={`category-${selectedProject.id}`} className="text-xs md:text-sm font-mono text-blue-400 tracking-widest uppercase mb-3 md:mb-4">
                                    {selectedProject.category}
                                </motion.div>

                                <motion.h3 layoutId={`title-${selectedProject.id}`} className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 text-[var(--text-primary)] tracking-tight">
                                    {selectedProject.title}
                                </motion.h3>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                                    {/* Left Column: Description & Highlights */}
                                    <div className="lg:col-span-2 space-y-12">
                                        <div>
                                            <h4 className="text-2xl font-semibold mb-6 text-[var(--text-primary)] opacity-90">Overview</h4>
                                            <motion.p layoutId={`desc-${selectedProject.id}`} className="text-[var(--text-secondary)] text-lg leading-relaxed">
                                                {selectedProject.longDescription}
                                            </motion.p>
                                        </div>

                                        <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 border border-[var(--border-primary)]">
                                            <h4 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-[var(--text-primary)]">
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                                Key Highlights
                                            </h4>
                                            <ul className="space-y-4">
                                                {selectedProject.highlights.map((highlight, i) => (
                                                    <motion.li 
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                                        className="flex items-start gap-4 text-[var(--text-secondary)] text-lg"
                                                    >
                                                        <svg className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        <span className="leading-relaxed">{highlight}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right Column: Tech Stack & Links */}
                                    <div className="space-y-8">
                                        <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 border border-[var(--border-primary)]">
                                            <h4 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.techStack.map((tech, i) => (
                                                    <span 
                                                        key={i}
                                                        className="px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-full text-sm font-medium text-[var(--text-secondary)]"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-4">
                                            <a 
                                                href={selectedProject.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="w-full py-4 bg-[var(--accent-primary)] hover:opacity-90 text-[var(--text-on-accent)] rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_var(--accent-primary)]/20 hover:shadow-[0_0_30px_var(--accent-primary)]/40 transform hover:-translate-y-1"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                Live View / Repository
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
