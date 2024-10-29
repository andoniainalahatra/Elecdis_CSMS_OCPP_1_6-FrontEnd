import React from "react";
import { FaPlug, FaUserAlt } from "react-icons/fa";
import { PiCardsFill } from "react-icons/pi";
import { BiSolidEvStation } from "react-icons/bi";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { IoCalendarClear } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import IconWithText from "@/modules/dashboard/component/IconWithText";
import EtiquettesRfidTable from "../../GRC/components/EtiquettesRfidTable";


const SessionDetails = () => {
  return (
    <div className="bg-[#F9FAFB] p-8 rounded-lg shadow-lg h-auto  w-full">
      <h2 className="text-2xl font-bold text-blue-600 my-6 flex items-center">
        <FaPlug className="mr-2" /> Détails de la Session de Recharge
      </h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow-combined col-span-1 p-[2vw] rounded-lg">
          <div className="">
            <h4 className="text-xl mb-6 text-[#596875] font-medium">
              Informations client
            </h4>
            <IconWithText Icon={FaUserAlt} Value="Kevin Rakoto" />
            <IconWithText Icon={PiCardsFill} Value="23A50DC5" />
          </div>
          <div className="">
            <h4 className="text-xl mb-6 mt-6 text-[#596875] font-medium">
              Détails de la Session
            </h4>
            <IconWithText Icon={BiSolidEvStation} Value="93302401600001" />
            <IconWithText Icon={FaPlug} Value="193302401600001" />
            <IconWithText Icon={IoCalendarClear} Value="23/10/2024" />
            <div className="flex justify-start items-center mb-3 gap-4">
              <IoTime color="#637381" />
              <div className="flex justify-start items-center gap-2">
                <p className="text-[#637381] text-lg">10:31</p>
                <FaLongArrowAltRight color="#637381" size={12} />
                <p className="text-[#637381] text-lg">12:31</p>
              </div>
            </div>
            <IconWithText Icon={FaLocationDot} Value="Andraharo Galaxy Village" />
            <IconWithText Icon={FaBoltLightning} Value="1 kWh" />
          </div>
          <div className="">
            <h4 className="text-xl mb-6 text-[#596875] font-medium">
              Statut de la session
            </h4>
            <div className="flex justify-start items-center mb-3 gap-4">
              <FaCircleCheck color="#0cdf3f" size={24} />
              <p className="text-[#637381] text-lg">Terminé</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-combined col-span-2 p-[2vw] rounded-lg">
        <div className="">
            <h4 className="text-xl mb-6 text-[#596875] font-medium">
              Liste Transaction
            </h4>
            <div className="w-full h-[70vh] overflow-x-auto">
              <EtiquettesRfidTable  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
