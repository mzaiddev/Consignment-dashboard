import { useState } from 'react';
import { FileText,  
         Download, Send, Eye, Lock } from 'lucide-react';

const OfferSubmission = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isReadyForSubmission, setIsReadyForSubmission] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Sample finalized offer data
  const finalOffer = {
    id: 'OFF001',
    product: 'Hand-Knotted Pashmina Shawl Collection',
    consignor: 'Kashmir Heritage Artisans',
    consignee: 'Luxury Boutique NYC',
    details: {
      quantity: 20,
      pricePerUnit: 2500,
      totalValue: 50000,
      commission: '25%',
      period: '90 days',
      paymentTerms: '30% Escrow, 70% on Delivery',
      shipping: 'DHL Express',
      insurance: 'Full Coverage'
    },
    documents: [
      { name: 'Consignment Agreement', status: 'Ready' },
      { name: 'Payment Terms', status: 'Ready' },
      { name: 'Shipping Agreement', status: 'Ready' },
      { name: 'Quality Certification', status: 'Ready' }
    ]
  };

  // Document Preview Modal
  const PreviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Document Preview</h3>
          <button 
            onClick={() => setShowPreview(false)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-4">Consignment Agreement</h4>
          <div className="prose prose-invert">
            <p>This consignment agreement is made between:</p>
            <p><strong>Consignor:</strong> {finalOffer.consignor}</p>
            <p><strong>Consignee:</strong> {finalOffer.consignee}</p>
            <p className="mt-4">For the consignment of:</p>
            <ul>
              <li>Product: {finalOffer.product}</li>
              <li>Quantity: {finalOffer.details.quantity} pieces</li>
              <li>Price per Unit: ${finalOffer.details.pricePerUnit}</li>
              <li>Total Value: ${finalOffer.details.totalValue}</li>
            </ul>
            {/* Add more agreement details */}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowPreview(false)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {showPreview && <PreviewModal />}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Submit Final Offer</h1>
          <p className="text-gray-400 mt-2">Review and submit your finalized consignment offer</p>
        </div>

        {/* Offer Summary */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Offer Summary</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-gray-400 mb-1">Product</div>
              <div className="font-semibold">{finalOffer.product}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Consignor</div>
              <div className="font-semibold">{finalOffer.consignor}</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Quantity</div>
              <div className="font-semibold">{finalOffer.details.quantity} pieces</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Total Value</div>
              <div className="font-semibold">${finalOffer.details.totalValue}</div>
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Commission Rate:</span>
              <span>{finalOffer.details.commission}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Consignment Period:</span>
              <span>{finalOffer.details.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment Terms:</span>
              <span>{finalOffer.details.paymentTerms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping Method:</span>
              <span>{finalOffer.details.shipping}</span>
            </div>
          </div>
        </div>

        {/* Required Documents */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Required Documents</h2>
          
          <div className="space-y-4">
            {finalOffer.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="text-blue-400" size={20} />
                  <span>{doc.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-400 text-sm">{doc.status}</span>
                  <button 
                    onClick={() => setShowPreview(true)}
                    className="p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <Eye size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg">
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms Acceptance */}
        <div className="bg-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Terms & Conditions</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <input
                  type="checkbox"
                  checked={isTermsAccepted}
                  onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  className="rounded bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  I confirm that all information provided is accurate and I agree to the terms of the consignment agreement.
                  I understand that this offer will be legally binding once accepted by the consignor.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <input
                  type="checkbox"
                  checked={isReadyForSubmission}
                  onChange={(e) => setIsReadyForSubmission(e.target.checked)}
                  className="rounded bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  I confirm that I have reviewed all documents and am ready to submit this offer for final approval.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex items-center justify-between bg-gray-800 rounded-xl p-6">
          <div className="flex items-center space-x-2 text-gray-400">
            <Lock size={20} />
            <span className="text-sm">Your offer will be securely submitted</span>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              Save Draft
            </button>
            <button
              disabled={!isTermsAccepted || !isReadyForSubmission}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg ${
                isTermsAccepted && isReadyForSubmission
                  ? 'bg-blue-600 hover:bg-blue-500'
                  : 'bg-gray-700 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
              <span>Submit Offer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSubmission;
