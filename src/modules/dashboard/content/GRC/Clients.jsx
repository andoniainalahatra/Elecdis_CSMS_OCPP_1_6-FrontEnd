import { useState } from "react";
import BoutonAdd from "../../component/BoutonAdd";
import AddClient from "./components/AddClient";
import DataTableUser from "./components/DataTableUser";
import BoutonAddCSV from "../../component/BoutonAddCSV";
import CsvUploader from "../../component/CsvUploader";

const Clients = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  return (
    <div>
      <div className="flex justify-between m-6">
        <span className="text-[24px] text-[#212B36]">Liste des clients</span>
        <div className="flex space-x-3">
          <BoutonAddCSV Composant={CsvUploader} open={open2} setOpen={setOpen2} />
          <BoutonAdd Composant={AddClient} open={open} setOpen={setOpen} />
        </div>
      </div>
      <div className="p-6">
        <DataTableUser />
      </div>
    </div>
  );
};

export default Clients;
