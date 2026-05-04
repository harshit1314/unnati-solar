// src/components/Hero.js
// SolarHub Hero — Hindi headline, dual CTA, trust badges, stats bar
import React, { useState } from 'react';
import { BUSINESS, WHATSAPP_URL } from '../content/business';

const Hero = ({ onOpenQuoteForm }) => {
  const [hovered, setHovered] = useState(null);

  const handleWhatsApp = () => {
    if (window.gtag) window.gtag('event', 'whatsapp_clicked', { event_label: 'hero' });
    window.open(
      WHATSAPP_URL(`Namaste SolarHub! Main solar installation ke liye free quote chahta/chahti hun. Please contact karein.`),
      '_blank', 'noopener,noreferrer'
    );
  };

  const handleSiteVisit = () => {
    if (window.gtag) window.gtag('event', 'site_visit_clicked', { event_label: 'hero' });
    if (onOpenQuoteForm) onOpenQuoteForm();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
          animation: 'panImage 30s linear infinite alternate',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/70 to-gray-900/90" />
      </div>

      {/* Trust badge strip */}
      <div className="relative z-10 bg-amber-400 text-gray-900 text-xs sm:text-sm font-semibold py-2 px-4 text-center flex flex-wrap justify-center gap-x-6 gap-y-1">
        <span>✅ UPNEDA Empanelled — {BUSINESS.upnedaCode}</span>
        <span>✅ PM Surya Ghar Subsidy — ₹1,08,000 tak</span>
        <span>✅ Free Site Visit — Agra + 50km</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-40px)] px-4 sm:px-6 lg:px-8 pt-8 pb-32">
        <div className="max-w-4xl mx-auto text-center">

          {/* Govt scheme badge */}
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/50 text-amber-300 text-sm font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="text-lg">☀️</span>
            PM Surya Ghar Muft Bijli Yojana — Subsidised Solar Available
          </div>

          {/* Hindi headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: "'Noto Sans Devanagari', 'Inter', sans-serif" }}>
            <span className="text-amber-400">Aap bas bill bhejo,</span>
            <br />
            <span>baaki sab humara kaam.</span>
            <div className="mt-4 text-sm sm:text-base font-bold bg-white/10 inline-block px-4 py-1 rounded-full text-blue-200 border border-white/10 backdrop-blur-sm">
              🇮🇳 Ek Kadam Solar Ki Taraf
            </div>
          </h1>

          {/* English subheading */}
          <p className="text-lg sm:text-xl text-gray-200 mb-4 max-w-2xl mx-auto leading-relaxed">
            You just send your electricity bill — SolarHub handles the site survey, PM Surya Ghar subsidy application, DVVNL net metering, and installation.
          </p>

          <p className="text-amber-300 font-semibold mb-10 text-base">
            Agra ka UPNEDA empanelled solar installer &mdash; serving Agra, Mathura, Firozabad &amp; 50km radius
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={handleSiteVisit}
              onMouseEnter={() => setHovered('visit')}
              onMouseLeave={() => setHovered(null)}
              id="hero-site-visit-btn"
              className="group relative inline-flex items-center justify-center gap-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-4 px-8 rounded-xl text-lg shadow-2xl transition-all duration-300 hover:scale-105 min-h-[56px]"
            >
              <span className="text-2xl">📞</span>
              Free Site Visit Book Karein
              <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>

            <button
              onClick={handleWhatsApp}
              onMouseEnter={() => setHovered('wa')}
              onMouseLeave={() => setHovered(null)}
              id="hero-whatsapp-btn"
              className="group relative inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-2xl transition-all duration-300 hover:scale-105 min-h-[56px]"
            >
              <span className="text-2xl">💬</span>
              WhatsApp Quote
              <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
          </div>

          {/* CTA micro-copy */}
          <p className="text-gray-400 text-sm">
            No spam. No obligation. Response within 2 hours on working days.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md py-5 z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {[
            { value: '200+', label: 'Installations in Agra' },
            { value: '₹1.08L', label: 'Max Subsidy Available' },
            { value: '25 yr', label: 'Panel Warranty' },
            { value: 'UPNEDA', label: `Vendor: ${BUSINESS.upnedaCode}` },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">{stat.value}</p>
              <p className="text-gray-300 text-xs sm:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes panImage {
          0% { transform: scale(1) translateX(0); }
          100% { transform: scale(1.08) translateX(-4%); }
        }
      `}</style>
    </div>
  );
};

export default Hero;