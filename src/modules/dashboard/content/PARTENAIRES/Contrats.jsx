// pages/Contracts.js
import React from 'react';
import ContractsTable from './components/ContractsTable';
import AddContractForm from './components/AddContractForm';

const Contrats = () => {
  return (
    <div className="container mx-auto p-6">
      <AddContractForm />
      <ContractsTable />
    </div>
  );
};

export default Contrats;
