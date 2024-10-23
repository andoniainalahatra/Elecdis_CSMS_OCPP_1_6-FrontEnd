// components/PartnerCard.js
import React from 'react';

const PartnerCard = ({ partner }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{partner.name}</h2>
      <p className="text-gray-600">Industry: {partner.industry}</p>
      <p className="text-gray-600">Revenue: {partner.revenue}</p>
      <p className="text-gray-600">Contract End: {partner.contractEnd}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        View Details
      </button>
    </div>
  );
};

export default PartnerCard;
