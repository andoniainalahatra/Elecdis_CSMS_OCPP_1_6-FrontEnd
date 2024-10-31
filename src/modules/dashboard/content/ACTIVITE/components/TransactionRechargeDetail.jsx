import { takeOnlyDate, takeOnlyTime } from "@/lib/utils";
import IconWithText from "@/modules/dashboard/component/IconWithText";
import React from "react";
import { BiSolidEvStation } from "react-icons/bi";
import { FaLongArrowAltRight, FaUserAlt } from "react-icons/fa";
import { FaCircleCheck, FaLocationDot, FaPlug } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import { IoCalendarClear, IoTime } from "react-icons/io5";
import { PiCardsFill } from "react-icons/pi";

function TransactionRechargeDetail({ close, dataObj }) {

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="w-full bg-black bg-opacity-40 h-screen flex items-center justify-center">
        <div className="relative bg-white shadow-xl max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 rounded-lg">
          <button
            className="absolute bg-white top-1 right-1 "
            onClick={() => close("")}
          >
            <IoMdCloseCircle size={40} />
          </button>
          <div className="w-full flex items-center justify-start flex-col gap-4 rounded-lg">
            <div className="w-full">
              <h4 className="text-xl mb-6 text-start text-[#596875] font-medium">
                Informations client
              </h4>
              <div className="grid grid-cols-2 gap-2 items-center">
                <IconWithText Icon={FaUserAlt} Value={dataObj ? dataObj.user_name : "null"} />
                <IconWithText Icon={PiCardsFill} Value={dataObj ? dataObj.rfid : "null"} />
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-xl mb-6 text-start mt-6 text-[#596875] font-medium">
                Détails de la Transaction
              </h4>
              <IconWithText Icon={BiSolidEvStation} Value={dataObj ? dataObj.charge_point_id : "null"} />
              <IconWithText Icon={FaPlug} Value={dataObj ? dataObj.connector_id : "null"} />
              <div className="grid grid-cols-2 gap-2">
              <IconWithText Icon={IoCalendarClear} Value={
                  dataObj
                    ? takeOnlyDate(dataObj.start_time)
                    : "null"
                } />
              <div className="flex p-2 bg-gray-200 rounded-lg justify-start items-center mb-3 gap-4">
                <IoTime color="#637381" className="text-[1.2vw]" />
                <div className="flex justify-start items-center gap-1">
                  <p className="text-[#637381] text-lg">{dataObj
                    ? takeOnlyTime(dataObj.start_time)
                    : "null"}</p>
                  <FaLongArrowAltRight color="#637381" size={12} />
                  <p className="text-[#637381] text-lg">{dataObj
                    ? takeOnlyTime(dataObj.end_time)
                    : "null"}</p>
                </div>
              </div>
              </div>
              <IconWithText
                Icon={FaLocationDot}
                // Value={}
              />
              {/* <IconWithText Icon={FaBoltLightning} Value={ detailSession.} /> */}
            </div>
            <div className="w-full">
              <h4 className="text-xl mb-6 text-start text-[#596875] font-medium">
                Statut de la transaction
              </h4>
              <div className="flex justify-start items-center mb-3 gap-4">
              {dataObj && dataObj.statuts == "terminé" ? <FaCircleCheck color="#0cdf3f" size={24} /> :
              <FiLoader color="#3283ff" size={24} />}
              <p className="text-[#637381] text-lg">{dataObj ? dataObj.statuts : "null"}</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionRechargeDetail;
