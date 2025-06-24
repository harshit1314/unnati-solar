import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
          animation: 'panImage 30s linear infinite alternate'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Solar Panel Icon */}
          <div className="mb-8 animate-float">
            <svg className="w-20 h-20 mx-auto text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Powering <span className="text-yellow-400">Your Future</span> With Solar
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Sustainable, affordable solar solutions for homes and businesses. Save money while saving the planet.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/get-started" 
              className="group relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition-all hover:scale-105 overflow-hidden inline-flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            
            <Link 
              to="/learn-more" 
              className="group relative bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform transition-all hover:scale-105 overflow-hidden inline-flex items-center justify-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Learn More <FiBookOpen className="transition-transform group-hover:scale-110" />
              </span>
              <span className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-4">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">10K+</p>
              <p className="text-gray-300">Installations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">75%</p>
              <p className="text-gray-300">Energy Savings</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">25+</p>
              <p className="text-gray-300">Years Warranty</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">4.9★</p>
              <p className="text-gray-300">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Keyframes (add to your CSS) */}
      <style jsx>{`
        @keyframes panImage {
          0% { transform: scale(1) translateX(0); }
          100% { transform: scale(1.1) translateX(-5%); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;