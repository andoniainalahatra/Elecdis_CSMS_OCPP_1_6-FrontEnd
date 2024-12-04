import axiosInstance from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query"
// /cp/getdiagno/?charge_point_id=4403050342100500&startTime=2024-11-29T00%3A00%3A00&stopTime=2024-11-29T23%3A00%3A00&path=%2Fdiagno

export const useGetDiagno = (id) => {
    return useMutation({
      mutationFn: (credentials) => {
        return axiosInstance
          .post(`/cp/getdiagno/?charge_point_id=${id}&startTime=${credentials.startTime}&stopTime=${credentials.endTime}&path=${credentials.path}`, credentials)
          .then((res) => res.data);
      }
    });
}