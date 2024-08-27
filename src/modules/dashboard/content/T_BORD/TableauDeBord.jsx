import DonuteChart from "./components/DonuteChart";
import StatistiqueBarChart from "./components/StatistiqueBarChart";
import { useContext, useEffect, useState } from "react";
import { Context } from "@/common/config/configs/Context";
import { dataForDonute, dateSimulation } from "@/_mock/DataForSimulateDate";
import { compareData, getDataByMonth, getDataBySemestre, getDataByTrimestre, getDataByYear } from "@/lib/utils";
import { usePercent } from "@/lib/hooks";
import { YEARLABEL } from "@/_mock/constant";
import { DONUTECHARTCONFIG } from "./config/DonutChartConfig";
import { STATISTIQUECONF } from "./config/StatistiqueConfig";

const TableauDeBord = () => {
  const { filters, filterYear } = useContext(Context);
  const chargeurData = dataForDonute;
  const data = dateSimulation;
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

  const { percentVal , colorPercent } = usePercent(percentData);
  const [litleDescri, setlitleDescri] = useState(null);

  useEffect(() => {
    if (colorPercent && percentVal) {
      if(filters.bar === "Annuel" || filters.bar === "Mensuel"){
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
              <span className={`text-[${colorPercent}]`}>{percentVal}</span> que l'annee derniere
          </div>
        );
      }
    }
  }, [colorPercent, percentVal, filters]);
  return (
    <div className="w-full h-auto p-6">
      <h2 className="text-[#212B36] text-xl mb-6">Accueil/Tableau de bord</h2>
      
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
