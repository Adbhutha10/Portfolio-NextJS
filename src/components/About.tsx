'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y1 = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
    const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    return (
        <section ref={sectionRef} id="about" className="relative py-24 px-6 md:px-12 lg:px-24 bg-[var(--bg-primary)] text-[var(--text-primary)] border-t border-[var(--border-primary)] overflow-hidden transition-colors duration-500">
            {/* Clean Background */}
            
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Top Section: Stacked Bio/Skills & Experience */}
                <div className="flex flex-col gap-24 mb-24">

                    {/* Left Column: Bio & Skills */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
                                <span className="w-12 h-1 bg-[var(--accent-secondary)] rounded-full"></span> About Me
                            </h2>
                            <div className="bg-[var(--bg-secondary)] p-8 md:p-10 rounded-2xl border border-[var(--border-primary)] backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent-secondary)]/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-75" />
                                <p className="text-[var(--text-secondary)] text-lg leading-relaxed relative z-10 w-full">
                                    I aspire to build a strong career in Computer Science with a focus on full-stack development, machine learning, and cloud technologies. I aim to work on cutting-edge projects, develop scalable solutions, and actively contribute to developer communities through initiatives like GDG on Campus and Coding Brigade. By engaging in interdisciplinary, impact-driven work, I seek to strengthen my analytical and problem-solving abilities and prepare for roles in research-oriented product development within the industry.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-[var(--accent-primary)] flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--accent-primary)] rounded-full"></span> Technical Skills
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                                {[
                                    {
                                        title: "Languages",
                                        skills: ["Java", "Python", "JavaScript", "SQL", "Dart"],
                                        accent: "bg-blue-400",
                                        styles: {
                                            card: "hover:border-blue-500/30",
                                            tag: "bg-blue-500/5 border-blue-500/10 hover:bg-blue-500/20 hover:border-blue-500/30"
                                        }
                                    },
                                    {
                                        title: "Web Technologies",
                                        skills: ["React", "Next.js", "Node.js", "FastAPI", "HTML", "CSS"],
                                        accent: "bg-green-400",
                                        styles: {
                                            card: "hover:border-green-500/30",
                                            tag: "bg-green-500/5 border-green-500/10 hover:bg-green-500/20 hover:border-green-500/30"
                                        }
                                    },
                                    {
                                        title: "Databases",
                                        skills: ["MySQL", "MongoDB", "Firebase Firestore", "SQLite", "Prisma ORM"],
                                        accent: "bg-yellow-400",
                                        styles: {
                                            card: "hover:border-yellow-500/30",
                                            tag: "bg-yellow-500/5 border-yellow-500/10 hover:bg-yellow-500/20 hover:border-yellow-500/30"
                                        }
                                    },
                                    {
                                        title: "Tools",
                                        skills: ["Git", "Docker", "GitHub Actions", "Apache POI"],
                                        accent: "bg-purple-400",
                                        styles: {
                                            card: "hover:border-purple-500/30",
                                            tag: "bg-purple-500/5 border-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/30"
                                        }
                                    },
                                    {
                                        title: "Platforms",
                                        skills: ["Firebase", "Vercel", "Railway"],
                                        accent: "bg-pink-400",
                                        styles: {
                                            card: "hover:border-pink-500/30",
                                            tag: "bg-pink-500/5 border-pink-500/10 hover:bg-pink-500/20 hover:border-pink-500/30"
                                        }
                                    }
                                ].map((cat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className={`bg-[var(--bg-secondary)] p-6 rounded-2xl border border-[var(--border-primary)] ${cat.styles.card} hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 group flex flex-col`}
                                    >
                                        <h4 className="font-bold text-[var(--text-primary)] mb-4 text-lg flex items-center gap-2">
                                            <span className={`w-2.5 h-2.5 ${cat.accent} rounded-full group-hover:scale-150 transition-transform duration-500`} />
                                            {cat.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {cat.skills.map((skill, si) => (
                                                <motion.span
                                                    key={si}
                                                    initial={{ opacity: 0, x: -5 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (i * 0.1) + (si * 0.05) }}
                                                    className={`px-3 py-1 ${cat.styles.tag} rounded-full text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-default`}
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Experience */}
                    <div className="space-y-12">
                        {/* New Internship Experience Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-[var(--accent-primary)] flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--accent-primary)] rounded-full"></span> Internship Experience
                            </h3>

                            <div className="space-y-12 border-l border-white/10 pl-8 ml-4">
                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-emerald-400 bg-[var(--bg-primary)] group-hover:bg-emerald-400 transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Summer Research Trainee</h4>
                                    <p className="text-sm text-emerald-400 font-mono tracking-wide mb-3 mt-1">PARAM HANSA CENTER FOR COMPUTATIONAL ONCOLOGY (PHCCO), IISc BANGALORE • MAY 2026 – JUN 2026</p>
                                    <ul className="text-[var(--text-secondary)] leading-relaxed list-disc list-outside ml-4 space-y-2">
                                        <li>Selected for a highly competitive full-time summer training program at IISc Bangalore's Department of Bioengineering, under Prof. Mohit Kumar Jolly.</li>
                                        <li>Studied computational oncology concepts including EGFR-ERK pathway modeling, hypoxia-driven resistance mechanisms, and ODE-based simulations.</li>
                                        <li>Attended dedicated classes, hands-on sessions, research seminars, and mentorship sessions with leading experts in computational and experimental cancer biology.</li>
                                        <li>Completed a research work report on EGFR upregulation mechanisms and their effect on Gefitinib inhibitor sensitivity.</li>
                                    </ul>
                                </div>

                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-primary)] group-hover:bg-[var(--accent-primary)] transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Software Product Development Intern</h4>
                                    <p className="text-sm text-[var(--accent-primary)] font-mono tracking-wide mb-3 mt-1">CYME AUTOMATION SYSTEMS PVT. LTD. • FEB 2026 – APR 2026</p>
                                    <ul className="text-[var(--text-secondary)] leading-relaxed list-disc list-outside ml-4 space-y-2">
                                        <li>Developed algorithms for real-time monitoring and data acquisition applications.</li>
                                        <li>Built database modules to store and process system data.</li>
                                        <li>Assisted in software design, development, and testing of monitoring applications.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Renamed Roles and Responsibilities Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-[var(--accent-secondary)] flex items-center gap-3">
                                <span className="w-8 h-1 bg-[var(--accent-secondary)] rounded-full"></span> Roles and Responsibilities
                            </h3>

                            <div className="space-y-12 border-l border-white/10 pl-8 ml-4">
                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-[var(--accent-secondary)] bg-[var(--bg-primary)] group-hover:bg-[var(--accent-secondary)] transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Feedback and Review Manager</h4>
                                    <p className="text-sm text-[var(--accent-secondary)] font-mono tracking-wide mb-3 mt-1">CODING BRIGADE BVRIT • DEC 2025 - PRESENT</p>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">
                                        Managing and reviewing project submissions to ensure quality, clarity, and adherence to coding standards. Providing constructive feedback to students, helping refine their problem-solving approaches, and supporting the club in organizing coding challenges and review-based learning activities. Facilitating a collaborative environment that encourages continuous improvement and technical skill development among members.
                                    </p>
                                </div>

                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-purple-500 bg-[var(--bg-primary)] group-hover:bg-purple-500 transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Technical Co-Lead</h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-300 font-mono tracking-wide mb-3 mt-1">GDG ON CAMPUS • NOV 2025 - PRESENT</p>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">
                                        Organizing workshops, hackathons, and technical sessions on web development, cloud, and AI while fostering a peer learning environment through study jams and coding meetups. Collaborating with student developers, guiding project-building activities, and connecting the community with the broader GDG network to enhance real-world technical exposure.
                                    </p>
                                </div>

                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-purple-500 bg-[var(--bg-primary)] group-hover:bg-purple-500 transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Open Source Contributor</h4>
                                    <p className="text-sm text-purple-600 dark:text-purple-300 font-mono tracking-wide mb-3 mt-1">GIRLSCRIPT SUMMER OF CODE • JULY 2025 - OCT 2025</p>
                                    <p className="text-[var(--text-secondary)] leading-relaxed">
                                        Contributed to multiple open-source repositories by fixing bugs, implementing new features, and improving documentation quality. Collaborated with maintainers and contributors using Git, GitHub, and issue tracking systems. Enhanced frontend and backend components with technologies such as ReactJS, Firebase, and Node.js while gaining hands-on experience working with real-world codebases and version control workflows.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>

                {/* Education Section - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-[var(--border-primary)] pt-16"
                >
                    <h3 className="text-3xl font-bold mb-12 text-blue-400 flex items-center gap-3 justify-center">
                        <span className="w-12 h-1 bg-blue-500 rounded-full"></span> Education
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-[var(--border-primary)] hover:opacity-80 transition-opacity relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-2xl font-bold text-[var(--text-primary)]">B.Tech in CSE</h4>
                                    <p className="text-[var(--text-secondary)] mt-1">BVRIT Narsapur</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded-full">2023 - 2027</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto text-sm text-[var(--text-secondary)]">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                CGPA: <span className="text-[var(--text-primary)] font-medium text-lg">9.48</span>
                            </div>
                        </div>

                        <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-[var(--border-primary)] hover:opacity-80 transition-opacity relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Pre-University</h4>
                                    <p className="text-[var(--text-secondary)] mt-1">IIIT RGUKT Basar</p>
                                </div>
                                <span className="px-3 py-1 bg-[var(--border-primary)] text-[var(--text-secondary)] text-xs font-mono rounded-full">2021 - 2023</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto text-sm text-[var(--text-secondary)]">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                CGPA: <span className="text-[var(--text-primary)] font-medium text-lg">9.25</span>
                            </div>
                        </div>

                        <div className="bg-[var(--bg-secondary)] p-8 rounded-2xl border border-[var(--border-primary)] hover:opacity-80 transition-opacity relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-xl font-bold text-[var(--text-primary)]">Matriculation</h4>
                                    <p className="text-[var(--text-secondary)] mt-1">Sri Sai Public School</p>
                                </div>
                                <span className="px-3 py-1 bg-[var(--border-primary)] text-[var(--text-secondary)] text-xs font-mono rounded-full">2021</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto text-sm text-[var(--text-secondary)]">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Score: <span className="text-[var(--text-primary)] font-medium text-lg">96.5%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
