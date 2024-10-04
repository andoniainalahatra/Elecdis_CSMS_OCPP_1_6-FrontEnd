
import { FaRegCheckCircle } from "react-icons/fa";
import ChartSection from "@/modules/dashboard/content/T_BORD/components/ChartSection.jsx";
import { RiChargingPile2Line } from "react-icons/ri";
import { BiLoaderCircle, BiSolidSend } from "react-icons/bi";
import { CgUnavailable } from "react-icons/cg";
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axiosInstance';
import { IoPlayOutline } from "react-icons/io5";
import { useState } from "react";


function DetailStation({ IdStation }) {

    const [isStart, setIsStart] = useState(false);
    const [idTag, setITag] = useState('');


    const { isPending: isrepostat, data: adminData, error: errorStat } = useQuery({
        queryKey: ['repoStat', IdStation],
        queryFn: () => axiosInstance.get(`/cp/read_cp/${IdStation}`)
            .then((res) => res.data),
        refetchInterval: 1000,
    });

    console.log(adminData)


    const { refetch: remoteStart, isPending: ispost, data: dataStart, error: errorStart } = useQuery({
        queryKey: ['start', IdStation, idTag, adminData],
        queryFn: () => axiosInstance.post(`/cp/send_remoteStartTransaction/${IdStation}/${idTag}/${adminData[0].id_connecteur}`)
            .then((res) => res.data),
        enabled: false,
    });



    if (isrepostat) {
        return (<p>Loading</p>)
    }
    if (errorStat || errorStart) {
        return (<p>error</p>)
    }




    return (
        <div className="container h-screen">
            <div
                className="text-[#637381] grid grid-cols-3 max-md:grid-cols-1 mb-6 pt-10 gap-6 max-sm:grid-cols-1 max-sm:p-4 max-md:mt-[50px] mt-[50px]">
                <div className="text-[#637381] col-span-1 bg-[#ffffff] shadow-lg rounded-2xl p-6 ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Stations</h1>
                    <div className="grid grid-cols-2 gap-4 mt-2 text-gray-800 text-start ">
                        <div>
                            <p>Modele</p>
                            <p>Marque</p>
                            <p>Numero de serie</p>
                            <p>Location</p>
                        </div>
                        <div >
                            <p className="truncate">{adminData[0].charge_point_model}</p>
                            <p className="truncate"> {adminData[0].charge_point_vendors}</p>
                            <p className="truncate">{adminData[0].id_charge_point}</p>
                            <p className="truncate">{adminData[0].adresse}</p>
                            {/* <p>Andraharo</p> */}
                        </div>
                    </div>
                </div>
                <div className="col-span-2 bg-[#ffffff] shadow-lg rounded-2xl max-sm:col-span-1">
                    <div className="grid grid-cols-2 p-4 max-md:grid-cols-1 max-md:w-full">
                        <div>
                            <div className="flex items-start justify-center gap-4 ">
                                {
                                    (adminData[0].status_connector === "Unavailable" || adminData[0].status_connector === "unavalaible") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <CgUnavailable color="#F44336" size={117} />
                                                <p className="text-[#F44336] font-bold mt-2 ">{adminData[0].status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur 1</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-red-200 to-red-300">
                                                    <p>Energie</p>
                                                    <p>209 Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }

                                {
                                    (adminData[0].status_connector === "SuspendedEVSE" || adminData[0].status_connector === "suspendedEVSE") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <CgUnavailable color="#F44336" size={117} />
                                                <p className="text-[#F44336] font-bold mt-2 ">{adminData[0].status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur 1</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-red-200 to-red-300">
                                                    <p>Energie</p>
                                                    <p>209 Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                {
                                    (adminData[0].status_connector === "available" || adminData[0].status_connector === "Available") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <FaRegCheckCircle color="#4CAF50" size={117} />
                                                <p className="text-[#4CAF50] font-bold mt-2 ">{adminData[0].status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur 1</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-green-200 to-green-300">
                                                    <p>Energie</p>
                                                    <p>209 Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                                {
                                    (adminData[0].status_connector === "charging" || adminData[0].status_connector === "Charging") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <RiChargingPile2Line color="#2196F3" size={117} />
                                                <p className="text-[#2196F3] font-bold mt-2 ">{adminData[0].status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur 1</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-blue-200 to-blue-300">
                                                    <p>Energie</p>
                                                    <p>209 Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }{
                                    (adminData[0].status_connector === "preparing" || adminData[0].status_connector === "Preparing") && (
                                        <div className="flex space-x-5">
                                            <div>
                                                <BiLoaderCircle color="#2196F3" size={117} />
                                                <p className="text-[#2196F3] font-bold mt-2 ">{adminData[0].status_connector}</p>
                                            </div>
                                            <div className="text-center">
                                                <h1 className="mb-2 font-medium text-center">Connecteur 1</h1>
                                                <div
                                                    className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-blue-200 to-blue-300">
                                                    <p>Energie</p>
                                                    <p>209 Wh</p>
                                                </div>
                                            </div>
                                        </div>)
                                }
                            </div>
                        </div>
                        {/* <div>

                            <div className="flex items-start justify-center gap-4 ">
                                <div>
                                    <IoMdAddCircleOutline color="#2196F3" size={117} />
                                    <p className="text-[#53A7E3] font-bold mt-2 ">En Charge</p>
                                </div>
                                <div className="text-center">
                                    <h1 className="mb-2 font-medium">Connecteur 3</h1>
                                    <div
                                        className="flex flex-col items-center justify-center gap-4 p-6 font-medium rounded-md bg-gradient-to-r from-blue-200 to-blue-300">
                                        <p>Energie</p>
                                        <p>209 Wh</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div
                className="text-[#637381] bg-[#ffffff] shadow-lg border rounded-2xl max-md:place-items-center grid grid-cols-3 max-sm:grid-cols-1 max-sm:p-4 gap-6">

                <div className="w-full col-span-1 p-6 text-gray-800 rounded-2xl ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Websocket</h1>
                    <div className="grid w-full grid-cols-2 gap-4 mt-2 text-start max-md:gap-6">
                        <div>
                            <p>Backend URL:</p>
                            <p>Chargeur Box ID:</p>
                            <p>Cle d&apos;autorisation:</p>
                            <p>Certificat CA:</p>
                            <p>Ping intervalle:</p>
                            <p>Intervalle de reconnection:</p>
                        </div>
                        <div>
                            <p>ws://localhost:9220</p>
                            <p>Chargeur-1</p>
                            <p>EV98jh</p>
                            <p>TEST</p>
                            <p>5</p>
                            <p>10</p>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>

                <div className="text-[#fefefe] col-span-1 rounded-2xl p-6 w-full ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Firmware</h1>
                    <div className="grid w-full grid-cols-1 gap-4 mt-2 text-gray-800 text-start max-md:gap-6">
                        <div className="flex gap-4">
                            <div>
                                <p>Systeme d'exploitation:</p>
                                <p>Protocole ocpp:</p>
                            </div>
                            <div>
                                <p>Ubuntu 22.04 LTS</p>
                                <p>1.6</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[#fefefe]  rounded-2xl p-6 w-full  ">
                    <h1 className="text-2xl font-bold text-red-600 text-start">Urgence</h1>
                    <div className="grid w-full grid-cols-1 gap-4 mt-2 text-gray-800 text-start max-md:gap-6">
                        <div className="flex gap-8">
                            <button className="text-[#4CAF50]" onClick={() => setIsStart(isstart => !isstart)}>
                                <IoPlayOutline size={50} />
                            </button>

                            {isStart ? (
                                <div className="flex space-x-2 transition-opacity duration-300 ease-in-out border-b opacity-100 animate-fade-in">
                                    <input
                                        onChange={(e) => setITag(e.target.value)}
                                        placeholder="Id Tag"
                                        className="text-xl h-[50px] p-1 outline-none"
                                        type="text"
                                    />
                                    <button onClick={() => {
                                        remoteStart();
                                        setIsStart(false); // Close input after sending
                                    }}>
                                        <BiSolidSend size={30} />
                                    </button>
                                </div>
                            ) : null}
                        </div>

                    </div>
                </div>
            </div>
            <div className="text-[#fefefe] col-span-1 rounded-2xl py-6">
                <h1 className="text-2xl font-bold text-red-600 text-start">Statistiques</h1>
                <ChartSection />
            </div>
        </div>
    );
}

export default DetailStation;