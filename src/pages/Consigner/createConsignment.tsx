import { useState } from 'react';
import { Package, Clock, DollarSign, Send, ChevronRight } from 'lucide-react';
import ConsigneeGuarantee from './terms-condition';

const CreateConsignmentOffer = () => {
  // Form state
//   const [selectedArtisan, setSelectedArtisan] = useState(null);
  const [offerDetails, setOfferDetails] = useState({
    quantity: '',
    pricePerUnit: '',
    consignmentPeriod: '90',
    commission: '25',
    paymentTerms: 'escrow_30',
    shippingTerms: 'dhl_express'
  });
  const [currentStep, setCurrentStep] = useState(1);

  // Selected artisan details (would come from previous discovery step)
  const artisanDetails = {
    id: 'CON001',
    name: 'Kashmir Heritage Artisans',
    location: 'Srinagar, Kashmir',
    product: 'Hand-Knotted Pashmina Shawl',
    basePrice: 2500,
    moq: 5,
    rating: 4.8
  };

  // Calculate totals
  const calculateTotals = () => {
    const quantity = parseInt(offerDetails.quantity) || 0;
    const price = parseFloat(offerDetails.pricePerUnit) || 0;
    const totalValue = quantity * price;
    const commission = (totalValue * parseInt(offerDetails.commission)) / 100;
    return {
      totalValue,
      commission,
      netValue: totalValue - commission
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Create Consignment Offer</h1>
          <p className="text-gray-400 mt-2">Design your consignment terms and submit an offer to the artisan</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center space-x-4 mb-8">
          {[
            { step: 1, label: 'Basic Details' },
            { step: 2, label: 'Terms & Conditions' },
            { step: 3, label: 'Review & Submit' }
          ].map(({ step, label }) => (
            <div key={step} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step === currentStep ? 'bg-blue-600' :
                step < currentStep ? 'bg-green-600' : 'bg-gray-700'
              }`}>
                {step < currentStep ? '✓' : step}
              </div>
              <span className="ml-2 text-sm">{label}</span>
              {step < 3 && <ChevronRight className="ml-4 text-gray-600" size={20} />}
            </div>
          ))}
        </div>

        {/* Selected Artisan Card */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{artisanDetails.name}</h3>
              <p className="text-gray-400 text-sm mt-1">{artisanDetails.location}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Base Price</div>
              <div className="font-semibold">${artisanDetails.basePrice}</div>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm text-blue-400">
            <Package size={16} />
            <span>{artisanDetails.product}</span>
          </div>
        </div>

        {/* Offer Form */}
        {currentStep === 1 && (
          <div className="bg-gray-800 rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-semibold mb-4">Basic Offer Details</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Offer Title</label>
                <input
                  type="number"
                  min={artisanDetails.moq}
                  value={offerDetails.quantity}
                  onChange={(e) => setOfferDetails({...offerDetails, quantity: e.target.value})}
                  className="w-full bg-gray-700 rounded-lg p-3"
                  placeholder={`Minimum ${artisanDetails.moq} pieces`}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Consignment Category</label>
                <input
                  type="number"
                  value={offerDetails.pricePerUnit}
                  onChange={(e) => setOfferDetails({...offerDetails, pricePerUnit: e.target.value})}
                  className="w-full bg-gray-700 rounded-lg p-3"
                  placeholder="Enter price per unit"
                />
              </div>
            </div>
<div className='grid grid-cols-2 gap-6'>
            <div>
              <label className="block text-gray-400 mb-2">Offer Discription</label>
              <select
                value={offerDetails.consignmentPeriod}
                onChange={(e) => setOfferDetails({...offerDetails, consignmentPeriod: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="90">90 Days</option>
                <option value="120">120 Days</option>
                <option value="180">180 Days</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Offer validity Period</label>
              <select
                value={offerDetails.commission}
                onChange={(e) => setOfferDetails({...offerDetails, commission: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="25">25% - Standard Rate</option>
                <option value="20">20% - Bulk Order Rate</option>
                <option value="15">15% - Premium Partner Rate</option>
              </select>
            </div>
            </div>
          </div>
        )}

{currentStep === 1 && (
          <div className="bg-gray-800 rounded-xl p-6 space-y-6  mt-10">
            <h3 className="text-lg font-semibold mb-4">Consignment Terms</h3>

            <div>
              <label className="block text-gray-400 mb-2">Commission Structure</label>
              <select
                value={offerDetails.commission}
                onChange={(e) => setOfferDetails({...offerDetails, commission: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="25">25% - Standard Rate</option>
                <option value="20">20% - Bulk Order Rate</option>
                <option value="15">15% - Premium Partner Rate</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 mb-2">Minimum Order Quantity</label>
                <input
                  type="number"
                  min={artisanDetails.moq}
                  value={offerDetails.quantity}
                  onChange={(e) => setOfferDetails({...offerDetails, quantity: e.target.value})}
                  className="w-full bg-gray-700 rounded-lg p-3"
                  placeholder={`Minimum ${artisanDetails.moq} pieces`}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Price per Unit (USD)</label>
                <input
                  type="number"
                  value={offerDetails.pricePerUnit}
                  onChange={(e) => setOfferDetails({...offerDetails, pricePerUnit: e.target.value})}
                  className="w-full bg-gray-700 rounded-lg p-3"
                  placeholder="Enter price per unit"
                />
              </div>
            </div>
<div className='grid grid-cols-2 gap-6'>
            <div>
              <label className="block text-gray-400 mb-2">Consignment Period</label>
              <select
                value={offerDetails.consignmentPeriod}
                onChange={(e) => setOfferDetails({...offerDetails, consignmentPeriod: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="90">90 Days</option>
                <option value="120">120 Days</option>
                <option value="180">180 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Payment Terms</label>
              <select
                value={offerDetails.commission}
                onChange={(e) => setOfferDetails({...offerDetails, commission: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="25">25% - Standard Rate</option>
                <option value="20">20% - Bulk Order Rate</option>
                <option value="15">15% - Premium Partner Rate</option>
              </select>
            </div>
            </div>
            <div  className='grid grid-cols-2 gap-6'>
            <div>
              <label className="block text-gray-400 mb-2">Return Terms</label>
              <select
                value={offerDetails.commission}
                onChange={(e) => setOfferDetails({...offerDetails, commission: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="25">25% - Standard Rate</option>
                <option value="20">20% - Bulk Order Rate</option>
                <option value="15">15% - Premium Partner Rate</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Dilevery Date</label>
              <select
                value={offerDetails.commission}
                onChange={(e) => setOfferDetails({...offerDetails, commission: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="25">25% - Standard Rate</option>
                <option value="20">20% - Bulk Order Rate</option>
                <option value="15">15% - Premium Partner Rate</option>
              </select>
            </div>
            </div>
          </div>
          
        )}

        {currentStep === 2 && (

          <div className="bg-gray-800 rounded-xl p-6 space-y-6">
            <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
    <div className='grid grid-cols-2 gap-6'>
            <div>
              <label className="block text-gray-400 mb-2">Payment Terms</label>
              <select
                value={offerDetails.paymentTerms}
                onChange={(e) => setOfferDetails({...offerDetails, paymentTerms: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="escrow_30">30% Escrow, 70% on Delivery</option>
                <option value="escrow_50">50% Escrow, 50% on Delivery</option>
                <option value="full_escrow">100% Escrow</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Shipping Terms</label>
              <select
                value={offerDetails.shippingTerms}
                onChange={(e) => setOfferDetails({...offerDetails, shippingTerms: e.target.value})}
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="dhl_express">DHL Express (5-7 days)</option>
                <option value="fedex_priority">FedEx Priority (7-10 days)</option>
                <option value="standard">Standard Shipping (15-20 days)</option>
              </select>
            </div>
 </div>
            <div>
              <label className="block text-gray-400 mb-2">Additional Terms</label>
              <textarea
                className="w-full bg-gray-700 rounded-lg p-3"
                rows={4}
                placeholder="Enter any additional terms or requirements..."
              ></textarea>
            </div>
          </div>
        )}
         {currentStep === 2 && (
          <div className="bg-gray-800 rounded-xl p-6 space-y-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Platform Terms & Conditions</h3>
          <ConsigneeGuarantee/>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Review Offer Details</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-gray-400 mb-1">Quantity</div>
                  <div className="font-semibold">{offerDetails.quantity} pieces</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Price per Unit</div>
                  <div className="font-semibold">${offerDetails.pricePerUnit}</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Consignment Period</div>
                  <div className="font-semibold">{offerDetails.consignmentPeriod} Days</div>
                </div>
                <div>
                  <div className="text-gray-400 mb-1">Commission Rate</div>
                  <div className="font-semibold">{offerDetails.commission}%</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Value:</span>
                    <span className="font-semibold">${totals.totalValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Commission ({offerDetails.commission}%):</span>
                    <span className="font-semibold">${totals.commission.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Net Value:</span>
                    <span className="font-semibold">${totals.netValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h4 className="font-semibold mb-3">Selected Terms</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>Consignment Period: {offerDetails.consignmentPeriod} days</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span>Payment: {offerDetails.paymentTerms.replace(/_/g, ' ').toUpperCase()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package size={16} className="text-gray-400" />
                    <span>Shipping: {offerDetails.shippingTerms.replace(/_/g, ' ').toUpperCase()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Back
            </button>
          )}
          <div className="ml-auto">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
              >
                Next Step
              </button>
            ) : (
              <button
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
              >
                <Send size={20} />
                <span>Submit Offer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateConsignmentOffer;