// src/pages/About.js
// SolarHub About / Trust page
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BUSINESS, WHATSAPP_URL } from '../content/business';

const TeamCard = ({ name, role, phone, description }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 text-center">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
      {name.charAt(0)}
    </div>
    <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">{name}</h3>
    <p className="text-amber-600 dark:text-amber-400 text-sm font-semibold mb-2">{role}</p>
    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{description}</p>
    <a href={`tel:${phone}`} className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
      📞 {phone}
    </a>
  </div>
);

const About = () => (
  <>
    <Helmet>
      <title>About SolarHub — UPNEDA Empanelled Solar Installer Agra</title>
      <meta name="description" content="Learn about SolarHub (Seema Electronics), Agra's UPNEDA empanelled solar installer. Vendor Code AGC2512234235. Meet our team: Harshit Agarwal & Divyansh Garg." />
    </Helmet>

    {/* Hero */}
    <div className="bg-gradient-to-br from-blue-900 to-blue-950 py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-sm font-semibold px-4 py-2 rounded-full mb-6">
          UPNEDA Vendor: {BUSINESS.upnedaCode}
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Agra Ka Apna Solar Expert
        </h1>
        <p className="text-blue-200 text-lg">
          SolarHub (Seema Electronics) — Fatehabad Road, Taj Ganj, Agra mein 2019 se solar installations kar rahe hain.
          UPNEDA ke empanelled vendor aur PM Surya Ghar application ke specialist.
        </p>
      </div>
    </div>

    {/* UPNEDA Empanelment Box */}
    <section className="py-16 bg-amber-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-amber-400 p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-6xl">🏛️</div>
            <div className="flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                UPNEDA Empanelled Vendor
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                SolarHub officially approved hai UP New &amp; Renewable Energy Development Agency (UPNEDA) ke through.
                Iska matlab hai ki hamare through lagaya gaya system PM Surya Ghar subsidy ke liye eligible hai.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-3">
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Vendor Code</p>
                  <p className="text-xl font-extrabold text-amber-700 dark:text-amber-300 font-mono">{BUSINESS.upnedaCode}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-3">
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">DISCOM</p>
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-300">DVVNL</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-5 py-3">
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">Scheme</p>
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-300">PM Surya Ghar</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Our Story */}
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Hamari Kahani</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              SolarHub, <strong>Seema Electronics</strong> ka solar division hai — jo Agra mein electronics aur electrical
              equipment distribution mein 20+ saal ka experience rakhti hai.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              Jab PM Surya Ghar Muft Bijli Yojana launch hui, humne dekha ki Agra ke log subsidy ke bare mein jankar bhi
              apply nahi kar pa rahe the — kyunki process complicated lagta hai. Humne tab decide kiya ki hum poora process
              handle karenge — application se le kar installation aur DVVNL net metering tak.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Aaj <strong>200+ successful installations</strong> ke saath hum Agra ka trusted solar partner hain —
              Mathura, Vrindavan, Firozabad aur surrounding areas mein.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: '200+', l: 'Installations' },
              { n: '₹78K', l: 'Max Subsidy' },
              { n: '25yr', l: 'Warranty' },
              { n: '50km', l: 'Service Radius' },
            ].map(({ n, l }) => (
              <div key={l} className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-center text-gray-900 shadow-lg">
                <p className="text-3xl font-extrabold">{n}</p>
                <p className="text-sm font-semibold mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">Hamari Team</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <TeamCard
            name={BUSINESS.contacts.primary.name}
            role={BUSINESS.contacts.primary.role}
            phone={BUSINESS.contacts.primary.phone}
            description="Solar system design aur DVVNL net metering expert. 100+ commercial aur residential installations successfully completed."
          />
          <TeamCard
            name={BUSINESS.contacts.secondary.name}
            role={BUSINESS.contacts.secondary.role}
            phone={BUSINESS.contacts.secondary.phone}
            description="20+ saal ka electrical aur solar industry experience. PM Surya Ghar subsidy applications mein specialist. Directly handle karte hain sabhi site surveys."
          />
        </div>
      </div>
    </section>

    {/* Address + Map */}
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-10">Hamare Office Aaiye</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 space-y-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Address</p>
                <p className="text-gray-900 dark:text-white font-medium">{BUSINESS.address.line1}</p>
                <p className="text-gray-700 dark:text-gray-300">{BUSINESS.address.line2}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Phone</p>
                <a href={`tel:${BUSINESS.contacts.primary.phone}`} className="text-blue-600 dark:text-blue-400 font-semibold block hover:underline">{BUSINESS.contacts.primary.phone}</a>
                <a href={`tel:${BUSINESS.contacts.secondary.phone}`} className="text-blue-600 dark:text-blue-400 font-semibold block hover:underline">{BUSINESS.contacts.secondary.phone}</a>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                <a href={`mailto:${BUSINESS.contacts.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{BUSINESS.contacts.email}</a>
              </div>
              <a href={BUSINESS.address.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors text-sm">
                🗺️ Google Maps pe Dekhein
              </a>
            </div>
          </div>
          {/* Google Maps embed placeholder */}
          <div className="bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden h-64 md:h-auto flex items-center justify-center">
            <div className="text-center text-gray-500 dark:text-gray-400 p-6">
              <p className="text-4xl mb-3">📍</p>
              <p className="font-semibold">18/162, H-3, Fatehabad Road</p>
              <p>Taj Ganj, Agra — 282001</p>
              <a href={BUSINESS.address.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-amber-400 text-center px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Go Solar?</h2>
        <p className="text-gray-800 mb-8">Free site visit book karein — Agra + 50km mein.</p>
        <a href={WHATSAPP_URL('Namaste! Main SolarHub ke baare mein aur jaanna chahta hun. Kripya contact karein.')}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all hover:scale-105">
          💬 WhatsApp pe Baat Karein
        </a>
      </div>
    </section>
  </>
);

export default About;