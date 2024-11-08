import React from "react";
import BoxTarifs from "./BoxTarifs";

function ListeTarif() {
  return (
    <div className="w-full grid grid-cols-4 gap-4">
      <BoxTarifs
        category="tarif simple"
        title="Heure de pointe 1"
        description="Ce tarif s'applique de 13h00 à 14h00"
        price="1000 Ar"
        backgroundColor="#18181d"
        textColor="#dcdce0"
      />
      <BoxTarifs
        category="tarif simple"
        title="Heure de pointe 2"
        description="Ce tarif s'applique de 18h00 à 19h00"
        price="1000 Ar"
        backgroundColor="#4343E6"
        textColor="#ffffff"
      />
    </div>
  );
}

export default ListeTarif;
