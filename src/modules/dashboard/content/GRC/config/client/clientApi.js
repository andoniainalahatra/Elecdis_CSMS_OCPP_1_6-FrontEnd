import axiosInstance from "@/lib/axiosInstance";
import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination.js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const ClientApi = (url, queryKey, page, number_items) =>
  useGetDataWithPagination(url, queryKey, page, number_items);

export const useUpdateClient = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials) =>
      axiosInstance
        .put(`/users/profile/${id}`, credentials)
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientList"], exact: false });
      Swal.fire({
        icon: "success",
        title: "Succès",
        text: "Le RFID a été supprimé avec succès!",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s’est produite lors de la suppression du RFID.",
      });
    },
  });
};

export const getSubscription = () => {
  return useQuery({
    queryKey: ["getsubscription"],
    queryFn: () =>
      axiosInstance
        .get(
          `subscription/subscriptions/?page=${1}&number_items=${1000}`
          // subscription/subscriptions/?page=1&number_items=1000
        )
        .then((res) => res.data),
    enabled: true, // Désactivé jusqu'à ce qu'il soit explicitement activé par `refetch`
  });
};

export const getPartenar = (IdStation, idTag, adminData) => {
  return useQuery({
    queryKey: ["getPartener", IdStation, idTag, adminData],
    queryFn: () =>
      axiosInstance
        .get(
          `/cp/send_remoteStartTransaction/${IdStation}/${idTag}/${adminData[1].id_connecteur}`
        )
        .then((res) => res.data),
    enabled: true, // Désactivé jusqu'à ce qu'il soit explicitement activé par `refetch`
  });
};
