import React from 'react';
import { BUSINESS } from '../content/business';
import Button from '../components/Button';

const Services = () => {
  const solarTypes = [
    {
      title: 'On-Grid Solar (Grid-Tie)',
      description: 'The most popular choice for homes and businesses with reliable grid power.',
      points: [
        'Directly connected to the utility grid (DVVNL/PVVNL/etc.)',
        'Eligible for PM Surya Ghar Central & State Subsidies',
        'Net Metering: Surplus power is sent back to the grid for credits',
        'Best for reducing monthly electricity bills to zero',
        'No battery cost — lowest investment with highest ROI'
      ],
      icon: '🌩️',
    },
    {
      title: 'Off-Grid Solar (Battery System)',
      description: 'Ideal for remote areas or locations with frequent and long power cuts.',
      points: [
        'Standalone system with battery storage backup',
        'Completely independent from the electricity grid',
        'Power available 24/7, even during total grid failure',
        'Includes high-quality solar batteries (Luminous/Waaree)',
        'Perfect for farmhouses, remote shops, and rural areas'
      ],
      icon: '🔋',
    },
    {
      title: 'Hybrid Solar (Grid + Battery)',
      description: 'The ultimate solution — combines grid savings with battery security.',
      points: [
        'Connected to the grid AND has battery backup',
        'Savings through Net Metering + Security during outages',
        'Smartly manages power between Solar, Battery, and Grid',
        'Export surplus power to grid after charging batteries',
        'Most advanced technology for complete peace of mind'
      ],
      icon: '🔄',
    }
  ];

  const handleContactClick = () => {
    const whatsappUrl = `https://wa.me/${BUSINESS.contacts.whatsapp}?text=${encodeURIComponent('Namaste! I want to know more about On-grid, Off-grid, and Hybrid solar options.')}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Improved Header - Fixed Overlapping */}
      <div className="bg-amber-400 py-12 sm:py-20 px-6 text-center text-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-black/10 px-4 py-1 rounded-full text-gray-900 text-xs font-bold mb-4 uppercase tracking-widest">
            🇮🇳 Ek Kadam Solar Ki Taraf
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            Hamari <span className="text-white">Solar Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 max-w-2xl mx-auto font-medium mb-10">
            Agra's trusted experts for all solar types. Maximum subsidy, lowest ROI, and EMI starts at just ₹1,499.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-amber-200 transform hover:scale-105 transition-transform">
              <span className="block text-3xl font-black text-gray-900">₹1,499</span>
              <span className="text-xs uppercase font-bold text-gray-500 tracking-widest">EMI Starts From</span>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-amber-200 transform hover:scale-105 transition-transform">
              <span className="block text-3xl font-black text-gray-900">6%</span>
              <span className="text-xs uppercase font-bold text-gray-500 tracking-widest">Fixed Interest</span>
            </div>
            <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-amber-200 transform hover:scale-105 transition-transform">
              <span className="block text-3xl font-black text-gray-900">₹1.08L</span>
              <span className="text-xs uppercase font-bold text-gray-500 tracking-widest">Max Subsidy</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simplified Brand Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-16 flex flex-wrap justify-center items-center gap-6 sm:gap-12 border border-gray-100 dark:border-gray-700">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trusted Partners:</span>
          {BUSINESS.brands.map(brand => (
            <span key={brand} className="text-sm font-extrabold text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-colors">{brand}</span>
          ))}
        </div>

        {/* Detailed Solar Types Explanation */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">Choose Your Solar Type</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Different systems for different needs. Here is a breakdown of On-Grid, Off-Grid, and Hybrid solar.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solarTypes.map((type) => (
              <div key={type.title} className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all group">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{type.icon}</div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 leading-tight">{type.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                  {type.description}
                </p>
                <div className="space-y-3 mb-10">
                  {type.points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-green-500 font-bold">✓</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  className="w-full bg-gray-900 dark:bg-gray-700 text-white hover:bg-amber-500 hover:text-gray-900 font-bold py-4 rounded-2xl shadow-lg transition-all"
                  onClick={handleContactClick}
                >
                  Get {type.title.split(' ')[0]} Quote
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* General Services Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-8 text-white">
            <div className="text-4xl mb-6">🏠</div>
            <h3 className="text-2xl font-black mb-4">Residential Installation</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Complete end-to-end solar setup for your home. From DVVNL paperwork to subsidy filing, we handle everything so you can enjoy ₹0 bills.
            </p>
            <div className="text-amber-400 text-xs font-bold uppercase tracking-widest">Included: Survey + Install + Subsidy</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-[2.5rem] p-8 text-white">
            <div className="text-4xl mb-6">🔧</div>
            <h3 className="text-2xl font-black mb-4">Maintenance & Support</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Keep your panels running at peak efficiency. We provide professional cleaning, electrical checkups, and panel health monitoring.
            </p>
            <div className="text-blue-300 text-xs font-bold uppercase tracking-widest">Included: Cleaning + Performance Check</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;