import React, { useState, useCallback, useMemo } from "react";
import {
  FaDollarSign,  // Import de l'icône pour les revenus
} from "react-icons/fa";

// Données statiques (à remplacer par un appel API dans un environnement de production)
const transactionsData = [
  {
    id: "TXN001",
    client: "John Doe",
    montant: 50.00,
    date: "2024-10-05",
    heure: "14:35",
    type: "Recharge",
    methode: "Carte de crédit",
    statut: "Success",
  },
  {
    id: "TXN002",
    client: "Jane Smith",
    montant: 30.50,
    date: "2024-10-04",
    heure: "11:20",
    type: "Recharge",
    methode: "PayPal",
    statut: "Failed",
  },
  {
    id: "TXN003",
    client: "Alice Johnson",
    montant: 25.75,
    date: "2024-10-03",
    heure: "16:15",
    type: "Recharge",
    methode: "Carte de débit",
    statut: "Success",
  },
  {
    id: "TXN004",
    client: "Michael Brown",
    montant: 80.00,
    date: "2024-10-02",
    heure: "09:45",
    type: "Recharge",
    methode: "Apple Pay",
    statut: "Pending",
  },
  {
    id: "TXN005",
    client: "Sarah Lee",
    montant: 60.25,
    date: "2024-10-01",
    heure: "13:30",
    type: "Recharge",
    methode: "Google Pay",
    statut: "Success",
  },
  {
    id: "TXN006",
    client: "Robert Wilson",
    montant: 45.50,
    date: "2024-09-30",
    heure: "15:50",
    type: "Recharge",
    methode: "Carte de crédit",
    statut: "Failed",
  },
  {
    id: "TXN007",
    client: "Emily Davis",
    montant: 72.00,
    date: "2024-09-29",
    heure: "18:20",
    type: "Recharge",
    methode: "Carte de débit",
    statut: "Success",
  },
  {
    id: "TXN008",
    client: "David Harris",
    montant: 35.75,
    date: "2024-09-28",
    heure: "10:15",
    type: "Recharge",
    methode: "PayPal",
    statut: "Pending",
  },
  // Ajoute d'autres transactions si nécessaire
];

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("Tous"); // Filtre par statut
  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    return transactionsData
      .filter((transaction) =>
        transaction.client.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((transaction) =>
        filterStatus === "Tous" ? true : transaction.statut === filterStatus
      );
  }, [searchTerm, filterStatus]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredTransactions.length / itemsPerPage);
  }, [filteredTransactions.length]);

  const currentTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredTransactions]);

  const totalRevenue = useMemo(() => {
    return transactionsData
      .filter((transaction) => transaction.statut === "Success")
      .reduce((total, transaction) => total + transaction.montant, 0)
      .toFixed(2);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de filtre
  };

  const statusStyles = {
    Success: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Failed: "bg-red-100 text-red-800",
  };


  return (
    <div className="w-full h-auto p-6">
      <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <FaDollarSign className="text-4xl mr-4" />
          <div>
            <h3 className="text-2xl font-semibold">Revenus totaux</h3>
            <p className="text-lg">{totalRevenue} €</p>
          </div>
        </div>
      </div>

      <h2 className="text-[#212B36] text-xl mb-6">Transactions de paiement</h2>

      {/* Filtres */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Rechercher..."
          className="p-2 border rounded w-[30%]"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <select
          value={filterStatus}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="Tous">Tous les statuts</option>
          <option value="Success">Succès</option>
          <option value="Pending">En attente</option>
          <option value="Failed">Échoué</option>
        </select>
      </div>

      {/* Liste des transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTransactions.length > 0 ? (
          currentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white p-4 rounded-lg shadow-lg"
            >
              {/* Date et heure en haut comme un reçu */}
              <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                <span>{transaction.date}</span>
                <span>{transaction.heure}</span>
              </div>

              {/* Nom du client et statut */}
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-[#212B36]">
                  {transaction.client}
                </h3>
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[transaction.statut]}`}>
                      {transaction.statut === 'Success' ? 'Payée' : transaction.statut === 'Pending' ? 'En attente' : 'Annulé'}
                    </span>
              </div>

              {/* Détails de la transaction */}
              <p className="text-sm text-[#3b4853]">ID : {transaction.id}</p>
              <p className="text-sm text-[#3b4853]">
                Montant : {transaction.montant}€
              </p>
              <p className="text-sm text-[#3b4853]">
                Méthode : {transaction.methode}
              </p>

              {/* Boutons d'action */}
              <div className="mt-4 flex justify-between">
                <button className="text-blue-500 hover:text-blue-400 text-sm">
                  Détails
                </button>
                <button className="text-red-500 hover:text-red-400 text-sm">
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#3b4853]">Aucune transaction trouvée</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span className="text-lg">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Transactions;