'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, CloudSun, MousePointer2 } from 'lucide-react';

// ─── Pixel Dot Text ───────────────────────────────────────────────────────────
function PixelDotText({ text, dotColor = '#60a5fa' }: { text: string; dotColor?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (w < 10 || h < 10) return;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Offscreen canvas for sampling
    const off = document.createElement('canvas');
    off.width = w * dpr;
    off.height = h * dpr;
    const offCtx = off.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    const fontSize = h * 0.85 * dpr;
    offCtx.font = `900 ${fontSize}px sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';
    offCtx.fillStyle = 'white';
    offCtx.fillText(text.toUpperCase(), (w * dpr) / 2, (h * dpr) / 2);

    const { data: pixels } = offCtx.getImageData(0, 0, w * dpr, h * dpr);
    
    ctx.clearRect(0, 0, w * dpr, h * dpr);

    const gap = Math.max(3, Math.floor((w * dpr) / 150));
    const r = gap * 0.4;

    for (let py = 0; py < h * dpr; py += gap) {
      for (let px = 0; px < w * dpr; px += gap) {
        const idx = (Math.floor(py) * (w * dpr) + Math.floor(px)) * 4;
        if (pixels[idx + 3] > 128) {
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          
          // Main Dot
          ctx.fillStyle = '#60a5fa';
          ctx.fill();
          
          // Outer Glow
          ctx.globalAlpha = 0.2;
          ctx.beginPath();
          ctx.arc(px, py, r * 2, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }
    }
  }, [text]);

  useEffect(() => {
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [draw]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[50px]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}


// ─── Live Clock ───────────────────────────────────────────────────────────────
function LiveClock() {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const t = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      const d = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        .toUpperCase().replace(',', '');
      setDisplay(`${t} / ${d}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{display}</span>;
}

// ─── Live Weather ─────────────────────────────────────────────────────────────
function LiveWeather() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=17.3850&longitude=78.4867&current_weather=true');
        const data = await res.json();
        setTemp(Math.round(data.current_weather.temperature));
      } catch (e) {
        console.error('Weather fetch failed', e);
      }
    };
    fetchWeather();
    const id = setInterval(fetchWeather, 900000); // Update every 15 mins
    return () => clearInterval(id);
  }, []);

  return <span>{temp !== null ? `${temp}°C` : '...'}</span>;
}

// ─── Figma Corner Handle ──────────────────────────────────────────────────────
const Handle = ({ className }: { className?: string }) => (
  <div className={`absolute w-1.5 h-1.5 bg-white border border-blue-500 rounded-sm ${className}`} />
);

// ─── Roaming Cursor Component ────────────────────────────────────────────────
function RoamingCursor({ isActive }: { isActive: boolean }) {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [isAnimatingShape, setIsAnimatingShape] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const moveRandomly = () => {
      const parent = document.getElementById('home');
      if (!parent) return;
      
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      
      // Pick a random point within the Hero section bounds
      const nextX = Math.random() * (w - 150) + 75;
      const nextY = Math.random() * (h - 100) + 50;
      
      setPos({ x: nextX, y: nextY });

      // Occasionally trigger a "shape" movement
      if (Math.random() > 0.7) {
        setIsAnimatingShape(true);
        setTimeout(() => setIsAnimatingShape(false), 2000);
      }
    };

    const interval = setInterval(moveRandomly, 4000);
    moveRandomly(); // initial move

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: isAnimatingShape ? [pos.x, pos.x + 50, pos.x + 50, pos.x, pos.x] : pos.x,
            y: isAnimatingShape ? [pos.y, pos.y, pos.y + 50, pos.y + 50, pos.y] : pos.y,
            rotate: isAnimatingShape ? [0, 90, 180, 270, 360] : 0
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: isAnimatingShape ? 2 : 3.5,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 flex items-center gap-1.5 z-50"
        >
          <MousePointer2 className="w-4 h-4 text-purple-500 fill-purple-500" />
          <div className="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-xl">
            Adbhutha
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Interactive Cursors ──────────────────────────────────────────────────────
function InteractiveCursors({ showAdbhutha, isVisible }: { showAdbhutha: boolean, isVisible: boolean }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    const handleMouseMove = (e: MouseEvent) => {
      const parent = document.getElementById('home');
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      setMousePos({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isTouch) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none z-[100] overflow-hidden">
          {/* User's Cursor ("Me") */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: mousePos.x, y: mousePos.y }}
            exit={{ opacity: 0 }}
            transition={{ 
              x: { type: 'spring', damping: 30, stiffness: 250, mass: 0.5 },
              y: { type: 'spring', damping: 30, stiffness: 250, mass: 0.5 },
              opacity: { duration: 0.2 }
            }}
            className="absolute top-0 left-0 flex items-center gap-1.5"
          >
            <MousePointer2 className="w-4 h-4 text-blue-500 fill-blue-500" />
            <div className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-xl">
              Me
            </div>
          </motion.div>

          <RoamingCursor isActive={showAdbhutha} />
        </div>
      )}
    </AnimatePresence>
  );
}




// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [collabOn, setCollabOn] = useState(true);
  const [pixelMode, setPixelMode] = useState(true);
  const [inView, setInView] = useState(true);

  useEffect(() => { 
    setMounted(true); 
    const handleScroll = () => {
      setInView(window.scrollY < window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section 
      ref={heroRef} 
      id="home" 
      className={`relative h-screen w-full bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden font-sans z-10 ${inView ? 'cursor-none' : 'cursor-auto'}`}
    >
      
      {/* Background Vertical Lines */}
      <div className="absolute inset-0 flex justify-between px-6 lg:px-14 pointer-events-none opacity-[0.05]">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="w-[1px] h-full bg-[var(--text-primary)]" />
        ))}
      </div>

      {/* Subtle Radial Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40" 
           style={{ background: 'radial-gradient(circle at 20% 30%, rgba(59,130,246,0.1) 0%, transparent 50%)' }} />

      {mounted && <InteractiveCursors showAdbhutha={collabOn} isVisible={inView} />}


      <motion.div style={{ opacity, scale, y }} className="relative z-10 h-full flex flex-col">
        
        {/* ── Top bar ── */}
        <motion.div 
          {...fadeUp(0)}
          className="flex flex-col sm:flex-row items-center justify-between px-6 lg:px-14 py-6 text-[10px] font-mono-custom tracking-widest text-[var(--text-secondary)] uppercase gap-6 sm:gap-0"
        >
          <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span>Hyderabad, IN</span>
              <span>/</span>
              {mounted && <LiveClock />}
            </div>
            <div className="flex items-center gap-2 text-[var(--text-secondary)] opacity-80">
              <span className="text-[12px] font-bold">{mounted && <LiveWeather />}</span>
              <CloudSun className="w-3.5 h-3.5" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setCollabOn(!collabOn)}
              className="flex items-center gap-2 bg-[var(--bg-secondary)] backdrop-blur px-3 py-1.5 rounded-full border border-[var(--border-primary)] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] ${collabOn ? 'bg-blue-500' : 'bg-[var(--text-secondary)]'}`} />
              <span className="font-bold text-[var(--text-primary)] opacity-80 select-none">COLLAB {collabOn ? 'ON' : 'OFF'}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/20" />
            </button>
          </div>
        </motion.div>



        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-14 gap-12 lg:gap-24">
          
          {/* Left - Design Canvas Area */}
          <div className="relative flex flex-col items-center lg:items-start group">
            
            {/* "Text" Label */}
            <motion.div 
              {...fadeUp(0.1)}
              className="absolute -top-6 left-0 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm z-20 shadow-lg"
            >
              Text
            </motion.div>

            {/* Main Name Bounding Box */}
            <motion.div 
              {...fadeUp(0.15)}
              className="relative p-2 border border-blue-500/40 bg-blue-500/[0.02]"
            >
              <Handle className="-top-1 -left-1" />
              <Handle className="-top-1 -right-1" />
              <Handle className="-bottom-1 -left-1" />
              <Handle className="-bottom-1 -right-1" />

              <h1 className="text-[clamp(48px,12vw,140px)] font-black leading-[0.85] tracking-tighter text-[var(--text-primary)] uppercase select-none">
                ADBHUTHA
              </h1>
            </motion.div>

            {/* Conditional "BEERE" rendering based on toggle */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ height: 'clamp(50px, 9vw, 120px)', width: '100%', marginTop: '0.5rem' }}
              className="relative flex items-center"
            >
              <AnimatePresence mode="wait">
                {pixelMode ? (
                  <motion.div
                    key="pixel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    {mounted && <PixelDotText text="beere" />}
                  </motion.div>
                ) : (
                  <motion.h1
                    key="solid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-[clamp(48px,11vw,130px)] font-black leading-none tracking-tighter text-[var(--text-primary)] uppercase select-none"
                  >
                    BEERE
                  </motion.h1>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Switch Toggle below Name - Controls Pixel Mode */}
            <motion.div 
              {...fadeUp(0.6)}
              className="mt-8 flex items-center justify-end w-full pr-4"
            >
              <button 
                onClick={() => setPixelMode(!pixelMode)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative flex items-center px-1 shadow-inner ${pixelMode ? 'bg-[var(--accent-primary)] shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-[var(--bg-secondary)] border border-[var(--border-primary)]'}`}
              >
                <motion.div 
                  animate={{ x: pixelMode ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-4 h-4 bg-[var(--bg-primary)] rounded-full shadow-md"
                />
              </button>
            </motion.div>



          </div>

          {/* Right - Bio text */}
          <motion.div 
            {...fadeUp(0.3)}
            className="max-w-xs lg:max-w-sm text-[var(--text-secondary)] text-sm lg:text-[15px] leading-relaxed font-manrope"
          >
            <p>
              Engineering high-performance architectures at the intersection of <span className="text-[var(--text-primary)] font-bold tracking-tight">AI & Full Stack</span>. 
              Bridging the gap between <span className="italic text-[var(--text-primary)] opacity-60 font-medium">visionary design</span> and <span className="text-[var(--text-primary)] font-semibold underline decoration-[var(--accent-primary)]/30 underline-offset-4">robust engineering</span> to build the future of digital products.
            </p>
          </motion.div>

        </div>

        {/* ── Bottom Section ── */}
        <div className="flex flex-col items-center pb-12 gap-4 relative z-30">
          <motion.a
            href="#quote"
            {...fadeUp(0.8)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-3.5 rounded-full text-[11px] font-black tracking-widest uppercase flex items-center gap-2 group shadow-[0_10px_30px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            DISCOVER ME <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </motion.a>
          <motion.span 
            {...fadeUp(0.9)}
            className="text-[9px] font-mono-custom tracking-[0.2em] text-[var(--text-secondary)] opacity-40 uppercase"
          >
            or scroll down
          </motion.span>
        </div>


      </motion.div>
    </section>
  );
}
