'use client';

import { motion } from 'framer-motion';

export default function About() {
    return (
        <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#0a0a0a] text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto">

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
                                <span className="w-12 h-1 bg-purple-500 rounded-full"></span> About Me
                            </h2>
                            <div className="bg-white/5 p-8 md:p-10 rounded-2xl border border-white/5 backdrop-blur-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-75" />
                                <p className="text-gray-300 text-lg leading-relaxed relative z-10 w-full">
                                    I aspire to build a strong career in Computer Science with a focus on full-stack development, machine learning, and cloud technologies. I aim to work on cutting-edge projects, develop scalable solutions, and actively contribute to developer communities through initiatives like GDG on Campus and Coding Brigade. By engaging in interdisciplinary, impact-driven work, I seek to strengthen my analytical and problem-solving abilities and prepare for roles in research-oriented product development within the industry.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                                <span className="w-8 h-1 bg-blue-500 rounded-full"></span> Technical Skills
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                                    <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-400 rounded-full group-hover:scale-125 transition-transform" /> Programming
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">C, Python, JavaScript, SQL, C++ (Basics), Java</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-green-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                                    <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-400 rounded-full group-hover:scale-125 transition-transform" /> Web Development
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">HTML, CSS, ReactJS, Node.js, Tailwind CSS</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                                    <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-400 rounded-full group-hover:scale-125 transition-transform" /> Machine Learning
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">Pandas, NumPy, Matplotlib, Seaborn, NLTK, SpaCy, Transformers, scikit-learn, TensorFlow, PyTorch</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-pink-500/30 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 group">
                                    <h4 className="font-bold text-white mb-3 text-lg flex items-center gap-2">
                                        <span className="w-2 h-2 bg-pink-400 rounded-full group-hover:scale-125 transition-transform" /> Tools & Platforms
                                    </h4>
                                    <p className="text-gray-400 leading-relaxed text-sm">Git, GitHub, VS Code, Jupyter Notebook, Postman, Vercel, Google Firebase, Docker</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Experience */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-3">
                                <span className="w-8 h-1 bg-blue-500 rounded-full"></span> Experience
                            </h3>

                            <div className="space-y-12 border-l border-white/10 pl-8 ml-4">
                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-blue-500 bg-[#0a0a0a] group-hover:bg-blue-500 transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-white">Feedback and Review Manager</h4>
                                    <p className="text-sm text-blue-300 font-mono tracking-wide mb-3 mt-1">CODING BRIGADE BVRIT • DEC 2025 - PRESENT</p>
                                    <p className="text-gray-400 leading-relaxed">
                                        Managing and reviewing project submissions to ensure quality, clarity, and adherence to coding standards. Providing constructive feedback to students, helping refine their problem-solving approaches, and supporting the club in organizing coding challenges and review-based learning activities. Facilitating a collaborative environment that encourages continuous improvement and technical skill development among members.
                                    </p>
                                </div>

                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-blue-500 bg-[#0a0a0a] group-hover:bg-blue-500 transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-white">Technical Co-Lead</h4>
                                    <p className="text-sm text-blue-300 font-mono tracking-wide mb-3 mt-1">GDG ON CAMPUS • NOV 2025 - PRESENT</p>
                                    <p className="text-gray-400 leading-relaxed">
                                        Organizing workshops, hackathons, and technical sessions on web development, cloud, and AI while fostering a peer learning environment through study jams and coding meetups. Collaborating with student developers, guiding project-building activities, and connecting the community with the broader GDG network to enhance real-world technical exposure.
                                    </p>
                                </div>

                                <div className="relative group">
                                    <span className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-gray-600 bg-[#0a0a0a] group-hover:bg-gray-600 transition-colors duration-300" />
                                    <h4 className="text-xl font-bold text-white">Open Source Contributor</h4>
                                    <p className="text-sm text-gray-500 font-mono tracking-wide mb-3 mt-1">GIRLSCRIPT SUMMER OF CODE • JULY 2025 - OCT 2025</p>
                                    <p className="text-gray-400 leading-relaxed">
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
                    className="border-t border-white/5 pt-16"
                >
                    <h3 className="text-3xl font-bold mb-12 text-blue-400 flex items-center gap-3 justify-center">
                        <span className="w-12 h-1 bg-blue-500 rounded-full"></span> Education
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-2xl font-bold text-white">B.Tech in CSE</h4>
                                    <p className="text-gray-400 mt-1">BVRIT Narsapur</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-mono rounded-full">2023 - 2027</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto text-sm text-gray-500">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                CGPA: <span className="text-gray-300 font-medium text-lg">9.57</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-xl font-bold text-white">Pre-University</h4>
                                    <p className="text-gray-400 mt-1">IIIT RGUKT Basar</p>
                                </div>
                                <span className="px-3 py-1 bg-white/10 text-gray-400 text-xs font-mono rounded-full">2021 - 2023</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto text-sm text-gray-500">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                CGPA: <span className="text-gray-300 font-medium text-lg">9.25</span>
                            </div>
                        </div>

                        <div className="bg-white/5 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div>
                                    <h4 className="text-xl font-bold text-white">Matriculation</h4>
                                    <p className="text-gray-400 mt-1">Sri Sai Public School</p>
                                </div>
                                <span className="px-3 py-1 bg-white/10 text-gray-400 text-xs font-mono rounded-full">2021</span>
                            </div>
                            <div className="flex items-center gap-2 mt-auto text-sm text-gray-500">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                Score: <span className="text-gray-300 font-medium text-lg">96.5%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
