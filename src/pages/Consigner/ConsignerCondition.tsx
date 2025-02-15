/* eslint-disable no-irregular-whitespace */
import { useState } from "react";

export default function ConsignorGuarantee() {
  const [formData, setFormData] = useState({
    consignorName: "",
    consignorBusiness: "",
    consignorDate: "",
    consignorReference: "",
    consent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("You must agree to the terms before submitting.");
      return;
    }
    console.log("Consignor Guarantee Submitted:", formData);
    alert("Guarantee Statement Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Consignor Guarantee & Exclusive Authorization Statement
      </h2>

      <div className="p-6 border border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-xl font-semibold text-gray-700">
          DKC Kashmir: Trusted Guarantor for All Consignments
        </h3>
        <p className="text-gray-600 mt-4">
          I, <span className="font-semibold">{formData.consignorName || "[Consignor’s Name]"}</span>, as the consignor of this shipment, 
          hereby validate and authorize <span className="font-semibold">DKC Kashmir</span> as my sole and trusted guarantor for all consignments, payments, 
          and communications related to my trade activities.
        </p>

        <h4 className="text-lg font-semibold mt-6 text-gray-700">
          Scope of Authorization & Acknowledgment
        </h4>

        <div className="mt-4 space-y-4">
          <p><strong>Exclusive Handling of Consignments:</strong>  
            I acknowledge that all consignments under my name will be processed, managed, and coordinated exclusively through DKC Kashmir.
            DKC Kashmir will oversee logistics, shipping, documentation, and customs clearance for all my exports.
          </p>

          <p><strong>Payments & Financial Transactions:</strong>  
            I confirm that all payments for my consignments will be processed through DKC Kashmir, ensuring secure, transparent, and accountable financial settlements.
            DKC Kashmir is responsible for remitting payments to me after deducting applicable fees such as logistics and commissions in accordance with the agreed terms.
          </p>

          <p><strong>Sole Point of Communication:</strong>  
            I affirm that all trade-related communications, negotiations, and confirmations concerning my consignments will be conducted exclusively through DKC Kashmir.
            No third party is authorized to represent my consignments unless explicitly permitted by DKC Kashmir.
          </p>

          <p><strong>Compliance & Trade Facilitation:</strong>  
            I acknowledge that DKC Kashmir ensures compliance with international trade laws, market regulations, and quality control standards.
            I entrust DKC Kashmir to act in my best interest, ensuring a seamless and compliant export process.
          </p>
        </div>

        <h4 className="text-lg font-semibold mt-6 text-gray-700">
          Declaration & Commitment
        </h4>
        <p className="mt-2">
          By signing this statement, I fully entrust and authorize <span className="font-semibold">DKC Kashmir</span> to manage all aspects of my consignments, payments, 
          and communications with the highest standards of professionalism and integrity.
        </p>
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