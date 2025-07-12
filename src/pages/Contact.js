import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiUpload } from 'react-icons/fi';
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

  const handleQuoteClick = () => {
    const quoteButton = document.querySelector('.get-quote-button');
    if (quoteButton) {
      quoteButton.click();
    } else {
      console.warn('Get Quote button not found');
      window.location.href = '/contact';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
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
          <p className="mt-6 text-xl text-yellow-300 dark:text-yellow-200 max-w-3xl mx-auto">
            Get in touch with our solar energy experts
          </p>
        </div>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div id="contact-form">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Send us a message
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Have questions about solar energy? Our team is ready to assist you.
            </p>
            
            {submitSuccess ? (
              <div className="mt-8 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 rounded">
                Thank you for your message! We'll contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      First name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${errors.firstName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white`}
                      aria-required="true"
                    />
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white`}
                    aria-required="true"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm py-3 px-4 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-gray-800 dark:text-white`}
                    aria-required="true"
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>
                <div>
                  <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Upload documents (optional)
                  </label>
                  <div className="mt-1 flex items-center">
                    <label className="group flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 cursor-pointer">
                      <FiUpload className="mr-2 text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-700 dark:group-hover:text-yellow-300" />
                      Choose file
                      <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleChange}
                        className="sr-only"
                      />
                    </label>
                    <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                      {formData.file ? formData.file.name : 'No file chosen'}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Upload your electricity bill or site photos (PDF, JPG, PNG up to 5MB)
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 dark:hover:from-yellow-400 dark:hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:pl-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Contact Information
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              We'd love to hear from you! Here's how you can reach us.
            </p>

            <div className="mt-8 space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 dark:bg-amber-900 rounded-lg p-4">
                  <FiMail className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">info@unnati-renewables.com</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">support@unnati-renewables.com</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 dark:bg-amber-900 rounded-lg p-4">
                  <FiPhone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">+91 11 2345 6789</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 dark:bg-amber-900 rounded-lg p-4">
                  <FiMapPin className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Office</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Unnati Renewables Pvt. Ltd.</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Solar Tower, 5th Floor</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Bangalore, Karnataka 560001</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 dark:bg-amber-900 rounded-lg p-4">
                  <FiClock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Hours</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Monday - Friday: 9AM - 6PM</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Saturday: 10AM - 4PM</p>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 bg-yellow-100 dark:bg-amber-900 rounded-lg p-4">
                  <FaUserFriends className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Connect With Us</h3>
                  <div className="flex space-x-4 mt-3">
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400" aria-label="Facebook">
                      <FaFacebook className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400" aria-label="Twitter">
                      <FaTwitter className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400" aria-label="LinkedIn">
                      <FaLinkedin className="h-6 w-6" />
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400" aria-label="Instagram">
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
                className="dark:filter dark:grayscale"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Ready to go solar?</span>
            <span className="block text-gray-800 dark:text-gray-200">Our experts are here to help.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={handleQuoteClick}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-gray-700 dark:text-yellow-400"
                aria-label="Contact our team"
              >
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;