import React, { useState } from 'react';
import { FiSun, FiX } from 'react-icons/fi';
import { submitLeadInquiry } from '../services/leadApi';

const GetQuoteButton = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMode, setSubmissionMode] = useState('demo');
  const [submitError, setSubmitError] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    monthlyBill: '',
    pincode: '',
    propertyType: 'owned',
    systemType: 'residential',
    message: ''
  });

  const totalSteps = 4;

  const resetModal = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmissionMode('demo');
    setSubmitError('');
    setErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      monthlyBill: '',
      pincode: '',
      propertyType: 'owned',
      systemType: 'residential',
      message: ''
    });
  };

  const openModal = () => {
    setIsOpen(true);
    setCurrentStep(1);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmissionMode('demo');
    setSubmitError('');
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = (step) => {
    const nextErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) nextErrors.name = 'Full name is required.';
      if (!formData.email.trim()) {
        nextErrors.email = 'Email is required.';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        nextErrors.email = 'Enter a valid email address.';
      }

      if (!formData.phone.trim()) {
        nextErrors.phone = 'Phone number is required.';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        nextErrors.phone = 'Enter a valid 10-digit phone number.';
      }
    }

    if (step === 2) {
      const monthlyBill = Number(formData.monthlyBill);
      if (!formData.monthlyBill) {
        nextErrors.monthlyBill = 'Monthly electricity bill is required.';
      } else if (Number.isNaN(monthlyBill) || monthlyBill <= 0) {
        nextErrors.monthlyBill = 'Enter a valid bill amount.';
      }

      if (!formData.pincode.trim()) {
        nextErrors.pincode = 'Pincode is required.';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        nextErrors.pincode = 'Enter a valid 6-digit pincode.';
      }
    }

    if (step === 3) {
      if (!formData.systemType) nextErrors.systemType = 'Please select a system type.';
      if (!formData.propertyType) nextErrors.propertyType = 'Please select a property type.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToNextStep = () => {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    if (isSubmitting) return;
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setSubmitError('');
    setIsSubmitting(true);

    const quoteData = {
      estimatedMonthlySavings,
      estimatedYearlySavings,
      estimatedSystemSizeKw,
      installationCost,
      estimatedSubsidy,
      netInvestment,
      paybackYears
    };

    try {
      const result = await submitLeadInquiry(formData, quoteData);
      setSubmissionMode(result.mode || 'demo');
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError('Unable to submit your request right now. Please try again.');
      console.error('Lead submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const monthlyBillValue = Number(formData.monthlyBill) || 0;
  const estimatedMonthlySavings = Math.round(monthlyBillValue * 0.7);
  const estimatedYearlySavings = estimatedMonthlySavings * 12;
  const estimatedSystemSizeKw = monthlyBillValue > 0 ? Number((monthlyBillValue / 1200).toFixed(1)) : 0;
  const installationCost = Math.round(estimatedSystemSizeKw * 60000);
  const estimatedSubsidy = Math.round(installationCost * 0.2);
  const netInvestment = installationCost - estimatedSubsidy;
  const paybackYears = estimatedYearlySavings > 0 ? (netInvestment / estimatedYearlySavings).toFixed(1) : '0.0';

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);

  const renderQuotePreview = () => {
    if (monthlyBillValue <= 0) return null;

    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2 dark:bg-amber-900/20 dark:border-amber-700/40">
        <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">Instant Solar Estimate</h4>
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Recommended system size: <span className="font-semibold">{estimatedSystemSizeKw} kW</span>
        </p>
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Estimated monthly savings: <span className="font-semibold">{formatCurrency(estimatedMonthlySavings)}</span>
        </p>
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Estimated yearly savings: <span className="font-semibold">{formatCurrency(estimatedYearlySavings)}</span>
        </p>
        <p className="text-sm text-amber-900 dark:text-amber-200">
          Approximate payback period: <span className="font-semibold">{paybackYears} years</span>
        </p>
      </div>
    );
  };

  const renderStepContent = () => {
    if (isSubmitted) {
      return (
        <div className="text-center py-4">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Request Submitted</h4>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Thank you. Our solar advisor will contact you shortly with a personalized quote.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Submission mode: {submissionMode === 'api' ? 'Live API' : 'Demo (stored locally)'}
          </p>
          <button
            type="button"
            onClick={resetModal}
            className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg"
          >
            Close
          </button>
        </div>
      );
    }

    if (currentStep === 1) {
      return (
        <>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
              placeholder="10-digit mobile number"
            />
            {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
          </div>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Monthly Electricity Bill (INR)*</label>
            <input
              type="number"
              name="monthlyBill"
              min="1"
              value={formData.monthlyBill}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
              placeholder="e.g. 2500"
            />
            {errors.monthlyBill && <p className="text-sm text-red-600 mt-1">{errors.monthlyBill}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Pincode*</label>
            <input
              type="text"
              name="pincode"
              maxLength="6"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter 6-digit pincode"
            />
            {errors.pincode && <p className="text-sm text-red-600 mt-1">{errors.pincode}</p>}
          </div>

          {renderQuotePreview()}
        </>
      );
    }

    if (currentStep === 3) {
      return (
        <>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">System Type*</label>
            <select
              name="systemType"
              value={formData.systemType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
            {errors.systemType && <p className="text-sm text-red-600 mt-1">{errors.systemType}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Property Type*</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
            </select>
            {errors.propertyType && <p className="text-sm text-red-600 mt-1">{errors.propertyType}</p>}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Additional Message (Optional)</label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-800 dark:text-white"
              placeholder="Share your preferred installation timeline or requirements"
            />
          </div>

          {renderQuotePreview()}
        </>
      );
    }

    return (
      <div className="space-y-4">
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white">Review Your Details</h4>
          <p><span className="font-medium">Name:</span> {formData.name}</p>
          <p><span className="font-medium">Email:</span> {formData.email}</p>
          <p><span className="font-medium">Phone:</span> {formData.phone}</p>
          <p><span className="font-medium">Monthly Bill:</span> {formatCurrency(monthlyBillValue)}</p>
          <p><span className="font-medium">Pincode:</span> {formData.pincode}</p>
          <p><span className="font-medium">System Type:</span> {formData.systemType}</p>
          <p><span className="font-medium">Property Type:</span> {formData.propertyType}</p>
          {formData.message && <p><span className="font-medium">Message:</span> {formData.message}</p>}
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/40 rounded-lg p-4 space-y-2 text-sm text-green-900 dark:text-green-200">
          <h4 className="text-base font-semibold">Your Instant Quote Preview</h4>
          <p><span className="font-medium">Recommended System:</span> {estimatedSystemSizeKw} kW</p>
          <p><span className="font-medium">Estimated Installation Cost:</span> {formatCurrency(installationCost)}</p>
          <p><span className="font-medium">Estimated Subsidy:</span> {formatCurrency(estimatedSubsidy)}</p>
          <p><span className="font-medium">Net Investment:</span> {formatCurrency(netInvestment)}</p>
          <p><span className="font-medium">Monthly Savings:</span> {formatCurrency(estimatedMonthlySavings)}</p>
          <p><span className="font-medium">Yearly Savings:</span> {formatCurrency(estimatedYearlySavings)}</p>
          <p><span className="font-medium">Payback Period:</span> {paybackYears} years</p>
        </div>
      </div>
    );
  };

  // Button styles based on variant
  const buttonStyles = {
    default: "bg-yellow-500 hover:bg-yellow-600 text-white",
    floating: "fixed bottom-8 right-8 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold shadow-xl hover:shadow-2xl ring-4 ring-yellow-300/50",
    outline: "bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-gray-800"
  };

  return (
    <>
      {/* Main Button */}
      <button
        onClick={openModal}
        className={`get-quote-button flex items-center gap-2 font-medium py-3 px-6 rounded-lg transition-all duration-300 ${
          buttonStyles[variant] || buttonStyles.default
        } ${variant === 'floating' ? 'rounded-full' : ''}`}
      >
        <FiSun className="text-xl" />
        Get a Free Quote
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-md w-full p-6 relative border border-gray-100 dark:border-gray-700">
            <button 
              onClick={resetModal}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              <FiX size={24} />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Solar Quote Request</h3>

            {!isSubmitted && (
              <>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Step {currentStep} of {totalSteps}</span>
                    <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
              </>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderStepContent()}

              {submitError && (
                <p className="text-sm text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/40 rounded-lg px-3 py-2">
                  {submitError}
                </p>
              )}

              {!isSubmitted && (
                <div className="flex items-center gap-3 pt-2">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={goToPreviousStep}
                      disabled={isSubmitting}
                      className="w-1/2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-3 px-6 rounded-lg"
                    >
                      Back
                    </button>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={goToNextStep}
                      disabled={isSubmitting}
                      className={`${currentStep > 1 ? 'w-1/2' : 'w-full'} bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg`}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${currentStep > 1 ? 'w-1/2' : 'w-full'} bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GetQuoteButton;