// components/ContractsTable.js
import React from 'react';

// Exemple de données de contrats
const contractsData = [
  { id: 1, name: "Contrat A", partner: "Partenaire 1", startDate: "01/01/2024", endDate: "01/01/2025", value: "$5000" },
  { id: 2, name: "Contrat B", partner: "Partenaire 2", startDate: "15/01/2024", endDate: "15/01/2025", value: "$7000" },
  { id: 3, name: "Contrat C", partner: "Partenaire 3", startDate: "20/02/2024", endDate: "20/02/2025", value: "$3000" },
];

const ContractsTable = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-[#212B36] text-xl mb-6">Liste des Contrats</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Nom du Contrat</th>
            <th className="py-3 px-6 text-left">Partenaire</th>
            <th className="py-3 px-6 text-left">Date de Début</th>
            <th className="py-3 px-6 text-left">Date de Fin</th>
            <th className="py-3 px-6 text-left">Valeur</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {contractsData.map((contract) => (
            <tr key={contract.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6">{contract.name}</td>
              <td className="py-3 px-6">{contract.partner}</td>
              <td className="py-3 px-6">{contract.startDate}</td>
              <td className="py-3 px-6">{contract.endDate}</td>
              <td className="py-3 px-6">{contract.value}</td>
              <td className="py-3 px-6 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">Voir</button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors ml-2">Modifier</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors ml-2">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContractsTable;
