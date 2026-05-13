'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export default function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 0.4], [100, 0]);

  return (
    <section 
      ref={containerRef}
      id="quote"
      className="relative min-h-screen w-full bg-transparent z-20 -mt-[8vh] lg:-mt-[15vh] px-2 lg:px-12 pb-20"
    >
      <motion.div
        style={{ opacity, scale, y, borderRadius: "40px" }}
        className="relative w-full min-h-[85vh] bg-[var(--bg-secondary)] border border-[var(--border-primary)] shadow-[0_-20px_80px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between py-12 px-6 lg:px-14 transition-colors duration-500"
      >
        {/* Background Vertical Lines */}
        <div className="absolute inset-0 flex justify-between px-6 lg:px-14 pointer-events-none opacity-[0.03]">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-[1px] h-full bg-white" />
          ))}
        </div>

        {/* ── Top Bar ── */}
        <div className="relative z-10 flex justify-between items-center text-[10px] font-mono-custom tracking-[0.2em] text-[var(--text-secondary)] uppercase">
          <div className="flex gap-4">
            <span>HYDERABAD</span>
            <span>/</span>
            {mounted && (
              <>
                <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                <span>/</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()}</span>
              </>
            )}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 py-12">
          {/* Profile Portrait */}
          <div className="relative group">
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-[var(--border-primary)] p-2 bg-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <div className="relative w-full h-full rounded-full overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                <Image
                  src="/projects/prof_adb.jpeg"
                  alt="Adbhutha Beere"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Live Status Indicator */}
            <div className="absolute top-4 right-4 lg:top-8 lg:right-8 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.8)] border-2 border-[var(--bg-secondary)] animate-pulse" />
          </div>

          {/* Quote Text */}
          <div className="relative max-w-4xl text-center lg:text-left">
            <Quote className="absolute -top-12 -left-8 w-16 h-16 text-blue-500/20 fill-blue-500/20" />

            <div className="flex flex-col gap-2">
              <h2 className="text-[clamp(40px,8vw,90px)] font-black leading-[0.9] tracking-tighter text-[var(--text-primary)] uppercase">
                SIMPLICITY MEETS
              </h2>
              <h2 className="text-[clamp(40px,8vw,90px)] font-black leading-[0.9] tracking-tighter text-[var(--text-primary)] uppercase lg:pl-32">
                SOPHISTICATION
              </h2>
            </div>

            <Quote className="absolute -bottom-12 -right-8 w-16 h-16 text-blue-500/20 fill-blue-500/20 rotate-180" />
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center border-t border-[var(--border-primary)] pt-8 gap-6">
          <div className="text-[var(--text-primary)] font-bold tracking-widest text-sm uppercase">
            Adbhutha Beere
          </div>

          <div className="flex gap-8 text-[10px] font-mono-custom tracking-[0.2em] text-[var(--text-secondary)] uppercase">
            <a href="https://linkedin.com/in/adbhutha" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 group">
              LINKEDIN <span className="text-[8px] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
            <a href="https://github.com/Adbhutha10" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 group">
              GITHUB <span className="text-[8px] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>


  );
}
