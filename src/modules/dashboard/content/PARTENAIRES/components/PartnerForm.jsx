// components/PartnerForm.js
import React, { useState } from 'react';

const PartnerForm = ({ addPartner }) => {
  const [partner, setPartner] = useState({
    name: '',
    industry: '',
    revenue: '',
    contractEnd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartner((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPartner(partner);
    setPartner({ name: '', industry: '', revenue: '', contractEnd: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Partner</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={partner.name}
          onChange={handleChange}
          placeholder="Partner Name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="text"
          name="industry"
          value={partner.industry}
          onChange={handleChange}
          placeholder="Industry"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="text"
          name="revenue"
          value={partner.revenue}
          onChange={handleChange}
          placeholder="Revenue"
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

        <input
          type="date"
          name="contractEnd"
          value={partner.contractEnd}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />

        <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors">
          Add Partner
        </button>
      </div>
    </form>
  );
};

export default PartnerForm;
