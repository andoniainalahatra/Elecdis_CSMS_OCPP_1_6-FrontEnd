import { useState } from "react";
import AddButton from "../GRC/components/AddButton";
import ListeTarif from "./components/ListeTarif";
import CreateTarif from "./components/CreatTarif";

const GroupesDesTarifs = () => {
  const [isCreated, setIsCreated] = useState(false);

  const handleAdd = () => {
    setIsCreated(true);
  };
  const closeModalAdd = () => {
    setIsCreated(false);
  };
  return (
    <div className="w-full h-auto p-6">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-[24px] text-[#212B36]">Groupe des Tarifs</h2>
        <div className="flex gap-2">
          <AddButton action={handleAdd} />
        </div>
      </div>
      <ListeTarif />
      {isCreated && <CreateTarif action={closeModalAdd} />}
    </div>
  );
};

export default GroupesDesTarifs;
