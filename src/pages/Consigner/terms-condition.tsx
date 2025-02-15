/* eslint-disable no-irregular-whitespace */
import { useState } from "react";

export default function ConsigneeGuarantee() {
  const [formData, setFormData] = useState({
    consigneeName: "",
    consigneeBusiness: "",
    consigneeDate: "",
    consigneeReference: "",
    consent: false,
  });

interface ChangeEvent {
    target: {
        name: string;
        value: string;
        type: string;
        checked: boolean;
    };
}

const handleChange = (e: ChangeEvent) => {
;
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
};

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("You must agree to the terms before submitting.");
      return;
    }
    console.log("Consignee Guarantee Submitted:", formData);
    alert("Guarantee Statement Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Consignee Guarantee & Exclusive Authorization Statement
      </h2>

      <div className="p-6 border border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700">DKC USA: The Exclusive Trade Facilitator for All Consignments</h3>
        <p className="text-gray-600 mt-4">
          I, <span className="font-semibold">{formData.consigneeName || "[Consignee’s Name]"}</span>, as the consignee of this shipment, 
          hereby validate and authorize <span className="font-semibold">DKC USA</span> as my sole and trusted trade facilitator for 
          all consignments, payments, and communications related to my imports.
        </p>

        <h4 className="text-lg font-semibold mt-6 text-gray-700">Scope of Authorization & Acknowledgment</h4>

        <div className="mt-4 space-y-4 text-gray-600">
          <p><strong>Exclusive Handling of Consignments:</strong>  
            I acknowledge that all consignments I receive will be processed, managed, and facilitated exclusively through DKC USA.
            DKC USA will oversee customs clearance, last-mile distribution, regulatory compliance, and quality assurance for all imported goods.
          </p>

          <p><strong>Payments & Financial Transactions:</strong>  
            I confirm that all payments for my received consignments will be routed through DKC USA, ensuring secure, transparent, and legally compliant transactions.
            DKC USA will handle payment settlements with the consignor via DKC Kashmir, deducting applicable fees such as duties, logistics, and commissions.
          </p>

          <p><strong>Sole Point of Communication:</strong>  
            I affirm that all trade-related communications, negotiations, and confirmations concerning my consignments will be conducted exclusively through DKC USA.
            No third party is authorized to intervene in trade discussions unless explicitly permitted by DKC USA.
          </p>

          <p><strong>Compliance & Trade Facilitation:</strong>  
            I acknowledge that DKC USA ensures full compliance with U.S. import regulations, quality control standards, and necessary legal requirements for my consignments.
            I entrust DKC USA to act as my trade intermediary, ensuring a seamless, risk-free, and compliant import process for all transactions.
          </p>
        </div>

        <h4 className="text-lg font-semibold mt-6 text-gray-700">Declaration & Commitment</h4>
        <p className="mt-2 text-gray-600">
          By signing this statement, I fully entrust and authorize <span className="font-semibold">DKC USA</span> to manage all aspects of my consignments, payments, 
          and communications with the highest standards of professionalism and integrity.
        </p>
      </div>
      <div className="bg-gray-800 rounded-xl p-6 space-y-6  mt-10">
            <h3 className="text-lg font-semibold mb-4">Consignment Terms</h3>

            <div>
              <label className="block text-gray-400 mb-2">Commission Structure</label>
              <select
            
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
                  className="w-full bg-gray-700 rounded-lg p-3"
                  placeholder={`Minimum pieces`}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Price per Unit (USD)</label>
                <input
                  type="number"
            
                  className="w-full bg-gray-700 rounded-lg p-3"
                  placeholder="Enter price per unit"
                />
              </div>
            </div>
<div className='grid grid-cols-2 gap-6'>
            <div>
              <label className="block text-gray-400 mb-2">Consignment Period</label>
              <select
            
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
               
                className="w-full bg-gray-700 rounded-lg p-3"
              >
                <option value="25">25% - Standard Rate</option>
                <option value="20">20% - Bulk Order Rate</option>
                <option value="15">15% - Premium Partner Rate</option>
              </select>
            </div>
            </div>
          </div>

      <form onSubmit={handleSubmit} className="mt-6">

        {/* Consent Checkbox */}
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            name="consent"
            className="h-5 w-5 text-blue-600 border-gray-300 rounded"
            checked={formData.consent}
            onChange={handleChange}
          />
          <label className="text-gray-700">
            I confirm that I have read and agreed to the terms of this agreement.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-lg font-semibold transition duration-300 mt-4"
        >
          Submit Guarantee
        </button>
      </form>
    </div>
  );
}