// components/PartnerCard.js
import React from 'react';

const PartnerCard = ({ partner }) => {
  return (
    <div className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
      <h2 className="mb-2 text-xl font-bold text-gray-800">{partner.name}</h2>
      <p className="text-gray-600">Industry: {partner.industry}</p>
      <p className="text-gray-600">Revenue: {partner.revenue}</p>
      <p className="text-gray-600">Contract End: {partner.contractEnd}</p>
      <button className="px-4 py-2 mt-4 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
};

export default PartnerCard;
