import axiosInstance from "@/lib/axiosInstance";
import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from "sweetalert2";

export const useGetListRfid = (url, queryKey, page, number_items) => useGetDataWithPagination(url, queryKey, page, number_items);


export const useCreateRfid = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (credentials) => axiosInstance.post('/rfid', credentials).then((res)=>(res.data)),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ["dataRFID"], exact:false});
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Opps!..",
        text: "Une erreur s'est produit lors de la creation!"
      })
    },
  });
};