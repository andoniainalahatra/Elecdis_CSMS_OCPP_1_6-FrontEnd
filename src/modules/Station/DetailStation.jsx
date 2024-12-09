import { FaRegCheckCircle } from "react-icons/fa";
import { RiBaseStationFill, RiChargingPile2Line } from "react-icons/ri";
import { BiLoaderCircle, BiSolidSend } from "react-icons/bi";
import { CgUnavailable } from "react-icons/cg";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { IoPlayOutline } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import StatistiqueBarChart from "../dashboard/content/T_BORD/components/StatistiqueBarChart";
import { Context } from "@/common/config/configs/Context";
import { usePercent } from "@/lib/hoocks/usePercent";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { STATISTIQUECONF } from "../dashboard/content/T_BORD/config/StatistiqueConfig";
import { YEARLABEL } from "@/_mock/constant";
import ConnectorStatus from "./ConnectorStatus";
import { MdEmergencyShare } from "react-icons/md";
import { FaChargingStation } from "react-icons/fa6";
import { TbVersionsFilled } from "react-icons/tb";
import ToggleSwitch from "./ToggleSwitch";
import CreateReservation from "../dashboard/content/ACTIFS/components/CreateReservation";
import { FaDownload } from "react-icons/fa6";
import { Controller, useForm } from "react-hook-form";
import { useGetDiagno } from "./DetailApi";
import Input from "../Login/components/Input";
import Boutton from "../Login/components/Boutton";
import GetDiagForm from "./GetDiagForm";

function DetailStation({ Id }) {
  const { filters, filterYear } = useContext(Context);
  const [isStart, setIsStart] = useState(false);
  const [isGetDiag, setIsGetDiag] = useState(false);
  const [idTag, setITag] = useState("");
  const [isReserve, setIsReserve] = useState(false);

  const getStatusProps = (status) => {
    const statusProps = {
      unavailable: {
        color: "#F44336",
        label: "unavailable",
        icon: CgUnavailable,
        bg: "red",
      },
      suspendedevse: {
        color: "#F44336",
        label: "suspendedevse",
        icon: CgUnavailable,
        bg: "red",
      },
      available: {
        color: "#4CAF50",
        label: "available",
        icon: FaRegCheckCircle,
        bg: "green",
      },
      charging: {
        color: "#2196F3",
        label: "charging",
        icon: RiChargingPile2Line,
        bg: "blue",
      },
      preparing: {
        color: "#2196F3",
        label: "preparing",
        icon: BiLoaderCircle,
        bg: "blue",
      },
    };

    return statusProps[status.toLowerCase()] || {};
  };
  const handleReserve = () => {
    setIsReserve(true);
  };
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

  /**
   *  GrapheMensuel
   */

  const {
    data: monthData,
    error: errorMonth,
    isPending: monthLoading,
  } = useQuery({
    queryKey: ["monthDataChart"],
    queryFn: () =>
      axiosInstance
        .get(`/cp/graph_conso_energie_status/${Id}?CurrentYear=${filterYear}`)
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  /**
   * GrapheTrimestriel
   */

  const {
    data: trimestreDataQuery,
    error: errorTrimestre,
    isPending: trimestreLoading,
  } = useQuery({
    queryKey: ["trimestreDataChart"],
    queryFn: () =>
      axiosInstance
        .get(
          `/cp/graph_trimestriel_conso_energie_status/${Id}/?CurrentYear=${filterYear}`
        )
        .then((res) => res.data),
    refetchInterval: 5000,
  });
  /**
   * GrapheSemestriel
   */
  const {
    data: semestreData,
    error: errorSemestre,
    isPending: semestreLoading,
  } = useQuery({
    queryKey: ["semestreDataChart"],
    queryFn: () =>
      axiosInstance
        .get(
          `/cp/graph_semestriel_conso_energie_status/${Id}/?CurrentYear=${filterYear}`
        )
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  const {
    isPending: isrepostat,
    data: adminData,
    error: errorStat,
  } = useQuery({
    queryKey: ["repoStat", Id],
    queryFn: () =>
      axiosInstance.get(`/cp/read_cp/${Id}`).then((res) => res.data),
    refetchInterval: 1000,
  });
  const {
    refetch: remoteStart,
    isPending: ispost,
    data: dataStart,
    error: errorStart,
  } = useQuery({
    queryKey: ["start", Id, idTag, adminData],
    queryFn: () =>
      axiosInstance
        .post(
          `/cp/send_remoteStartTransaction/${Id}/${idTag}/${adminData[0].id_connecteur}`
        )
        .then((res) => res.data),
    enabled: false,
  });


  // --------------------------- Etat ToggleSwitch --------------------------------

  const [toggleStates, setToggleStates] = useState([]);

  useEffect(() => {
    if (adminData) {
      // Réinitialiser toggleStates lorsque adminData change
      setToggleStates(adminData.map(() => false));
    }
  }, [adminData]);

  const handleToggleChange = (index, newState) => {
    setToggleStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? newState : state))
    );
  };

  const isLoading =
    loadingDonute || monthLoading || trimestreLoading || semestreLoading;
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
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <PulseLoader color="#3498db" size={15} />
      </div>
    );
  }
  if (errorDonute || errorMonth || errorSemestre || errorTrimestre) {
    Swal.fire({
      title: "Oops !",
      icon: "error",
      text: "Une erreur est survenue, veuillez réessayer plus tard",
    });
    return null;
  }

  if (isrepostat) {
    return <p>Loading</p>;
  }
  if (errorStat || errorStart) {
    return <p>error</p>;
  }

  return (
    <div className="container h-screen">
      <div className="text-[#637381] grid grid-cols-3 max-md:grid-cols-1 mb-6 pt-10 gap-6 max-sm:grid-cols-1 max-sm:p-4 max-md:mt-[50px] mt-[50px]">
        <div className="text-[#637381] col-span-1 bg-[#ffffff] shadow-lg rounded-2xl p-6 ">
          <div className="flex gap-2 text-gray-800 justify-items-start">
            <FaChargingStation size={25} />
            <h1 className="mb-6 text-2xl font-medium text-gray-800 text-start">
              Stations
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 text-gray-600 text-start ">
            <div className="flex flex-col gap-3">
              <p>Modele</p>
              <p>Marque</p>
              <p>Numero de serie</p>
              <p>Location</p>
            </div>

            <div className="flex flex-col gap-3">
              <p className="truncate">{adminData[0].charge_point_model}</p>
              <p className="truncate"> {adminData[0].charge_point_vendors}</p>
              <p className="truncate">{adminData[0].id_charge_point}</p>
              <p className="truncate">{adminData[0].adresse}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 bg-[#ffffff] shadow-lg rounded-2xl max-sm:col-span-1">
          <div className="grid grid-cols-2 p-4 max-md:grid-cols-1 max-md:w-full">
            {adminData.map((item, index) => (
              <div className="flex items-start justify-center" key={index}>
                <div className="gap-4 ">
                  <ConnectorStatus
                    status={item.status_connector}
                    energy={item.energie_delivre?.toLocaleString("fr-FR")}
                    connectorId={item.id_connecteur}
                    {...getStatusProps(item.status_connector)}
                  />
                  <div className="flex items-end justify-between w-full mt-4">
                    <ToggleSwitch
                      isChecked={toggleStates[index]}
                      onToggle={(newState) =>
                        handleToggleChange(index, newState)
                      }
                    />
                    <button
                      onClick={handleReserve}
                      className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-400"
                    >
                      Reserver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-[#637381] bg-[#fefefe] shadow-lg border rounded-2xl max-md:place-items-center grid grid-cols-3 max-sm:grid-cols-1 max-sm:p-4 gap-6">
        <div className="w-full col-span-1 p-6 text-gray-800 rounded-2xl ">
          <div className="flex gap-2 text-gray-800 justify-items-start">
            <RiBaseStationFill size={25} />
            <h1 className="mb-6 text-2xl font-medium text-gray-800 text-start">
              Websocket
            </h1>
          </div>
          <div className="grid w-full grid-cols-2 gap-4 mt-2 text-start max-md:gap-6">
            <div className="flex flex-col gap-3 ">
              <p>Backend URL:</p>
              <p>Chargeur Box ID:</p>
              <p>Cle d&apos;autorisation:</p>
              <p>Certificat CA:</p>
              <p>Ping intervalle:</p>
              <p>Intervalle de reconnection:</p>
            </div>
            <div className="flex flex-col gap-3">
              <p>ws://localhost:9001</p>
              <p>Chargeur-1</p>
              <p>EV98jh</p>
              <p>TEST</p>
              <p>5</p>
              <p>10</p>
            </div>
          </div>
          <div></div>
        </div>

        <div className="text-[#fefefe] col-span-1 rounded-2xl p-6 w-full ">
          <div className="flex gap-2 text-gray-800 justify-items-start">
            <TbVersionsFilled size={25} />
            <h1 className="mb-6 text-2xl font-medium text-gray-800 text-start">
              Firmware
            </h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 mt-2 text-gray-800 text-start max-md:gap-6">
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <p>Protocole ocpp:</p>
              </div>
              <div className="flex flex-col gap-3">
                <p>1.6</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[#fefefe] rounded-2xl p-6 w-full">
          <div className="flex gap-2 text-gray-800 justify-items-start">
            <MdEmergencyShare size={25} />
            <h1 className="mb-6 text-2xl font-medium text-gray-800">Urgence</h1>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 mt-2 text-gray-800 text-start max-md:gap-6">
            <div className="flex gap-8">
              <div className="flex flex-col">
                <button
                  className="text-primaryChart"
                  onClick={() => setIsStart((isstart) => !isstart)}
                >
                  <IoPlayOutline size={50} />
                </button>
              </div>

              {isStart ? (
                <div className="flex flex-col transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in">
                  <div className="flex">
                    <input
                      onChange={(e) => setITag(e.target.value)}
                      placeholder="Id Tag"
                      className="text-xl h-[50px] p-1 outline-none border-b"
                      type="text"
                    />

                    <button
                      onClick={() => {
                        remoteStart();
                        setIsStart(false); // Close input after sending
                      }}
                      className="text-primaryChart"
                    >
                      <BiSolidSend size={30} />
                    </button>
                  </div>
                  <div>
                    <input
                      onChange={(e) => setITag(e.target.value)}
                      placeholder="Id Connecteur"
                      className="text-xl h-[50px] p-1 outline-none border-b"
                      type="text"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-6">
            <div
              onClick={() => setIsGetDiag(!isGetDiag)}
              className="flex items-center justify-start gap-2 text-gray-800 cursor-pointer  hover:text-gray-600"
            >
              <FaDownload />
              <p>Diagnostic</p>
            </div>
          </div>
          {isGetDiag && <GetDiagForm action={setIsGetDiag} Id={Id} />}
        </div>
      </div>
      <div className="text-[#fefefe] col-span-1 rounded-2xl py-6">
        <div className="h-full col-span-2 max-sm:w-full max-sm:col-span-1">
          <StatistiqueBarChart
            chartData={statistiqueData}
            statiStiqueConfig={STATISTIQUECONF}
            description={litleDescri}
            listFilterYearly={YEARLABEL}
            title="Énergie délivrée par kWh"
            loading={isLoading}
            className="h-full"
          />
        </div>
      </div>
      {isReserve && <CreateReservation action={setIsReserve} />}
    </div>
  );
}

export default DetailStation;
