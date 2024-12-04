import React, { useEffect, useState } from "react";
import { FaPlug, FaUserAlt } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";
import { BiSolidEvStation } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import IconWithText from "@/modules/dashboard/component/IconWithText";
import TransactionRechargeTable from "./TransactionRechargeTable";
import { takeOnlyDate, takeOnlyTime } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import Logo from "@/assets/logo1.png"


const WacthBilling =({action})=>{
return(
  <div className="">
          {/* <div className="flex p-4 bg-white rounded-lg items-center mb-3 gap-4 border-white shadow-gray-300 justify-end"> */}
               <button className="border-blue-600  hover:border-blue-800 bg-blue-700 hover:bg-blue-800 border-solid border-2 h-[45px] text-white hover:text-white px-5 flex items-center font-semibold
               max-md:text-sm text-[14px] rounded-lg space-x-9 relative shadow-sm shadow-blue-300 transition duration-300 ease-in-out"
               onClick={action}>

                    <span>Voir la facture  </span>
                    <div className=""> </div>
                    <div className="bg-blue-800 hover:bg-blue-800 h-[45px] w-[45px] absolute right-0 flex items-center justify-center rounded-lg transition duration-300 ease-in-out ">
                      <LiaMoneyCheckSolid className="w-[1.3rem] h-[1.3rem] text-white group-hover:text-white" />
                    </div>
               </button>
          </div>
  // </div>
)}

const Billing = ({ IdSession,handleVisible }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["repoFact", IdSession],
    queryFn: () =>
      axiosInstance.get(
        `/historique_session/facture?id_historique_session=${IdSession}`
      ),
  });

  if (isLoading)
    return <div className="text-gray-400 text-center text-sm">Chargement...</div>;

  if (error)
    return (
      <div className="text-red-500 text-center text-sm">
        Erreur : {error.response?.data?.message || error.message}
      </div>
    );

  const facture = data?.data;

  // Fonction pour formater le total
  const formatCurrency = (value) => {
    return value
      .toFixed(2) // Fixe à 2 décimales
      .replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Ajoute un espace comme séparateur de milliers
  };
  const formatDateTime = (date) => {
    const optionsDate = { year: "numeric", month: "long", day: "numeric" };
    const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const dateString = new Date(date).toLocaleDateString(undefined, optionsDate);
    const timeString = new Date(date).toLocaleTimeString(undefined, optionsTime);
    return { dateString, timeString };
  };

  return (
    <div  className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
    style={{ backgroundColor: "rgba(9,16,26,0.7)" }}>
      <div className="fixed  w-[100vh]  z-50 bg-white max-w-lg mx-auto p-4 rounded-lg shadow-sm shadow-gray-300 space-y-4 max-md:h-screen max-md:w-screen" onClick={()=>handleVisible()}>
              <img src={Logo} className="h-13 w-13 flex justify-end" alt="" />
      <h1 className="text-lg font-medium text-[#101C84] text-center"> Facturation</h1>
      
      {/* Section Principale */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div>
            <p>
              <span className="font-medium text-gray-800">Adresse:</span>{" "}
              {facture.address || "Non spécifiée"}
            </p>
            <p>
              <span className="font-medium text-gray-800">Date:</span>{" "}
              {/* {new Date(facture.date).toLocaleString()} */}
              {formatDateTime(facture.date).dateString} à {" "}
              <span className="font-medium text-sm text-gray-600">  
                 {formatDateTime(facture.date).timeString}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-800">Début:</span>{" "}
              {/* {new Date(facture.debut_session).toLocaleString()} */}
              {formatDateTime(facture.debut_session).dateString} à{" "}
              <span className="font-medium text-sm text-gray-600">  
               {formatDateTime(facture.debut_session).timeString}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-800">Fin:</span>{" "}
              {/* {new Date(facture.fin_session).toLocaleString()} */}
              {formatDateTime(facture.fin_session).dateString} à{" "}
              <span className="font-medium text-sm text-gray-600">  

               {formatDateTime(facture.fin_session).timeString}

              </span>
            </p>
          </div>
          <div className="p-1">
            <p>
              <span className="font-medium text-gray-800">Énergie consommée:</span>{" "}
              <span className="font-semibold">
                {facture.total_energy_no_majoration.toFixed(2)}{" "}
                {facture.energy_unit}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-800">Énergie (majorée):</span>{" "}
              <span className="font-semibold">
                {facture.total_energy_with_majoration.toFixed(2)}{" "}
                {facture.energy_unit}
              </span>
              
            </p>
            <p>
              <span className="font-medium text-gray-800">Statut:</span>{" "}
              <span className="bg-green-100 rounded-lg text-green-900 px-2 font-semibold">
               {facture.status || "Inconnu"}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-800">Devise:</span>{" "}
              {facture.currency || "Aucune"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Tarifs Appliqués */}
      {facture.tarif_applique?.length > 0 && (
        <div className="space-y-3 ">
          <h2 className="text-sm font-medium text-gray-800">Tarifs Appliqués</h2>
          {facture.tarif_applique.map((tarif, index) => (
            <div
              key={index}
              className="bg-gray-50 p-2 rounded-lg shadow-sm border border-gray-200"
            >
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-800">Nom:</span>{" "}
                {tarif.tarif_name || "Non spécifié"}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-800">Prix par unité:</span>{" "}
                {tarif.price} {facture.currency}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-800">Énergie applicable:</span>{" "}
                <span className="font-semibold">
                  {tarif.kwh_applicable.toFixed(2)} {facture.energy_unit}
                </span>
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium text-gray-800">Majoration:</span>{" "}
                {tarif.majoration || 0}%
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* Total */}
      <div className="p-2 bg-gray-50 rounded-lg shadow text-center">
        <p className="text-sm font-semibold text-gray-800">
          Total: {formatCurrency(facture.total_price)} {facture.currency}
        </p>
      </div>
    </div>
    </div>
   
  );
};



  const SessionDetails = ({ Id, dataObj }) => {
  const [detailSession, setDetailSession] = useState(null);
  const [visible,setVisible]=useState(false);

  /**
   **Function permettant de ouvrir ou fermer la composante.
   */

  function handleVisible(){
    (visible===false)?setVisible(true):setVisible(false);
  }



  useEffect(() => {
    if (dataObj) {
      setDetailSession(dataObj);
    }
  }, [dataObj]);
  
  
  return (
    <div className="bg-[#F9FAFB] p-8 rounded-lg shadow-lg h-auto w-screen">
      <h2 className="text-2xl font-bold text-blue-600 my-6 flex items-center">
        <FaPlug className="mr-2" /> Détails de la Session de Recharge
      </h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-combined col-span-1 p-[2vw] rounded-lg">
          <div className="">
            <h4 className="text-xl mb-6 text-[#596875] font-medium">
              Informations client
            </h4>
            <IconWithText
              Icon={FaUserAlt}
              Value={detailSession ? detailSession.user_name : "null"}
            />
            <IconWithText
              Icon={PiCardsFill}
              Value={detailSession ? detailSession.rfid : "null"}
            />
          </div>
          <div className="">
            <h4 className="text-xl mb-6 mt-6 text-[#596875] font-medium">
              Détails de la Session
            </h4>
            <IconWithText
              Icon={BiSolidEvStation}
              Value={detailSession ? detailSession.chargepoint_id : "null"}
            />
            <IconWithText
              Icon={FaPlug}
              Value={detailSession ? detailSession.connector_id : "null"}
            />
            <div className="grid grid-cols-2 gap-2">
              <IconWithText
                Icon={IoCalendarClear}
                Value={
                  detailSession
                    ? takeOnlyDate(detailSession.start_time)
                    : "null"
                }
              />
              <div className="flex p-2 bg-gray-200 rounded-lg justify-start items-center mb-3 gap-4">
                <IoTime color="#637381" className="text-[1.2vw]" />
                <div className="flex justify-start items-center gap-2">
                  <p className="text-[#637381] text-lg">
                    {detailSession
                      ? takeOnlyTime(detailSession.start_time)
                      : "null"}
                  </p>
                  <FaLongArrowAltRight color="#637381" size={12} />
                  <p className="text-[#637381] text-lg">
                    {detailSession
                      ? takeOnlyTime(detailSession.end_time)
                      : "null"}
                  </p>
                </div>
              </div>
            </div>
            <IconWithText
              Icon={FaLocationDot}
              Value={detailSession ? detailSession.address : "null"}
            />
            {/* <IconWithText Icon={FaBoltLightning} Value={detailSession ? detailSession.} /> */}
           
          </div>
          <div className="">
            <h4 className="text-xl mb-6 text-[#596875] font-medium">
              Statut de la session
            </h4>
            <div className="flex justify-start items-center mb-3 gap-4">
              {detailSession && detailSession.state == "terminé" ? <FaCircleCheck color="#0cdf3f" size={24} /> :
              <FiLoader color="#3283ff" size={24} />}
              <p className="text-[#637381] text-lg">{detailSession ? detailSession.state : "null"}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-combined col-span-2 p-[2vw] rounded-lg">
          <div className="">
            
           <div className="flex justify-between">
                <h4 className="text-xl mb-6 text-[#596875] font-medium">
                  Liste de Transaction
                </h4>
              
              <WacthBilling action={handleVisible}/>
               {
                visible && (
                <Billing IdSession={detailSession.id} handleVisible={handleVisible}/>
                )
              }
           </div>
            <div className="w-full h-[70vh] overflow-x-auto">
              <TransactionRechargeTable id={Id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
