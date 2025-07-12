import React from 'react';
import { FiSun, FiShield, FiAward, FiUsers, FiGlobe } from 'react-icons/fi';

const About = () => {
  const teamMembers = [
    {
      name: 'Rahul Sharma',
      role: 'Founder & CEO',
      bio: 'Solar industry veteran with 15+ years of experience in renewable energy solutions.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Patel',
      role: 'Chief Technology Officer',
      bio: 'Expert in solar panel technology and energy storage systems.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Amit Singh',
      role: 'Installation Director',
      bio: 'Leads our nationwide team of certified solar installers.',
      image: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    {
      name: 'Neha Gupta',
      role: 'Customer Success',
      bio: 'Ensures every client has an exceptional solar experience.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Solar Panels Installed', icon: <FiSun /> },
    { value: '25+', label: 'Years Warranty', icon: <FiShield /> },
    { value: '4.9/5', label: 'Customer Rating', icon: <FiAward /> },
    { value: '50+', label: 'Team Members', icon: <FiUsers /> },
    { value: '5 MW', label: 'Clean Energy Generated', icon: <FiGlobe /> }
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Solar panels"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Powering a Brighter Future
          </h1>
          <p className="mt-6 text-xl text-yellow-300 dark:text-yellow-200 max-w-3xl mx-auto">
            Our mission is to make clean, affordable solar energy accessible to everyone.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              Founded in 2010, Unnati Renewables began as a small team of solar enthusiasts in Bangalore. 
              Today, we're one of India's fastest-growing solar energy companies with operations across 
              8 states.
            </p>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              What started as a mission to bring solar power to rural communities has evolved into 
              comprehensive renewable energy solutions for homes, businesses, and industries.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              className="w-full rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Team working on solar panels"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-yellow-50 dark:bg-amber-900/50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 mx-auto rounded-full bg-yellow-100 dark:bg-amber-800 text-yellow-600 dark:text-yellow-400">
                  {stat.icon}
                </div>
                <p className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
            These principles guide everything we do at Unnati Renewables
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Sustainability',
              description: "We're committed to solutions that benefit both people and the planet.",
              icon: '🌍'
            },
            {
              name: 'Innovation',
              description: 'Constantly pushing boundaries in solar technology and service.',
              icon: '💡'
            },
            {
              name: 'Integrity',
              description: 'Honest recommendations and transparent pricing always.',
              icon: '🤝'
            },
            {
              name: 'Quality',
              description: 'Using only the highest-grade materials and installation practices.',
              icon: '🏆'
            },
            {
              name: 'Community',
              description: 'Empowering local communities through renewable energy.',
              icon: '👥'
            },
            {
              name: 'Growth',
              description: 'Helping our employees and customers thrive together.',
              icon: '📈'
            }
          ].map((value, index) => (
            <div
              key={index}
              className="pt-10 pb-8 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center bg-yellow-100 dark:bg-amber-800 rounded-full text-3xl mb-6 text-yellow-600 dark:text-yellow-400">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
              Passionate experts driving India's solar revolution
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8 h-full shadow-sm border border-gray-200 dark:border-gray-600">
                  <div className="-mt-6">
                    <div className="flex items-center justify-center h-24 w-24 rounded-full bg-white dark:bg-gray-800 border-4 border-yellow-500 dark:border-amber-600 mx-auto overflow-hidden shadow-md">
                      <img
                        className="h-full w-full object-cover"
                        src={member.image}
                        alt={member.name}
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400 text-center">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-300 text-center">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Ready to go solar?</span>
            <span className="block text-gray-800 dark:text-gray-200">Get your free consultation today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => document.querySelector('.get-quote-button')?.click()}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-yellow-600 bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-gray-700 dark:text-yellow-400"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;