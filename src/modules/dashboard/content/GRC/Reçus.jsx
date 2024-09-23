import React from "react";
import BoutonAdd from "../../component/BoutonAdd";

const Reçus = () => {
  const handleClick = () => alert("hello");
  return (
    <div className="w-full h-auto p-6">
      <div className="w-full flex items-center justify-between mb-6">
        <h2 className="text-[#212B36] text-xl">Réçus</h2>
        <BoutonAdd action={handleClick} />
      </div>
      <div>
        {/* <EtiquettesRfidTable /> */}
      </div>
    </div>
  );
};

export default Reçus;
