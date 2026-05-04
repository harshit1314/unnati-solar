// src/pages/Home.js
// SolarHub Homepage — all sections
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import PMSuryaGharSection from '../components/PMSuryaGharSection';
import Testimonials from '../components/Testimonials';
import {
  TRUST_PILLARS, HOW_IT_WORKS, FAQ, BUSINESS,
  isPincodeServed, WHATSAPP_URL,
} from '../content/business';

// ---- Pincode Checker ----
const PincodeChecker = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);
  const [notifyPhone, setNotifyPhone] = useState('');
  const [notified, setNotified] = useState(false);

  const check = (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setResult('invalid');
      return;
    }
    if (window.gtag) window.gtag('event', 'pincode_checked', { event_label: pincode });
    setResult(isPincodeServed(pincode) ? 'yes' : 'no');
  };

  return (
    <section className="py-16 bg-amber-50 dark:bg-gray-800">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          Kya Aapke Area Mein Service Hai?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Agra + 50km area check karein — Mathura, Firozabad, Vrindavan included
        </p>
        <form onSubmit={check} className="flex gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={pincode}
            onChange={(e) => { setPincode(e.target.value); setResult(null); }}
            maxLength={6}
            placeholder="Apna pincode enter karein"
            className="flex-1 px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-700 dark:text-white text-lg font-medium"
            aria-label="Enter your pincode"
          />
          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-6 py-4 rounded-xl transition-colors text-lg min-w-[110px]"
          >
            Check
          </button>
        </form>

        {/* Results */}
        {result === 'yes' && (
          <div className="mt-6 p-5 bg-green-50 dark:bg-green-900/20 border-2 border-green-400 rounded-2xl animate-fade-in">
            <p className="text-2xl mb-2">✅</p>
            <p className="font-bold text-green-700 dark:text-green-400 text-xl">
              Haan! Aapke area mein ₹1,08,000 tak subsidy available hai.
            </p>
            <p className="text-green-600 dark:text-green-300 text-sm mt-1">
              Pincode {pincode} — Agra + 50km service area covered
            </p>
            <a
              href={WHATSAPP_URL(`Namaste SolarHub! Main ${pincode} pincode se hun aur solar quote chahta/chahti hun.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              💬 WhatsApp pe Quote Lein
            </a>
          </div>
        )}

        {result === 'no' && !notified && (
          <div className="mt-6 p-5 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-300 rounded-2xl animate-fade-in">
            <p className="text-2xl mb-2">🔔</p>
            <p className="font-bold text-orange-700 dark:text-orange-300 text-lg">
              Abhi is area mein service nahi hai — lekin jald hi aayegi!
            </p>
            <p className="text-orange-600 dark:text-orange-400 text-sm mt-1 mb-4">
              Apna number dijiye — jab aapke area mein service start ho, hum inform karenge.
            </p>
            <form
              onSubmit={(e) => { e.preventDefault(); setNotified(true); }}
              className="flex gap-2"
            >
              <input
                type="tel"
                value={notifyPhone}
                onChange={(e) => setNotifyPhone(e.target.value)}
                placeholder="Mobile number"
                className="flex-1 px-4 py-2 rounded-lg border border-orange-300 focus:outline-none focus:border-orange-500 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Notify Me
              </button>
            </form>
          </div>
        )}

        {notified && (
          <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-xl">
            <p className="text-green-700 font-semibold">✅ Shukriya! Hum aapko inform karenge jab aapke area mein service start ho.</p>
          </div>
        )}

        {result === 'invalid' && (
          <p className="mt-4 text-red-600 dark:text-red-400 font-medium">
            ⚠️ Please enter a valid 6-digit pincode.
          </p>
        )}
      </div>
    </section>
  );
};

// ---- Trust Pillars ----
const TrustPillars = () => (
  <section className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
          SolarHub Pe Kyun Bharosa Karein?
        </h2>
        <p className="text-gray-500 dark:text-gray-400">6 reasons why Agra chooses us</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRUST_PILLARS.map((pillar, i) => (
          <div
            key={i}
            className="group p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-lg transition-all duration-300"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">
              {pillar.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{pillar.title}</h3>
            <p className="text-amber-600 dark:text-amber-400 text-sm font-semibold mb-2">{pillar.subtitle}</p>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ---- How It Works ----
const HowItWorks = ({ onOpenQuoteForm }) => (
  <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-950 dark:from-gray-900 dark:to-gray-950">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white mb-3">Kaise Kaam Karta Hai?</h2>
        <p className="text-blue-200">4 simple steps — bill bhejne se installation tak</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOW_IT_WORKS.map((step, i) => (
          <div key={i} className="relative">
            {/* Connector line */}
            {i < HOW_IT_WORKS.length - 1 && (
              <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-amber-400/30 z-0" style={{ width: 'calc(100% - 0px)', left: '50%' }} />
            )}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-colors z-10 relative">
              <div className="w-14 h-14 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center text-2xl font-extrabold mx-auto mb-4 shadow-lg">
                {step.step}
              </div>
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="font-bold text-white text-lg mb-1">{step.title}</h3>
              <p className="text-blue-200 text-xs leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={onOpenQuoteForm}
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-4 px-10 rounded-xl text-lg transition-all hover:scale-105"
        >
          📞 Abhi Shuru Karein — Free Site Visit
        </button>
      </div>
    </div>
  </section>
);

// ---- FAQ Accordion ----
const FAQSection = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
            Aksar Pooche Jaane Wale Sawaal
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Frequently Asked Questions</p>
        </div>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-4">{item.q}</span>
                <span className={`text-amber-500 text-2xl font-bold transition-transform duration-300 flex-shrink-0 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---- Calculator CTA Band ----
const CalculatorBand = () => (
  <section className="py-16 bg-amber-400">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <div className="text-5xl mb-4">🧮</div>
      <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
        Apna Solar Savings Estimate Karein
      </h2>
      <p className="text-gray-800 mb-8 max-w-xl mx-auto">
        Monthly bill daalo — system size, subsidy, EMI starts from ₹1,499, aur Day-1 profit sab instantly calculate ho jaayega.
      </p>
      <Link
        to="/calculator"
        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all hover:scale-105"
      >
        ⚡ Calculator Try Karein — Free
      </Link>
    </div>
  </section>
);

// ---- Final CTA Band ----
const FinalCTA = ({ onOpenQuoteForm }) => (
  <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-950 text-center px-6">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
        Ek Kadam Solar Ki Taraf — Free Quote Lein
      </h2>
      <p className="text-blue-200 text-lg mb-8">
        Apna bijli bill WhatsApp karo ya form bharo — 2 ghante mein callback guaranteed.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onOpenQuoteForm}
          className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-4 px-10 rounded-xl text-lg transition-all hover:scale-105"
        >
          📋 Free Quote Form
        </button>
        <a
          href={WHATSAPP_URL(`Namaste SolarHub! Main solar ke baare mein jaanna chahta/chahti hun. Kripya callback karein.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all hover:scale-105"
        >
          💬 WhatsApp on {BUSINESS.contacts.primary.phone}
        </a>
      </div>
      <p className="text-blue-300 text-sm mt-6">
        Actual savings depend on site survey, DVVNL tariff slab, and DISCOM policy.
      </p>
    </div>
  </section>
);

// ---- Home Page ----
const Home = ({ onOpenQuoteForm }) => {
  return (
    <>
      <Helmet>
        <title>SolarHub — Solar Installer Agra | PM Surya Ghar | UPNEDA {BUSINESS.upnedaCode}</title>
        <meta name="description" content="Agra ka #1 UPNEDA empanelled solar installer. PM Surya Ghar Subsidy ₹1,08,000, EMI, DVVNL net metering — sab kuch hum handle karte hain. Free site visit Agra + 50km." />
      </Helmet>
      <Hero onOpenQuoteForm={onOpenQuoteForm} />
      <PincodeChecker />
      <PMSuryaGharSection onOpenQuoteForm={onOpenQuoteForm} />
      <TrustPillars />
      <HowItWorks onOpenQuoteForm={onOpenQuoteForm} />
      <CalculatorBand />
      <Testimonials />
      <FAQSection />
      <FinalCTA onOpenQuoteForm={onOpenQuoteForm} />
    </>
  );
};

export default Home;
