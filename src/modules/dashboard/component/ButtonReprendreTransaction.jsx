import axiosInstance from '@/lib/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { RxReload } from "react-icons/rx";
import Swal from 'sweetalert2';

function ButtonReprendreTransaction({ idSession, idChargePoint, idTag, idConnecteur, disabled }) {
  const useReprendre = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (credentials) =>
        axiosInstance.post(`historique_session/reprendre_transaction?id_historique_session=${idSession}&id_tag=${idTag}&connector_id=${idConnecteur}&charge_point_id=${idChargePoint}`, credentials).then((res) => res.data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reprendre"], exact: false });
      },
    });
  };
  const { mutate: reprendre_session, isPending } = useReprendre();


  const reprendreSession = (e) => {
    e.stopPropagation()
    reprendre_session({
      onSuccess: () => {
        Swal.fire({
          icon: "success",
        });
      },
      onError: () => {

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        });
      }
    });
    console.log("idSession :", idSession, "idTag :", idTag, "idConnecteur :", idConnecteur, "idchargePoint : ", idChargePoint);

  }
  if (isPending) {
    return <p>Loading ...</p>
  }

  return (
    <button disabled={disabled} onClick={(e) => reprendreSession(e)} className={`p-2 text-white ${disabled ? "bg-blue-200" : "bg-blue-500 hover:bg-blue-600"}  rounded-xl`} >
      <RxReload color='#ffffff' />
    </button>
  )
}

export default ButtonReprendreTransaction
