import { BsFillEvStationFill } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Box from "./components/Box";
import { CgUnavailable } from "react-icons/cg";
import { TbRecharging } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import DonuteChart from "./components/DonuteChart";
import StatistiqueBarChart from "./components/StatistiqueBarChart";
import { useContext, useState } from "react";
import { Context } from "@/common/config/configs/Context";
import { dateSimulation } from "@/_mock/DataForSimulateDate";
import { getDataByMonth } from "@/lib/utils";


const TableauDeBord = () => {
  const { filterBar } = useContext(Context)
  
  const chargeurData = [ 
    { status: "chargin", value: 75, fill: "var(--color-chargin)" },
    { status: "available", value: 200, fill: "var(--color-available)" },
    { status: "unavailable", value: 28, fill: "var(--color-unavailable)" },
  ]
  
  const donuteConfig = {
    chargin: {
      label: "En cours d'utilisation",
      color: "#3D9DF2",
    },
    available: {
      label: "Disponible",
      color: "#83838d",
    },
    unavailable: {
      label: "Hors service",
      color: "#F2505D",
    }
  }
// const [statistiqueData, setStatistiqueData] = useState([]);
const currenTData = getDataByMonth(dateSimulation, 2024);
const oldData = getDataByMonth(dateSimulation, 2022);

// Créer un Map pour les données de l'année précédente, indexées par le label du mois
const oldDataMap = new Map();
oldData.forEach(monthOldData => {
  oldDataMap.set(monthOldData.label, monthOldData.value);
});

const statistiqueData = currenTData.map(monthCurrentData => {
  const oldValue = oldDataMap.get(monthCurrentData.label) || 0;
  return {
    label: monthCurrentData.label,
    currentValue: monthCurrentData.value,
    oldValue: oldValue
  };
});
  const statiStiqueConfig = {
    oldvalue : {
      label : "Statistique ancien",
      color : "#F29F05"
    },
    currentValue : {
      label : "Statistique actuel",
      color : "#3D9DF2"
    },
    barconfig : {
      label : "Valeur exact actuel",
      color : "#F2505D"
    }
  }
  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Accueil/Tableau de bord</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-col-4 gap-6">
        <Box
            Title="Nombre total de Session "
            Value="100"
            FirstIcone={BsFillEvStationFill}
            SecondIcone={FaUser}
            color="#3D9DF2"
            filter="mensuel"
          />
          <Box
            Title="Total energie delivré"
            Value="40 kWh"
            FirstIcone={BsFillEvStationFill}
            SecondIcone={TbWorldShare}
            color="#0F3F69"
            filter="mensuel"
          />
          <Box
            Title="Revenus total"
            Value="450K Ar"
            FirstIcone={BsFillEvStationFill}
            SecondIcone={GiReceiveMoney}
            color="#842F86"
            filter="mensuel"
          />
          <Box
            Title="Defaillance et perte de connexion"
            Value="40"
            FirstIcone={BsFillEvStationFill}
            SecondIcone={CgUnavailable}
            color="#F2505D"
            filter={null}
          />
          <Box
            Title="Session de recharge en cours"
            Value="40"
            FirstIcone={BsFillEvStationFill}
            SecondIcone={TbRecharging}
            color="#F29F05"
            filter={null}
          />
          
          <Box
            Title="Nouveaux clients"
            Value="10"
            FirstIcone={FaUser}
            SecondIcone={FaUser}
            color="#26BF78"
            filter="mensuel"
          />
        </div>
        <div className="grid max-sm:grid-cols-1 max-sm:place-items-center grid-cols-3 gap-6 w-full my-5">
          <div className="col-span-1 max-sm:w-full h-full">
            <DonuteChart 
              chartConfig={donuteConfig} 
              chartData={chargeurData} 
              title="Status des chargeurs" 
              label="Chargeurs" 
              className="w-full p-5 flex flex-col shadow-combined rounded-xl bg-pink-300 h-full"
            />
          </div>
          <div className="col-span-2 max-sm:w-full">
                 <StatistiqueBarChart chartData={statistiqueData} statiStiqueConfig={statiStiqueConfig} title="Enérgie délivrer par kWh" />              
          </div>
        </div>
        <div className="">
          test
        </div>
    </div>
  );
};

export default TableauDeBord;
