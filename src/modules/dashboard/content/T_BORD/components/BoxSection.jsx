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
export default function BoxSection() {
  const { filters } = useContext(Context);
  const [energyDeliveryValue, setEnergyDeliveryValue] = useState(0);
  const [newClient, setNewClient] = useState(0)
  const [revenu, setRevenu] = useState(0)
  const [session, setSession] = useState(0)
  const boxData = dataForBox;

  useEffect(() => {
    if (filters.nombreSession === "journalier") {
      setSession(boxData.dataWithFilter.journalier.session);
    } if(filters.nombreSession === "mensuel") {
        setSession(boxData.dataWithFilter.mensuel.session); 
    } if(filters.nombreSession === "trimestriel") {
        setSession(boxData.dataWithFilter.trimestriel.session); 
    }
    if(filters.nombreSession === "semestriel") {
      setSession(boxData.dataWithFilter.semestriel.session); 
    }
    if(filters.nombreSession === "annuel") {
      setSession(boxData.dataWithFilter.annuel.session); 
  }
  }, [filters.nombreSession])
  useEffect(() => {
    if (filters.energyDelivery === "journalier") {
      setEnergyDeliveryValue(boxData.dataWithFilter.journalier.energy_kWh);
    } if(filters.energyDelivery === "mensuel") {
        setEnergyDeliveryValue(boxData.dataWithFilter.mensuel.energy_kWh); 
    } if(filters.energyDelivery === "trimestriel") {
        setEnergyDeliveryValue(boxData.dataWithFilter.trimestriel.energy_kWh); 
    }
    if(filters.energyDelivery === "semestriel") {
      setEnergyDeliveryValue(boxData.dataWithFilter.semestriel.energy_kWh); 
    }
    if(filters.energyDelivery === "annuel") {
      setEnergyDeliveryValue(boxData.dataWithFilter.annuel.energy_kWh); 
  }
  }, [filters.energyDelivery])

  useEffect(() => {
    if (filters.newClient === "journalier") {
      setNewClient(boxData.dataWithFilter.journalier.new_user);
    } if(filters.newClient === "mensuel") {
        setNewClient(boxData.dataWithFilter.mensuel.new_user); 
    } if(filters.newClient === "trimestriel") {
        setNewClient(boxData.dataWithFilter.trimestriel.new_user); 
    }
    if(filters.newClient === "semestriel") {
      setNewClient(boxData.dataWithFilter.semestriel.new_user); 
    }
    if(filters.newClient === "annuel") {
      setNewClient(boxData.dataWithFilter.annuel.new_user); 
  }
  }, [filters.newClient])
  useEffect(() => {
    if (filters.revenu === "journalier") {
      setRevenu(boxData.dataWithFilter.journalier.revenue);
    } if(filters.revenu === "mensuel") {
        setRevenu(boxData.dataWithFilter.mensuel.revenue); 
    } if(filters.revenu === "trimestriel") {
        setRevenu(boxData.dataWithFilter.trimestriel.revenue); 
    }
    if(filters.revenu === "semestriel") {
      setRevenu(boxData.dataWithFilter.semestriel.revenue); 
    }
    if(filters.revenu === "annuel") {
      setRevenu(boxData.dataWithFilter.annuel.revenue); 
  }
  }, [filters.revenu])

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
