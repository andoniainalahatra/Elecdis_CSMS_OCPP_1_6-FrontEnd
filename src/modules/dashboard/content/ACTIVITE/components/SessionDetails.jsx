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
import { useSelector } from "react-redux";
import { selectTransactionRecharge } from "@/features/TransactionRecharge/TransactionRechargeSelector";
import { takeOnlyDate, takeOnlyTime } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";


const SessionDetails = ({ Id, dataObj }) => {
  const [detailSession, setDetailSession] = useState(null);

  useEffect(() => {
    if (dataObj) {
      setDetailSession(dataObj);
    }
  }, [dataObj]);
  

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
            <h4 className="text-xl mb-6 text-[#596875] font-medium">
              Liste de Transaction
            </h4>
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
