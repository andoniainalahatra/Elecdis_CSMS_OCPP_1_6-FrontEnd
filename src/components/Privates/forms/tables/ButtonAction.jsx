import { Button } from "@/components/ui/button.jsx";
import React, { useState } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import DetailStation from "@/modules/Station/DetailStation.jsx";
import { IoMdClose } from "react-icons/io";

const ButtonAction = ({ buttonProperty }) => {
    const [section, setSection] = useState("");

    const renderButton = (name, key) => {
        switch (name) {
            case "detail":
                return (
                    <span
                        key={key}
                        onClick={() => {
                            setSection("detail");
                        }}
                        className="bg-transparent  text-blue-500 hover:bg-transparent hover:text-blue-600 m-1"
                    >
                        <BiSolidDashboard />
                    </span>
                );
            case "delete":
                return (
                    <span
                        key={key}
                        className="bg-transparent  text-red-500 hover:bg-transparent hover:text-red-600 m-1"
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
                        className="bg-transparent  text-black hover:bg-transparent hover:text-yellow-600 m-1"
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
                    className="fixed z-1000 overflow-auto top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.7)" }}
                >
                    <DetailStation />
                    <span
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="hover:text-amber-400 text-white" size={50} />
                    </span>
                </div>
            )}
            {section === "edit" && (
                <div
                    className="fixed z-1000 overflow-auto top-0 left-0 w-full h-screen flex justify-center items-center backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.7)" }}
                >
                    <DetailStation />
                    <span
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="hover:text-amber-400 text-white" size={50} />
                    </span>
                </div>
            )}
        </div>
    );
};

export default ButtonAction;
