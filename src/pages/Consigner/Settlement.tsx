import { useState } from 'react';
import { DollarSign, TrendingUp, PieChart, FileText, Download, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SalesSettlement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Sample sales data
  const salesData = {
    summary: {
      totalSales: 85000,
      pendingPayments: 12500,
      commission: 21250,
      netRevenue: 63750
    },
    consignments: [
      {
        id: 'CON001',
        name: 'Hand-Knotted Pashmina Shawl Collection',
        totalSales: 50000,
        itemsSold: 20,
        commission: 12500,
        status: 'Completed',
        settlements: [
          {
            id: 'PAY001',
            date: '2024-02-01',
            amount: 35000,
            type: 'Final Payment',
            status: 'Processed'
          },
          {
            id: 'PAY002',
            date: '2024-01-15',
            amount: 15000,
            type: 'Initial Payment',
            status: 'Processed'
          }
        ]
      },
      {
        id: 'CON002',
        name: 'Walnut Wood Carved Collection',
        totalSales: 35000,
        itemsSold: 35,
        commission: 8750,
        status: 'Pending Settlement',
        settlements: [
          {
            id: 'PAY003',
            date: '2024-02-14',
            amount: 12500,
            type: 'Pending Payment',
            status: 'Processing'
          }
        ]
      }
    ]
  };

  // Sample chart data
  const chartData = [
    { month: 'Sep', sales: 42000 },
    { month: 'Oct', sales: 38000 },
    { month: 'Nov', sales: 45000 },
    { month: 'Dec', sales: 55000 },
    { month: 'Jan', sales: 62000 },
    { month: 'Feb', sales: 58750 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Sales & Revenue Settlement</h1>
          <p className="text-gray-400 mt-2">Track sales performance and manage settlements</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Total Sales</h3>
              <DollarSign className="text-green-400" size={24} />
            </div>
            <div className="text-2xl font-bold">${salesData.summary.totalSales.toLocaleString()}</div>
            <div className="mt-2 text-green-400 text-sm flex items-center">
              <TrendingUp size={16} className="mr-1" />
              <span>+12.5% this month</span>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Pending Payments</h3>
              <Calendar className="text-yellow-400" size={24} />
            </div>
            <div className="text-2xl font-bold">${salesData.summary.pendingPayments.toLocaleString()}</div>
            <div className="mt-2 text-yellow-400 text-sm">Awaiting Settlement</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Commission</h3>
              <PieChart className="text-blue-400" size={24} />
            </div>
            <div className="text-2xl font-bold">${salesData.summary.commission.toLocaleString()}</div>
            <div className="mt-2 text-blue-400 text-sm">25% Rate</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400">Net Revenue</h3>
              <DollarSign className="text-purple-400" size={24} />
            </div>
            <div className="text-2xl font-bold">${salesData.summary.netRevenue.toLocaleString()}</div>
            <div className="mt-2 text-purple-400 text-sm">After Commission</div>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Sales Performance</h2>
            <select 
              className="bg-gray-700 rounded-lg px-4 py-2"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Settlement Details */}
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-lg font-semibold">Settlement Details</h2>
          </div>
          
          {/* Consignment List */}
          {salesData.consignments.map(consignment => (
            <div key={consignment.id} className="border-b border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{consignment.name}</h3>
                    <div className="text-sm text-gray-400 mt-1">ID: {consignment.id}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    consignment.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {consignment.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Total Sales</div>
                    <div className="font-semibold">${consignment.totalSales.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Items Sold</div>
                    <div className="font-semibold">{consignment.itemsSold} pieces</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Commission</div>
                    <div className="font-semibold">${consignment.commission.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Net Amount</div>
                    <div className="font-semibold">
                      ${(consignment.totalSales - consignment.commission).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Transaction List */}
                <div className="mt-4 space-y-2">
                  {consignment.settlements.map(settlement => (
                    <div 
                      key={settlement.id}
                      className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <DollarSign size={18} className="text-gray-400" />
                        <div>
                          <div className="font-medium">{settlement.type}</div>
                          <div className="text-sm text-gray-400">{settlement.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${settlement.amount.toLocaleString()}</div>
                        <div className={`text-sm ${
                          settlement.status === 'Processed' 
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}>
                          {settlement.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <FileText size={20} />
              <span>Export Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <Download size={20} />
              <span>Download Invoices</span>
            </button>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
            Process Settlements
          </button>
        </div>
      </div>
    </div>
  );
};

export default SalesSettlement;