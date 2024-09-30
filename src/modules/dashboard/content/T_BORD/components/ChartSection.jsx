import { useContext, useEffect, useState } from "react";
import { Context } from "@/common/config/configs/Context";
import { dataForDonute, dateSimulation } from "@/_mock/DataForSimulateDate";
import {
  compareData,
  getDataByMonth,
  getDataBySemestre,
  getDataByTrimestre,
  getDataByYear,
} from "@/lib/dataUtils";
import { usePercent } from "@/lib/hoocks/usePercent";
import { YEARLABEL } from "@/_mock/constant";
import DonuteChart from "./DonuteChart";
import StatistiqueBarChart from "./StatistiqueBarChart";
import { DONUTECHARTCONFIG } from "../config/DonutChartConfig";
import { STATISTIQUECONF } from "../config/StatistiqueConfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
export default function ChartSection() {
  const { filters, filterYear } = useContext(Context);
  const {data : donuteData, error, isLoading} = useQuery({queryKey : ['donuteChart'], queryFn : () => axiosInstance.get('/connector/graph_connector_status').then((res) => res.data), refetchInterval : 1000});
  
  const data = dateSimulation;
  const currentData = getDataByMonth(data, 2024);
  const oldData = getDataByMonth(data, 2022);
  const comparisonData = compareData(currentData, oldData);
  const [trimestreData, setTrimestreData] = useState(
    getDataByTrimestre(data, Number(filterYear))
  );
  const [semestredata, setSemestreData] = useState(
    getDataBySemestre(data, Number(filterYear))
  );
  const yearlyData = getDataByYear(data);
  const [statistiqueData, setStatistiqueData] = useState(comparisonData);
  const [percentData, setPercentData] = useState(comparisonData);

  useEffect(() => {
    if (filterYear) {
      setTrimestreData(getDataByTrimestre(data, Number(filterYear)));
      setSemestreData(getDataBySemestre(data, Number(filterYear)));
    }
  }, [filterYear, filters]);

  useEffect(() => {
    if (filters.bar === "Annuel") {
      setStatistiqueData(yearlyData);
      setPercentData();
    } else if (filters.bar === "Trimestriel") {
      setStatistiqueData(trimestreData);
      setPercentData();
    } else if (filters.bar === "Semestriel") {
      setStatistiqueData(semestredata);
      setPercentData();
    } else {
      setStatistiqueData(comparisonData);
      setPercentData();
    }
  }, [filters, filterYear, semestredata, trimestreData]);

  const { percentVal } = usePercent(percentData);
  const [litleDescri, setlitleDescri] = useState(null);

  useEffect(() => {
    if (percentVal) {
      if (filters.bar === "Annuel" || filters.bar === "Mensuel") {
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
            {percentVal} que l'année dernière
          </div>
        );
      }
    }
  }, [filters]);
  if(error){
    return <p>error</p>
  }
  if(isLoading) {
    return <p>loading...</p>
  }
  return (
    <div className="grid max-sm:grid-cols-1 max-sm:place-items-center grid-cols-3 gap-6 w-full my-5">
      <div className="col-span-1 max-sm:w-full h-full">
        <DonuteChart
          chartConfig={DONUTECHARTCONFIG}
          chartData={donuteData}
          title="Statut des connecteurs"
          label="Connecteurs"
          className="w-full p-5 flex flex-col shadow-combined rounded-xl bg-pink-300 h-full"
        />
      </div>
      <div className="col-span-2 max-sm:w-full max-sm:col-span-1">
        <StatistiqueBarChart
          chartData={statistiqueData}
          statiStiqueConfig={STATISTIQUECONF}
          description={litleDescri}
          listFilterYearly={YEARLABEL}
          title="Énergie délivrée par kWh"
        />
      </div>
    </div>
  );
}
