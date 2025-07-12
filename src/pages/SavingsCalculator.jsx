// src/pages/SavingsCalculator.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Button from '../components/Button';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SavingsCalculator = () => {
  const [bill, setBill] = useState('');
  const [savings, setSavings] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const plan = params.get('plan');
    if (plan) {
      console.log(`Selected plan: ${plan}`);
    }
  }, [location]);

  const calculateSavings = (e) => {
    e.preventDefault();
    const monthlySavings = bill * 0.7; // Placeholder: 70% savings
    const yearlySavings = monthlySavings * 12;
    setSavings({ monthly: monthlySavings.toFixed(2), yearly: yearlySavings.toFixed(2) });
  };

  // Chart data
  const chartData = savings
    ? {
        labels: ['Monthly Savings', 'Yearly Savings'],
        datasets: [
          {
            label: 'Estimated Savings ($)',
            data: [savings.monthly, savings.yearly],
            backgroundColor: ['#FBBF24', '#F59E0B'],
            borderColor: ['#F59E0B', '#D97706'],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Solar Savings Calculator
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Estimate your potential savings by switching to solar energy with Unnati Renewables.
          </p>
        </div>
        <form onSubmit={calculateSavings} className="max-w-md mx-auto space-y-6">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium" htmlFor="bill">
              Monthly Electricity Bill ($)*
            </label>
            <input
              id="bill"
              type="number"
              value={bill}
              onChange={(e) => setBill(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter your bill amount"
              aria-label="Monthly electricity bill in dollars"
            />
          </div>
          <Button
            className="w-full bg-yellow-500 text-white hover:bg-yellow-600 font-medium py-3 rounded-lg"
          >
            Calculate Savings
          </Button>
        </form>
        {savings && (
          <div className="mt-8 text-center bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Your Estimated Savings</h3>
            <div className="mb-6">
              {chartData && (
                <Bar
                  data={chartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Savings ($)',
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Monthly Savings: <span className="font-bold text-yellow-500">${savings.monthly}</span>
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
              Yearly Savings: <span className="font-bold text-yellow-500">${savings.yearly}</span>
            </p>
            <Button
              className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 font-medium py-3 px-6 rounded-lg"
              onClick={() => {
                const quoteButton = document.querySelector('.get-quote-button');
                if (quoteButton) quoteButton.click();
                else console.error('Get Quote button not found');
              }}
            >
              Get a Free Quote
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SavingsCalculator;