import React from "react";
import { BsFillEvStationFill } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Box from "./components/Box";
import { CgUnavailable } from "react-icons/cg";
import { TbRecharging } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import DonuteChart from "./components/DonuteChart";
import StatistiqueBarChart from "./components/StatistiqueBarChart";

const TableauDeBord = () => {
  const chartData = [ 
    { browser: "firefox", visitors: 28, fill: "var(--color-firefox)" },
    { browser: "chrome", visitors: 75, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  ]
  
  const chartConfig = {
   
    chrome: {
      label: "En cours d'utilisation",
      color: "#3D9DF2",
    },
    safari: {
      label: "Disponible",
      color: "#83838d",
    },
    firefox: {
      label: "Hors service",
      color: "#F2505D",
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
      chartConfig={chartConfig} 
      chartData={chartData} 
      label="Status des chargeurs" 
      value="Chargeurs" 
      className="w-full p-5 flex flex-col shadow-combined rounded-xl bg-pink-300 h-full"
    />
  </div>
  <div className="col-span-2 max-sm:w-full">
    <StatistiqueBarChart />
  </div>
</div>

    </div>
  );
};

export default TableauDeBord;
