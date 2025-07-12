
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Pricing = () => {
  const [showFinancingModal, setShowFinancingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

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
      details: 'Our Residential plan is designed for homeowners looking to reduce energy bills with a reliable 5kW solar system. Includes standard installation and basic monitoring to ensure performance.',
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
      details: 'The Commercial plan offers businesses an 8kW system with premium installation and smart monitoring. Optional energy storage and priority support ensure minimal downtime and maximum efficiency.',
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
      details: 'Our Enterprise plan provides custom solar solutions with 10kW+ systems, advanced monitoring, and included energy storage. A dedicated account manager ensures personalized service.',
      popular: false,
      bgImage: 'linear-gradient(to bottom right, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05))',
    },
  ];

  const financingOptions = [
    {
      name: 'Cash Purchase',
      desc: 'Pay upfront, maximize savings',
      details: 'Own the solar system outright with no monthly payments, benefiting from maximum long-term savings and available tax credits.'
    },
    {
      name: 'Solar Loan',
      desc: 'Low monthly payments',
      details: 'Own your system with affordable monthly payments, flexible terms, and competitive rates while enjoying ownership benefits.'
    },
    {
      name: 'Lease/PPA',
      desc: 'No upfront cost',
      details: 'Go solar with minimal upfront costs via a lease or PPA, paying a fixed rate with maintenance and monitoring included.'
    }
  ];

  const openFinancingModal = () => {
    setShowFinancingModal(true);
  };

  const closeFinancingModal = () => {
    setShowFinancingModal(false);
  };

  const openPlanModal = (plan) => {
    setSelectedPlan(plan);
  };

  const closePlanModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="relative py-16 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80')] bg-repeat bg-[size:300px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Invest in clean energy with our flexible solar solutions
          </p>
        </div>

        <div className="mt-16 space-y-8 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 border rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg ${
                plan.popular
                  ? 'border-2 border-yellow-400 bg-white dark:bg-gray-700 transform scale-105 z-10'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'
              }`}
              style={{ background: plan.bgImage }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 px-3 py-1 bg-yellow-400 text-gray-900 dark:text-white text-sm font-semibold rounded-full shadow-md">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{plan.description}</p>
                <p className="mt-4 flex items-baseline">
                  <span className="text-5xl font-extrabold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="ml-1 text-xl font-semibold text-gray-500 dark:text-gray-400">
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
                    <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  plan.popular
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-800 dark:text-white'
                }`}
                onClick={() => openPlanModal(plan)}
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-gray-700 shadow-md rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's Included in All Plans</h3>
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
                <span className="ml-3 text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center bg-yellow-50 dark:bg-yellow-900/50 rounded-2xl p-6 border border-yellow-100 dark:border-yellow-600">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Financing Options</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
            Flexible payment plans to make solar affordable
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {financingOptions.map((option) => (
              <div key={option.name} className="bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{option.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300">{option.desc}</p>
              </div>
            ))}
          </div>
          <Button 
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2"
            onClick={openFinancingModal}
          >
            Learn More
          </Button>
        </div>

        {showFinancingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Financing Options</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">Explore our flexible financing plans to make solar energy accessible.</p>
              {financingOptions.map((option) => (
                <div key={option.name} className="mb-4">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white">{option.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{option.details}</p>
                </div>
              ))}
              <div className="flex justify-end space-x-3">
                <Button 
                  className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 text-sm px-4 py-2"
                  onClick={closeFinancingModal}
                >
                  Close
                </Button>
                <Button 
                  className="bg-yellow-500 text-white hover:bg-yellow-600 text-sm px-4 py-2"
                  onClick={() => document.querySelector('.get-quote-button').click()}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        )}

        {selectedPlan && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-lg w-full mx-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{selectedPlan.name} Plan</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{selectedPlan.description}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{selectedPlan.details}</p>
              <ul className="space-y-2 mb-6">
                {selectedPlan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-yellow-500 mt-0.5"
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
                    <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end space-x-3">
                <Button 
                  className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 text-sm px-4 py-2"
                  onClick={closePlanModal}
                >
                  Close
                </Button>
                <Link
                  to={`/calculator?plan=${selectedPlan.name.toLowerCase()}`}
                  className="bg-yellow-500 text-white hover:bg-yellow-600 text-sm px-4 py-2 rounded-lg font-medium"
                  onClick={() => {
                    const quoteButton = document.querySelector('.get-quote-button');
                    if (quoteButton) quoteButton.setAttribute('data-interest', selectedPlan.name.toLowerCase());
                  }}
                  aria-label={`Get a quote for ${selectedPlan.name} plan`}
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pricing;