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
import { dataForBox, dataForDonute, dateSimulation } from "@/_mock/DataForSimulateDate";
import { compareData, getDataByMonth, getDataBySemestre, getDataByTrimestre, getDataByYear } from "@/lib/utils";
import { usePercent } from "@/lib/hooks";
import { YEARLABEL } from "@/_mock/constant";
import { DONUTECHARTCONFIG } from "./config/DonutChartConfig";
import { STATISTIQUECONF } from "./config/StatistiqueConfig";

const TableauDeBord = () => {

  const { filters, filterYear } = useContext(Context);

  const chargeurData = dataForDonute;
  const data = dateSimulation;
  const boxData = dataForBox;
  const [energyDeliveryValue, setEnergyDeliveryValue] = useState(0);

  useEffect(() => {
    const energyDeliveryByFilter = boxData.energyDelivered.find(data => data.period === filters.energyDelivery);
    if (energyDeliveryByFilter) {
      setEnergyDeliveryValue(energyDeliveryByFilter.energy_kWh);
    } else {
        setEnergyDeliveryValue(0); 
    }
  }, [filters.energyDelivery])


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
  }, [filterYear, filters]);

  useEffect(() => {
    if (filters.bar === "Annuel") {
      setStatistiqueData(yearlyData)
      setPercentData();
    }else if (filters.bar === "Trimestriel"){
      setStatistiqueData(trimestreData)
      setPercentData();
    }else if (filters.bar === "Semestriel"){
      setStatistiqueData(semestredata)
      setPercentData();
    }  else {
      setStatistiqueData(comparisonData)
      setPercentData();
    }
  }, [filters, filterYear, semestredata, trimestreData]);

  const { percentVal , colorPercent } = usePercent(percentData)
  const [litleDescri, setlitleDescri] = useState(null);

  useEffect(() => {
    if (colorPercent && percentVal) {
      if(filters.bar === "Annuel" || filters.bar === "Mensuel"){
        setlitleDescri(
          <p className="text-[#637381] text-[14px]">
            <span className={`text-[${colorPercent}]`}>{percentVal}</span> que l'annee derniere
          </p>
        );
      }
    }
  }, [colorPercent, percentVal, filters]);
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
          filter="nombreSession"
        />
        <Box
          Title="Total énergie délivrée"
          Value={energyDeliveryValue}
          FirstIcone={BsFillEvStationFill}
          SecondIcone={TbWorldShare}
          color="#0F3F69"
          filter="energyDelivery"
        />
        <Box
          Title="Revenus totaux"
          Value="450K Ar"
          FirstIcone={BsFillEvStationFill}
          SecondIcone={GiReceiveMoney}
          color="#842F86"
          filter="revenu"
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
          filter="newClient"
        />
      </div>
      <div className="grid max-sm:grid-cols-1 max-sm:place-items-center grid-cols-3 gap-6 w-full my-5">
        <div className="col-span-1 max-sm:w-full h-full">
          <DonuteChart 
            chartConfig={DONUTECHARTCONFIG} 
            chartData={chargeurData} 
            title="Statut des chargeurs" 
            label="Chargeurs" 
            className="w-full p-5 flex flex-col shadow-combined rounded-xl bg-pink-300 h-full"
          />
        </div>
        <div className="col-span-2 max-sm:w-full">
        <StatistiqueBarChart 
        chartData={statistiqueData}
        statiStiqueConfig={STATISTIQUECONF} 
        description={litleDescri}
        listFilterYearly ={YEARLABEL}
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
