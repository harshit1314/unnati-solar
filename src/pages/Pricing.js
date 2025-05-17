import React from 'react';
import Button from '../components/Button';

const Pricing = () => {
  const plans = [
    {
      name: 'Residential',
      price: '$2,999',
      description: 'Perfect for homeowners',
      features: [
        '5kW Solar Panel System',
        'Standard Installation',
        '10-Year Warranty',
        'Basic Monitoring',
        '24/7 Support'
      ],
      popular: false,
      bgImage: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))',
    },
    {
      name: 'Commercial',
      price: '$4,999',
      description: 'Ideal for businesses',
      features: [
        '8kW Solar Panel System',
        'Premium Installation',
        '15-Year Warranty',
        'Smart Monitoring',
        'Energy Storage Option',
        'Priority Support'
      ],
      popular: true,
      bgImage: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'Tailored solutions',
      features: [
        '10kW+ Solar Panel System',
        'Custom Installation',
        '20-Year Warranty',
        'Advanced Monitoring',
        'Energy Storage Included',
        'Dedicated Account Manager'
      ],
      popular: false,
      bgImage: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))',
    },
  ];

  return (
    <div className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Decorative solar panel background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')] bg-repeat bg-[size:300px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Invest in clean energy with our flexible solar solutions
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 border rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-2 border-yellow-400 bg-white transform scale-105 z-10'
                  : 'border-gray-200 bg-white'
              }`}
              style={{ background: plan.bgImage }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-yellow-400 text-gray-900 text-sm font-semibold rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-gray-600">{plan.description}</p>
                <p className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="ml-1 text-xl font-semibold text-gray-500">
                      /system
                    </span>
                  )}
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="h-6 w-6 flex-shrink-0 text-yellow-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="ml-3 text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {plan.price === 'Custom' ? 'Get a Quote' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white shadow-md rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included in All Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Free Consultation',
              'Site Assessment',
              'Permit Assistance',
              'System Design',
              'Professional Installation',
              'Performance Monitoring'
            ].map((item) => (
              <div key={item} className="flex items-start">
                <svg
                  className="h-6 w-6 flex-shrink-0 text-yellow-500 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-3 text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Financing Options */}
        <div className="mt-16 text-center bg-yellow-50 rounded-2xl p-8 border border-yellow-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Financing Options</h3>
          <p className="text-gray-600 mb-6">
            We offer various payment plans to make solar affordable for everyone
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Cash Purchase',
                desc: 'Pay upfront and maximize savings'
              },
              {
                name: 'Solar Loan',
                desc: 'Own your system with low monthly payments'
              },
              {
                name: 'Lease/PPA',
                desc: 'Go solar with little to no upfront cost'
              }
            ].map((option) => (
              <div key={option.name} className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-gray-900">{option.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{option.desc}</p>
              </div>
            ))}
          </div>
          <Button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white">
            Learn About Financing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;