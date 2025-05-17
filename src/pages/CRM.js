import React from 'react';
import { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, FiHome, FiBriefcase } from 'react-icons/fi';

const CRM = () => {
  // Sample data
  const leads = [
    { id: 1, name: 'John Smith', type: 'Residential', status: 'New', date: '2023-06-15', value: '$4,500' },
    { id: 2, name: 'Acme Corp', type: 'Commercial', status: 'Proposal Sent', date: '2023-06-10', value: '$28,000' },
    { id: 3, name: 'Sarah Johnson', type: 'Residential', status: 'Site Visit Scheduled', date: '2023-06-05', value: '$5,200' },
    { id: 4, name: 'Green Energy LLC', type: 'Enterprise', status: 'Contract Signed', date: '2023-05-28', value: '$72,000' },
    { id: 5, name: 'Michael Brown', type: 'Residential', status: 'Follow Up', date: '2023-05-20', value: '$3,800' },
  ];

  const stats = [
    { title: 'Total Leads', value: '142', icon: <FiUsers className="text-yellow-500" />, change: '+12%' },
    { title: 'Upcoming Installations', value: '18', icon: <FiCalendar className="text-blue-500" />, change: '+5%' },
    { title: 'Monthly Revenue', value: '$248K', icon: <FiDollarSign className="text-green-500" />, change: '+23%' },
    { title: 'Conversion Rate', value: '32%', icon: <FiTrendingUp className="text-purple-500" />, change: '+4%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Solar CRM Dashboard</h1>
            <p className="text-gray-600">Manage your solar leads and installations</p>
          </div>
          <button className="mt-4 md:mt-0 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-md transition-colors">
            Add New Lead
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50">
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm text-green-500 mt-4">{stat.change} from last month</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Leads</h2>
              <button className="text-sm text-yellow-600 hover:text-yellow-700">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {lead.type === 'Residential' ? (
                            <FiHome className="mr-2 text-yellow-500" />
                          ) : lead.type === 'Commercial' ? (
                            <FiBriefcase className="mr-2 text-blue-500" />
                          ) : (
                            <FiBriefcase className="mr-2 text-purple-500" />
                          )}
                          {lead.type}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          lead.status === 'Proposal Sent' ? 'bg-yellow-100 text-yellow-800' :
                          lead.status === 'Contract Signed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">{lead.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{lead.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Installation Calendar */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Installation Schedule</h2>
              <div className="space-y-4">
                {[
                  { date: 'Jun 20, 2023', customer: 'Robert Chen', type: 'Residential' },
                  { date: 'Jun 22, 2023', customer: 'Sunny Day School', type: 'Commercial' },
                  { date: 'Jun 25, 2023', customer: 'Lisa Wong', type: 'Residential' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="bg-yellow-50 text-yellow-600 p-2 rounded-lg mr-4">
                      <FiCalendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.date}</p>
                      <p className="text-gray-600">{item.customer}</p>
                      <p className="text-sm text-gray-500">{item.type} Installation</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-sm text-yellow-600 hover:text-yellow-700">
                View Full Calendar
              </button>
            </div>

            {/* Status Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Leads by Status</h2>
              <div className="space-y-3">
                {[
                  { status: 'New', count: 42, color: 'bg-blue-500' },
                  { status: 'Contacted', count: 35, color: 'bg-yellow-500' },
                  { status: 'Proposal Sent', count: 28, color: 'bg-orange-500' },
                  { status: 'Contract Signed', count: 22, color: 'bg-green-500' },
                  { status: 'Lost', count: 15, color: 'bg-red-500' },
                ].map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.status}</span>
                      <span className="font-medium">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`} 
                        style={{ width: `${(item.count / 142) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRM;