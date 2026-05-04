// src/components/PMSuryaGharSection.js
import React from 'react';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const PMSuryaGharSection = ({ onOpenQuoteForm }) => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-700 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 font-bold text-sm mb-6 animate-fade-in">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              PM Surya Ghar: Muft Bijli Yojana 2024
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Get Up To <span className="text-blue-600 dark:text-blue-400">₹1,08,000</span> Total Subsidy
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              India ki sabse badi solar scheme ab Agra mein live hai! Agar aap residential ghar mein rehte hain aur bijli ka bill dete hain, toh aap ₹78,000 tak ki subsidy ke liye eligible hain.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { title: '₹1,08,000 Total Subsidy', desc: '₹78,000 Central (PM Surya Ghar) + ₹30,000 State (UPNEDA).' },
                { title: '300 Units Free Electricity', desc: 'System lagne ke baad har mahine ki bijli bilkul muft.' },
                { title: 'Zero Paperwork Stress', desc: 'Application se subsidy approval tak — hum sab handle karte hain.' },
                { title: 'Low-Interest EMI', desc: 'Partner banks se quick solar loan arrangement.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mt-1">
                    <FiCheckCircle size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenQuoteForm}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Check Eligibility <FiArrowRight />
              </button>
              <div className="flex items-center gap-3 px-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-200 dark:bg-gray-700 overflow-hidden flex items-center justify-center text-[10px] font-bold">
                      {['👤', '👤', '👤'][i-1]}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  <span className="text-gray-900 dark:text-white font-bold">200+ Families</span> in Agra already applied
                </p>
              </div>
            </div>
          </div>

          {/* Right: Visual Info Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full transform -rotate-12 translate-x-10 translate-y-10"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                💰 Subsidy Calculation
              </h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-100 font-medium">1 kW System</span>
                    <span className="font-bold text-xl">₹30,000</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-1/3"></div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-100 font-medium">2 kW System</span>
                    <span className="font-bold text-xl">₹60,000</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-2/3"></div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 scale-105 shadow-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-amber-300 font-bold">3 kW+ System</span>
                    <span className="font-extrabold text-2xl text-amber-300">₹78,000</span>
                  </div>
                  <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-full"></div>
                  </div>
                  <p className="text-[10px] text-blue-100 mt-3 flex items-center gap-1 italic">
                    *Maximum Central Government Subsidy capped at 3kW.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center text-xl font-bold">
                  UP
                </div>
                <div>
                  <p className="text-sm font-bold text-amber-300">UP State Subsidy Included!</p>
                  <p className="text-xs text-blue-100">Get additional <span className="text-white font-bold underline">₹30,000</span> from UP Government.</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-1">Official</p>
              <p className="text-blue-600 dark:text-blue-400 font-extrabold">National Portal</p>
              <p className="text-[10px] text-gray-400 italic">pmsuryaghar.gov.in</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PMSuryaGharSection;
