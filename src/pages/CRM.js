import React, { useMemo } from 'react';
import { FiUsers, FiCalendar, FiTrendingUp, FiHome, FiBriefcase } from 'react-icons/fi';
import { getDemoLeads } from '../services/leadApi';

const CRM = () => {
  const formatInr = (amount) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);

  const leads = useMemo(() => {
    const raw = getDemoLeads();
    return raw
      .map((item, index) => ({
        id: item.id || `lead_${index}`,
        name: item.lead?.name || 'Unknown Lead',
        type: item.project?.propertyType || item.project?.systemType || 'Unspecified',
        status: item.status || 'new',
        date: item.submittedAt ? new Date(item.submittedAt).toISOString().slice(0, 10) : '-',
        valueInr: item.quoteEstimate?.netInvestmentInr || 0,
      }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, []);

  const stats = useMemo(() => {
    const totalLeads = leads.length;
    const residentialLeads = leads.filter((lead) => String(lead.type).toLowerCase().includes('residential')).length;
    const commercialLeads = leads.filter((lead) => String(lead.type).toLowerCase().includes('commercial')).length;
    const totalPipeline = leads.reduce((sum, lead) => sum + lead.valueInr, 0);

    return {
      totalLeads,
      residentialLeads,
      commercialLeads,
      totalPipeline,
    };
  }, [leads]);

  const statusBreakdown = useMemo(() => {
    const counts = leads.reduce((acc, lead) => {
      const key = (lead.status || 'new').toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(counts).map(([status, count]) => ({
      status,
      count,
    }));
  }, [leads]);

  const hasLeads = leads.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Solar CRM Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Shows leads captured from your website quote flow.</p>
          </div>
          <button
            className="mt-4 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors"
            onClick={() => document.querySelector('.get-quote-button')?.click()}
          >
            Add New Lead
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Total Leads</p>
                <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{stats.totalLeads}</p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700">
                <FiUsers className="text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Residential Leads</p>
                <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{stats.residentialLeads}</p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700">
                <FiHome className="text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Commercial Leads</p>
                <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{stats.commercialLeads}</p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700">
                <FiBriefcase className="text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">Pipeline Value</p>
                <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{formatInr(stats.totalPipeline)}</p>
              </div>
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-700">
                <FiTrendingUp className="text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {!hasLeads && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
            <FiCalendar className="mx-auto text-yellow-500 mb-3" size={30} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">No leads yet</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Submit a quote request from the website to populate this dashboard with real entries.
            </p>
          </div>
        )}

        {hasLeads && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Leads</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {leads.slice(0, 10).map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/60">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{lead.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{lead.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{lead.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{lead.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">{formatInr(lead.valueInr)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Lead Status Summary</h2>
              <div className="space-y-3">
                {statusBreakdown.map((item) => (
                  <div key={item.status} className="flex justify-between text-sm">
                    <span className="capitalize text-gray-700 dark:text-gray-300">{item.status}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.count}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                Source: lead records submitted through the website quote form.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRM;
