import React, { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import { IoMdClose } from "react-icons/io";
import DetailAutorisation from "./DetailAutorisation";
import EditAutorisation from "./EditAutorisation";


const ButtonAutorisation = ({ buttonProperty, userId }) => {
    const [section, setSection] = useState("");

    const renderButton = (name, key) => {
        switch (name) {
            case "detail":
                return (
                    <span
                        key={key}
                        onClick={() => {
                            setSection("detail");
                            console.log(userId);
                        }}
                        className="m-1 text-blue-500 bg-transparent hover:bg-transparent hover:text-blue-600"
                    >
                        <BiSolidDashboard />
                    </span>
                );
            case "delete":
                return (
                    <span
                        key={key}
                        className="m-1 text-red-500 bg-transparent hover:bg-transparent hover:text-red-600"
                    >
                        <RiDeleteBin6Line />
                    </span>
                );
            case "edit":
                return (
                    <span
                        key={key}
                        onClick={() => {
                            setSection("edit");
                        }}
                        className="m-1 text-black bg-transparent hover:bg-transparent hover:text-yellow-600"
                    >
                        <FiEdit />
                    </span>
                );
            default:
                return null;
        }
    };


    return (
        <div className="flex items-center justify-center gap-2 max-md:flex-col">
            {buttonProperty.map((data, key) => renderButton(data.name, key))}
            {section === "detail" && (
                <div
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-screen overflow-auto z-1000 backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.2)" }}

                >
                    <DetailAutorisation userId={userId} />
                    <span
                        className="absolute cursor-pointer top-5 right-5"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="text-red-500 hover:text-amber-400" size={50} />
                    </span>
                </div>
            )}
            {section === "edit" && (
                <div
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-screen overflow-auto z-1000 backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.7)" }}
                >
                    <EditAutorisation />
                    <span
                        className="absolute cursor-pointer top-5 right-5"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="text-red-700 hover:text-amber-400" size={50} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default ButtonAutorisation;