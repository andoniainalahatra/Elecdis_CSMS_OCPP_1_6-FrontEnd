import BoutonAdd from "../../component/BoutonAdd";
import EtiquettesRfidTable from "../../component/EtiquettesRfidTable";

const Transactions = () => {

  const handleClick = () => {
    alert("heyy");
  };

  return (
    <div className="w-full h-auto p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-[#212B36] text-xl">Listes RFID</h2>
        <BoutonAdd action={handleClick} />
      </div>
      <div>
        <EtiquettesRfidTable />
      </div>
    </div>
  );
};

export default Transactions;
