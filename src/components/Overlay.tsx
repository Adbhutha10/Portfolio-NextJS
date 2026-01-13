'use client';

import { useTransform, motion, MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {

    // Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);

    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.4, 0.8], [100, -100]);
    const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.8], [0, 1, 1, 0]);


    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center">
            {/* Text 1: Center */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4"
            >
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mix-blend-difference">
                    Beere Adbhutha. <br />
                    <span className="text-4xl md:text-6xl font-light text-gray-300">CS & Engineering.</span>
                </h1>
            </motion.div>

            {/* Text 2: Left */}
            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="absolute top-1/2 left-[10%] -translate-y-1/2 max-w-lg"
            >
                <h2 className="text-5xl md:text-7xl font-semibold text-white leading-tight">
                    Full-Stack, Cloud <br /> & Machine Learning.
                </h2>
            </motion.div>

            {/* Text 3: Right */}
            <motion.div
                style={{ y: y3, opacity: opacity3 }}
                className="absolute top-1/2 right-[10%] -translate-y-1/2 max-w-lg text-right"
            >
                <h2 className="text-5xl md:text-7xl font-semibold text-white leading-tight">
                    Developing scalable <br /> digital solutions.
                </h2>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity: opacity1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-sm uppercase tracking-widest">Scroll</span>
                <ChevronDown className="w-6 h-6" />
            </motion.div>
        </div>
    );
}
