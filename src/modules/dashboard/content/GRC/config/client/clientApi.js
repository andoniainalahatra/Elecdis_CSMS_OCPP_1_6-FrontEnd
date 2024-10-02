import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination.js";
import { useQueryClient } from "@tanstack/react-query";
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
