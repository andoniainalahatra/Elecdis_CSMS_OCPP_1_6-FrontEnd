import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const useGetSpecificDataWithPaginationRecharge = (url, id, queryKey, page, number_items) => {
    return useQuery({
      queryKey: [`${queryKey}`, page, id],
  
      queryFn: () =>
        axiosInstance
          .get(`/${url}?id_historique_session=${id}&page=${page}&number_items=${number_items}`)
          .then((response) => response.data),
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
    });
  };
  export default useGetSpecificDataWithPaginationRecharge;