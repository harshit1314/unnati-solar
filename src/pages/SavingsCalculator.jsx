// src/pages/SavingsCalculator.jsx
import React, { useState, useEffect } from 'react';
import { BUSINESS, SOLAR_RULES, calcEmi } from '../content/business';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { jsPDF } from 'jspdf';
import Button from '../components/Button';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SavingsCalculator = () => {
  const [billingMode, setBillingMode] = useState('single');
  const [bill, setBill] = useState('');
  const [summerBill, setSummerBill] = useState('');
  const [monsoonBill, setMonsoonBill] = useState('');
  const [winterBill, setWinterBill] = useState('');
  const [selectedState, setSelectedState] = useState('uttar-pradesh');
  const [consumerType, setConsumerType] = useState('residential');
  const [phoneForReport, setPhoneForReport] = useState('');
  const [showPhoneGate, setShowPhoneGate] = useState(false);
  const [phoneSubmitted, setPhoneSubmitted] = useState(false);
  const [applyGovernmentScheme, setApplyGovernmentScheme] = useState(true);
  const [subsidyRate, setSubsidyRate] = useState(20);
  const [tariffGrowth, setTariffGrowth] = useState(5);
  const [analysisYears, setAnalysisYears] = useState(10);
  const [savings, setSavings] = useState(null);
  const location = useLocation();

  const formatInr = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan) {
      console.log(`Selected plan: ${plan}`);
    }
  }, [location]);

  const getCentralSubsidy = (systemKw) => {
    if (systemKw <= 1) return 30000;
    if (systemKw <= 2) return 60000;
    return 78000;
  };

  const getUpStateSubsidy = (systemKw) => {
    const subsidy = Math.round(systemKw * 15000);
    return Math.min(subsidy, 30000);
  };

  const getSeasonalAverageBill = () => {
    const summer = Number(summerBill) || 0;
    const monsoon = Number(monsoonBill) || 0;
    const winter = Number(winterBill) || 0;
    const annualBill = (summer * 4) + (monsoon * 4) + (winter * 4);
    return annualBill > 0 ? Number((annualBill / 12).toFixed(0)) : 0;
  };

  const getEffectiveMonthlyBill = () => {
    if (billingMode === 'seasonal') return getSeasonalAverageBill();
    return Number(bill) || 0;
  };

  const calculateScenario = (systemKw, monthlyBill, baseSystemKw) => {
    const normalizedBaseKw = baseSystemKw > 0 ? baseSystemKw : 1;
    const coverageRatio = Math.min(0.95, 0.7 * (systemKw / normalizedBaseKw));
    const monthlySavings = Math.round(monthlyBill * coverageRatio);
    const yearlySavings = monthlySavings * 12;
    const postSolarBill = Math.max(0, Math.round(monthlyBill - monthlySavings));
    const installationCost = Math.round(systemKw * 60000);

    const isUpResidentialScheme = applyGovernmentScheme
      && selectedState === 'uttar-pradesh'
      && consumerType === 'residential';

    const centralSubsidy = isUpResidentialScheme ? getCentralSubsidy(systemKw) : 0;
    const stateSubsidy = isUpResidentialScheme ? getUpStateSubsidy(systemKw) : 0;
    const fallbackSubsidy = Math.round(installationCost * (subsidyRate / 100));
    const subsidyAmount = isUpResidentialScheme ? centralSubsidy + stateSubsidy : fallbackSubsidy;

    const netInvestment = installationCost - subsidyAmount;

    let projectedSavings = 0;
    for (let year = 1; year <= analysisYears; year += 1) {
      projectedSavings += yearlySavings * Math.pow(1 + tariffGrowth / 100, year - 1);
    }

    const paybackYears = yearlySavings > 0 ? Number((netInvestment / yearlySavings).toFixed(1)) : 0;

    return {
      systemKw,
      monthlySavings,
      yearlySavings,
      postSolarBill,
      installationCost,
      subsidyAmount,
      netInvestment,
      projectedSavings,
      paybackYears,
    };
  };

  const calculateSavings = (e) => {
    e.preventDefault();
    if (window.gtag) window.gtag('event', 'calculator_started', { event_label: consumerType });

    const monthlyBill = getEffectiveMonthlyBill();
    if (monthlyBill <= 0) return;

    const isCommercial = consumerType !== 'residential';
    // Agra: 135 units per kW per month (4.5 kWh/kW/day)
    const tariff = isCommercial ? SOLAR_RULES.commercialTariffPerUnit : SOLAR_RULES.residentialTariffPerUnit;
    const costPerKw = isCommercial ? SOLAR_RULES.commercialCostPerKw : SOLAR_RULES.residentialCostPerKw;

    const monthlyUnits = monthlyBill / tariff;
    const recommendedSystemKw = Math.max(0.5, Math.ceil((monthlyUnits / SOLAR_RULES.avgUnitsPerKwPerMonth) * 10) / 10);

    // Solar covers ~90% of bill in Agra (high irradiance)
    const monthlySavings = Math.round(monthlyBill * 0.75);
    const yearlySavings = monthlySavings * 12;
    const postSolarBill = Math.max(0, Math.round(monthlyBill - monthlySavings));

    const installationCost = Math.round(recommendedSystemKw * costPerKw);

    const isUpResidentialScheme = applyGovernmentScheme
      && selectedState === 'uttar-pradesh'
      && consumerType === 'residential';

    const centralSubsidy = isUpResidentialScheme ? SOLAR_RULES.getSubsidy(recommendedSystemKw) : 0;
    const stateSubsidy = isUpResidentialScheme ? SOLAR_RULES.getUpStateSubsidy(recommendedSystemKw) : 0;
    const fallbackSubsidy = Math.round(installationCost * (subsidyRate / 100));
    const subsidyAmount = isUpResidentialScheme ? centralSubsidy + stateSubsidy : fallbackSubsidy;

    const netInvestment = installationCost - subsidyAmount;

    // EMI calculation (5yr @ 11% p.a.)
    const emiMonthly = calcEmi(netInvestment, SOLAR_RULES.emiRatePercent, SOLAR_RULES.emiTermMonths);
    const day1NetProfit = monthlySavings - emiMonthly;

    // Commercial depreciation benefit (40% of system cost, Year 1)
    const depreciationBenefit = isCommercial ? Math.round(installationCost * SOLAR_RULES.commercialDepreciationRate * 0.30) : 0;
    // (assuming 30% tax rate on 40% of cost = effective tax saving)

    let projectedSavings = 0;
    for (let year = 1; year <= analysisYears; year += 1) {
      projectedSavings += yearlySavings * Math.pow(1 + tariffGrowth / 100, year - 1);
    }

    const paybackYears = yearlySavings > 0 ? Number((netInvestment / yearlySavings).toFixed(1)) : 0;
    const yearlyGenerationKwh = Math.round(recommendedSystemKw * SOLAR_RULES.avgUnitsPerKwPerMonth * 12);
    const co2SavedTons = Number(((yearlyGenerationKwh * 0.82) / 1000).toFixed(1));
    const seasonalBreakdown = billingMode === 'seasonal'
      ? {
          summer: Number(summerBill) || 0,
          monsoon: Number(monsoonBill) || 0,
          winter: Number(winterBill) || 0,
          annualAverage: monthlyBill,
        }
      : null;

    if (window.gtag) window.gtag('event', 'calculator_completed', { event_label: consumerType, value: Math.round(netInvestment) });

    setSavings({
      billingMode,
      inputMonthlyBill: monthlyBill,
      seasonalBreakdown,
      monthly: monthlySavings,
      yearly: yearlySavings,
      postSolarBill,
      recommendedSystemKw,
      installationCost,
      subsidyAmount,
      centralSubsidy,
      stateSubsidy,
      isUpResidentialScheme,
      netInvestment,
      projectedSavings,
      paybackYears,
      yearlyGenerationKwh,
      co2SavedTons,
      emiMonthly,
      day1NetProfit,
      isCommercial,
      depreciationBenefit,
    });
  };

  // Chart data
  const chartData = savings
    ? {
        labels: ['Current Monthly Bill', 'Post-Solar Bill', 'Monthly Savings', 'Year 1 Savings'],
        datasets: [
          {
            label: 'Estimated Value (₹)',
            data: [savings.inputMonthlyBill, savings.postSolarBill, savings.monthly, savings.yearly],
            backgroundColor: ['#94A3B8', '#10B981', '#FBBF24', '#F59E0B'],
            borderColor: ['#64748B', '#059669', '#F59E0B', '#D97706'],
            borderWidth: 1,
          },
        ],
      }
    : null;

  const scenarioComparisons = savings
    ? Array.from(new Set([
        2,
        3,
        5,
        Math.max(1, Math.round(savings.recommendedSystemKw)),
      ]))
        .sort((a, b) => a - b)
        .map((systemKw) => calculateScenario(systemKw, savings.inputMonthlyBill, savings.recommendedSystemKw))
    : [];

  const bestPaybackScenario = scenarioComparisons.length
    ? scenarioComparisons.reduce((best, current) => (current.paybackYears < best.paybackYears ? current : best), scenarioComparisons[0])
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value (₹)',
        },
      },
    },
  };

  const seasonalChartData = savings?.billingMode === 'seasonal' && savings?.seasonalBreakdown
    ? {
        labels: ['Summer', 'Monsoon', 'Winter', 'Weighted Avg'],
        datasets: [
          {
            label: 'Bill (₹)',
            data: [
              savings.seasonalBreakdown.summer,
              savings.seasonalBreakdown.monsoon,
              savings.seasonalBreakdown.winter,
              savings.seasonalBreakdown.annualAverage,
            ],
            backgroundColor: ['#FB923C', '#60A5FA', '#A78BFA', '#34D399'],
            borderColor: ['#EA580C', '#2563EB', '#7C3AED', '#059669'],
            borderWidth: 1,
          },
        ],
      }
    : null;

  const seasonalChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Monthly Bill (₹)',
        },
      },
    },
  };

  const explainUserQuery = () => {
    if (!savings) return [];

    const stateLabel = selectedState === 'uttar-pradesh' ? 'Uttar Pradesh' : 'Other State';
    const consumerLabel = consumerType.charAt(0).toUpperCase() + consumerType.slice(1);

    const explanation = [
      `Effective monthly bill used for calculation is ${formatInr(savings.inputMonthlyBill)}.`,
      `Based on your bill, the calculator estimated a recommended plant size of ${savings.recommendedSystemKw} kW.`,
      `The model assumes around ${Math.round((savings.monthly / Math.max(1, savings.inputMonthlyBill)) * 100)}% monthly bill offset from solar generation, giving an estimated monthly saving of ${formatInr(savings.monthly)}.`,
      `Your selected profile is ${consumerLabel} in ${stateLabel}, with ${analysisYears}-year analysis and ${tariffGrowth}% yearly tariff growth.`,
    ];

    if (savings.billingMode === 'seasonal' && savings.seasonalBreakdown) {
      explanation.unshift(
        `Seasonal mode used: Summer ${formatInr(savings.seasonalBreakdown.summer)}, Monsoon ${formatInr(savings.seasonalBreakdown.monsoon)}, Winter ${formatInr(savings.seasonalBreakdown.winter)}.`
      );
    }

    if (savings.isUpResidentialScheme) {
      explanation.push(
        `Government scheme mode is active, so subsidy is split into central (${formatInr(savings.centralSubsidy)}) and UP state subsidy (${formatInr(savings.stateSubsidy)}).`
      );
    } else if (!applyGovernmentScheme) {
      explanation.push(
        `Manual subsidy mode is active at ${subsidyRate}%, resulting in an estimated subsidy of ${formatInr(savings.subsidyAmount)}.`
      );
    } else {
      explanation.push(
        `Government scheme mode is active, but the selected profile does not use UP residential slab rules.`
      );
    }

    explanation.push(
      `After subsidy, net investment is ${formatInr(savings.netInvestment)} with an estimated payback period of ${savings.paybackYears} years.`
    );

    return explanation;
  };

  const getBenefitSummary = () => {
    if (!savings) return null;

    const yearlyBillWithoutSolar = savings.inputMonthlyBill * 12;
    const yearlyBillWithSolar = savings.postSolarBill * 12;
    const annualReturnRate = savings.netInvestment > 0
      ? ((savings.yearly / savings.netInvestment) * 100).toFixed(1)
      : '0.0';
    const breakevenYear = new Date().getFullYear() + Math.ceil(savings.paybackYears);

    return {
      yearlyBillWithoutSolar,
      yearlyBillWithSolar,
      annualReturnRate,
      breakevenYear,
    };
  };

  const downloadProposalPdf = () => {
    if (!savings) return;

    const doc = new jsPDF();
    let y = 16;

    const addLine = (text, size = 11, spacing = 7) => {
      doc.setFontSize(size);
      doc.text(text, 14, y);
      y += spacing;
    };

    const stateLabel = selectedState === 'uttar-pradesh' ? 'Uttar Pradesh' : 'Other State';
    const schemeLabel = savings.isUpResidentialScheme
      ? 'PM Surya Ghar + UP Subsidy'
      : applyGovernmentScheme
        ? 'Government Scheme (Non-UP/Commercial conditions)'
        : `Manual Subsidy (${subsidyRate}%)`;

    doc.setFillColor(253, 224, 71);
    doc.rect(0, 0, 210, 26, 'F');
    doc.setTextColor(28, 25, 23);
    addLine('SolarHub — Solar Proposal (UPNEDA: AGC2512234235)', 14, 8);
    addLine(`Generated on: ${new Date().toLocaleDateString('en-IN')} | solarhub050815@gmail.com | +91 93599 12888`, 9, 8);

    doc.setTextColor(17, 24, 39);
    addLine('Profile', 13, 7);
    addLine(`Monthly Bill Used: ${formatInr(savings.inputMonthlyBill)}`);
    if (savings.billingMode === 'seasonal' && savings.seasonalBreakdown) {
      addLine(`Seasonal Inputs - Summer: ${formatInr(savings.seasonalBreakdown.summer)}, Monsoon: ${formatInr(savings.seasonalBreakdown.monsoon)}, Winter: ${formatInr(savings.seasonalBreakdown.winter)}`);
    }
    addLine(`State: ${stateLabel}`);
    addLine(`Consumer Type: ${consumerType.charAt(0).toUpperCase() + consumerType.slice(1)}`);
    addLine(`Subsidy Mode: ${schemeLabel}`);

    y += 2;
    addLine('Recommended System Summary', 13, 7);
    addLine(`System Size: ${savings.recommendedSystemKw} kW`);
    addLine(`Installation Cost: ${formatInr(savings.installationCost)}`);
    addLine(`Total Subsidy: ${formatInr(savings.subsidyAmount)}`);
    addLine(`Net Investment: ${formatInr(savings.netInvestment)}`);
    addLine(`Post-Solar Monthly Bill: ${formatInr(savings.postSolarBill)}`);
    addLine(`Monthly Savings: ${formatInr(savings.monthly)}`);
    addLine(`Projected Savings (${analysisYears} years): ${formatInr(savings.projectedSavings)}`);
    addLine(`Payback Period: ${savings.paybackYears} years`);
    addLine(`Estimated Annual Generation: ${savings.yearlyGenerationKwh.toLocaleString('en-IN')} kWh`);
    addLine(`Estimated CO2 Offset: ${savings.co2SavedTons} tons/year`);

    if (y > 250) {
      doc.addPage();
      y = 16;
    }

    y += 2;
    addLine('System Size Comparison', 13, 7);
    scenarioComparisons.forEach((scenario) => {
      const descriptor = bestPaybackScenario && bestPaybackScenario.systemKw === scenario.systemKw
        ? ' (Best payback)'
        : '';
      addLine(
        `${scenario.systemKw} kW${descriptor}: Net ${formatInr(scenario.netInvestment)}, Yearly Savings ${formatInr(scenario.yearlySavings)}, Payback ${scenario.paybackYears} years`,
        10,
        6
      );
    });

    y += 2;
    addLine('Important Note', 12, 6);
    addLine('Values are indicative estimates based on current assumptions.', 10, 6);
    addLine('Final quote, subsidy eligibility, and approvals depend on site survey and policy updates.', 10, 6);

    const safeBill = Number(bill) || 0;
    const fileName = `unnati-solar-proposal-${safeBill}-${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

  const shareOnWhatsApp = (phone) => {
    if (!savings) return;
    if (window.gtag) window.gtag('event', 'whatsapp_clicked', { event_label: 'calculator' });

    const message = [
      `Namaste SolarHub! Maine calculator use kiya hai.`,
      `Monthly Bill: ${formatInr(savings.inputMonthlyBill)}`,
      `Recommended System: ${savings.recommendedSystemKw} kW`,
      `Net Investment (after subsidy): ${formatInr(savings.netInvestment)}`,
      `Monthly Savings: ${formatInr(savings.monthly)}`,
      `EMI: ${formatInr(savings.emiMonthly)}/month`,
      `Day-1 Net Profit: ${formatInr(savings.day1NetProfit)}`,
      `Payback: ${savings.paybackYears} years`,
      phone ? `Phone: ${phone}` : '',
      '',
      'Please share a detailed quote. Shukriya!',
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/${BUSINESS.contacts.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            ☀️ SolarHub — Agra Solar Calculator
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Solar Savings Calculator
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Apna bijli ka bill daalo — system size, PM Surya Ghar subsidy, EMI, aur Day-1 profit instantly calculate hoga.
          </p>
        </div>
        <form onSubmit={calculateSavings} className="max-w-md mx-auto space-y-6">
          <div className="rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Billing Pattern</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBillingMode('single')}
                className={`px-3 py-2 rounded-md text-sm font-medium border ${billingMode === 'single' ? 'bg-yellow-100 border-yellow-400 text-yellow-900' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}
              >
                Single Bill
              </button>
              <button
                type="button"
                onClick={() => setBillingMode('seasonal')}
                className={`px-3 py-2 rounded-md text-sm font-medium border ${billingMode === 'seasonal' ? 'bg-yellow-100 border-yellow-400 text-yellow-900' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}
              >
                Seasonal Bills
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
              Seasonal mode uses weighted annual average: (Summer x 4 + Monsoon x 4 + Winter x 4) / 12.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="selectedState">
                State
              </label>
              <select
                id="selectedState"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="uttar-pradesh">Uttar Pradesh</option>
                <option value="other">Other State</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="consumerType">
                Consumer Type
              </label>
              <select
                id="consumerType"
                value={consumerType}
                onChange={(e) => setConsumerType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="residential">🏠 Ghar / Flat</option>
                <option value="shop">🏪 Dukan / Office</option>
                <option value="factory">🏭 Factory / Industrial</option>
                <option value="school">🏫 School / Institution</option>
                <option value="society">🏢 Society / Apartment</option>
              </select>
            </div>
          </div>

          {billingMode === 'single' ? (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="bill">
                Monthly Electricity Bill (₹)*
              </label>
              <input
                id="bill"
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                required={billingMode === 'single'}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your bill amount"
                aria-label="Monthly electricity bill in INR"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="summerBill">
                  Summer (₹)*
                </label>
                <input
                  id="summerBill"
                  type="number"
                  value={summerBill}
                  onChange={(e) => setSummerBill(e.target.value)}
                  required={billingMode === 'seasonal'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 7000"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="monsoonBill">
                  Monsoon (₹)*
                </label>
                <input
                  id="monsoonBill"
                  type="number"
                  value={monsoonBill}
                  onChange={(e) => setMonsoonBill(e.target.value)}
                  required={billingMode === 'seasonal'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 5000"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="winterBill">
                  Winter (₹)*
                </label>
                <input
                  id="winterBill"
                  type="number"
                  value={winterBill}
                  onChange={(e) => setWinterBill(e.target.value)}
                  required={billingMode === 'seasonal'}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 3500"
                />
              </div>
              <div className="sm:col-span-3 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/40 p-3 text-sm text-gray-700 dark:text-gray-300">
                Effective monthly bill used for sizing: <span className="font-semibold">{formatInr(getSeasonalAverageBill())}</span>
              </div>
            </div>
          )}

          {!applyGovernmentScheme && (
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="subsidyRate">
                Expected Subsidy (%)
              </label>
              <input
                id="subsidyRate"
                type="range"
                min="0"
                max="40"
                value={subsidyRate}
                onChange={(e) => setSubsidyRate(Number(e.target.value))}
                className="w-full"
                aria-label="Expected subsidy percentage"
              />
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{subsidyRate}%</p>
            </div>
          )}

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 p-3">
            <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200">
              <input
                type="checkbox"
                checked={applyGovernmentScheme}
                onChange={(e) => setApplyGovernmentScheme(e.target.checked)}
                className="mt-1"
              />
              <span>
                Apply PM Surya Ghar + UP state subsidy logic automatically for residential users.
              </span>
            </label>
            {applyGovernmentScheme && selectedState === 'uttar-pradesh' && consumerType === 'residential' && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                Rule used: Central subsidy capped at ₹78,000 plus UP subsidy capped at ₹30,000.
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="tariffGrowth">
              Tariff Growth
            </label>
            <select
              id="tariffGrowth"
              value={tariffGrowth}
              onChange={(e) => setTariffGrowth(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={3}>3% yearly</option>
              <option value={5}>5% yearly</option>
              <option value={7}>7% yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="analysisYears">
              Analysis Years
            </label>
            <select
              id="analysisYears"
              value={analysisYears}
              onChange={(e) => setAnalysisYears(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
            >
              <option value={5}>5 years</option>
              <option value={10}>10 years</option>
              <option value={15}>15 years</option>
            </select>
          </div>

          <Button
            className="w-full bg-yellow-500 text-white hover:bg-yellow-600 font-medium py-3 rounded-lg"
          >
            Calculate Savings
          </Button>
        </form>
        {savings && (
          <div className="mt-8 bg-white dark:bg-gray-700 p-4 sm:p-6 rounded-xl shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">Aapka Solar Estimate — SolarHub Agra</h3>

            {/* Day-1 Net Profit highlight */}
            {savings.day1NetProfit !== undefined && (
              <div className={`mb-6 rounded-2xl p-5 text-center border-2 ${savings.day1NetProfit >= 0 ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'}`}>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1">🔥 Day-1 Net Position (Savings − EMI)</p>
                <p className={`text-4xl font-extrabold ${savings.day1NetProfit >= 0 ? 'text-green-600' : 'text-orange-600'}`}>
                  {savings.day1NetProfit >= 0 ? '+' : ''}{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(savings.day1NetProfit)}/month
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  EMI: {formatInr(savings.emiMonthly)}/mo (5yr @{SOLAR_RULES.emiRatePercent}%) &nbsp;|&nbsp; Monthly Savings: {formatInr(savings.monthly)}/mo
                </p>
                {savings.day1NetProfit >= 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-semibold">
                    ✅ Solar se EMI bhar ke bhi {formatInr(savings.day1NetProfit)}/month bachate ho — Day 1 se!
                  </p>
                )}
              </div>
            )}

            {/* Commercial depreciation benefit */}
            {savings.isCommercial && savings.depreciationBenefit > 0 && (
              <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-4">
                <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-1">🏦 Commercial Tax Benefit</h4>
                <p className="text-sm text-purple-700 dark:text-purple-400">
                  40% Accelerated Depreciation se Year 1 mein estimated tax saving: <strong>{formatInr(savings.depreciationBenefit)}</strong>
                  <span className="text-xs ml-2">(30% tax slab assume karke)</span>
                </p>
              </div>
            )}

            <div className="mb-4">
              {chartData && (
                <div className="h-56 sm:h-64 md:h-72">
                  <Bar
                    data={chartData}
                    options={chartOptions}
                  />
                </div>
              )}
            </div>

            {seasonalChartData && (
              <div className="mb-6 rounded-lg border border-indigo-200 dark:border-indigo-700/40 bg-indigo-50 dark:bg-indigo-900/20 p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Seasonal Bill Pattern</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  This view compares your seasonal inputs with the weighted monthly average used for system sizing.
                </p>
                <div className="h-44 sm:h-52">
                  <Bar data={seasonalChartData} options={seasonalChartOptions} />
                </div>
              </div>
            )}

            <div className="rounded-lg border border-blue-200 dark:border-blue-700/50 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How Your Query Is Interpreted</h4>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                {explainUserQuery().map((point) => (
                  <p key={point}>• {point}</p>
                ))}
              </div>
            </div>

            {getBenefitSummary() && (
              <div className="rounded-lg border border-green-200 dark:border-green-700/50 bg-green-50 dark:bg-green-900/20 p-4 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">How This Benefits You</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Yearly Bill Without Solar</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatInr(getBenefitSummary().yearlyBillWithoutSolar)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Yearly Bill With Solar</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatInr(getBenefitSummary().yearlyBillWithSolar)}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Estimated Annual Return</p>
                    <p className="text-sm font-semibold text-green-600">{getBenefitSummary().annualReturnRate}%</p>
                  </div>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-xs text-gray-500 dark:text-gray-300">Expected Break-even Year</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{getBenefitSummary().breakevenYear}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">Recommended System</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{savings.recommendedSystemKw} kW</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">Monthly Savings</p>
                <p className="text-xl font-bold text-yellow-500">{formatInr(savings.monthly)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">Projected Savings ({analysisYears} yrs)</p>
                <p className="text-xl font-bold text-green-600">{formatInr(savings.projectedSavings)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-300">Payback Period</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{savings.paybackYears} years</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-6">
              <p>Installation Cost: <span className="font-semibold">{formatInr(savings.installationCost)}</span></p>
              {savings.isUpResidentialScheme && (
                <>
                  <p>Central Subsidy (PM Surya Ghar): <span className="font-semibold">{formatInr(savings.centralSubsidy)}</span></p>
                  <p>UP State Subsidy: <span className="font-semibold">{formatInr(savings.stateSubsidy)}</span></p>
                </>
              )}
              <p>
                {savings.isUpResidentialScheme ? 'Total Eligible Subsidy:' : `Estimated Subsidy (${subsidyRate}%):`}
                {' '}
                <span className="font-semibold">{formatInr(savings.subsidyAmount)}</span>
              </p>
              <p>Net Investment: <span className="font-semibold">{formatInr(savings.netInvestment)}</span></p>
              <p>Post-Solar Monthly Bill: <span className="font-semibold">{formatInr(savings.postSolarBill)}</span></p>
              <p>Estimated Yearly Generation: <span className="font-semibold">{savings.yearlyGenerationKwh.toLocaleString('en-IN')} kWh</span></p>
              <p>Estimated CO2 Offset: <span className="font-semibold">{savings.co2SavedTons} tons/year</span></p>
            </div>

            <div className="rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-4 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Compare System Sizes</h4>
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-4">
                Interactive estimate across popular system sizes based on your bill profile and selected subsidy mode.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {scenarioComparisons.map((scenario) => {
                  const isRecommended = Math.abs(scenario.systemKw - savings.recommendedSystemKw) < 0.5;
                  const isBestPayback = bestPaybackScenario && scenario.systemKw === bestPaybackScenario.systemKw;
                  return (
                    <div
                      key={scenario.systemKw}
                      className={`rounded-lg border p-3 ${isBestPayback ? 'border-green-400 bg-green-50/70 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-900 dark:text-white">{scenario.systemKw} kW</p>
                        {isRecommended && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">Recommended</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Net Cost</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">{formatInr(scenario.netInvestment)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Yearly Savings</p>
                      <p className="text-sm font-semibold text-green-600 mb-1">{formatInr(scenario.yearlySavings)}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Payback</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{scenario.paybackYears} years</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-300 mt-2">Subsidy: {formatInr(scenario.subsidyAmount)}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {savings.isUpResidentialScheme && (
              <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20 p-4 mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Steps to Apply for Subsidy</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Register on the National Portal for Rooftop Solar.</li>
                  <li>Submit your consumer details, address, and DISCOM information.</li>
                  <li>Choose an empaneled vendor and upload system installation details.</li>
                  <li>Complete installation, net-metering, and inspection as required.</li>
                  <li>After approval, subsidy is credited to your linked bank account.</li>
                </ol>
                <div className="mt-3 rounded-md bg-white/70 dark:bg-gray-800/40 p-3 border border-green-200/70 dark:border-green-700/40">
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Scheme reference (2026 estimate model): PM Surya Ghar central subsidy slab plus Uttar Pradesh state subsidy cap.
                    Final eligibility and disbursal depend on current DISCOM and National Portal policies.
                  </p>
                </div>
              </div>
            )}

            {/* WhatsApp Report CTA — phone gate */}
            <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-2xl p-5 mb-4">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">📱 WhatsApp pe Full Report Lein</h4>
              {!phoneSubmitted ? (
                <div className="flex gap-2">
                  <input
                    type="tel"
                    maxLength={10}
                    value={phoneForReport}
                    onChange={(e) => setPhoneForReport(e.target.value)}
                    placeholder="10-digit mobile"
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-green-300 focus:border-green-500 focus:outline-none dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (/^\d{10}$/.test(phoneForReport)) {
                        setPhoneSubmitted(true);
                        shareOnWhatsApp(phoneForReport);
                      } else {
                        alert('Please enter a valid 10-digit number');
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl transition-colors"
                  >
                    💬 Send
                  </button>
                </div>
              ) : (
                <p className="text-green-700 dark:text-green-300 font-semibold">✅ WhatsApp pe message open ho raha hai SolarHub ke saath!</p>
              )}
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">Number share karein — SolarHub team 2 hrs mein detailed quote bhejega.</p>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                type="button"
                className="w-full bg-white border-2 border-amber-400 text-amber-700 hover:bg-amber-50 font-bold py-3 px-4 rounded-xl"
                onClick={downloadProposalPdf}
              >
                📄 Download PDF Proposal
              </Button>

              <Button
                type="button"
                className="w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded-xl"
                onClick={() => {
                  const btn = document.getElementById('get-quote-btn-default');
                  if (btn) btn.click();
                }}
              >
                📋 Free Site Visit Book Karein
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SavingsCalculator;