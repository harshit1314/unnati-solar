import React from 'react';
import Button from '../components/Button';

const Services = () => {
  const services = [
    {
      title: 'Residential Solar',
      description: 'Custom solar solutions for your home to reduce energy bills and carbon footprint.',
      icon: '🏠',
      bgImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Commercial Solar',
      description: 'Scalable solar systems for businesses to cut operational costs and demonstrate sustainability.',
      icon: '🏢',
      bgImage: 'url("https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Solar Maintenance',
      description: 'Regular maintenance and cleaning services to keep your system running at peak efficiency.',
      icon: '🔧',
      bgImage: 'url("https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Energy Storage',
      description: 'Battery solutions to store excess energy for use during peak hours or outages.',
      icon: '🔋',
      bgImage: 'url("https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Consultation',
      description: 'Expert advice to help you choose the right solar solution for your needs.',
      icon: '💡',
      bgImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
    {
      title: 'Government Incentives',
      description: 'We help you navigate and apply for available solar incentives and rebates.',
      icon: '📑',
      bgImage: 'url("https://images.unsplash.com/photo-1557200134-90327ee9fafa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80")',
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Solar Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
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
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-yellow-500 rounded-full text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-200 mb-6">{service.description}</p>
                <Button className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-400">
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;