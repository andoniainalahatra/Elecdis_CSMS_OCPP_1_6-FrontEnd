import { useContext, useEffect, useState } from 'react'
import { BsFillEvStationFill } from "react-icons/bs";
import { TbWorldShare } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import Box from "./Box";
import { CgUnavailable } from "react-icons/cg";
import { TbRecharging } from "react-icons/tb";
import { GiReceiveMoney } from "react-icons/gi";
import { dataForBox } from "@/_mock/DataForSimulateDate";
import { Context } from '@/common/config/configs/Context';
import { usePercent } from '@/lib/hoocks/usePercent';
import { updateValue } from '@/lib/updateValue';
export default function BoxSection() {
  const { filters } = useContext(Context);
  const [energyDeliveryValue, setEnergyDeliveryValue] = useState(0);
  const [newClient, setNewClient] = useState(0)
  const [revenu, setRevenu] = useState(0)
  const [session, setSession] = useState(0)
  const boxData = dataForBox;

  useEffect(() => {
    updateValue(filters.nombreSession, "session", setSession);
  }, [filters.nombreSession]);
  
  useEffect(() => {
    updateValue(filters.energyDelivery, "energy_kWh", setEnergyDeliveryValue);
  }, [filters.energyDelivery]);
  
  useEffect(() => {
    updateValue(filters.newClient, "new_user", setNewClient);
  }, [filters.newClient]);
  
  useEffect(() => {
    updateValue(filters.revenu, "revenue", setRevenu);
  }, [filters.revenu]);

  const { percentVal , colorPercent } = usePercent(0);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-col-4 gap-6">
    <Box
      Title="Nombre total de Session"
      Value={session}
      FirstIcone={BsFillEvStationFill}
      SecondIcone={FaUser}
      litleStatistique={litleDescri}
      color="#3D9DF2"
      filter="nombreSession"
    />
    <Box
      Title="Total énergie délivrée"
      Value={energyDeliveryValue}
      FirstIcone={BsFillEvStationFill}
      SecondIcone={TbWorldShare}
      litleStatistique={litleDescri}
      color="#0F3F69"
      filter="energyDelivery"
    />
    <Box
      Title="Revenus totaux"
      Value={revenu}
      FirstIcone={BsFillEvStationFill}
      SecondIcone={GiReceiveMoney}
      litleStatistique={litleDescri}
      color="#842F86"
      filter="revenu"
    />
    <Box
      Title="Défaillance et perte de connexion"
      Value={boxData.dataNoFilter.fail}
      FirstIcone={BsFillEvStationFill}
      SecondIcone={CgUnavailable}
      litleStatistique={null}
      color="#F2505D"
      filter={null}
    />
    <Box
      Title="Session de recharge en cours"
      Value={boxData.dataNoFilter.charging}
      FirstIcone={BsFillEvStationFill}
      SecondIcone={TbRecharging}
      litleStatistique={null}
      color="#F29F05"
      filter={null}
    />
    <Box
      Title="Nouveaux clients"
      Value={newClient}
      FirstIcone={FaUser}
      SecondIcone={FaUser}
      litleStatistique={litleDescri}
      color="#26BF78"
      filter="newClient"
    />
  </div>
  )
}
