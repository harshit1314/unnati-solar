import React from 'react';
import { FiSun, FiZap, FiDollarSign, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LearnMorePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-yellow-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <FiSun className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Solar Energy Explained</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-600">
            Discover how solar power works and how it can benefit your home or business
          </p>
        </div>
      </div>

      {/* How Solar Works */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">How Solar Power Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <FiSun className="w-12 h-12 mx-auto" />,
                title: "1. Sunlight Collection",
                description: "Solar panels capture sunlight and convert it to DC electricity"
              },
              {
                icon: <FiZap className="w-12 h-12 mx-auto" />,
                title: "2. Energy Conversion",
                description: "Inverter converts DC to usable AC electricity for your home"
              },
              {
                icon: <FiDollarSign className="w-12 h-12 mx-auto" />,
                title: "3. Power Your Home",
                description: "Use solar energy and reduce your electricity bills"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="text-yellow-500 mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-gray-50 rounded-xl">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Solar Energy</h2>
            <div className="space-y-8">
              {[
                {
                  icon: <FiDollarSign className="w-8 h-8" />,
                  title: "Lower Energy Bills",
                  description: "Reduce your electricity costs by 50-90% with solar power"
                },
                {
                  icon: <FiShield className="w-8 h-8" />,
                  title: "Energy Independence",
                  description: "Protect yourself from rising utility rates and power outages"
                },
                {
                  icon: <FiSun className="w-8 h-8" />,
                  title: "Environmental Impact",
                  description: "Reduce your carbon footprint by 3-4 tons annually"
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-6 text-yellow-500">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Solar Energy FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How much does a solar system cost?",
                answer: "The average residential system costs between ₹1.5-2.5 lakhs after subsidies, with payback in 4-6 years through savings."
              },
              {
                question: "Will solar panels work during power cuts?",
                answer: "Only if you have battery storage. Grid-tied systems without batteries shut off during outages for safety."
              },
              {
                question: "How long do solar panels last?",
                answer: "Most panels have 25-year performance warranties and can continue producing energy well beyond that."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore Solar for Your Home?</h2>
          <Link
            to="/get-started"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all text-lg"
          >
            Get Your Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;