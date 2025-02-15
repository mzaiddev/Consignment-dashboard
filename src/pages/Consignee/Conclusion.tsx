import { useState } from 'react';
import { RefreshCw, ArrowLeft, XCircle, 
         Truck, FileText, Camera } from 'lucide-react';

const ReturnRenewalExit = () => {
  const [selectedAction, setSelectedAction] = useState<'return' | 'renew' | 'exit' | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  // Sample data
  const consignmentData = {
    id: 'CON001',
    name: 'Hand-Knotted Pashmina Shawl Collection',
    daysRemaining: 14,
    inventory: {
      total: 20,
      sold: 15,
      remaining: 5
    },
    financials: {
      totalValue: 50000,
      soldValue: 37500,
      remainingValue: 12500,
      sellThrough: 75
    },
    shipping: {
      returnAddress: 'Kashmir Heritage Artisans, Srinagar',
      carrier: 'DHL Express',
      insurance: 'Full Coverage'
    }
  };

  // Action Modal
  const ActionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          {selectedAction === 'return' ? 'Return Items' :
           selectedAction === 'renew' ? 'Renew Agreement' : 'Exit Agreement'}
        </h3>

        {selectedAction === 'return' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Shipping Method</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>DHL Express (3-5 days)</option>
                <option>FedEx Priority (5-7 days)</option>
                <option>Standard Shipping (7-10 days)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Return Reason</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>End of Consignment Period</option>
                <option>Low Sales Performance</option>
                <option>Seasonal End</option>
              </select>
            </div>
          </div>
        )}

        {selectedAction === 'renew' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Extension Period</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>30 Days</option>
                <option>60 Days</option>
                <option>90 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Terms Update</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>Keep Current Terms</option>
                <option>Update Commission Rate</option>
                <option>Modify Pricing</option>
              </select>
            </div>
          </div>
        )}

        {selectedAction === 'exit' && (
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <div className="text-red-400 mb-2">Warning: This action is final</div>
              <p className="text-sm text-gray-400">
                Complete all settlements before closing the agreement.
              </p>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Exit Reason</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>Completed Successfully</option>
                <option>Early Termination</option>
                <option>Mutual Agreement</option>
              </select>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setShowActionModal(false)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedAction === 'exit' 
                ? 'bg-red-600 hover:bg-red-500' 
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {showActionModal && <ActionModal />}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Consignment Conclusion</h1>
          <p className="text-gray-400 mt-2">Manage returns, renewals, or exit procedures</p>
        </div>

        {/* Overview */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-semibold">{consignmentData.name}</h2>
              <div className="text-sm text-gray-400 mt-1">ID: {consignmentData.id}</div>
            </div>
            <div className="text-yellow-400">
              {consignmentData.daysRemaining} days remaining
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Inventory</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span>{consignmentData.inventory.total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold:</span>
                  <span>{consignmentData.inventory.sold}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span>{consignmentData.inventory.remaining}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">Financial Summary</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Value:</span>
                  <span>${consignmentData.financials.totalValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sold Value:</span>
                  <span>${consignmentData.financials.soldValue}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sell-Through:</span>
                  <span>{consignmentData.financials.sellThrough}%</span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-2">Shipping Details</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Return To:</span>
                  <span>{consignmentData.shipping.returnAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carrier:</span>
                  <span>{consignmentData.shipping.carrier}</span>
                </div>
                <div className="flex justify-between">
                  <span>Insurance:</span>
                  <span>{consignmentData.shipping.insurance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <ArrowLeft className="text-blue-400" size={24} />
                <span className="font-semibold">Return</span>
              </div>
              <button
                onClick={() => {
                  setSelectedAction('return');
                  setShowActionModal(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
              >
                Initiate
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Return unsold items to the consignor with tracking.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <RefreshCw className="text-green-400" size={24} />
                <span className="font-semibold">Renew</span>
              </div>
              <button
                onClick={() => {
                  setSelectedAction('renew');
                  setShowActionModal(true);
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg"
              >
                Extend
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Extend the consignment period with updated terms.
            </p>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <XCircle className="text-red-400" size={24} />
                <span className="font-semibold">Exit</span>
              </div>
              <button
                onClick={() => {
                  setSelectedAction('exit');
                  setShowActionModal(true);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg"
              >
                Close
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Complete settlements and close the agreement.
            </p>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="font-semibold mb-4">Required Documentation</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-gray-400" />
                <span>Return Authorization</span>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                Generate
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Camera size={20} className="text-gray-400" />
                <span>Condition Photos</span>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                Upload
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Truck size={20} className="text-gray-400" />
                <span>Shipping Labels</span>
              </div>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRenewalExit;