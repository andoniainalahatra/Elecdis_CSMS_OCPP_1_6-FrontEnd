import { useContext, useEffect, useState } from "react";
import { BsFillEvStationFill } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Box from "./Box";
import { CgUnavailable } from "react-icons/cg";
import { TbRecharging } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { Context } from "@/common/config/configs/Context";
import { usePercent } from "@/lib/hoocks/usePercent";
import {
  useGetDataByDay,
  useGetDataByMonth,
  useGetDataByYear,
  useGetDataFilter,
  useGetDataHistorique,
  useGetTotal,
} from "../features/BoxApi";
import { useSelector } from "react-redux";
import {
  selectBoxDateSpecific,
  selectNewUserDateSpecific,
} from "../features/filterCalendarSelector";
import { isFullDate, isMonthPresent, isOnlyYear } from "@/lib/utils";

import { RiFileHistoryLine } from "react-icons/ri";
import { MdOutlineHistory } from "react-icons/md";

export default function BoxSection({ setSection }) {
  const year = new Date().getFullYear();
  const { filters } = useContext(Context);
  const filterBox = useSelector(selectBoxDateSpecific);
  const nombreNewUserDateSpecifique = useSelector(selectNewUserDateSpecific);

  const getSessionData = () => {
    if (isFullDate(filterBox)) {
      return useGetDataByDay(
        "/dashboard/sessions_by_date",
        "dataSessionDay",
        filterBox
      );
    } else if (isMonthPresent(filterBox)) {
      const [year, month] = filterBox.split("-");
      return useGetDataByMonth(
        "/dashboard/sessions_by_year_month",
        "dataSessionMonth",
        month,
        year
      );
    } else if(isOnlyYear(filterBox)) {
      return useGetDataByYear(
        "/dashboard/sessions_by_year_month",
        "dataSessionYear",
        filterBox
      );
    }
    else{
      return useGetTotal(
        "/dashboard/total_sessions",
        "totalSession"
      )
    }
  };

  const getEnergyData = () => {
    if (isFullDate(filterBox)) {
      return useGetDataByDay(
        "/dashboard/energy_by_date",
        "dataEnergyDay",
        filterBox
      );
    } else if (isMonthPresent(filterBox)) {
      const [year, month] = filterBox.split("-");
      return useGetDataByMonth(
        "/dashboard/energy_by_year_month",
        "dataEnergyMonth",
        month,
        year
      );
    } else if(isOnlyYear(filterBox)) {
      return useGetDataByYear(
        "/dashboard/energy_by_year_month",
        "dataEnergyYear",
        filterBox
      );
    }
    else{
      return useGetTotal(
        "/dashboard/total_energy",
        "totalEnergy"
      )
    }
  };

  const getRevenuData = () => {
    if (isFullDate(filterBox)) {
      return useGetDataByDay(
        "/dashboard/total_revenus_date",
        "dataRevenuDay",
        filterBox
      );
    } else if (isMonthPresent(filterBox)) {
      const [year, month] = filterBox.split("-");
      return useGetDataByMonth(
        "/dashboard/total_revenus_year",
        "dataRevenuMonth",
        month,
        year
      );
    } else if(isOnlyYear(filterBox)) {
      return useGetDataByYear(
        "/dashboard/total_revenus_year",
        "dataRevenuYear",
        filterBox
      );
    }
    else{
      return useGetTotal(
        "/dashboard/total_revenus",
        "totaleRevenu"
      );
    }
  };

  // const getNewUserData = () => {
  //   if (isFullDate(nombreNewUserDateSpecifique)) {
  //     return useGetDataByDay(
  //       "/dashboard/new_users_date",
  //       "dataNewUserDay",
  //       nombreNewUserDateSpecifique
  //     );
  //   } else if (isMonthPresent(nombreNewUserDateSpecifique)) {
  //     const [year, month] = nombreNewUserDateSpecifique.split("-");
  //     return useGetDataByMonth(
  //       "/dashboard/new_users_year",
  //       "dataNewUserMonth",
  //       month,
  //       year
  //     );
  //   } else {
  //     return useGetDataByYear(
  //       "/dashboard/new_users_year",
  //       "dataNewUserYear",
  //       nombreNewUserDateSpecifique
  //     );
  //   }
  // };

  const sessionData = getSessionData();
  const energyData = getEnergyData();
  const revenuData = getRevenuData();
  // const newUserData = getNewUserData();

  const { percentVal, colorPercent } = usePercent(0);
  const [litleDescri, setlitleDescri] = useState(null);
  const {
    data: dataCurrentSession,
    isPending: loadingCurrentSession,
    error: errorCurrentSession,
  } = useGetDataFilter("transaction/current/count", "currentSession");
  const {
    data: dataDefaillance,
    isPending: pendingFail,
    error: errorFail,
  } = useGetDataFilter("/cp/count_status_cp/Unavailable", "defaillance");

  const {
    data: dataDistoriqueCp,
    isPending: pendingCp,
    error: errorCp,
  } = useGetDataFilter("cp/historique_status_chargepoint", "HistoriqueStatusCp");

  useEffect(() => {
    if (colorPercent && percentVal) {
      if (filters.bar === "Annuel" || filters.bar === "Mensuel") {
        setlitleDescri(
          <div className="w-full flex items-center gap-1 text-[14px] text-[#637381]">
            <span className={`text-[${colorPercent}]`}>{percentVal}</span> que
            l'annee derniere
          </div>
        );
      }
    }
  }, [colorPercent, percentVal, filters]);
  if (errorCurrentSession || errorFail || sessionData.error || revenuData.error || energyData.error || errorCp) {
    return <div className="">erreur...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-col-4">
      <Box
        setSection={setSection}
        SectionName="sessionRecharge"
        Title={`Nombre Totale de Session`}
        Value={sessionData.data?.sessions_numbers}
        FirstIcone={BsFillEvStationFill}
        SecondIcone={FaUser}
        litleStatistique={litleDescri}
        color="#3D9DF2"
        filter="nombreSession"
        isLoading={sessionData.isPending}
      />
      <Box
        setSection={setSection}
        SectionName="PointsDecharges"
        Title={`Energie Totale délivrée`}
        Value={energyData.data?.energy}
        FirstIcone={BsFillEvStationFill}
        SecondIcone={TbWorldShare}
        litleStatistique={litleDescri}
        color="#0F3F69"
        filter="energyDelivery"
        isLoading={energyData.isPending}
      />
      <Box
        setSection={setSection}
        SectionName="Transaction"
        Title={`Revenus Totaux`}
        Value={revenuData.data?.total_revenus}
        FirstIcone={BsFillEvStationFill}
        SecondIcone={GiReceiveMoney}
        litleStatistique={litleDescri}
        color="#842F86"
        filter="revenu"
        isLoading={revenuData.isPending}
      />
      <Box
        setSection={setSection}
        SectionName="CpNotices"
        Title="Défaillance interne"
        Value={dataDefaillance && dataDefaillance[0]?.nombre}
        FirstIcone={BsFillEvStationFill}
        SecondIcone={CgUnavailable}
        litleStatistique={null}
        color="#FC210D"
        filter={null}
        isLoading={pendingFail}
      />
      <Box
        setSection={setSection}
        SectionName="sessionRecharge"
        Title="Session de recharge en cours"
        Value={dataCurrentSession?.count_current_session}
        FirstIcone={BsFillEvStationFill}
        SecondIcone={TbRecharging}
        litleStatistique={null}
        color="#18A5A7"
        filter={null}
        isLoading={loadingCurrentSession}
      />
      {/* <Box
        setSection={setSection} 
        SectionName="Clients"
        Title="Nouveaux clients"
        Value={newUserData.data?.new_users_numbers}
        FirstIcone={FaUser}
        SecondIcone={FaUser}
        litleStatistique={litleDescri}
        color="#26BF78"
        filter="newClient"
        isLoading={newUserData.isPending}
      /> */}

      <Box
        setSection={setSection}
        SectionName="HistoriqueStatusCp"
        Title="Historique status Charge Point"
        Value={dataDistoriqueCp?.pagination.total_items}
        FirstIcone={RiFileHistoryLine}
        SecondIcone={MdOutlineHistory}
        litleStatistique={null}
        color="#EECC51"
        filter={null}
        isLoading={pendingCp}
      />
    </div>
  );
}
