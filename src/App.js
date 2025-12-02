// src/App.jsx
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiSun, FiX, FiMenu, FiMoon } from 'react-icons/fi';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import CRM from './pages/CRM';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import LiveChat from './components/LiveChat';
import About from './pages/About';
import Contact from './pages/Contact';
import GetStartedPage from './pages/GetStartedPage';
import LearnMorePage from './pages/LearnMorePage';
import SavingsCalculator from './pages/SavingsCalculator';

const GetQuoteButton = ({ initialInterest = 'residential' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: initialInterest
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quote request submitted:', formData);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="get-quote-button fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse hover:animate-none ring-4 ring-yellow-300/50 dark:ring-yellow-600/50"
        data-interest={initialInterest}
      >
        <FiSun className="text-xl" />
        Get a Free Quote
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              aria-label="Close quote form"
            >
              <FiX size={24} />
            </button>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Solar Quote Request</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">Full Name*</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email*</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-1" htmlFor="interest">Interest</label>
                <select
                  id="interest"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg mt-4 transition-all duration-300"
              >
                Request Free Quote
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    console.log('App rendering, dark mode:', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b-4 border-yellow-400 dark:border-yellow-600">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition duration-300"
          aria-label="Unnati Renewables Home"
        >
          ⚡ Unnati Renewables
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium" aria-label="Home">Home</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium" aria-label="About">About</Link>
          <Link to="/services" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium" aria-label="Services">Services</Link>
          <Link to="/pricing" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium" aria-label="Pricing">Pricing</Link>
          <Link to="/calculator" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium" aria-label="Savings Calculator">Calculator</Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors font-medium" aria-label="Contact">Contact</Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg py-4 px-6">
          <Link to="/" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400" aria-label="Home">Home</Link>
          <Link to="/about" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400" aria-label="About">About</Link>
          <Link to="/services" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400" aria-label="Services">Services</Link>
          <Link to="/pricing" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400" aria-label="Pricing">Pricing</Link>
          <Link to="/calculator" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400" aria-label="Savings Calculator">Calculator</Link>
          <Link to="/contact" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400" aria-label="Contact">Contact</Link>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="block py-2 text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <>
              {console.log('Rendering homepage with Testimonials')}
              <Hero />
              <div className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Why Choose Unnati Renewables?</h2>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: '🌱',
                        title: 'Sustainable',
                        description: 'Reduce your carbon footprint with clean, renewable energy.'
                      },
                      {
                        icon: '💰',
                        title: 'Cost-Effective',
                        description: 'Significant savings on your electricity bills from day one.'
                      },
                      {
                        icon: '🛡️',
                        title: 'Reliable',
                        description: 'High-quality components with industry-leading warranties.'
                      }
                    ].map((item, index) => (
                      <div key={index} className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="py-16 bg-yellow-50 dark:bg-yellow-900/50 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">See Your Solar Savings</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
                  Use our Solar Savings Calculator to estimate how much you can save by switching to solar energy.
                </p>
                <Link
                  to="/calculator"
                  className="inline-block bg-yellow-500 text-white hover:bg-yellow-600 font-medium py-3 px-6 rounded-lg"
                  aria-label="Go to Savings Calculator"
                >
                  Try the Calculator
                </Link>
              </div>
              <Testimonials />
            </>
          } />
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

      <LiveChat />
      <GetQuoteButton />

      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Unnati Renewables</h3>
            <p className="text-gray-300">Empowering your future with sustainable solar energy solutions.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Home">Home</Link>
              <Link to="/about" className="block text-gray-400 hover:text-yellow-400 transition-colors" aria-label="About">About</Link>
              <Link to="/services" className="block text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Services">Services</Link>
              <Link to="/pricing" className="block text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Pricing">Pricing</Link>
              <Link to="/calculator" className="block text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Savings Calculator">Calculator</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-yellow-400 transition-colors" aria-label="Contact">Contact</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-3">
              <p>Solar Tower, 5th Floor</p>
              <p>Bangalore, Karnataka 560001</p>
              <p>Email: info@unnati-renewables.com</p>
              <p>Phone: +91 9876543210</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 rounded text-gray-900 dark:text-white dark:bg-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 dark:text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Unnati Renewables. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;