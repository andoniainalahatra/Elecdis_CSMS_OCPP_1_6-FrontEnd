import { Context } from "@/common/config/configs/Context";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { BellAlertIcon, UserCircleIcon } from "@heroicons/react/20/solid";

import React, { useContext } from "react";

const BarNav = () => {
    const { openNav } = useContext(Context);
    return (
        <div className="w-[100%] absolute top-0  h-[8vh]  shadow-md">

            <div className="flex items-center justify-between w-[100%] p-2 mx-auto h-[100%] text-white">
                <h1 className="flex-[0.6] cursor-pointer text-[25px] text-black font-bold">
                    ELEC
                    <span className=" text-gray-500">DIS</span>
                </h1>
                <div className=" flex space-x-3">
                    <div className="relative text bg-white">
                        <BellAlertIcon className="w-[2rem]  h-[2rem] cursor-pointer text-gray-500" />
                        <span className=" absolute bg-red-600  h-[1.5rem] w-[1.5rem] text-center rounded-full -top-3 right-0
                         font-semibold border flex items-center justify-center border-white text-[13px]">6</span>
                    </div>
                    <UserCircleIcon className="w-[2rem]  h-[2rem] cursor-pointer text-gray-500" />
                    <div onClick={openNav}>
                        <Bars3Icon className="w-[2rem] md:hidden h-[2rem] cursor-pointer text-gray-500" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BarNav;