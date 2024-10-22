// components/AddContractForm.js
import React, { useState } from 'react';

const AddContractForm = () => {
  const [name, setName] = useState('');
  const [partner, setPartner] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour ajouter un contrat ici
    console.log({ name, partner, startDate, endDate, value });
    // Réinitialiser le formulaire
    setName('');
    setPartner('');
    setStartDate('');
    setEndDate('');
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Ajouter un Contrat</h2>
      <input
        type="text"
        placeholder="Nom du Contrat"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        placeholder="Partenaire"
        value={partner}
        onChange={(e) => setPartner(e.target.value)}
        className="border rounded-md p-2 mb-4 w-full"
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border rounded-md p-2 mb-4 w-full"
        required
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border rounded-md p-2 mb-4 w-full"
        required
      />
      <input
        type="text"
        placeholder="Valeur"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border rounded-md p-2 mb-4 w-full"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
        Ajouter Contrat
      </button>
    </form>
  );
};

export default AddContractForm;
