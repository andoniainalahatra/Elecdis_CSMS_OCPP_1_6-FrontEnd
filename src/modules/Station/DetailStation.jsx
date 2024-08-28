import React from 'react';
import {FaRegCheckCircle} from "react-icons/fa";
import {IoMdAddCircleOutline} from "react-icons/io";


function DetailStation() {
    return (
        <div className="">
            <div className="text-[#637381] grid grid-cols-3 max-md:grid-cols-1 p-4 gap-6">
                <div className="text-[#637381] col-span-1 bg-[#f9fafb] rounded-2xl p-6 w-[50] max-md:mt-[500px]">
                    <h1 className="text-start font-medium">Stations</h1>
                    <div className="text-start mt-2 grid grid-cols-2 gap-4 ">
                        <div>
                            <p>Modele</p>
                            <p>Marque</p>
                            <p>Numero de serie</p>
                            <p>Location</p>
                        </div>
                        <div>
                            <p>SC78789</p>
                            <p>Voltronic</p>
                            <p>EV98jh</p>
                            <p>Andraharo</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 bg-[#f9fafb] rounded-2xl">
                    <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:w-full p-4">
                        <div>
                            <div className="flex justify-center items-start gap-4 ">
                                <div>
                                    <FaRegCheckCircle color="#36E73D" size={117}/>
                                    <p className="text-[#36E73D] font-bold mt-2 ">Disponible</p>
                                </div>
                                <div className="text-center">
                                    <h1 className="text-center mb-2 font-medium">Connecteur 1</h1>
                                    <div
                                        className="bg-[#EDEDED] p-6 flex flex-col font-medium gap-4 rounded-md items-center justify-center">
                                        <p>Energie</p>
                                        <p>209 Wh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>

                            <div className="flex justify-center items-start gap-4 ">
                                <div>
                                    <IoMdAddCircleOutline color="#53A7E3" size={117}/>
                                    <p className="text-[#53A7E3] font-bold mt-2 ">En Charge</p>
                                </div>
                                <div className="text-center">
                                    <h1 className="mb-2 font-medium">Connecteur 2</h1>
                                    <div
                                        className="bg-[#EDEDED] p-6 flex flex-col font-medium gap-4 rounded-md items-center justify-center">
                                        <p>Energie</p>
                                        <p>209 Wh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-[#637381] border rounded-2xl max-md:w-full grid grid-cols-3 max-md:grid-cols-1 p-4 gap-6">
                <div className="text-[#fefefe] col-span-1 rounded-2xl p-6 w-[50]">
                    <h1 className="text-start font-medium">Websocket</h1>
                    <div className="text-start mt-2 grid grid-cols-2 gap-4 max-md:gap-6 w-full">
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
                <div className="text-[#fefefe] col-span-2 rounded-2xl p-6 w-[50]">
                    <h1 className="text-start font-medium">Firmware</h1>
                    <div className="text-start mt-2 grid grid-cols-1 gap-4 max-md:gap-6 w-full">
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
            </div>
            <div>

            </div>
        </div>
    );
}

export default DetailStation;