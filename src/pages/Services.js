import React, { useState } from 'react';
import Button from '../components/Button';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Residential Solar',
      description: 'Custom solar solutions for your home to reduce energy bills and carbon footprint.',
      details: 'Our residential solar solutions include professional installation, customized system design, and ongoing support to maximize energy savings. We use top-tier solar panels and inverters to ensure long-term reliability and performance.',
      icon: '🏠',
      bgImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Commercial Solar',
      description: 'Scalable solar systems for businesses to cut operational costs and demonstrate sustainability.',
      details: 'Our commercial solar systems are tailored to meet the energy demands of businesses of all sizes. We offer comprehensive energy audits, financing options, and integration with existing infrastructure to ensure maximum ROI.',
      icon: '🏢',
      bgImage: 'url("https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Solar Maintenance',
      description: 'Regular maintenance and cleaning services to keep your system running at peak efficiency.',
      details: 'Our maintenance services include regular inspections, panel cleaning, and system optimization to ensure your solar investment performs at its best. We also offer emergency repair services and performance monitoring.',
      icon: '🔧',
      bgImage: 'url("https://images.unsplash.com/photo-1581092917737-4a7f9636b9c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Energy Storage',
      description: 'Battery solutions to store excess energy for use during peak hours or outages.',
      details: 'Our energy storage solutions feature state-of-the-art battery systems that store excess solar energy for use when you need it most. We provide scalable options for both residential and commercial applications.',
      icon: '🔋',
      bgImage: 'url("https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Consultation',
      description: 'Expert advice to help you choose the right solar solution for your needs.',
      details: 'Our consultation services provide personalized guidance from industry experts. We assess your energy needs, site conditions, and budget to recommend the best solar solution for your home or business.',
      icon: '💡',
      bgImage: 'url("https://images.unsplash.com/photo-14973662105479-ffa5bc916735?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Government Incentives',
      description: 'We help you navigate and apply for available solar incentives and rebates.',
      details: 'Our team stays up-to-date on federal, state, and local solar incentives to maximize your savings. We handle the paperwork and guide you through the application process to ensure you get all eligible rebates.',
      icon: '📑',
      bgImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
  ];

  const openModal = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleContactClick = () => {
    const quoteButton = document.querySelector('.get-quote-button');
    if (quoteButton) {
      quoteButton.click();
    } else {
      console.warn('Get Quote button not found');
      // Fallback: Navigate to contact page
      window.location.href = '/contact';
    }
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Solar Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive solutions for all your solar energy needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group h-96"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
                style={{ backgroundImage: service.bgImage }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
              </div>
              
              <div className="relative h-full flex flex-col justify-end p-6">
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-yellow-500 dark:bg-amber-600 rounded-full text-2xl text-white">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-200 mb-6">{service.description}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 dark:hover:from-yellow-400 dark:hover:to-amber-500"
                  onClick={() => openModal(service)}
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
          role="dialog" 
          aria-labelledby="modal-title" 
          aria-modal="true"
          onKeyDown={(e) => e.key === 'Escape' && closeModal()}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-lg w-full mx-4 border border-gray-200 dark:border-gray-600">
            <h3 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedService.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedService.description}</p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedService.details}</p>
            <div className="flex justify-end space-x-4">
              <Button 
                className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500"
                onClick={closeModal}
                aria-label="Close modal"
              >
                Close
              </Button>
              <Button 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700 dark:hover:from-yellow-400 dark:hover:to-amber-500"
                onClick={handleContactClick}
                aria-label={`Contact us about ${selectedService.title}`}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;