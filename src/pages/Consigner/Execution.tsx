
import { Package, Truck, FileCheck, Box, AlertCircle,
          ShieldCheck } from 'lucide-react';

const ConsignmentExecution = () => {
 

  // Sample consignment data
  const consignments = [
    {
      id: 'CON001',
      product: 'Hand-Knotted Pashmina Shawl Collection',
      status: 'Quality Check',
      shipper: 'DHL Express',
      trackingId: 'DHL1234567',
      quantity: 20,
      value: 50000,
      timeline: [
        { date: '2024-02-14', stage: 'Quality Check', status: 'In Progress' },
        { date: '2024-02-16', stage: 'Packaging', status: 'Pending' },
        { date: '2024-02-18', stage: 'Shipping', status: 'Scheduled' }
      ],
      qualityChecks: [
        { item: 'Material Quality', status: 'Passed' },
        { item: 'Craftsmanship', status: 'Pending' },
        { item: 'Packaging', status: 'Pending' }
      ],
      insurance: {
        provider: 'Global Secure',
        coverage: 'Full Value',
        policy: 'INS-456789'
      }
    }
  ];

  // Tracking stages
  const stages = [
    { id: 'quality', label: 'Quality Check', icon: FileCheck },
    { id: 'packaging', label: 'Packaging', icon: Box },
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'delivery', label: 'Delivery', icon: Package }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Consignment Execution</h1>
          <p className="text-gray-400 mt-2">Track and manage your active consignments</p>
        </div>

        {/* Active Consignments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Consignment Details */}
          <div className="lg:col-span-2 space-y-6">
            {consignments.map(consignment => (
              <div key={consignment.id} className="bg-gray-800 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{consignment.product}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                        <Package size={16} />
                        <span>ID: {consignment.id}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                      {consignment.status}
                    </span>
                  </div>

                  {/* Tracking Progress */}
                  <div className="flex justify-between items-center mt-6">
                    {stages.map((stage, index) => (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-green-500' : 'bg-gray-700'
                        }`}>
                          <stage.icon size={20} />
                        </div>
                        <div className="text-xs mt-2">{stage.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Checks */}
                <div className="p-6 border-b border-gray-700">
                  <h4 className="font-semibold mb-4">Quality Verification</h4>
                  <div className="space-y-4">
                    {consignment.qualityChecks.map((check, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileCheck className="text-gray-400" size={20} />
                          <span>{check.item}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          check.status === 'Passed' 
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {check.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="p-6">
                  <h4 className="font-semibold mb-4">Shipping Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Carrier</div>
                      <div className="font-semibold">{consignment.shipper}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Tracking ID</div>
                      <div className="font-semibold">{consignment.trackingId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Insurance</div>
                      <div className="font-semibold">{consignment.insurance.coverage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Policy Number</div>
                      <div className="font-semibold">{consignment.insurance.policy}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline and Updates */}
          <div className="space-y-6">
            {/* Status Updates */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Status Updates</h3>
              <div className="space-y-4">
                {consignments[0].timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`mt-1 w-2 h-2 rounded-full ${
                      event.status === 'In Progress' ? 'bg-blue-400' :
                      event.status === 'Completed' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{event.stage}</span>
                        <span className="text-gray-400">•</span>
                        <span className={`text-sm ${
                          event.status === 'In Progress' ? 'text-blue-400' :
                          event.status === 'Completed' ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{event.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Required */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Action Required</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-yellow-500/10 text-yellow-400 rounded-lg">
                  <AlertCircle size={20} />
                  <span>Quality check approval pending</span>
                </div>
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
                  Review & Approve
                </button>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Documents</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileCheck size={20} />
                    <span>Quality Inspection Report</span>
                  </div>
                  <span className="text-sm text-gray-400">View</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ShieldCheck size={20} />
                    <span>Insurance Certificate</span>
                  </div>
                  <span className="text-sm text-gray-400">View</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentExecution;