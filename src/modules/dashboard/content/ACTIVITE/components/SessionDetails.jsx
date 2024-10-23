import React from 'react';
import { FaUser, FaPlug, FaMoneyBill, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const SessionDetails = ({close}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
        <FaPlug className="mr-2" /> Détails de la Session de Recharge
      </h2>

      {/* Section: Utilisateur */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaUser className="mr-2" /> Informations de l'utilisateur
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p><strong>Nom d'utilisateur:</strong> Kevin Rak</p>
          <p><strong>RFID:</strong> 5</p>
        </div>
      </div>

      {/* Section: Détails de la session */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaClock className="mr-2" /> Détails de la Session
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p><strong>ID de la borne:</strong> 927344</p>
          <p><strong>ID Connecteur:</strong> 10932894</p>
          <p><strong>Début:</strong> 12/12/24 09h36</p>
          <p><strong>Fin:</strong> 12/12/24 10h00</p>
        </div>
      </div>

      {/* Section: Coûts et consommation */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaMoneyBill className="mr-2" /> Coûts et Consommation
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <p><strong>Énergie consommée:</strong> 14 kWh</p>
          <p><strong>Coût total:</strong> 10 000 Ar</p>
        </div>
      </div>

      {/* Section: Lieu */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaMapMarkerAlt className="mr-2" /> Lieu de la Session
        </h3>
        <div className="text-gray-600">
          <p><strong>Lieu:</strong> Andraharo, Antananarivo</p>
        </div>
      </div>

      {/* Section: Tarifs inclus */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
          <FaMoneyBill className="mr-2" /> Liste des Tarifs Inclus
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>S1</li>
          <li>S2</li>
          <li>S3</li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="flex justify-end space-x-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Télécharger le Reçu
        </button>
        <button onClick={()=>close("")} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Retour
        </button>
      </div>
    </div>
  );
};

export default SessionDetails;
