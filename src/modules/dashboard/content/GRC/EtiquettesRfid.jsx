import { useState } from "react";
import BoutonAdd from "../../component/BoutonAdd";
import EtiquettesRfidTable from "./components/EtiquettesRfidTable";
import CreateRfid from "./components/CreateRfid";

const Transactions = () => {
  const [isCreated, setIsCreated] = useState(false);

  const handleClick = () => {
    setIsCreated(true);
  };
  const closeModal = () => {
    setIsCreated(false)
  }

  return (
    <div className="w-full h-auto p-6 relative">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-[#212B36] text-xl">Listes RFID</h2>
        <BoutonAdd action={handleClick} />
      </div>
      <div>
        <EtiquettesRfidTable />
      </div>
      {isCreated && (
        <CreateRfid action={closeModal} />
      )}
    </div>
  );
};

export default Transactions;
