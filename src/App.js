import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Button from './components/Button';
import Pricing from './pages/Pricing';
import Services from './pages/Services';
import CRM from './pages/CRM';
import Hero from './components/Hero';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      {/* Header with Semi-Transparent Background */}
     <header className="flex justify-between items-center px-8 py-4 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b-4 border-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400">


        <Link
  to="/"
  className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 animate-pulse hover:animate-none transition duration-300 drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
>
  ⚡ Unnati Renewables
</Link>

        
        <nav className="space-x-6 hidden md:flex items-center">
          <Link to="/" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">About</Link>
          <Link to="/services" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Services</Link>
          <Link to="/pricing" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">Pricing</Link>
          <Link to="/crm" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">CRM</Link>
          <Link to="/contact" className="text-gray-700 hover:text-yellow-500 transition-colors font-medium">ContactUs</Link>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white ml-4">
            Get a Quote
          </Button>
        </nav>

        {/* Mobile Menu Button (would need state and handler) */}
        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Unnati Renewables?</h2>
                  <div className="grid md:grid-cols-3 gap-8 mt-12">
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
                      <div key={index} className="p-8 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
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
        </Routes>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">Unnati Renewables</h3>
            <p className="text-gray-300">Empowering your future with sustainable solar energy solutions.</p>
            <div className="flex space-x-4 mt-6">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="..." clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Pricing', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase()}`} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-3">
              <p>Solar Tower, 5th Floor</p>
              <p>Bangalore, Karnataka 560001</p>
              <p>Email: info@unnati-renewables.com</p>
              <p>Phone:9876543210</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for solar tips and updates</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded text-gray-900 focus:ring-2 focus:ring-yellow-400 focus:outline-none" 
              />
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                Subscribe
              </Button>
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