import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

// Hook personnalisé pour la réinitialisation de mot de passe
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email) =>
      axiosInstance
        .post(`/auth/forgot-password`, null, { params: { email } }) // Envoi comme paramètre de requête
        .then((res) => res.data),

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Mail envoyé avec succès !",
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

export const useVerification = () => {
  return useMutation({
    mutationFn: ({ code, email }) =>
      axiosInstance
        .post(`/auth/check_password_reset_code`, null, {
          params: { code, email }, // Utilisation des paramètres dans l'URL
        })
        .then((res) => res.data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Code vérifié !",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur s’est produite : ${
          error?.response?.data?.message || "Erreur inconnue"
        }`,
      });
    },
  });
};

export const useModification = () => {
  return useMutation({
    mutationFn: (data) =>
      axiosInstance.post(`/auth/reset_password`, data).then((res) => res.data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Code modifier avec succees !",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur s’est produite : ${
          error?.response?.data?.message || "Erreur inconnue"
        }`,
      });
    },
  });
};
