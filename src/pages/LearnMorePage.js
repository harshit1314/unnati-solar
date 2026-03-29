import React from 'react';
import { FiSun, FiZap, FiTrendingUp, FiShield } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import DataSourcesFooter from '../components/DataSourcesFooter';

const LearnMorePage = () => {
  const panelTypes = [
    {
      name: 'Monocrystalline Panels',
      bestFor: 'Homes and commercial rooftops with limited space',
      highlights: [
        'Higher efficiency and better output per square meter',
        'Usually better low-light performance',
        'Common choice for long-term premium systems',
      ],
    },
    {
      name: 'Polycrystalline Panels',
      bestFor: 'Budget-focused residential installations',
      highlights: [
        'Lower upfront cost in many configurations',
        'Reliable performance for typical Indian rooftops',
        'Good value when roof area is not a strict constraint',
      ],
    },
    {
      name: 'Thin-Film Panels',
      bestFor: 'Special applications where weight or flexibility matters',
      highlights: [
        'Lightweight and often easier for specific structures',
        'Usually lower efficiency than crystalline options',
        'Used selectively based on project design needs',
      ],
    },
  ];

  const kitProviders = [
    { name: 'Tata Power Solar', focus: 'Rooftop systems, EPC, service network in major cities' },
    { name: 'Waaree', focus: 'Panels, inverters, and integrated rooftop solutions' },
    { name: 'Loom Solar', focus: 'Residential kits and D2C rooftop products' },
    { name: 'Luminous', focus: 'Home solar packages, batteries, and hybrid solutions' },
    { name: 'Microtek', focus: 'Inverter-led home power products and solar combinations' },
    { name: 'Vikram Solar', focus: 'Module manufacturing and project supply' },
    { name: 'Adani Solar', focus: 'Module supply and utility/commercial solar ecosystem' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="py-20 px-6 bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <FiSun className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Everything About Solar Panels in India</h1>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Types, working, cost expectations, and how to choose a reliable rooftop kit provider.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Updated guide for Indian home and commercial users</p>
        </div>
      </div>

      {/* India Overview */}
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 mb-14 dark:border-yellow-700/40 dark:bg-yellow-900/20">
          <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Overview of Solar in India</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            India has rapidly expanded solar adoption through utility-scale parks and rooftop programs.
            For consumers, rooftop solar can reduce long-term electricity expenses, improve energy independence,
            and support cleaner power generation.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you are evaluating a home system or a commercial project, the right sizing and subsidy-aware
            planning are more important than picking the cheapest panel.
          </p>
        </div>

        {/* Basics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">What Are Solar Panels?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Solar panels use photovoltaic cells to convert sunlight into electricity. During daytime,
              generated power can run household loads and reduce grid consumption.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              A complete rooftop setup usually includes panels, inverter, mounting structure, wiring,
              earthing, protections, and metering integration.
            </p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">What Are Panels Made Of?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Most panels are based on silicon cells. Crystalline silicon technologies dominate the market
              because of durability, strong field performance, and improving efficiency.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Glass, EVA layers, backsheet, aluminum frame, and junction box together protect the cells
              for long-term outdoor operation.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">How a Solar System Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <FiSun className="w-12 h-12 mx-auto" />,
                title: "1. Sunlight Collection",
                description: "Photovoltaic cells absorb sunlight and produce DC electricity"
              },
              {
                icon: <FiZap className="w-12 h-12 mx-auto" />,
                title: "2. Energy Conversion",
                description: "Inverter converts DC to AC power usable by appliances"
              },
              {
                icon: <FiTrendingUp className="w-12 h-12 mx-auto" />,
                title: "3. Consumption and Grid Sync",
                description: "Power is consumed in real-time and excess can be exported through net metering"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="text-yellow-500 mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel Types */}
        <div className="py-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Types of Solar Panels Used in India</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {panelTypes.map((type) => (
              <div key={type.name} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{type.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Best for: {type.bestFor}</p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                  {type.highlights.map((line) => (
                    <li key={line}>- {line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-gray-50 rounded-xl mb-14 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Benefits of Solar Energy</h2>
            <div className="space-y-8">
              {[
                {
                  icon: <FiTrendingUp className="w-8 h-8" />,
                  title: "Lower Energy Bills",
                  description: "Well-sized systems can significantly reduce monthly bills over the long run"
                },
                {
                  icon: <FiShield className="w-8 h-8" />,
                  title: "Energy Independence",
                  description: "Less dependence on tariff hikes and better control over energy expenses"
                },
                {
                  icon: <FiSun className="w-8 h-8" />,
                  title: "Environmental Impact",
                  description: "Lower grid dependence and reduce your site carbon footprint"
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-yellow-100 p-3 rounded-full mr-6 text-yellow-500">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{benefit.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cost Section */}
        <div className="py-4 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Typical Cost Snapshot in India</h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
            {[
              {
                question: 'Entry Residential (approx 1-2 kW)',
                answer: 'Often considered by low to moderate bill households. Cost varies by brand, BOS components, and installation complexity.'
              },
              {
                question: 'Typical Home (approx 3-5 kW)',
                answer: 'Common category for urban homes. Subsidy eligibility, inverter type, and roof conditions heavily impact final quote.'
              },
              {
                question: 'Commercial Rooftop (higher capacities)',
                answer: 'Project economics are tied to sanctioned load, operating hours, and net metering policies of the local DISCOM.'
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 bg-white dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
            Note: Final project cost should always be taken from a site survey based quotation. Panel brand, inverter quality,
            structure, wiring route, approvals, and after-sales support all influence final pricing.
          </p>
        </div>

        {/* Companies Section */}
        <div className="py-4 mb-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Companies in India That Offer Solar Kits / Systems</h2>
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4">
            {kitProviders.map((company) => (
              <div key={company.name} className="border border-gray-200 rounded-lg p-5 bg-white dark:bg-gray-800 dark:border-gray-700">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{company.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{company.focus}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6 max-w-3xl mx-auto">
            Availability, pricing, and support can differ by city. Compare warranty terms, installer certification,
            service response time, and component data sheets before finalizing.
          </p>
        </div>

        <div className="py-4 mb-10 max-w-4xl mx-auto">
          <DataSourcesFooter
            reviewedDate="March 2026"
            note="This page summarizes practical solar guidance for Indian users. For subsidy, net metering, and latest technical conditions, always verify with official portals and your DISCOM."
            sources={[
              { label: 'MNRE', url: 'https://mnre.gov.in' },
              { label: 'PM Surya Ghar Portal', url: 'https://pmsuryaghar.gov.in' },
              { label: 'CEA', url: 'https://cea.nic.in' },
              { label: 'UPPCL (example state utility)', url: 'https://www.uppcl.org' },
            ]}
          />
        </div>

        {/* Final CTA */}
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ready to Get a Personalized Solar Plan?</h2>
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