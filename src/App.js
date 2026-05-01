// src/App.js
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiSun, FiMenu, FiMoon, FiX } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import CRM from './pages/CRM';
import Testimonials from './components/Testimonials';
import GetQuoteButton from './components/GetQuoteButton';
import WhatsAppButton from './components/WhatsAppButton';
import About from './pages/About';
import Contact from './pages/Contact';
import GetStartedPage from './pages/GetStartedPage';
import LearnMorePage from './pages/LearnMorePage';
import SavingsCalculator from './pages/SavingsCalculator';
import Home from './pages/Home';
import { BUSINESS } from './content/business';
import { trackPageView, captureUtm } from './services/leadApi';

// Track page views on route change
function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
    if (window.gtag) window.gtag('config', process.env.REACT_APP_GA_ID, { page_path: location.pathname });
  }, [location.pathname]);
  return null;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Capture UTM on first visit
    captureUtm();
    // GA4 setup
    if (process.env.REACT_APP_GA_ID && !window.gtag) {
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', process.env.REACT_APP_GA_ID);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/calculator', label: 'Calculator' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <Router>
      <PageTracker />
      <Helmet>
        <title>SolarHub — Solar Installer Agra | UPNEDA Empanelled</title>
      </Helmet>

      {/* ---- Header ---- */}
      <header className="flex justify-between items-center px-4 sm:px-6 py-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b-4 border-amber-400">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="SolarHub Home">
          <span className="text-2xl">☀️</span>
          <div>
            <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
              SolarHub
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-none">Save Money Save Future</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-700 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors font-medium text-sm"
            >
              {label}
            </Link>
          ))}
          <GetQuoteButton variant="default" label="Free Quote" />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 p-1"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-gray-500 p-1" aria-label="Toggle dark mode">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 dark:text-gray-300 p-1"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-lg py-4 px-6 z-40 relative">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="block py-3 text-gray-700 dark:text-gray-300 hover:text-amber-500 font-medium border-b border-gray-100 dark:border-gray-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="pt-4">
            <GetQuoteButton variant="default" label="Free Quote Lein" />
          </div>
        </div>
      )}

      {/* Main */}
      <main>
        <Routes>
          <Route path="/" element={<Home onOpenQuoteForm={() => document.getElementById('get-quote-btn-default')?.click()} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-started" element={<GetStartedPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/calculator" element={<SavingsCalculator />} />
        </Routes>
      </main>

      {/* Sticky WhatsApp */}
      <WhatsAppButton />

      {/* ---- Footer ---- */}
      <footer className="bg-gray-950 text-white pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">☀️</span>
              <div>
                <h3 className="text-xl font-extrabold text-amber-400">SolarHub</h3>
                <p className="text-xs text-gray-400">Save Money Save Future</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              UPNEDA empanelled solar installer serving Agra and 50km radius.
              PM Surya Ghar subsidy, DVVNL net metering, EMI — all handled by us.
            </p>
            <div className="bg-gray-800 rounded-xl p-3 text-xs text-gray-300">
              <p className="font-semibold text-amber-400 mb-1">UPNEDA Vendor</p>
              <p className="font-mono">{BUSINESS.upnedaCode}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <div className="space-y-2">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">
                  {label}
                </Link>
              ))}
              <Link to="/calculator" className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">
                Solar Calculator
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Us</h4>
            <address className="not-italic text-sm text-gray-400 space-y-3 leading-relaxed">
              <p>📍 {BUSINESS.address.line1},<br />{BUSINESS.address.line2}</p>
              <p>
                📞 <a href={`tel:${BUSINESS.contacts.primary.phone}`} className="hover:text-amber-400">
                  {BUSINESS.contacts.primary.phone}
                </a>
                <span className="text-gray-600"> ({BUSINESS.contacts.primary.name})</span>
              </p>
              <p>
                📞 <a href={`tel:${BUSINESS.contacts.secondary.phone}`} className="hover:text-amber-400">
                  {BUSINESS.contacts.secondary.phone}
                </a>
                <span className="text-gray-600"> ({BUSINESS.contacts.secondary.name})</span>
              </p>
              <p>
                ✉️ <a href={`mailto:${BUSINESS.contacts.email}`} className="hover:text-amber-400">
                  {BUSINESS.contacts.email}
                </a>
              </p>
            </address>
          </div>

          {/* Service Area + WhatsApp CTA */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Service Area</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {BUSINESS.serviceArea.cities.map((city) => (
                <span key={city} className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">
                  {city}
                </span>
              ))}
            </div>
            <a
              href={`https://wa.me/${BUSINESS.contacts.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SolarHub (Seema Electronics). All rights reserved.</p>
          <p>UPNEDA Vendor: {BUSINESS.upnedaCode} | DISCOM: {BUSINESS.discom}</p>
          <p>Actual savings depend on site survey, DVVNL tariff slab &amp; DISCOM policy.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;