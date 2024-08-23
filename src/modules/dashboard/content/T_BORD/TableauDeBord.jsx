import { BsFillEvStationFill } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Box from "./components/Box";
import { CgUnavailable } from "react-icons/cg";
import { TbRecharging } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import DonuteChart from "./components/DonuteChart";
import StatistiqueBarChart from "./components/StatistiqueBarChart";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/common/config/configs/Context";
import { dateSimulation } from "@/_mock/DataForSimulateDate";
import { compareData, getDataByMonth, getDataBySemestre, getDataByTrimestre, getDataByYear } from "@/lib/utils";
import { usePercent } from "@/lib/hooks";
import { FILTER } from "@/_mock/constant";
import { YEARLABEL } from "@/_mock/constant";

const TableauDeBord = () => {
  const statiStiqueConfig = {
    oldvalue: {
      label: "Statistique ancien",
      color: "#F29F05"
    },
    currentValue: {
      label: "Statistique actuel",
      color: "#3D9DF2"
    },
    barconfig: {
      label: "Valeur exacte actuelle",
      color: "#F2505D"
    }
  };
  const data = dateSimulation;
  const { filterBar, filterYear } = useContext(Context);
  console.log(filterYear);
  
  const currentData = getDataByMonth(data, 2024);
  const oldData = getDataByMonth(data, 2022);
  const comparisonData = compareData(currentData, oldData);
  const [trimestreData, setTrimestreData] = useState(getDataByTrimestre(data, Number(filterYear)));
  const [semestredata, setSemestreData] = useState(getDataBySemestre(data, Number(filterYear)));
  const yearlyData = getDataByYear(data);
  const [statistiqueData, setStatistiqueData] = useState(comparisonData);
  const [percentData, setPercentData] = useState(comparisonData);
  useEffect(() => {
    if(filterYear){
      setTrimestreData(getDataByTrimestre(data, Number(filterYear)));
      setSemestreData(getDataBySemestre(data, Number(filterYear)))
    }
  }, [filterYear, filterBar])
  useEffect(() => {
    if (filterBar === "Annuel") {
      setStatistiqueData(yearlyData)
      setPercentData();
    }else if (filterBar === "Trimestriel"){
      setStatistiqueData(trimestreData)
      setPercentData();
    }else if (filterBar === "Semestriel"){
      setStatistiqueData(semestredata)
      setPercentData();
    }  else {
      setStatistiqueData(comparisonData)
      setPercentData();
    }
  }, [filterBar, filterYear]);
  const { percentVal , colorPercent } = usePercent(percentData)
  const [litleDescri, setlitleDescri] = useState(null);
  useEffect(() => {
    if (colorPercent && percentVal) {
      if(filterBar === "Annuel" || filterBar === "Mensuel"){
        setlitleDescri(
          <p className="text-[#637381] text-[14px]">
            <span className={`text-[${colorPercent}]`}>{percentVal}</span> que l'annee derniere
          </p>
        );
      }
    }
  }, [colorPercent, percentVal, filterBar]);

  const chargeurData = [
    { status: "chargin", value: 75, fill: "var(--color-chargin)" },
    { status: "available", value: 200, fill: "var(--color-available)" },
    { status: "unavailable", value: 28, fill: "var(--color-unavailable)" },
  ];
  
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
  };
  


  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Accueil/Tableau de bord</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-col-4 gap-6">
        <Box
          Title="Nombre total de Session"
          Value="100"
          FirstIcone={BsFillEvStationFill}
          SecondIcone={FaUser}
          color="#3D9DF2"
          filter="mensuel"
        />
        <Box
          Title="Total énergie délivrée"
          Value="40 kWh"
          FirstIcone={BsFillEvStationFill}
          SecondIcone={TbWorldShare}
          color="#0F3F69"
          filter="mensuel"
        />
        <Box
          Title="Revenus totaux"
          Value="450K Ar"
          FirstIcone={BsFillEvStationFill}
          SecondIcone={GiReceiveMoney}
          color="#842F86"
          filter="mensuel"
        />
        <Box
          Title="Défaillance et perte de connexion"
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
            title="Statut des chargeurs" 
            label="Chargeurs" 
            className="w-full p-5 flex flex-col shadow-combined rounded-xl bg-pink-300 h-full"
          />
        </div>
        <div className="col-span-2 max-sm:w-full">
        <StatistiqueBarChart 
        chartData={statistiqueData} // Utilisation de statistiqueData qui est mis à jour dans useEffect
        statiStiqueConfig={statiStiqueConfig} 
        description={litleDescri}
        filter={FILTER}
        filterYearly ={YEARLABEL}
        title="Énergie délivrée par kWh" 
        />
        </div>
      </div>
      <div>
        test
      </div>
    </div>
  );
};

export default TableauDeBord;
