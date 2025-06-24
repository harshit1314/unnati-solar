import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { FiSun, FiX, FiMenu } from 'react-icons/fi';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import CRM from './pages/CRM';
import Hero from './components/Hero';
import About from './pages/About';
import Contact from './pages/Contact';
import GetStartedPage from './pages/GetStartedPage';
import LearnMorePage from './pages/LearnMorePage';

const GetQuoteButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'residential'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quote request submitted:', formData);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button with Glow Effect */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 animate-pulse hover:animate-none ring-4 ring-yellow-300/50"
      >
        <FiSun className="text-xl" />
        Get a Free Quote
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Solar Quote Request</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Full Name*</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Interest</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
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

  return (
    <Router>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b-4 border-yellow-400">
        <Link
          to="/"
          className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition duration-300"
        >
          ⚡ Unnati Renewables
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Services</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Pricing</Link>
          <Link to="/contact" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4 px-6">
          <Link to="/" className="block py-2 text-gray-700 hover:text-yellow-500">Home</Link>
          <Link to="/about" className="block py-2 text-gray-700 hover:text-yellow-500">About</Link>
          <Link to="/services" className="block py-2 text-gray-700 hover:text-yellow-500">Services</Link>
          <Link to="/pricing" className="block py-2 text-gray-700 hover:text-yellow-500">Pricing</Link>
          <Link to="/contact" className="block py-2 text-gray-700 hover:text-yellow-500">Contact</Link>
        </div>
      )}

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-6">
                  <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Unnati Renewables?</h2>
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
                      <div key={index} className="p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          } />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/services" element={<Services />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/get-started" element={<GetStartedPage />} />
      <Route path="/learn-more" element={<LearnMorePage />} />
        </Routes>
      </main>

      {/* Floating CTA Button - Visible on all pages */}
      <GetQuoteButton />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Unnati Renewables</h3>
            <p className="text-gray-300">Empowering your future with sustainable solar energy solutions.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-gray-400 hover:text-yellow-400 transition-colors">Home</Link>
              <Link to="/about" className="block text-gray-400 hover:text-yellow-400 transition-colors">About</Link>
              <Link to="/services" className="block text-gray-400 hover:text-yellow-400 transition-colors">Services</Link>
              <Link to="/pricing" className="block text-gray-400 hover:text-yellow-400 transition-colors">Pricing</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-yellow-400 transition-colors">Contact</Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-3">
              <p>Solar Tower, 5th Floor</p>
              <p>Bangalore, Karnataka 560001</p>
              <p>Email: info@unnati-renewables.com</p>
              <p>Phone: +91 9876543210</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full px-4 py-2 rounded text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium py-2 px-4 rounded transition-colors"
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