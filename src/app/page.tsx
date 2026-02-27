'use client';

import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Research from '@/components/Research';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import Agent from '@/components/Agent';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll within the container. 
  // "start start" = when top of container hits top of viewport
  // "end end" = when bottom of container hits bottom of viewport
  // This might need adjustment. We want the animation to be 100% complete when we finish scrolling the 500vh.
  // Actually, standard sticky scroll: container is tall, sticky is 100vh.
  // We want scrollYProgress 0->1 as we scroll from top to bottom of container.

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-[#121212] flex flex-col w-full">
      <Navbar />

      {/* Scroll Container */}
      <div
        id="home"
        ref={containerRef}
        className="relative h-[500vh] w-full"
      >
        {/* Sticky Window */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <ScrollyCanvas scrollYProgress={scrollYProgress} />
          <Overlay scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      {/* Projects Section */}
      <div id="projects">
        <Projects />
      </div>

      {/* Research Section */}
      <Research />

      {/* Achievements Section */}
      <div id="achievements">
        <Achievements />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>

      <Agent />
    </main>
  );
}
