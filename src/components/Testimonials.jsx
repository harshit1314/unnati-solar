// src/components/Testimonials.jsx
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from './Button';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Verified Homeowner',
      quote: 'The team explained subsidy and system sizing clearly. Installation and approvals were handled step-by-step.',
      role: 'Residential Rooftop, Bengaluru',
    },
    {
      name: 'Verified Business Client',
      quote: 'Our commercial quote included realistic generation assumptions and maintenance planning, which helped decision-making.',
      role: 'Commercial Rooftop, Pune',
    },
    {
      name: 'Verified Consumer',
      quote: 'The seasonal bill analysis in the calculator matched our usage pattern much better than flat monthly estimates.',
      role: 'Residential Rooftop, Lucknow',
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          What Our Customers Say
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-all duration-300">
            <p className="text-gray-600 dark:text-gray-300 italic text-lg">"{testimonials[current].quote}"</p>
            <p className="mt-4 font-semibold text-gray-900 dark:text-white">{testimonials[current].name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{testimonials[current].role}</p>
          </div>
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-yellow-500 hover:text-yellow-600 dark:hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            aria-label="Next testimonial"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
        <Button
          className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-medium py-3 px-6 rounded-lg"
          onClick={() => {
            const quoteButton = document.querySelector('.get-quote-button');
            if (quoteButton) quoteButton.click();
            else console.error('Get Quote button not found');
          }}
        >
          Get Your Free Quote
        </Button>
      </div>
    </div>
  );
};

export default Testimonials;