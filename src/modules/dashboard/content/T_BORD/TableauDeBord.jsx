import { BsFillEvStationFill } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Box from "./components/Box";
import { CgUnavailable } from "react-icons/cg";
import { TbRecharging } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import DonuteChart from "./components/DonuteChart";
import StatistiqueBarChart from "./components/StatistiqueBarChart";
import { useContext } from "react";
import { Context } from "@/common/config/configs/Context";

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
  const statistiqueData = [
    { month: "January", currentValue: 186, oldValue : 362},
    { month: "February", currentValue: 305, oldValue : 300 },
    { month: "March", currentValue: 237, oldValue : 285 },
    { month: "April", currentValue: 73, oldValue : 109 },
    { month: "May", currentValue: 209, oldValue :  409},
    { month: "June", currentValue: 214, oldValue :  290},
    { month: "Juillet", currentValue: 186, oldValue :  387},
    { month: "Aout", currentValue: 305, oldValue :  134},
    { month: "Septembre", currentValue: 237, oldValue : 109},
    { month: "Octobre", currentValue: 73, oldValue :  234},
    { month: "Novembre", currentValue: 209, oldValue :  341},
    { month: "Decembre", currentValue: 214, oldValue :  173},
  ];
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
