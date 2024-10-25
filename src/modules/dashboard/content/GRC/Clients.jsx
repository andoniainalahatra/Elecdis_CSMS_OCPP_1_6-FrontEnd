import { useState } from "react";
import BoutonAdd from "../../component/BoutonAdd";
import AddClient from "./components/AddClient";
import DataTableUser from "./components/DataTableUser";

const Clients = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex p-6 justify-between">
        <span className=" text-[24px] text-[#212B36]">Liste des clients</span>
        <BoutonAdd Composant={AddClient} open={open} setOpen={setOpen} />
      </div>
      <div className="p-6">
        <DataTableUser />
      </div>
    </div>
  );
};

export default Clients;
