import React from 'react';
import { Poster } from './components/Poster';
import { Scene } from './components/Scene';
import { ParticleText } from './components/ParticleText';
import { HeroOverlay } from './components/HeroOverlay';
import { ServiceMenu } from './components/ServiceMenu';
import { LogoStack } from './components/Icons';

export default function App() {
  return (
    <div className="bg-[#111] min-h-screen text-[#1F0B05] w-full overflow-x-hidden">

      {/* SECTION 1: THE FLAT POSTER + RAZOR OVERLAY */}
      <section className="w-full h-screen flex items-center justify-center p-2 sm:p-4 box-border bg-[#111] relative z-10">
        {/* The 3D Overlay sits on top of the poster but below UI controls if any */}
        <HeroOverlay />

        <div className="w-full h-full max-h-[95vh] aspect-[1/1.4] shadow-2xl mx-auto border-[1px] border-[#333] relative z-0">
          <Poster />
        </div>
      </section>

      {/* SECTION 2: SPLIT LAYOUT (3D Cloth + Info) */}
      <section className="w-full min-h-screen relative bg-black overflow-hidden border-t-8 border-[#FF6600] flex flex-col md:flex-row">

        {/* Left: 3D Scene Wrapper */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative border-b-8 md:border-b-0 md:border-r-8 border-[#FF6600]">
          <div className="absolute top-4 left-4 z-10 text-[#FF6600] font-display uppercase tracking-widest text-sm opacity-50 pointer-events-none">
            Threat Simulation — 2026
          </div>
          <Scene />
        </div>

        {/* Right: Security Information */}
        <div className="w-full md:w-1/2 min-h-[50vh] md:h-screen bg-[#1F0B05] text-[#FF6600] p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col justify-center relative z-20">

          <h2 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tighter uppercase mb-6">
            Advanced<br />Cyber Defense
          </h2>

          <div className="w-20 h-1 bg-[#FF6600] mb-8 opacity-80"></div>

          <p className="font-body text-[#F5F5F5] text-base sm:text-lg md:text-xl leading-relaxed opacity-90 mb-10 max-w-md">
            Protect your systems with enterprise-grade security solutions. From penetration testing to real-time monitoring,
            we identify vulnerabilities, prevent breaches, and ensure your data remains secure at all times.
          </p>

          <div className="grid grid-cols-2 gap-8 mb-12 font-display uppercase tracking-widest text-xs sm:text-sm">
            <div>
              <span className="block text-[#F5F5F5] opacity-50 text-[10px] sm:text-xs mb-1">Uptime</span>
              <span className="text-lg sm:text-xl">99.99%</span>
            </div>
            <div>
              <span className="block text-[#F5F5F5] opacity-50 text-[10px] sm:text-xs mb-1">Coverage</span>
              <span className="text-lg sm:text-xl">Global</span>
            </div>
          </div>

          <button className="group relative px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#FF6600] w-max overflow-hidden">
            <span className="relative z-10 font-display font-bold text-base sm:text-lg uppercase tracking-widest group-hover:text-[#1F0B05] transition-colors duration-300">
              Get Protected
            </span>
            <div className="absolute inset-0 bg-[#FF6600] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
          </button>

        </div>
      </section>

      {/* SECTION 3: SERVICE MENU (Replaces previous ImageShowcase) */}
      <section className="w-full bg-[#FF6600] relative">
        <ServiceMenu />
      </section>

      {/* SECTION 4: CREATIVE PARTICLE TYPOGRAPHY (Interactive) */}
      <section className="w-full h-[50vh] md:h-[60vh] bg-[#1F0B05] relative border-t-8 border-[#FF6600] overflow-hidden">
        <div className="w-full h-full cursor-crosshair">
          <ParticleText />
        </div>
        <div className="absolute bottom-4 right-4 text-[#FF6600] font-display text-xs tracking-[0.3em] uppercase opacity-60">
          Disrupt to reveal
        </div>
      </section>

      {/* SECTION 5: FOOTER BRANDING */}
      <section className="w-full bg-[#FF6600] relative overflow-hidden flex flex-col sm:flex-row h-auto min-h-[40vh] border-t-8 border-[#1F0B05]">

        {/* LEFT: Text Content */}
        <div className="flex-grow flex items-end pl-4 sm:pl-8 pb-4 sm:pb-0 z-10">
          <h1 className="font-display font-bold text-[22vw] sm:text-[20vw] leading-[0.75] tracking-tighter uppercase text-[#1F0B05] transform translate-y-[2vw]">
            SECURITY
          </h1>
        </div>

        {/* RIGHT: SVG SHAPE BLOCK */}
        <div className="w-full sm:w-[40%] md:w-[35%] h-[30vh] sm:h-auto relative self-stretch shrink-0">
          <svg
            className="w-full h-full absolute inset-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 0 L 100 0 L 100 100 L 40 100 L 40 40 L 0 40 Z"
              fill="#1F0B05"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-end pr-[10%] sm:pr-[15%]">
            <div className="h-[80%] flex items-center justify-center">
              <span className="font-display font-bold text-[#FF6600] text-[15vw] sm:text-[8vw] leading-none tracking-tighter transform -rotate-90 whitespace-nowrap origin-center">
                PRIVACY
              </span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}