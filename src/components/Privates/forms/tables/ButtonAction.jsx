import { BiSolidDashboard } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import DetailStation from "@/modules/Station/DetailStation.jsx";
import { IoMdClose } from "react-icons/io";
import EditStation from "@/modules/Station/EditStation.jsx";
import { useState } from "react";
import DeleteStation from "@/modules/Station/DeleteStation";
import { SiIfixit } from "react-icons/si";
import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
const ButtonAction = ({ buttonProperty, Id }) => {
    const [section, setSection] = useState("");

    const mutation = useMutation({
        mutationFn: (updatedEtatDefaillance) => axiosInstance.put(`/historique_defaillance/update/${Id}`, updatedEtatDefaillance).then((res) => console.log(res.data)),
        onSuccess: (data) => {

            console.log("Station mise à jour avec succès", data);
            // queryClient.invalidateQueries("repoMap");
            // if (onclick) onclick();  // Assurez-vous qu'onclick est défini avant de l'appeler
            // console.log(data)

        },
        onError: (error) => {
            if (error.response) {
                console.error("Erreur lors de la mise à jour de la station", error.response.status, error.response.data);
            } else {
                console.error("Erreur lors de la mise à jour de la station", error);
            }
        }
    });
    const handleClick = (Id) =>{
        // alert(Id);
        console.log("Form Data:", Id);
        // mutation.mutate(Id);   
        // console.log(mutation.mutate.data)  
    }


    const renderButton = (name, key) => {
        switch (name) {
            case"Non resolu":
                return (
                    <span
                        key={key}
                        className="m-1 text-red-500 bg-transparent hover:bg-transparent hover:text-red-600"
                        onClick={()=>{
                            handleClick(Id)
                        }}
                    >
                       <SiIfixit/>
                    </span>
                );
            case "detail":

                return (

                    <span
                        key={key}
                        onClick={() => {
                            setSection("detail");
                            console.log(Id);
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
                        onClick={()=>{
                            setSection("delete");
                        }}
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
                    className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.3)" }}
                >
                    <DetailStation IdStation={Id} />
                    <span
                        className="absolute cursor-pointer top-5 right-5"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="text-white hover:text-amber-400" size={50} />
                    </span>
                </div>
            )}
            {section === "edit" && (
                <div
                    className="fixed top-0 left-0 flex items-center justify-center w-full h-screen overflow-auto z-20 backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.7)" }}
                >
                    <EditStation IdStation={Id} onclick={()=>setSection("")}/>
                    <span
                        className="absolute cursor-pointer top-5 right-5"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="text-white hover:text-amber-400" size={50} />
                    </span>
                </div>
            )} 
           {
             section === "delete" && (
                    <div
                        className="fixed top-0 left-0 flex items-center justify-center w-full h-screen overflow-auto z-20 backdrop-blur-md"
                        style={{ backgroundColor: "rgba(9,16,26,0.7)" }}
                    >
                        {/* <EditStation IdStation={Id} onclick={()=>setSection("")}/> */}
                        <DeleteStation IdStation={Id} onclick={()=>setSection("")}/>
                        <span
                            className="absolute cursor-pointer top-5 right-5"
                            onClick={() => setSection("")}
                        >
                            <IoMdClose className="text-white hover:text-amber-400" size={50} />
                        </span>
                    </div>)
           }
            {
                section === "Non resolu" && (
                    <p>
                        test
                    </p>
                )
            }



        </div>
    );
};

export default ButtonAction;
