import React, { useState, useEffect, useRef } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiUpload, FiMessageCircle } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaUserFriends } from 'react-icons/fa';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    file: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Chatbot state
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you with solar solutions today?' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          message: '',
          file: null
        });
      }, 1500);
    }
  };

  const handleChatbotToggle = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim() === '') return;

    // Add user message
    const newUserMessage = { sender: 'user', text: userMessage };
    setChatMessages([...chatMessages, newUserMessage]);
    setUserMessage('');

    // Simulate bot response after delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage.toLowerCase());
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  const getBotResponse = (message) => {
    if (message.includes('panel') || message.includes('system')) {
      return "We offer high-quality solar panels with 25-year performance warranties. Would you like to know more about our installation process?";
    } else if (message.includes('install') || message.includes('process')) {
      return "Our installation typically takes 2-4 weeks from assessment to completion. We handle all permits and paperwork.";
    } else if (message.includes('contact') || message.includes('reach')) {
      return "You can call us at +91 98765 43210 or email support@unnati-renewables.com. Our team is available Mon-Sat 9AM-6PM.";
    } else if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "I can help with information about our solar solutions, installation process, and more. What would you like to know?";
    }
  };

  const handleQuickQuestion = (question) => {
    setUserMessage(question);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Solar panels"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-xl text-yellow-200 max-w-3xl mx-auto">
            Get in touch with our solar energy experts
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div id="contact-form">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Send us a message
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Have questions about solar energy? Our team is ready to assist you.
            </p>
            
            {submitSuccess ? (
              <div className="mt-8 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                Thank you for your message! We'll contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500`}
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500`}
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                    Upload documents (optional)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="group flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer">
                      <FiUpload className="mr-2 text-yellow-600 group-hover:text-yellow-700" />
                      Choose file
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleChange}
                        className="sr-only"
                      />
                    </label>
                    <span className="ml-4 text-sm text-gray-500">
                      {formData.file ? formData.file.name : 'No file chosen'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Upload your electricity bill or site photos (PDF, JPG, PNG up to 5MB)
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:pl-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Contact information
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              We'd love to hear from you! Here's how you can reach us.
            </p>

            <div className="mt-8 space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-4">
                  <FiMail className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">info@unnati-renewables.com</p>
                  <p className="mt-1 text-gray-600">support@unnati-renewables.com</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-4">
                  <FiPhone className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">+91 98765 43210</p>
                  <p className="mt-1 text-gray-600">+91 11 2345 6789</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-4">
                  <FiMapPin className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Office</h3>
                  <p className="mt-1 text-gray-600">Unnati Renewables Pvt. Ltd.</p>
                  <p className="mt-1 text-gray-600">Solar Tower, 5th Floor</p>
                  <p className="mt-1 text-gray-600">Bangalore, Karnataka 560001</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-4">
                  <FiClock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-600">Monday - Friday: 9AM - 6PM</p>
                  <p className="mt-1 text-gray-600">Saturday: 10AM - 4PM</p>
                  <p className="mt-1 text-gray-600">Sunday: Closed</p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-4">
                  <FaUserFriends className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Connect With Us</h3>
                  <div className="flex space-x-4 mt-3">
                    <a href="#" className="text-gray-600 hover:text-yellow-600">
                      <FaFacebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-yellow-600">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-yellow-600">
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-yellow-600">
                      <FaInstagram className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
              <iframe
                title="Unnati Renewables Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0045216948966!2d77.5942773158215!3d12.97173399085596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf5df53c1049e4c98!2sBangalore%20International%20Exhibition%20Centre!5e0!3m2!1sen!2sin!4v1625131234567!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot - Positioned at bottom-left */}
      <div className={`fixed bottom-8 left-8 transition-all duration-300 ${chatbotOpen ? 'h-96 w-80' : 'h-16 w-16'}`}>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
          {chatbotOpen ? (
            <>
              <div className="bg-yellow-500 p-4 flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Solar Assistant</h3>
                <button 
                  onClick={handleChatbotToggle}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg p-3 max-w-xs ${msg.sender === 'user' 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-100 text-gray-800'}`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-2">
                  <button 
                    onClick={() => handleQuickQuestion('What solar systems do you offer?')}
                    className="text-xs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1"
                  >
                    Solar Systems
                  </button>
                  <button 
                    onClick={() => handleQuickQuestion('How does installation work?')}
                    className="text-xs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1"
                  >
                    Installation
                  </button>
                  <button 
                    onClick={() => handleQuickQuestion('How can I contact support?')}
                    className="text-xs bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1"
                  >
                    Contact Support
                  </button>
                </div>
                
                <form onSubmit={handleSendMessage} className="flex">
                  <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500"
                  />
                  <button 
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-r-lg text-sm"
                  >
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <button
              onClick={handleChatbotToggle}
              className="h-full w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl"
            >
              <FiMessageCircle className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to go solar?</span>
            <span className="block text-yellow-900">Our experts are here to help.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-white hover:bg-yellow-50"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;