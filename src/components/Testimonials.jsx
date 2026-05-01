// src/components/Testimonials.jsx
// Auto-rotating testimonials carousel with Agra localities
import React, { useState, useEffect, useCallback } from 'react';
import { TESTIMONIALS } from '../content/business';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= rating ? 'text-amber-400' : 'text-gray-300'}>★</span>
    ))}
  </div>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % TESTIMONIALS.length), []);
  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = TESTIMONIALS[current];

  const propertyBadge = {
    residential: { label: '🏠 Residential', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
    commercial: { label: '🏪 Commercial', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300' },
    factory: { label: '🏭 Factory', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
  };
  const badge = propertyBadge[t.propertyType] || propertyBadge.residential;

  return (
    <section
      className="py-20 bg-gradient-to-b from-blue-900 to-blue-950 dark:from-gray-900 dark:to-gray-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white mb-3">
            Hamare Customers Kya Kehte Hain
          </h2>
          <p className="text-blue-200">Real reviews from real Agra households and businesses</p>
        </div>

        {/* Card */}
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl min-h-[280px] transition-all duration-500">
          {/* Quote mark */}
          <div className="absolute top-6 left-8 text-7xl text-amber-200 dark:text-amber-900 font-serif leading-none select-none">"</div>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <StarRating rating={t.rating} />
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.color}`}>
                {badge.label}
              </span>
              {t.systemSize && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  ⚡ {t.systemSize}
                </span>
              )}
            </div>

            <blockquote className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 italic">
              "{t.text}"
            </blockquote>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">📍 {t.locality}</p>
              </div>
              {t.savings && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Savings</p>
                  <p className="text-2xl font-extrabold text-green-600">{t.savings}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;