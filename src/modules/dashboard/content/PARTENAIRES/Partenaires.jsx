// App.js
import React, { useState } from 'react';
import PartnerCard from './components/PartnerCard';
import PartnerForm from './components/PartnerForm';
import PartnerStats from './components/PartnerStats';

const initialPartners = [
  {
    id: 1,
    name: 'Partner A',
    industry: 'Technology',
    revenue: '$1.2M',
    contractEnd: '2025-12-30',
  },
  {
    id: 2,
    name: 'Partner B',
    industry: 'Automotive',
    revenue: '$800K',
    contractEnd: '2024-05-20',
  },
  {
    id: 3,
    name: 'Partner C',
    industry: 'Energy',
    revenue: '$500K',
    contractEnd: '2026-09-15',
  },
];

const Partenaires = () => {
  const [partners, setPartners] = useState(initialPartners);

  const addPartner = (partner) => {
    setPartners([...partners, { ...partner, id: partners.length + 1 }]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9f7] p-6">
      <h1 className="text-[#212B36] text-xl mb-6">Partnership Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Partner Stats Section */}
        <PartnerStats partners={partners} />

        {/* Partner List Section */}
        <div className="md:col-span-2 space-y-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      {/* Add Partner Form */}
      <div className="mt-10">
        <PartnerForm addPartner={addPartner} />
      </div>
    </div>
  );
};

export default Partenaires;
