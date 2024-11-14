import React, { useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import UpdateTarif from "./UpdateTarif";

function BoxTarifs({
  id,
  category,
  title,
  description,
  price,
  majoration,
  textColor,
  backgroundColor,
  data,
}) {
  const boxStyle = {
    backgroundColor: backgroundColor || "#ffffff",
    color: textColor || "#626275",
  };

  const [isOption, setIsOption] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`/tarifs/${id}`).then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listTarif"], exact: false });
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Le Tarif a été supprimé avec succès!",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s’est produite lors de la suppression du Tarif.",
      });
    },
  });
  const deleteTarif = (identifiant) => {
    mutate(identifiant);
  };
  const confirmDelete = () => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTarif(id);
        if (isSuccess) {
          Swal.fire("Supprimé !", "L'élément a été supprimé.", "success");
        }
        if (isError) {
          Swal.fire("Oops !", "Une erreur s'est produite", "error");
        }
        if (isPending) {
          <div className="w-full flex justify-center items-center h-[70vh]">
            <PulseLoader color="#F2505D" />
          </div>;
        }
      }
    });
  };

  return (
    <>
    <div className="col-span-1 p-4 h-auto rounded-xl shadow-combined" style={boxStyle}>
      <div className="w-full flex flex-col items-start justify-center gap-4">
        <div className="w-full relative flex items-center justify-between">
          <p className="uppercase text-sm font-medium">{category}</p>
          <FaEllipsisVertical
            onClick={() => setIsOption(!isOption)}
            size={18}
          />

          {isOption && (
            <div className="absolute bg-zinc-50 text-gray-700 rounded-md p-2 top-5 right-0">
              <div
                onClick={() => {confirmDelete(); setIsOption(!isOption)}}
                className="w-full flex items-center justify-start gap-2 mb-2 hover:text-red-500"
              >
                <FaRegTrashCan />
                <p>Supprimer</p>
              </div>
              <div onClick={() => { setIsUpdate(true); setIsOption(!isOption)}} className="w-full flex items-center justify-start gap-2 hover:text-blue-500">
                <FaRegEdit />
                <p>Modifier</p>
              </div>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p>{description}</p>
        <div className="bg-gray-400 p-[0.1px] w-full"></div>
        <div className="">
        <p className="text-2xl font-semibold">
          {price}
          <span className="text-2xl font-semibold">/kWh</span>
        </p>
        <p>ou</p>
        <p className="text-2xl font-semibold">Majoration : x{majoration}</p>
        </div>
      </div>
      
    </div>
    {
        isUpdate && (<UpdateTarif action={setIsUpdate} data={data} />)
      }
    </>
    
  );
}

export default BoxTarifs;
