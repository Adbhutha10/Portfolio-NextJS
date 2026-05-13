'use client';

import Hero from '@/components/Hero';
import QuoteSection from '@/components/QuoteSection';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Achievements from '@/components/Achievements';
import Research from '@/components/Research';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import Agent from '@/components/Agent';
import GithubShowcase from '@/components/GithubShowcase';

export default function Home() {
  return (
    <main className="bg-[var(--bg-primary)] flex flex-col w-full transition-colors duration-500">
      <Navbar />

      {/* Hero — imflorea.dev inspired */}
      <Hero />

      {/* Quote Section */}
      <QuoteSection />

      {/* About Section */}
      <div id="about">
        <About />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <GithubShowcase />

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
