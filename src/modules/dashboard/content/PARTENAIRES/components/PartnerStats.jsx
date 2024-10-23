// components/PartnerStats.js
import React from 'react';

const PartnerStats = ({ partners }) => {
  const totalRevenue = partners.reduce((sum, partner) => sum + parseFloat(partner.revenue.replace(/[^\d.-]/g, '')), 0);
  const totalPartners = partners.length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-gray-800">Total Revenue</h3>
          <p className="text-xl font-semibold text-blue-500">${totalRevenue.toFixed(2)}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-bold text-gray-800">Total Partners</h3>
          <p className="text-xl font-semibold text-green-500">{totalPartners}</p>
        </div>
      </div>
    </div>
  );
};

export default PartnerStats;
