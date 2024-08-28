import {Button} from "@/components/ui/button.jsx";
import React, {useState} from 'react';
import {BiSolidDashboard} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {FiEdit} from "react-icons/fi";
import ShowDetails from "@/components/Privates/forms/tables/ShowDetails.jsx";
import DetailStation from "@/modules/Station/DetailStation.jsx";
import {IoMdClose} from "react-icons/io";

const ButtonAction = ({buttonProperty}) => {
    const [section, setSection] = useState("");

    const renderButton = (name, key) => {
        switch (name) {
            case 'detail':
                return <Button key={key} onClick={() => {
                    setSection("detail")
                }}
                               className="bg-transparent text-blue-500 hover:bg-transparent hover:text-blue-600 m-1"><BiSolidDashboard/></Button>;
            case 'delete':
                return <Button key={key}
                               className=" bg-transparent text-red-500 hover:bg-transparent hover:text-red-600 m-1"><RiDeleteBin6Line/></Button>;
            case 'edit':
                return <Button key={key}
                               onClick={() => {
                                   setSection("edit")
                               }}
                               className=" bg-transparent text-black hover:bg-transparent hover:text-yellow-600 m-1"><FiEdit/></Button>;
            default:
                return null;
        }
    };

    return (
        <>
            {buttonProperty.map((data, key) => (
                renderButton(data.name, key)
            ))}
            {section === "detail" && (
                <div
                    className="fixed z-1000 overflow-auto top-0 left-0 backdrop-blur-md w-full h-[100vh]  flex justify-center items-center"
                    style={{backgroundColor: "rgba(9,16,26,0.7)"}}>
                    <DetailStation/>
                    <span className="absolute top-0 right-0 " onClick={() => setSection("")}><IoMdClose
                        className="hover:text-amber-400 text-[#fefefe]" size={50}/></span>
                </div>


            )}
            {section === "edit" && (
                <div className="fixed z-1000 overflow-auto top-0 left-0 backdrop-blur-md w-full h-[100vh]  flex justify-center items-center"
                     style={{backgroundColor: "rgba(9,16,26,0.7)"}}>
                    <DetailStation/>
                    <span onClick={() => setSection("")}>Close</span>
                </div>
            )}
        </>
    );
};

export default ButtonAction;
