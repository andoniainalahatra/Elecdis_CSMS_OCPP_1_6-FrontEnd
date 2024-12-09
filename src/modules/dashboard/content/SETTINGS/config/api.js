import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

// Hook personnalisé pour la réinitialisation de mot de passe
export const useChangeConfiguration = () => {
  return useMutation({
    mutationFn: (
      configData // Utilise les données reçues ici
    ) =>
      axiosInstance
        .post(`/configuration/change_configuration`, null, {
          params: configData, // Envoi des données dans les paramètres
        })
        .then((res) => res.data),

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Modification réussie !",
      });
    },
    onError: (error) => {
      console.error(error.response?.data?.detail || "Erreur inconnue");
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Une erreur s’est produite : ${
          error.response?.data?.detail || "Erreur inconnue"
        }`,
      });
    },
  });
};

export const usechangeAvailability = () => {
  return useMutation({
    mutationFn: (configData) =>
      axiosInstance
        .post(`/configuration/change_availability`, null, {
          params: { configData },
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

export const usegetCompositeSchedule = () => {
  return useMutation({
    mutationFn: () =>
      axiosInstance
        //get_composite_scheduleChange Availability
        .post(`/configuration/get_composite_scheduleChange`, null, {
          params: { duration, chargingRateUnit, connectorId, charge_point_id },
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

export const usereset = () => {
  return useMutation({
    mutationFn: () =>
      axiosInstance
        //get_composite_scheduleChange Availability
        .post(`/configuration/reset`, null, {
          params: { charge_point_id, reset_type },
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

export const usesendLocalList = () => {
  return useMutation({
    mutationFn: () =>
      axiosInstance
        //get_composite_scheduleChange Availability
        .post(`/configuration/reset`, null, {
          params: { charge_point_id, reset_type },
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
