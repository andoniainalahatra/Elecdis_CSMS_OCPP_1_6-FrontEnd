import { BiSolidDashboard } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useDeleteRfid } from "@/features/RFID/rfidApi";
import UpdateRfid from "./UpdateRfid";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

const ButtonActionRfid = ({ buttonProperty, Id }) => {
    const [section, setSection] = useState("");
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
                        className="m-1 text-red-500 bg-transparent hover:bg-transparent hover:text-red-600"
                        onClick={() => confirmDelete()}
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
                    className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen overflow-auto backdrop-blur-md"
                    style={{ backgroundColor: "rgba(9,16,26,0.3)" }}
                >
                    <div className="">Hello</div>
                    <span
                        className="absolute cursor-pointer top-5 right-5"
                        onClick={() => setSection("")}
                    >
                        <IoMdClose className="text-white hover:text-amber-400" size={50} />
                    </span>
                </div>
            )}
            {section === "edit" && (
                <UpdateRfid action={handleClosed} id={Id} />
            )}
        </div>
    );
};

export default ButtonActionRfid;
