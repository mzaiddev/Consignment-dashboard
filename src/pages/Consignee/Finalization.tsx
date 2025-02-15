import { useState } from 'react';
import { FileText, CheckCircle, AlertCircle, 
         Shield, Lock, Calendar, CreditCard } from 'lucide-react';

const AgreementFinalization = () => {
  const [activeStep, setActiveStep] = useState('review');
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [paymentConfigured, setPaymentConfigured] = useState(false);

  // Sample agreement data
  const agreement = {
    id: 'AGR001',
    status: 'Pending Signatures',
    product: 'Hand-Knotted Pashmina Shawl Collection',
    consignor: 'Kashmir Heritage Artisans',
    consignee: 'Luxury Boutique NYC',
    details: {
      quantity: 20,
      totalValue: 50000,
      escrowAmount: 15000,
      commission: '25%',
      startDate: '2024-03-01',
      endDate: '2024-05-30',
      paymentTerms: '30% Escrow, 70% on Delivery',
      insurance: 'Full Coverage'
    },
    verifications: {
      businessVerified: true,
      giCertified: true,
      escrowEnabled: true
    }
  };

  // Agreement Review Section
  const ReviewSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Agreement Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-400 mb-1">Product</div>
            <div className="font-semibold">{agreement.product}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">Total Value</div>
            <div className="font-semibold">${agreement.details.totalValue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">Duration</div>
            <div className="font-semibold">{agreement.details.startDate} to {agreement.details.endDate}</div>
          </div>
          <div>
            <div className="text-gray-400 mb-1">Commission</div>
            <div className="font-semibold">{agreement.details.commission}</div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Verifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="text-green-400" size={20} />
              <span>Business Verification</span>
            </div>
            <CheckCircle className="text-green-400" size={20} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="text-green-400" size={20} />
              <span>GI Certification</span>
            </div>
            <CheckCircle className="text-green-400" size={20} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Lock className="text-green-400" size={20} />
              <span>Escrow Service</span>
            </div>
            <CheckCircle className="text-green-400" size={20} />
          </div>
        </div>
      </div>
    </div>
  );

  // Digital Signature Section
  const SignatureSection = () => (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-4">Digital Signature</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-700/50 rounded-lg p-4">
          <p className="text-sm text-gray-400 mb-4">
            By signing this agreement, you confirm that you have read, understood, and agree to all terms and conditions
            of the consignment agreement.
          </p>
          
          <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg">
            <div>
              <div className="font-semibold">Digital Signature Required</div>
              <div className="text-sm text-gray-400 mt-1">Click to sign the agreement</div>
            </div>
            <button
              onClick={() => setAgreementSigned(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              Sign Agreement
            </button>
          </div>
        </div>

        {agreementSigned && (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle size={20} />
            <span>Agreement signed successfully</span>
          </div>
        )}
      </div>
    </div>
  );

  // Payment Setup Section
  const PaymentSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Escrow Payment Setup</h2>
        
        <div className="space-y-4">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-400 mb-2">
              <AlertCircle size={20} />
              <span className="font-semibold">Escrow Payment Required</span>
            </div>
            <p className="text-sm text-gray-400">
              Initial escrow payment of ${agreement.details.escrowAmount.toLocaleString()} (30%) is required to activate the agreement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-2">Payment Method</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>Bank Transfer</option>
                <option>Credit Card</option>
                <option>Wire Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Currency</label>
              <select className="w-full bg-gray-700 rounded-lg p-3">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setPaymentConfigured(true)}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
          >
            Configure Payment
          </button>

          {paymentConfigured && (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle size={20} />
              <span>Payment method configured successfully</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Schedule</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-400" size={20} />
              <div>
                <div className="font-semibold">Initial Escrow Payment</div>
                <div className="text-sm text-gray-400">Due: Immediately</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${agreement.details.escrowAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-400">30%</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="text-blue-400" size={20} />
              <div>
                <div className="font-semibold">Final Payment</div>
                <div className="text-sm text-gray-400">Due: On Delivery</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${(agreement.details.totalValue - agreement.details.escrowAmount).toLocaleString()}</div>
              <div className="text-sm text-gray-400">70%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Agreement Finalization</h1>
          <p className="text-gray-400 mt-2">Complete the final steps to activate your consignment agreement</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => setActiveStep('review')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeStep === 'review' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            <FileText size={20} />
            <span>Review</span>
          </button>
          <button
            onClick={() => setActiveStep('signature')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeStep === 'signature' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            <Lock size={20} />
            <span>Sign</span>
          </button>
          <button
            onClick={() => setActiveStep('payment')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeStep === 'payment' ? 'bg-blue-600' : 'bg-gray-700'
            }`}
          >
            <CreditCard size={20} />
            <span>Payment</span>
          </button>
        </div>

        {/* Step Content */}
        {activeStep === 'review' && <ReviewSection />}
        {activeStep === 'signature' && <SignatureSection />}
        {activeStep === 'payment' && <PaymentSection />}

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => {
              if (activeStep === 'payment') setActiveStep('signature');
              if (activeStep === 'signature') setActiveStep('review');
            }}
            className={`px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg ${
              activeStep === 'review' ? 'invisible' : ''
            }`}
          >
            Back
          </button>
          <button
            onClick={() => {
              if (activeStep === 'review') setActiveStep('signature');
              if (activeStep === 'signature') setActiveStep('payment');
            }}
            className={`px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg ${
              activeStep === 'payment' ? 'invisible' : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementFinalization;