import React, { useState } from 'react';
import { FiSun, FiX } from 'react-icons/fi';

const GetQuoteButton = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    systemType: 'residential'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    setIsOpen(false);
  };

  // Button styles based on variant
  const buttonStyles = {
    default: "bg-yellow-500 hover:bg-yellow-600 text-white",
    floating: "fixed bottom-6 right-6 z-50 animate-pulse shadow-xl",
    outline: "bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50"
  };

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 font-medium py-3 px-6 rounded-lg transition-all duration-300 ${
          buttonStyles[variant] || buttonStyles.default
        } ${variant === 'floating' ? 'rounded-full' : ''}`}
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
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Email*</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg mt-4"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GetQuoteButton;