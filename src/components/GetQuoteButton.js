// src/components/GetQuoteButton.js
// Multi-step lead form with Supabase + WhatsApp + Telegram
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiSun, FiCheck, FiUpload } from 'react-icons/fi';
import { submitLead } from '../services/leadApi';
import { isPincodeServed, BUSINESS } from '../content/business';

const PROPERTY_TYPES = [
  { value: 'residential', label: 'Apna Ghar', icon: '🏠', hint: 'PM Surya Ghar subsidy eligible' },
  { value: 'shop', label: 'Dukan / Office', icon: '🏪', hint: '40% depreciation benefit' },
  { value: 'factory', label: 'Factory / Industrial', icon: '🏭', hint: 'Best commercial ROI' },
  { value: 'school', label: 'School / Institution', icon: '🏫', hint: 'CSR & green credentials' },
  { value: 'society', label: 'Society / Apartment', icon: '🏢', hint: 'Common area solar + EV ready' },
];

const ROOF_TYPES = ['RCC Flat Roof', 'Sloped / Tin Shed', 'Metal Roof', 'Other'];
const TIMELINES = ['Jitna jaldi ho sake (1-2 months)', '3-6 mahine mein', '6+ mahine baad', 'Sirf jaankari chahiye'];

const TOTAL_STEPS = 4;

const ProgressBar = ({ step }) => (
  <div className="mb-6">
    <div className="flex justify-between text-xs text-gray-400 mb-2">
      <span>Step {step} of {TOTAL_STEPS}</span>
      <span>{Math.round((step / TOTAL_STEPS) * 100)}% complete</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div
        className="bg-amber-400 h-2 rounded-full transition-all duration-500"
        style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
      />
    </div>
    <div className="flex justify-between mt-2">
      {['Property', 'Contact', 'Details', 'Review'].map((label, i) => (
        <span
          key={label}
          className={`text-xs font-medium ${i + 1 <= step ? 'text-amber-500' : 'text-gray-400'}`}
        >
          {label}
        </span>
      ))}
    </div>
  </div>
);

const GetQuoteButton = ({ variant = 'default', label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [pincodeStatus, setPincodeStatus] = useState(null); // 'valid' | 'invalid' | null
  const fileInputRef = useRef();

  const [form, setForm] = useState({
    property_type: '',
    pincode: '',
    name: '',
    phone: '',
    whatsapp_same: true,
    monthly_bill: '',
    roof_type: '',
    timeline: '',
    emi_interested: false,
    bill_image_url: '',
    email: '',
  });

  const reset = () => {
    setIsOpen(false); setStep(1); setIsSubmitting(false);
    setIsSubmitted(false); setSubmitError(''); setErrors({});
    setPincodeStatus(null);
    setForm({ property_type: '', pincode: '', name: '', phone: '', whatsapp_same: true, monthly_bill: '', roof_type: '', timeline: '', emi_interested: false, bill_image_url: '', email: '' });
  };

  const open = () => {
    setIsOpen(true); setStep(1); setIsSubmitted(false);
    if (window.gtag) window.gtag('event', 'quote_form_opened');
  };

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const checkPincode = (pin) => {
    if (/^\d{6}$/.test(pin)) {
      setPincodeStatus(isPincodeServed(pin) ? 'valid' : 'invalid');
    } else {
      setPincodeStatus(null);
    }
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.property_type) e.property_type = 'Property type chuniye.';
      if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode chahiye.';
    }
    if (s === 2) {
      if (!form.name?.trim()) e.name = 'Naam required hai.';
      if (!form.phone?.trim() || !/^\d{10}$/.test(form.phone)) e.phone = '10-digit mobile number chahiye.';
      if (!form.monthly_bill || Number(form.monthly_bill) <= 0) e.monthly_bill = 'Monthly bill amount chahiye.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Final guard — validate ALL required fields regardless of current step
  const validateAll = () => {
    const e = {};
    if (!form.property_type) e.property_type = 'Property type chuniye.';
    if (!form.pincode || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode chahiye.';
    if (!form.name?.trim()) e.name = 'Naam required hai.';
    if (!form.phone?.trim() || !/^\d{10}$/.test(form.phone)) e.phone = '10-digit mobile number chahiye.';
    if (!form.monthly_bill || Number(form.monthly_bill) <= 0) e.monthly_bill = 'Monthly bill amount chahiye.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goNext = () => { if (validate(step)) setStep((s) => Math.min(s + 1, TOTAL_STEPS)); };
  const goPrev = () => { setErrors({}); setStep((s) => Math.max(s - 1, 1)); };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { alert('File size 3MB se kam honi chahiye.'); return; }
    const reader = new FileReader();
    reader.onload = () => set('bill_image_url', reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Final safety guard — prevent submission with empty required fields
    if (!validateAll()) {
      // Jump back to the first incomplete step
      if (!form.property_type || !form.pincode) { setStep(1); return; }
      setStep(2); // name/phone/bill missing
      return;
    }

    setIsSubmitting(true);
    if (window.gtag) window.gtag('event', 'lead_submitted', { event_label: form.property_type });

    try {
      const result = await submitLead({
        ...form,
        source: 'quote_form',
      });
      setIsSubmitted(true);
      // Open WhatsApp after short delay so user sees thank-you screen
      setTimeout(() => {
        window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 1500);
    } catch (err) {
      setSubmitError('Kuch gadbad ho gayi. Please WhatsApp pe directly contact karein: ' + BUSINESS.contacts.primary.phone);
      console.error('[SolarHub] Form submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonStyles = {
    default: 'bg-amber-400 hover:bg-amber-500 text-gray-900',
    outline: 'bg-transparent border-2 border-amber-400 text-amber-500 hover:bg-amber-50 dark:hover:bg-gray-800',
    hero: 'bg-amber-400 hover:bg-amber-500 text-gray-900 shadow-xl hover:scale-105',
  };

  // ---- Step renders ----
  const renderStep = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-6 space-y-4">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
            <FiCheck className="text-green-600 dark:text-green-400" size={36} />
          </div>
          <h4 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Shukriya, {form.name.split(' ')[0]}ji! 🙏
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Aapka quote request mil gaya. <strong>2 ghante mein</strong> hamara team aapse contact karega.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4 text-sm text-green-800 dark:text-green-300">
            WhatsApp pe message bhi ja raha hai — aap wahan bhi baar karte rehein.
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Direct call: <a href={`tel:${BUSINESS.contacts.primary.phone}`} className="font-semibold text-amber-500">{BUSINESS.contacts.primary.phone}</a>
          </p>
          <button onClick={reset} className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium py-3 rounded-xl hover:bg-gray-200">
            Close
          </button>
        </div>
      );
    }

    if (step === 1) return (
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Property Type *
          </label>
          <div className="grid grid-cols-1 gap-2">
            {PROPERTY_TYPES.map((pt) => (
              <button
                key={pt.value}
                type="button"
                onClick={() => set('property_type', pt.value)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                  form.property_type === pt.value
                    ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-amber-300'
                }`}
              >
                <span className="text-2xl">{pt.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{pt.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{pt.hint}</p>
                </div>
                {form.property_type === pt.value && (
                  <FiCheck className="ml-auto text-amber-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
          {errors.property_type && <p className="text-red-500 text-xs mt-1">{errors.property_type}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Pincode *
          </label>
          <input
            type="text"
            maxLength={6}
            value={form.pincode}
            onChange={(e) => { set('pincode', e.target.value); checkPincode(e.target.value); }}
            placeholder="6-digit pincode"
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none dark:bg-gray-800 dark:text-white transition-colors ${
              pincodeStatus === 'valid' ? 'border-green-400' :
              pincodeStatus === 'invalid' ? 'border-red-400' :
              errors.pincode ? 'border-red-400' : 'border-gray-200 dark:border-gray-600 focus:border-amber-400'
            }`}
          />
          {pincodeStatus === 'valid' && <p className="text-green-600 text-xs mt-1">✅ Aapke area mein service available hai!</p>}
          {pincodeStatus === 'invalid' && <p className="text-orange-500 text-xs mt-1">⚠️ Is pincode mein abhi service nahi hai — lekin hum check karenge.</p>}
          {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
        </div>
      </div>
    );

    if (step === 2) return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Aapka Naam *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Mobile Number *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="10-digit mobile"
            maxLength={10}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          <label className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={form.whatsapp_same}
              onChange={(e) => set('whatsapp_same', e.target.checked)}
              className="rounded"
            />
            Yahi number WhatsApp pe bhi hai
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Monthly Electricity Bill (₹) *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
            <input
              type="number"
              value={form.monthly_bill}
              onChange={(e) => set('monthly_bill', e.target.value)}
              placeholder="e.g. 3500"
              min={0}
              className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>
          {errors.monthly_bill && <p className="text-red-500 text-xs mt-1">{errors.monthly_bill}</p>}
          {Number(form.monthly_bill) > 0 && (
            <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl text-xs text-amber-800 dark:text-amber-300">
              ⚡ Estimated system: ~{Math.ceil(Number(form.monthly_bill) / 900)} kW &nbsp;|&nbsp;
              💰 Potential savings: ₹{Math.round(Number(form.monthly_bill) * 0.7).toLocaleString('en-IN')}/month
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email (optional)</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
    );

    if (step === 3) return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bill Photo Upload (optional)</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-amber-400 transition-colors"
          >
            {form.bill_image_url ? (
              <div>
                <img src={form.bill_image_url} alt="Bill preview" className="h-24 mx-auto rounded object-contain mb-2" />
                <p className="text-green-600 text-sm font-medium">✅ Bill uploaded</p>
              </div>
            ) : (
              <>
                <FiUpload className="mx-auto text-gray-400 mb-2" size={28} />
                <p className="text-sm text-gray-500 dark:text-gray-400">Bijli ka bill photo upload karein</p>
                <p className="text-xs text-gray-400 mt-1">JPG/PNG, max 3MB</p>
              </>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Roof Type</label>
          <div className="grid grid-cols-2 gap-2">
            {ROOF_TYPES.map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => set('roof_type', rt)}
                className={`p-3 rounded-xl border-2 text-sm transition-all ${
                  form.roof_type === rt ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 font-semibold text-gray-900 dark:text-white' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {rt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Installation Timeline</label>
          <select
            value={form.timeline}
            onChange={(e) => set('timeline', e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-amber-400 focus:outline-none dark:bg-gray-800 dark:text-white"
          >
            <option value="">Timeline select karein</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={form.emi_interested}
            onChange={(e) => set('emi_interested', e.target.checked)}
            className="mt-1 rounded"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>EMI mein interest hai</strong> — hum 0% / low-interest options share karenge (~₹2,200/month se)
          </span>
        </label>
      </div>
    );

    // Step 4 — Review
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 space-y-2 text-sm">
          <h4 className="font-bold text-gray-900 dark:text-white text-base mb-3">Aapki Details Review Karein</h4>
          {[
            ['Property', PROPERTY_TYPES.find(p => p.value === form.property_type)?.label || form.property_type],
            ['Pincode', form.pincode],
            ['Naam', form.name],
            ['Phone', form.phone],
            ['Monthly Bill', `₹${Number(form.monthly_bill).toLocaleString('en-IN')}`],
            form.roof_type && ['Roof Type', form.roof_type],
            form.timeline && ['Timeline', form.timeline],
            ['EMI Interest', form.emi_interested ? 'Haan' : 'Nahi'],
          ].filter(Boolean).map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">{label}:</span>
              <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 text-sm">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">Submit karne ke baad:</p>
          <ul className="text-amber-700 dark:text-amber-400 space-y-1 text-xs">
            <li>✅ Aapka data SolarHub ko jayega</li>
            <li>✅ WhatsApp pe prefilled message open hoga</li>
            <li>✅ 2 ghante mein callback milega</li>
          </ul>
        </div>

        {submitError && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-xl text-sm text-red-700 dark:text-red-300">
            {submitError}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={open}
        id={`get-quote-btn-${variant}`}
        className={`get-quote-button inline-flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all duration-300 min-h-[44px] ${buttonStyles[variant] || buttonStyles.default}`}
      >
        <FiSun className="text-xl" />
        {label || 'Free Quote Lein'}
      </button>

      {/* Modal - Rendered via Portal to escape parent stacking context */}
      {isOpen && createPortal(
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] overflow-y-auto"
          onClick={(e) => { if (e.target === e.currentTarget) reset(); }}
        >
          <div className="min-h-full flex items-start justify-center p-4 py-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-700">
              {/* Modal header */}
              <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Free Solar Quote</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SolarHub — {BUSINESS.upnedaCode}</p>
                </div>
                <button
                  onClick={reset}
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close"
                >
                  <FiX size={22} />
                </button>
              </div>

              <div className="px-6 py-5">
                {!isSubmitted && <ProgressBar step={step} />}
                <form onSubmit={handleSubmit} className="space-y-1">
                  {renderStep()}
                  {!isSubmitted && (
                    <div className="flex gap-3 pt-4">
                      {step > 1 && (
                        <button
                          type="button"
                          onClick={goPrev}
                          disabled={isSubmitting}
                          className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          ← Back
                        </button>
                      )}
                      {step < TOTAL_STEPS ? (
                        <button
                          type="button"
                          onClick={goNext}
                          className={`py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold transition-colors ${step > 1 ? 'flex-1' : 'w-full'}`}
                        >
                          Continue →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold transition-colors flex items-center justify-center gap-2 ${step > 1 ? 'flex-1' : 'w-full'}`}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full" />
                              Submitting...
                            </>
                          ) : (
                            '✅ Submit & WhatsApp Connect'
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default GetQuoteButton;