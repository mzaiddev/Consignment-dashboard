import React, { useState, useEffect } from 'react';

// Types
type ArtisanDetails = {
  id: string;
  name: string;
  location: string;
  product: string;
  basePrice: number;
  moq: number;
  rating: number;
};

type OfferDetails = {
  quantity: string;
  pricePerUnit: string;
  consignmentPeriod: string;
  commission: string;
  paymentTerms: string;
  shippingTerms: string;
  additionalTerms?: string;
};

type OfferValues = {
  totalValue: number;
  commission: number;
  netValue: number;
};

type OfferStatus = 'Pending' | 'Accepted' | 'Declined' | 'Completed';

type ConsignmentOffer = {
  id: string;
  artisan: ArtisanDetails;
  status: OfferStatus;
  createdAt: string;
  details: OfferDetails;
  values: OfferValues;
};

// Icons
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ViewIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ConsignmentDashboard = () => {
  // State
  const [offers, setOffers] = useState<ConsignmentOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<ConsignmentOffer | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Sample artisans data
  const artisans: ArtisanDetails[] = [
    {
      id: 'CON001',
      name: 'Kashmir Heritage Artisans',
      location: 'Srinagar, Kashmir',
      product: 'Hand-Knotted Pashmina Shawl',
      basePrice: 2500,
      moq: 5,
      rating: 4.8
    },
    {
      id: 'CON002',
      name: 'Varanasi Silk Weavers',
      location: 'Varanasi, Uttar Pradesh',
      product: 'Banarasi Silk Saree',
      basePrice: 3200,
      moq: 3,
      rating: 4.6
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    const sampleOffers: ConsignmentOffer[] = [
      {
        id: 'OFFER001',
        artisan: artisans[0],
        status: 'Pending',
        createdAt: new Date().toISOString(),
        details: {
          quantity: '10',
          pricePerUnit: '2700',
          consignmentPeriod: '90',
          commission: '25',
          paymentTerms: 'escrow_30',
          shippingTerms: 'dhl_express'
        },
        values: {
          totalValue: 27000,
          commission: 6750,
          netValue: 20250
        }
      },
      {
        id: 'OFFER002',
        artisan: artisans[1],
        status: 'Accepted',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        details: {
          quantity: '5',
          pricePerUnit: '3500',
          consignmentPeriod: '120',
          commission: '20',
          paymentTerms: 'escrow_50',
          shippingTerms: 'fedex_priority',
          additionalTerms: 'Special packaging for international shipping required'
        },
        values: {
          totalValue: 17500,
          commission: 3500,
          netValue: 14000
        }
      }
    ];
    
    setOffers(sampleOffers);
    setLoading(false);
  }, []);

  // Calculate values for an offer
  const calculateValues = (quantity: string, price: string, commission: string) => {
    const qty = parseInt(quantity) || 0;
    const unitPrice = parseFloat(price) || 0;
    const commissionRate = parseInt(commission) || 0;
    
    const totalValue = qty * unitPrice;
    const commissionValue = (totalValue * commissionRate) / 100;
    
    return {
      totalValue,
      commission: commissionValue,
      netValue: totalValue - commissionValue
    };
  };

  // CRUD Operations
  const createOffer = (newOfferData: Omit<ConsignmentOffer, 'id' | 'createdAt' | 'values'>) => {
    const id = `OFFER${String(offers.length + 1).padStart(3, '0')}`;
    const values = calculateValues(
      newOfferData.details.quantity,
      newOfferData.details.pricePerUnit,
      newOfferData.details.commission
    );
    
    const newOffer: ConsignmentOffer = {
      id,
      ...newOfferData,
      createdAt: new Date().toISOString(),
      values
    };
    
    setOffers(prev => [...prev, newOffer]);
    return newOffer;
  };

  const updateOffer = (id: string, updatedData: Partial<Omit<ConsignmentOffer, 'id' | 'createdAt'>>) => {
    setOffers(prev => prev.map(offer => {
      if (offer.id !== id) return offer;
      
      const updatedOffer = { ...offer };
      
      if (updatedData.status) updatedOffer.status = updatedData.status;
      if (updatedData.artisan) updatedOffer.artisan = updatedData.artisan;
      
      if (updatedData.details) {
        updatedOffer.details = { ...offer.details, ...updatedData.details };
        
        // Recalculate values if relevant fields changed
        if (
          updatedData.details.quantity || 
          updatedData.details.pricePerUnit || 
          updatedData.details.commission
        ) {
          updatedOffer.values = calculateValues(
            updatedOffer.details.quantity,
            updatedOffer.details.pricePerUnit,
            updatedOffer.details.commission
          );
        }
      }
      
      return updatedOffer;
    }));
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(offer => offer.id !== id));
    if (selectedOffer?.id === id) {
      setSelectedOffer(null);
      setIsEditing(false);
    }
  };

  // Event handlers
  const handleCreateNew = () => {
    setSelectedOffer(null);
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleViewOffer = (offer: ConsignmentOffer) => {
    setSelectedOffer(offer);
    setIsCreating(false);
    setIsEditing(false);
  };

  const handleEditOffer = (offer: ConsignmentOffer) => {
    setSelectedOffer(offer);
    setIsCreating(false);
    setIsEditing(true);
  };

  const handleDeleteOffer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this offer?')) {
      deleteOffer(id);
    }
  };

  const handleSubmitCreate = (formData: Omit<ConsignmentOffer, 'id' | 'createdAt' | 'values'>) => {
    createOffer(formData);
    setIsCreating(false);
  };

  const handleSubmitEdit = (formData: Partial<Omit<ConsignmentOffer, 'id' | 'createdAt'>>) => {
    if (selectedOffer) {
      updateOffer(selectedOffer.id, formData);
      setIsEditing(false);
      
      // Refresh selectedOffer with updated data
      setSelectedOffer(offers.find(o => o.id === selectedOffer.id) || null);
    }
  };

  const handleUpdateStatus = (id: string, status: OfferStatus) => {
    updateOffer(id, { status });
    
    // Update the selected offer if it's the one being modified
    if (selectedOffer?.id === id) {
      setSelectedOffer({
        ...selectedOffer,
        status
      });
    }
  };

  // Filter offers based on active tab and search
  const filteredOffers = offers.filter(offer => {
    // Filter by tab
    if (activeTab !== 'all' && offer.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        offer.id.toLowerCase().includes(term) ||
        offer.artisan.name.toLowerCase().includes(term) ||
        offer.artisan.product.toLowerCase().includes(term)
      );
    }
    
    return true;
  });

  // Helper functions
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusClass = (status: OfferStatus) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-700 text-yellow-100';
      case 'Accepted': return 'bg-green-700 text-green-100';
      case 'Declined': return 'bg-red-700 text-red-100';
      case 'Completed': return 'bg-blue-700 text-blue-100';
      default: return 'bg-gray-700 text-gray-100';
    }
  };

  // Main Component Form
  const OfferForm = ({ offer, onSubmit, onCancel }: { 
    offer?: ConsignmentOffer, 
    onSubmit: (data: any) => void, 
    onCancel: () => void 
  }) => {
    const isEdit = !!offer;
    
    const [formData, setFormData] = useState<any>({
      artisanId: offer?.artisan.id || artisans[0].id,
      status: offer?.status || 'Pending',
      details: {
        quantity: offer?.details.quantity || '',
        pricePerUnit: offer?.details.pricePerUnit || '',
        consignmentPeriod: offer?.details.consignmentPeriod || '90',
        commission: offer?.details.commission || '25',
        paymentTerms: offer?.details.paymentTerms || 'escrow_30',
        shippingTerms: offer?.details.shippingTerms || 'dhl_express',
        additionalTerms: offer?.details.additionalTerms || ''
      }
    });
    
    const selectedArtisan = artisans.find(a => a.id === formData.artisanId) || artisans[0];
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData({
          ...formData,
          [parent]: {
            ...formData[parent],
            [child]: value
          }
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      // Prepare submission data
      let submissionData;
      
      if (isEdit) {
        submissionData = {
          status: formData.status,
          details: formData.details
        };
      } else {
        submissionData = {
          artisan: selectedArtisan,
          status: formData.status as OfferStatus,
          details: formData.details
        };
      }
      
      onSubmit(submissionData);
    };
    
    // Calculate estimated values
    const estimatedValues = calculateValues(
      formData.details.quantity,
      formData.details.pricePerUnit,
      formData.details.commission
    );
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{isEdit ? 'Edit Offer' : 'Create New Offer'}</h2>
        </div>
        
        {/* Artisan selection (only for create) */}
        {!isEdit && (
          <div>
            <label className="block text-gray-400 mb-2">Select Artisan</label>
            <select
              name="artisanId"
              value={formData.artisanId}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-3"
            >
              {artisans.map(artisan => (
                <option key={artisan.id} value={artisan.id}>
                  {artisan.name} - {artisan.product}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Status (only for edit) */}
        {isEdit && (
          <div>
            <label className="block text-gray-400 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-3"
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        )}
        
        {/* Artisan Info */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Artisan Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-400">Name:</span> {selectedArtisan.name}</div>
            <div><span className="text-gray-400">Location:</span> {selectedArtisan.location}</div>
            <div><span className="text-gray-400">Product:</span> {selectedArtisan.product}</div>
            <div><span className="text-gray-400">Base Price:</span> ${selectedArtisan.basePrice}</div>
          </div>
        </div>
        
        {/* Offer Details */}
        <div className="space-y-4">
          <h3 className="font-semibold">Offer Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Quantity</label>
              <input
                type="number"
                name="details.quantity"
                value={formData.details.quantity}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg p-2"
                min={selectedArtisan.moq}
                placeholder={`Min ${selectedArtisan.moq} pieces`}
                required
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Price per Unit ($)</label>
              <input
                type="number"
                name="details.pricePerUnit"
                value={formData.details.pricePerUnit}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg p-2"
                placeholder="Enter price"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Consignment Period</label>
              <select
                name="details.consignmentPeriod"
                value={formData.details.consignmentPeriod}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg p-2"
              >
                <option value="90">90 Days</option>
                <option value="120">120 Days</option>
                <option value="180">180 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Commission</label>
              <select
                name="details.commission"
                value={formData.details.commission}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg p-2"
              >
                <option value="25">55% - Standard</option>
                <option value="20">45% - Bulk Order</option>
                <option value="15">35% - Premium Partner</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1">Payment Terms</label>
              <select
                name="details.paymentTerms"
                value={formData.details.paymentTerms}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg p-2"
              >
                <option value="escrow_30">After Sale</option>
                <option value="escrow_50">Negotiable</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Shipping Terms</label>
              <select
                name="details.shippingTerms"
                value={formData.details.shippingTerms}
                onChange={handleChange}
                className="w-full bg-gray-700 rounded-lg p-2"
              >
                <option value="dhl_express">DHL Express (5-7 days)</option>
                <option value="fedex_priority">FedEx Priority (7-10 days)</option>
                <option value="standard">Standard Shipping (15-20 days)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1">Additional Terms</label>
            <textarea
              name="details.additionalTerms"
              value={formData.details.additionalTerms}
              onChange={handleChange}
              className="w-full bg-gray-700 rounded-lg p-2"
              rows={3}
              placeholder="Enter any additional terms..."
            />
          </div>
        </div>
        
        {/* Financial Summary */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Financial Summary (Estimate)</h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Value:</span>
              <span>${estimatedValues.totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Commission ({formData.details.commission}%):</span>
              <span>${estimatedValues.commission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-gray-600 pt-1 mt-1">
              <span className="text-gray-400">Net Value to Artisan:</span>
              <span>${estimatedValues.netValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
          >
            {isEdit ? 'Update Offer' : 'Create Offer'}
          </button>
        </div>
      </form>
    );
  };

  // Offer Detail View Component
  const OfferDetailView = ({ offer }: { offer: ConsignmentOffer }) => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Offer Details</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => handleEditOffer(offer)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              title="Edit"
            >
              <EditIcon />
            </button>
            <button 
              onClick={() => handleDeleteOffer(offer.id)}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-red-400"
              title="Delete"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">ID</p>
            <p className="font-medium">{offer.id}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">Status</p>
            <select
              value={offer.status}
              onChange={(e) => handleUpdateStatus(offer.id, e.target.value as OfferStatus)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${getStatusClass(offer.status)}`}
            >
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        
        <div>
          <p className="text-gray-400 text-sm">Created</p>
          <p>{formatDate(offer.createdAt)}</p>
        </div>
        
        {/* Artisan Card */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium mb-3">Artisan</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-gray-400">Name:</span> {offer.artisan.name}
            </div>
            <div>
              <span className="text-gray-400">ID:</span> {offer.artisan.id}
            </div>
            <div>
              <span className="text-gray-400">Product:</span> {offer.artisan.product}
            </div>
            <div>
              <span className="text-gray-400">Location:</span> {offer.artisan.location}
            </div>
            <div>
              <span className="text-gray-400">Base Price:</span> ${offer.artisan.basePrice}
            </div>
            <div>
              <span className="text-gray-400">Rating:</span> {offer.artisan.rating}/5
            </div>
          </div>
        </div>
        
        {/* Offer Details */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium mb-3">Offer Details</h3>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div>
              <span className="text-gray-400">Quantity:</span> {offer.details.quantity} pieces
            </div>
            <div>
              <span className="text-gray-400">Price per Unit:</span> ${offer.details.pricePerUnit}
            </div>
            <div>
              <span className="text-gray-400">Consignment Period:</span> {offer.details.consignmentPeriod} days
            </div>
            <div>
              <span className="text-gray-400">Commission:</span> {offer.details.commission}%
            </div>
            <div>
              <span className="text-gray-400">Payment Terms:</span> {offer.details.paymentTerms.replace(/_/g, ' ').toUpperCase()}
            </div>
            <div>
              <span className="text-gray-400">Shipping:</span> {offer.details.shippingTerms.replace(/_/g, ' ').toUpperCase()}
            </div>
          </div>
          
          {offer.details.additionalTerms && (
            <div className="mt-3">
              <span className="text-gray-400">Additional Terms:</span>
              <p className="mt-1 text-sm">{offer.details.additionalTerms}</p>
            </div>
          )}
        </div>
        
        {/* Financial */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-medium mb-3">Financial Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Value:</span>
              <span>${offer.values.totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Commission ({offer.details.commission}%):</span>
              <span>${offer.values.commission.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-gray-600 pt-2 mt-2">
              <span className="text-gray-400">Net Value to Artisan:</span>
              <span>${offer.values.netValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Consignment Offers Administration</h1>
          <p className="text-gray-400 mt-1">Manage all consignment offers and track their status</p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-4 h-full">
              {/* Filters and actions */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'all' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'pending' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => setActiveTab('accepted')}
                    className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'accepted' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Accepted
                  </button>
                  <button 
                    onClick={() => setActiveTab('declined')}
                    className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'declined' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Declined
                  </button>
                  <button 
                    onClick={() => setActiveTab('completed')}
                    className={`px-3 py-1.5 rounded-lg text-sm ${activeTab === 'completed' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    Completed
                  </button>
                </div>
                
                <button
                  onClick={handleCreateNew}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
                >
                  <PlusIcon />
                  <span>New Offer</span>
                </button>
              </div>
              
              {/* Search */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search by ID, artisan or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              
              {/* Table */}
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">Loading offers...</p>
                </div>
              ) : filteredOffers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 mb-4">No offers found</p>
                  <button
                    onClick={handleCreateNew}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
                  >
                    <PlusIcon />
                    <span>Create New Offer</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Artisan</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredOffers.map(offer => (
                        <tr key={offer.id} className="hover:bg-gray-700">
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{offer.id}</td>
                          <td className="px-4 py-3">
                            <div className="text-sm">{offer.artisan.name}</div>
                            <div className="text-xs text-gray-400">{offer.artisan.product}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusClass(offer.status)}`}>
                              {offer.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDate(offer.createdAt)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{offer.details.quantity}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">${offer.values.totalValue.toLocaleString()}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleViewOffer(offer)}
                                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                                title="View details"
                              >
                                <ViewIcon />
                              </button>
                              <button
                                onClick={() => handleEditOffer(offer)}
                                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                                title="Edit offer"
                              >
                                <EditIcon />
                              </button>
                              <button
                                onClick={() => handleDeleteOffer(offer.id)}
                                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-red-400"
                                title="Delete offer"
                              >
                                <DeleteIcon />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
          
          {/* Right column - Details/Form */}
          <div>
            <div className="bg-gray-800 rounded-xl p-4">
              {isCreating ? (
                <OfferForm 
                  onSubmit={handleSubmitCreate} 
                  onCancel={() => setIsCreating(false)}
                />
              ) : isEditing && selectedOffer ? (
                <OfferForm 
                  offer={selectedOffer}
                  onSubmit={(data) => handleSubmitEdit(data)}
                  onCancel={() => setIsEditing(false)}
                />
              ) : selectedOffer ? (
                <OfferDetailView offer={selectedOffer} />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-gray-400 mb-4">Select an offer to view details or create a new one</p>
                  <button
                    onClick={handleCreateNew}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
                  >
                    <PlusIcon />
                    <span>Create New Offer</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsignmentDashboard;