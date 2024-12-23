import { useContext, useEffect, useState } from "react";
import { Context } from "@/common/config/configs/Context";
import { usePercent } from "@/lib/hoocks/usePercent";
import { YEARLABEL } from "@/_mock/constant";
import DonuteChart from "./DonuteChart";
import StatistiqueBarChart from "./StatistiqueBarChart";
import { DONUTECHARTCONFIG } from "../config/DonutChartConfig";
import { STATISTIQUECONF } from "../config/StatistiqueConfig";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import Swal from "sweetalert2";
import { DONUTECHARTCONFIGGER } from "../config/DONUTECHARTCONFIGCHARGER";
import OpenStreetMap from "@/modules/Station/OpenStreetMap";
export default function ChartSection() {
  const { filters, filterYear } = useContext(Context);

  const {
    data: donuteData,
    error: errorDonute,
    isPending: loadingDonute,
  } = useQuery({
    queryKey: ["donuteChart"],
    queryFn: () =>
      axiosInstance
        .get("/connector/graph_connector_status")
        .then((res) => res.data),
    refetchInterval: 1000,
  });
  const {
    data: chargeData,
    error: errorCharger,
    isPending: loadingCharger,
  } = useQuery({
    queryKey: ["donuteChartCharger"],
    queryFn: () =>
      axiosInstance
        .get("/cp/status_cp")
        .then((res) => res.data),
    refetchInterval: 1000,
  });

  const {
    data: monthData,
    error: errorMonth,
    isPending: monthLoading,
  } = useQuery({
    queryKey: ["monthDataChart", filterYear],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_conso_energie/?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  const {
    data: trimestreDataQuery,
    error: errorTrimestre,
    isPending: trimestreLoading,
  } = useQuery({
    queryKey: ["trimestreDataChart", filterYear],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_trimestriel_conso_energie/?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  const {
    data: semestreData,
    error: errorSemestre,
    isPending: semestreLoading,
  } = useQuery({
    queryKey: ["semestreDataChart", filterYear],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_semestriel_conso_energie/?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
  });
  const isLoading =
    loadingDonute || monthLoading || trimestreLoading || semestreLoading || loadingCharger;
  const [trimestreData, setTrimestreData] = useState(trimestreDataQuery || []);
  const [semestredata, setSemestreData] = useState(semestreData || []);
  const [statistiqueData, setStatistiqueData] = useState(monthData || []);
  const [percentData, setPercentData] = useState(monthData || []);
  useEffect(() => {
    if (filterYear) {
      setTrimestreData(trimestreDataQuery);
      setSemestreData(semestreData);
    }
  }, [filterYear, filters, trimestreDataQuery, semestreData]);
  useEffect(() => {
    if (filters.bar === "Annuel") {
      setStatistiqueData(monthData);
      setPercentData(monthData);
    } else if (filters.bar === "Trimestriel") {
      setStatistiqueData(trimestreData);
      setPercentData(trimestreData);
    } else if (filters.bar === "Semestriel") {
      setStatistiqueData(semestredata);
      setPercentData(semestredata);
    } else {
      setStatistiqueData(monthData);
      setPercentData(monthData);
    }
  }, [filters, filterYear, monthData, trimestreData, semestredata]);

  const { percentVal } = usePercent(percentData);

  const [litleDescri, setlitleDescri] = useState(null);

  useEffect(() => {
    if (filters.bar === "Annuel" || filters.bar === "Mensuel") {
      if (percentVal === "∞") {
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
            Augmentation infinie par rapport à l'année dernière
          </div>
        );
      } else {
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
            {percentVal} que l'année dernière
          </div>
        );
      }
    } else {
      setlitleDescri(null);
    }
  }, [filters, percentVal]);

  if (errorDonute || errorMonth || errorSemestre || errorTrimestre || errorCharger) {
    Swal.fire({
      title: "Oops !",
      icon: "error",
      text: "Une erreur est survenue, veuillez réessayer plus tard",
    });
    return null;
  }

  return (
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full my-6 h-auto">
  {/* Premier DonuteChart - 1ère colonne */}
  <div className="col-span-1 w-full h-full mb-4">
    <DonuteChart
      chartConfig={DONUTECHARTCONFIGGER}
      chartData={chargeData}
      title="Statut des chargeurs"
      label="Chargeurs"
    />
  </div>

  {/* StatistiqueBarChart - 2ème colonne */}
  <div className="col-span-1 md:col-span-2 w-full h-full">
    <StatistiqueBarChart
      chartData={statistiqueData}
      statiStiqueConfig={STATISTIQUECONF}
      description={litleDescri}
      listFilterYearly={YEARLABEL}
      title="Énergie délivrée par kWh"
      loading={isLoading}
      className="w-full h-full"
    />
  </div>

  {/* Second DonuteChart - 3ème colonne */}
  <div className="col-span-1 w-full h-full mb-4">
    <DonuteChart
      chartConfig={DONUTECHARTCONFIG}
      chartData={donuteData}
      title="Statut des connecteurs"
      label="Connecteurs"
    />
  </div>

  {/* OpenStreetMap - 2ème colonne en responsive */}
  <div className="col-span-1 md:col-span-2 w-full h-full">
    <OpenStreetMap />
  </div>
</div>

  );
}
