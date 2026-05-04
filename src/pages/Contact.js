// src/pages/Contact.js
// SolarHub Contact page
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BUSINESS, WHATSAPP_URL, isPincodeServed } from '../content/business';
import { submitLead } from '../services/leadApi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', pincode: '', monthly_bill: '', property_type: 'residential', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const set = (f, v) => { setForm((p) => ({ ...p, [f]: v })); if (errors[f]) setErrors((e) => { const n = { ...e }; delete n[f]; return n; }); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Naam required hai.';
    if (!form.phone || !/^\d{10}$/.test(form.phone)) e.phone = '10-digit mobile chahiye.';
    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = '6-digit pincode chahiye.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true); setError('');
    try {
      await submitLead({ ...form, source: 'contact_page' });
      setSubmitted(true);
    } catch (err) {
      setError('Submit nahi ho paya. Please directly WhatsApp karein.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact SolarHub — Free Site Visit Agra | +91 93599 12888</title>
        <meta name="description" content="Contact SolarHub for free solar consultation in Agra. Call +91 93599 12888 or WhatsApp. Address: 18/162, H-3, Fatehabad Road, Taj Ganj, Agra 282001." />
      </Helmet>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-950 py-16 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-3">Sampark Karein</h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto">
          Free site visit book karein ya koi bhi sawaal poochein — WhatsApp, call, ya form ke through.
        </p>
      </div>

      <div className="py-16 bg-gray-50 dark:bg-gray-900 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">Direct Contact</h2>

            {/* WhatsApp primary */}
            <a
              href={WHATSAPP_URL('Namaste SolarHub! Main solar ke baare mein baat karna chahta/chahti hun.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 shadow-lg transition-all hover:scale-105 group"
            >
              <div className="text-4xl">💬</div>
              <div>
                <p className="font-bold text-lg">WhatsApp pe Chat Karein</p>
                <p className="text-green-100 text-sm">+91 {BUSINESS.contacts.whatsapp.replace('91', '')}</p>
                <p className="text-xs text-green-200 mt-1">Fastest response — usually within 1 hour</p>
              </div>
            </a>

            {/* Phone contacts */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-4">
              <h3 className="font-bold text-gray-900 dark:text-white">Call Us</h3>
              {[BUSINESS.contacts.primary, BUSINESS.contacts.secondary].map((c) => (
                <a key={c.phone} href={`tel:${c.phone}`}
                  className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-bold text-sm flex-shrink-0">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors">{c.phone}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{c.name} — {c.role}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Address */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Office Address</h3>
              <address className="not-italic text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                <strong>SolarHub (Seema Electronics)</strong><br />
                {BUSINESS.address.line1}<br />
                {BUSINESS.address.line2}
              </address>
              <a href={BUSINESS.address.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-blue-600 dark:text-blue-400 text-sm hover:underline">
                🗺️ Google Maps pe Dekhein →
              </a>
            </div>

            {/* UPNEDA badge */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-4">
              <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">🏛️ UPNEDA Empanelled Vendor</p>
              <p className="text-amber-700 dark:text-amber-400 font-mono text-sm mt-1">{BUSINESS.upnedaCode}</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="text-5xl">🙏</div>
                <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white">Shukriya!</h3>
                <p className="text-gray-600 dark:text-gray-300">Aapka message mil gaya. 2 ghante mein callback milega.</p>
                <a href={WHATSAPP_URL(`Namaste! Maine contact form bhara hai. Main ${form.name} hun, phone ${form.phone}.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                  💬 WhatsApp pe bhi message karein
                </a>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-5">Quote Request Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Naam *</label>
                    <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
                      placeholder="Full name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-900 dark:text-white" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Mobile *</label>
                    <input type="tel" maxLength={10} value={form.phone} onChange={(e) => set('phone', e.target.value)}
                      placeholder="10-digit number"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-900 dark:text-white" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Pincode *</label>
                      <input type="text" maxLength={6} value={form.pincode} onChange={(e) => set('pincode', e.target.value)}
                        placeholder="282001"
                        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none dark:bg-gray-900 dark:text-white transition-colors ${
                          form.pincode.length === 6 ? (isPincodeServed(form.pincode) ? 'border-green-400' : 'border-orange-400') : 'border-gray-200 dark:border-gray-600 focus:border-amber-400'
                        }`} />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Monthly Bill</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                        <input type="number" value={form.monthly_bill} onChange={(e) => set('monthly_bill', e.target.value)}
                          placeholder="2500"
                          className="w-full pl-7 pr-3 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-900 dark:text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Property Type</label>
                    <select value={form.property_type} onChange={(e) => set('property_type', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-900 dark:text-white">
                      <option value="residential">Apna Ghar</option>
                      <option value="shop">Dukan / Office</option>
                      <option value="factory">Factory / Industrial</option>
                      <option value="school">School / Institution</option>
                      <option value="society">Society / Apartment</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Message (optional)</label>
                    <textarea rows={3} value={form.message} onChange={(e) => set('message', e.target.value)}
                      placeholder="Koi khaas sawaal ya requirement..."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-900 dark:text-white resize-none" />
                  </div>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button type="submit" disabled={submitting}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-4 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-lg">
                    {submitting ? <><span className="animate-spin w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full" /> Submitting...</> : '📋 Quote Request Bhejein'}
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    Submit karne ke baad WhatsApp pe bhi message jayega. 2 hrs mein response.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;