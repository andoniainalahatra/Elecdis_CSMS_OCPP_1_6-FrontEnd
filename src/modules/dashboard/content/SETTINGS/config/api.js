import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

// Hook personnalisé pour la réinitialisation de mot de passe
export const changeConfiguration = () => {
  return useMutation({
    mutationFn: () =>
      axiosInstance
        .post(`/configuration/change_configuration`, null, {
          params: { key, value, charge_point_id },
        }) // Envoi comme paramètre de requête
        .then((res) => res.data),

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Modifier succès !",
      });
    },
    onError: (error) => {
      console.log(error.response.data.detail);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur s’est produite : ${
          error.response.data.detail || "Erreur inconnue"
        }`,
      });
    },
  });
};
