import { BiSolidDashboard } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
// import { FiEdit } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";

import { useState } from "react";
import { useDeleteRfid } from "@/features/RFID/rfidApi";
import AjoutCredit from "./AjoutCredit";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import DetailRfid from "@/modules/dashboard/content/GRC/components/DetailRfid";

const ButtonActionRfid = ({ buttonProperty, Id }) => {
    const [section, setSection] = useState("");
    const handleCloseSection = () => {
        setSection("")
    }
    const { mutate, isPending, isError, isSuccess } = useDeleteRfid();
    const deleteRfid = (id) => {
        mutate(id);
    };
    const handleClosed = () => {
        setSection("")
    }
    const confirmDelete = () => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le !',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRfid(Id)
                if (isSuccess) {
                    Swal.fire(
                        'Supprimé !',
                        'L\'élément a été supprimé.',
                        'success'
                    );
                }
                if (isError) {
                    Swal.fire(
                        'Oops !',
                        'Une erreur s\'est produite',
                        'error'
                    );
                }
                if (isPending) {
                    <div className="w-full flex justify-center items-center h-[70vh]">
                        <PulseLoader color="#F2505D" />
                    </div>
                }
            }
        });
    };
    const renderButton = (name, key) => {
        switch (name) {
            case "detail":
                return (
                    <span
                        key={key}
                        onClick={() => {
                            setSection("detail");
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
                        className=" text-red-500 bg-transparent hover:bg-transparent hover:text-red-600"
                        onClick={() => confirmDelete()}
                    >
                        <div className="py-1 px-6 bg-red-400 rounded-xl">
                            <RiDeleteBin6Line color="#ffffff" size={20} />
                        </div>
                    </span>
                );
            case "ajout_credit":
                return (
                    <span
                        key={key}
                        onClick={() => {
                            setSection("ajout_credit");
                        }}
                        className=" text-black bg-transparent hover:bg-transparent hover:text-yellow-600"
                    >
                        <div className="bg-blue-400 flex items-center justify-center rounded-xl gap-1 py-1 px-2">
                        <IoMdAddCircleOutline size={16} color="#ffffff" />
                        <p className="text-[#ffffff] font-semibold text-[16px] ">crédit</p>
                        </div>
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

                <DetailRfid id={Id} fermer={handleCloseSection} supprimer={confirmDelete} />


            )}
            {section === "ajout_credit" && (
                <AjoutCredit action={handleClosed} id={Id} />
            )}
        </div>
    );
};

export default ButtonActionRfid;
