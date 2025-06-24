import React from 'react';
import { FiCheckCircle, FiSun, FiCalendar, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GetStartedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <FiSun className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Begin Your Solar Journey</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Get your free solar assessment and start saving in just 3 easy steps
          </p>
        </div>
      </div>

      {/* Process Steps */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <FiCalendar className="w-10 h-10" />,
              title: "Schedule Consultation",
              description: "Book a free 30-minute call with our solar experts"
            },
            {
              icon: <FiSun className="w-10 h-10" />,
              title: "Get Custom Proposal",
              description: "Receive a tailored solar solution for your property"
            },
            {
              icon: <FiCheckCircle className="w-10 h-10" />,
              title: "Approval & Installation",
              description: "We handle permits and install your system in 2-4 weeks"
            }
          ].map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-yellow-500 mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Form */}
        <div className="mt-20 bg-white rounded-xl shadow-xl max-w-3xl mx-auto p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Schedule Your Free Consultation</h2>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Full Name*</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email*</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Phone Number*</label>
              <input 
                type="tel" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Property Type</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
                <option>Residential Home</option>
                <option>Commercial Building</option>
                <option>Industrial Facility</option>
                <option>Agricultural</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all"
            >
              Get My Free Solar Assessment
            </button>
          </form>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Go Solar With Unnati?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "30% average energy bill reduction",
              "25-year performance warranty",
              "Government subsidy assistance",
              "Carbon footprint reduction"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <FiCheckCircle className="text-yellow-500 w-6 h-6 mt-1 mr-3 flex-shrink-0" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;