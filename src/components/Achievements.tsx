'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const certifications = [
    { name: "Oracle Cloud Database Services 2025", issuer: "Oracle", year: "2025", link: "https://drive.google.com/file/d/1XVncaaRZWByxsLQqXFi6Zkp7yfWbzFTv/view?usp=sharing" },
    { name: "AWS Solutions Architecture Simulation", issuer: "Forage", year: "2025", link: "https://drive.google.com/file/d/14I_IX0f9Jd9YEjhrQ2pfz6aPavnjK0_R/view?usp=sharing" },
    { name: "Data Analytics Job Simulation", issuer: "Deloitte Australia", year: "2025", link: "https://drive.google.com/file/d/1Tn_7OoR1HSPyO6X0BScyTDxeWconnND9/view?usp=sharing" },
    { name: "The Joy of Computing Using Python", issuer: "NPTEL (IIT Madras)", year: "2024", link: "https://drive.google.com/file/d/1fr63aZMoO7B1o4q5-7Mx2q4QB-dwONFh/view?usp=sharing" },
    { name: "Artificial Intelligence Foundation", issuer: "Infosys", year: "2024", link: "https://drive.google.com/file/d/1MRKpqF600o73OH7miwt0-U6eR0osR1qi/view?usp=sharing" },
    { name: "Soft Skills", issuer: "NPTEL (IIT Roorkee)", year: "2024", link: "https://drive.google.com/file/d/1-quC089hNFROyJq6QsNmi4korUcq7yX2/view?usp=sharing" },
    { name: "Responsive Web Designing", issuer: "TechA", year: "2024", link: "https://drive.google.com/file/d/1sVKwVFmAqz6ejAwqca8jkS2vpyQ3sIyR/view?usp=sharing" },
];

const achievements = [
    {
        title: "Best Paper Award – National Seminar on AI (2025)",
        desc: "Awarded Best Paper at the National Seminar on 'Emerging Trends in AI' for the research paper 'Personalized AI-Enhanced Alumni Association Platform'. Recognized for innovation and practical impact in educational systems.",
        tags: ["Research", "AI", "Best Paper"],
        link: "https://drive.google.com/file/d/18ttiQdR3x4iYeQp8TRpIqDfCDUHVL5i3/view?usp=sharing"
    },
    {
        title: "National Semi-Finalist – Flipkart GRID 7.0 (2025)",
        desc: "Selected as a National Semi-Finalist in Flipkart's prestigious engineering challenge. Competed among thousands of teams, advancing through screening rounds based on problem-solving, technical depth, and system design.",
        tags: ["Hackathon", "System Design", "Top Tier"],
        link: "https://drive.google.com/file/d/1a0SZIG_14v8ODOZX_ZeehM-sbL_3A28v/view?usp=sharing"
    },
    {
        title: "Technova 2025",
        desc: "Developed 'DebtEase' finance assistant. Solved real-time financial tracking issues with AI insights.",
        tags: ["Hackathon", "FinTech", "Winner"],
        link: "https://drive.google.com/file/d/1bXHwDKaAbjC5YVN5KE2Hzu-nrm8TC2Q0/view?usp=sharing"
    },
    {
        title: "4hr Hackathon @ BVRIT",
        desc: "Built MVP for Alumni Connect platform. Rapid prototyping and effective solution delivery under tight constraints.",
        tags: ["Hackathon", "MVP", "Rapid Dev"],
        link: "https://drive.google.com/file/d/1mdGVEqd47i_lLsboomCq4_BLZShytY23/view?usp=sharing"
    },
    {
        title: "Turing Cup 2k25",
        desc: "Competed in CodeStorm, a prestigious coding hackathon organized by Turing Hut, VNR VJIET. Tackled complex algorithmic challenges in a competitive environment.",
        tags: ["Hackathon", "Competitive Coding"],
        link: "https://drive.google.com/file/d/1xmla4MabYHKDbkiKTOKccK8NLzFjMVCM/view?usp=sharing"
    },
];

export default function Achievements() {
    return (
        <section id="achievements" className="py-24 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] transition-colors duration-500">
            <div className="max-w-5xl mx-auto flex flex-col gap-24">

                {/* Certifications */}
                <div className="space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-8 flex items-center gap-3 text-[var(--text-primary)]"
                    >
                        <span className="w-2 h-8 bg-[var(--accent-primary)] rounded-full" /> Certifications
                    </motion.h2>

                    <div className="space-y-6">
                        {certifications.map((cert, index) => (
                            <motion.a
                                key={index}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex justify-between items-center border-b border-[var(--border-primary)] pb-4 group hover:pl-4 transition-all duration-300 cursor-pointer"
                            >
                                <div>
                                    <h4 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors flex items-center gap-2">
                                        {cert.name}
                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent-primary)]" />
                                    </h4>
                                    <p className="text-sm text-[var(--text-secondary)]">{cert.issuer}</p>
                                </div>
                                <span className="inline-flex items-center gap-2 text-sm font-mono text-[var(--accent-primary)] hover:text-[var(--text-primary)] transition-colors group">{cert.year}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Achievements */}
                <div className="space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-8 flex items-center gap-3 text-[var(--text-primary)]"
                    >
                        <span className="w-2 h-8 bg-[var(--accent-primary)] rounded-full" /> Hackathons & Awards
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {achievements.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="p-6 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl hover:border-[var(--accent-primary)]/50 transition-all duration-300 group flex flex-col relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors pr-8">{item.title}</h4>
                                    <a href={item.link || "#"} className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors p-1" title="View Certificate" target={item.link ? "_blank" : "_self"} rel={item.link ? "noopener noreferrer" : ""}>
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                                <p className="text-[var(--text-secondary)] leading-relaxed text-sm mb-6 flex-grow">{item.desc}</p>
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-[var(--bg-primary)] rounded text-xs text-[var(--text-secondary)] border border-[var(--border-primary)]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
