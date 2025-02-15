/* eslint-disable no-irregular-whitespace */
import { useState } from 'react';
import { Search, Package,DollarSign, Star,Send, Truck, RefreshCw, FileText, MessageSquare, Bell } from 'lucide-react';
import CreateConsignmentOffer from './createConsignment';
import ReviewAndNegotiation from './ReviewOffers';
import OfferSubmission from './SubmitOffer';
import AgreementFinalization from './Finalization';
import ConsignmentExecution from './Execution';
import SalesSettlement from './Settlement';
import ReturnRenewalExit from './Conclusion';
import logo from '../../assets/logo.png';

const ConsigneeDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    region: 'all'
  });

  const consignors = [
    {
      id: 'CON001',
      name: 'Kashmir Heritage Artisans',
      type: 'Textile & Shawls',
      location: 'Srinagar, Kashmir',
      rating: 4.8,
      reviews: 124,
      specialties: ['Pashmina Shawls', 'Kashmiri Embroidery']
    },
    {
      id: 'CON002',
      name: 'Valley Woodcraft Masters',
      type: 'Woodcraft',
      location: 'Srinagar, Kashmir',
      rating: 4.9,
      reviews: 98,
      specialties: ['Walnut Wood Carving', 'Decorative Items']
    }
  ];

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search artisans..."
                className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <select 
            className="bg-gray-700 rounded-lg px-4 py-2"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="all">All Categories</option>
            <option value="textiles">Textiles & Shawls</option>
            <option value="woodcraft">Woodcraft</option>
            <option value="carpets">Carpets</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consignors.map(consignor => (
          <ConsignorCard key={consignor.id} consignor={consignor} />
        ))}
      </div>
    </div>
  );
};

// ConsignorCard Component
interface Consignor {
  id: string;
  name: string;
  type: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
}

const ConsignorCard = ({ consignor }: { consignor: Consignor }) => (
  <div className="bg-gray-800 rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-semibold">{consignor.name}</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
          <span>{consignor.location}</span>
          <span>•</span>
          <div className="flex items-center">
            <Star className="text-yellow-400 w-4 h-4 mr-1" />
            <span>{consignor.rating} ({consignor.reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {consignor.specialties.map((specialty, index) => (
          <span 
            key={index}
            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
          >
            {specialty}
          </span>
        ))}
      </div>
      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg">
        View Profile
      </button>
    </div>
  </div>
);

// CreateOffer Component
const CreateOffer = () => (
   <CreateConsignmentOffer/>
);

// Negotiations Component
const Negotiations = () => (
   <ReviewAndNegotiation/>
);

// SubmitOffer Component
const SubmitOffer = () => (
   <OfferSubmission/>
);

// Finalization Component
const Finalization = () => (
   <AgreementFinalization/>
);

// Execution Component
const Execution = () => (
  <ConsignmentExecution/>
);

// Settlement Component
const Settlement = () => (
   <SalesSettlement/>
);

// Conclusion Component
const Conclusion = () => (
   <ReturnRenewalExit/>
);


const DKCPlatform = () => {
  // Core state
  const [activeStep, setActiveStep] = useState('discovery');
  const [currentUser] = useState({
    id: 'USER123',
    role: 'consignee',
    name: 'Luxury Boutique NYC'
  });
  const [notifications] = useState([]);

  // Workflow steps
    const workflowSteps = [
      { id: 'discovery', label: 'Discover Consignee', icon: Search, component: ConsigneeDiscovery },
      { id: 'create-offer', label: 'Create Consignee Offer', icon: Send, component: CreateOffer },
      { id: 'negotiate', label: 'Review & Negotiate  Offer', icon: MessageSquare, component: Negotiations },
      { id: 'submit', label: 'Submit Offer', icon: Package, component: SubmitOffer },
      { id: 'finalize', label: 'Finalize Offer', icon: FileText, component: Finalization },
      { id: 'execute', label: 'Consignment Execution', icon: Truck, component: Execution },
      { id: 'settlement', label: 'Sales Settlement', icon: DollarSign, component: Settlement },
      { id: 'conclude', label: 'Return, Renewal & Exit', icon: RefreshCw, component: Conclusion }
    ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold text-blue-400"><img src={logo} alt="logo" width={35}  height={35}/></span>
            </div>
             <div>
                <h2>DKC B2B Integrated Consignment Trading Portal Framework</h2>
             </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-white">
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400" />
                )}
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="font-semibold">{currentUser.name[0]}</span>
                </div>
                <span className="text-sm font-medium">{currentUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Tracker */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {workflowSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex flex-col items-center cursor-pointer ${
                  index < workflowSteps.findIndex(s => s.id === activeStep)
                    ? 'text-green-400'
                    : index === workflowSteps.findIndex(s => s.id === activeStep)
                    ? 'text-blue-400'
                    : 'text-gray-400'
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <step.icon size={20} />
                <span className="text-xs mt-1">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {workflowSteps.map(step => 
          activeStep === step.id && (
            <step.component key={step.id} />
          )
        )}
      </main>
    </div>
  );
};

export default DKCPlatform;