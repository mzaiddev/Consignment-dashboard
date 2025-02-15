import { useState } from 'react';
import {  DollarSign, Clock, Package, 
         Send, ThumbsUp, ThumbsDown, RefreshCw } from 'lucide-react';

interface OfferDetails {
  quantity: number;
  pricePerUnit: number;
  totalValue: number;
  commission: string;
  period: string;
  paymentTerms: string;
  shipping: string;
}

interface NegotiationHistory {
  date: string;
  from: string;
  type: string;
  details: string;
}

interface Offer {
  id: string;
  product: string;
  consignor: string;
  status: string;
  lastUpdated: string;
  details: OfferDetails;
  negotiationHistory: NegotiationHistory[];
}

const ReviewAndNegotiation = () => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [message, setMessage] = useState('');

  // Sample offers data
  const offers = [
    {
      id: 'OFF001',
      product: 'Hand-Knotted Pashmina Shawl Collection',
      consignor: 'Kashmir Heritage Artisans',
      status: 'Pending Response',
      lastUpdated: '2024-02-14',
      details: {
        quantity: 20,
        pricePerUnit: 2500,
        totalValue: 50000,
        commission: '25%',
        period: '90 days',
        paymentTerms: '30% Escrow, 70% on Delivery',
        shipping: 'DHL Express'
      },
      negotiationHistory: [
        {
          date: '2024-02-12',
          from: 'Consignor',
          type: 'Initial Offer',
          details: 'Initial offer submitted'
        },
        {
          date: '2024-02-13',
          from: 'Consignee',
          type: 'Counter Offer',
          iconColor: 'yellow',
          details: 'Counter offer with adjusted commission rate'
        }
      ]
    },
    {
      id: 'OFF002',
      product: 'Walnut Wood Carved Collection',
      consignor: 'Valley Woodcraft Masters',
      status: 'Counter Received',
      lastUpdated: '2024-02-13',
      details: {
        quantity: 35,
        pricePerUnit: 850,
        totalValue: 29750,
        commission: '20%',
        period: '120 days',
        paymentTerms: '50% Escrow, 50% on Delivery',
        shipping: 'FedEx Priority'
      },
      negotiationHistory: [
        {
          date: '2024-02-11',
          from: 'Consignor',
          type: 'Initial Offer',
          details: 'Initial terms proposed'
        },
        {
          date: '2024-02-13',
          from: 'Consignee',
          type: 'Counter Offer',
          iconColor: 'green',
          details: 'Counter offer with adjusted commission rate'
        }
      ]
    }
  ];

  // Counter Offer Modal
  const CounterOfferModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Submit Counter Offer</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Quantity</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg p-3"
              defaultValue={selectedOffer?.details.quantity}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Price per Unit (USD)</label>
            <input
              type="number"
              className="w-full bg-gray-700 rounded-lg p-3"
              defaultValue={selectedOffer?.details.pricePerUnit}
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Commission Rate</label>
            <select className="w-full bg-gray-700 rounded-lg p-3">
              <option value="25">25% - Standard Rate</option>
              <option value="20">20% - Bulk Order Rate</option>
              <option value="15">15% - Premium Partner Rate</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Message</label>
            <textarea
              className="w-full bg-gray-700 rounded-lg p-3"
              rows={3}
              placeholder="Explain your counter offer..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              onClick={() => setShowCounterModal(false)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              Submit Counter
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {showCounterModal && <CounterOfferModal />}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Review & Negotiate Offers</h1>
          <p className="text-gray-400 mt-2">Review received offers and negotiate terms</p>
        </div>

        {/* Offers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offers.map(offer => (
            <div 
              key={offer.id}
              className={`bg-gray-800 rounded-xl ${
                selectedOffer?.id === offer.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {/* Offer Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{offer.product}</h3>
                    <p className="text-gray-400 text-sm mt-1">{offer.consignor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    offer.status === 'Pending Response' 
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {offer.status}
                  </span>
                </div>

                {/* Offer Details */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-400">Quantity</div>
                    <div className="font-semibold">{offer.details.quantity} pieces</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Price/Unit</div>
                    <div className="font-semibold">${offer.details.pricePerUnit}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Total Value</div>
                    <div className="font-semibold">${offer.details.totalValue}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Commission</div>
                    <div className="font-semibold">{offer.details.commission}</div>
                  </div>
                </div>

                {/* Terms */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span>Period: {offer.details.period}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-gray-400" />
                    <span>{offer.details.paymentTerms}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package size={16} className="text-gray-400" />
                    <span>{offer.details.shipping}</span>
                  </div>
                </div>
              </div>

              {/* Negotiation History */}
              <div className="p-6">
                <h4 className="font-semibold mb-4">Negotiation History</h4>
                <div className="space-y-4">
                  {offer.negotiationHistory.map((event, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-1">
                        {event.type === 'Initial Offer' ? (
                          <Send size={16} className="text-blue-400" />
                        ) : (
                        
                          <RefreshCw size={16} className="text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{event.type}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-400">{event.from}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{event.details}</p>
                        <div className="text-xs text-gray-500 mt-1">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedOffer(offer);
                      setShowCounterModal(true);
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
                  >
                    <RefreshCw size={18} />
                    <span>Counter Offer</span>
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg">
                    <ThumbsUp size={18} />
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg">
                    <ThumbsDown size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Section */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-4">Send Message</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-gray-700 rounded-lg px-4 py-2"
              placeholder="Type your message..."
            />
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
              disabled={!message}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndNegotiation;