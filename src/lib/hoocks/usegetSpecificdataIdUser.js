import axiosInstance from "@/lib/axiosInstance.js";
import { useQuery } from "@tanstack/react-query";
const useGetSpecificDataWithPaginationId_user = (url, id, queryKey, page, number_items) => {
    return useQuery({
      queryKey: [`${queryKey}`, page, id],
  
      queryFn: () =>
        axiosInstance
          .get(`/${url}?id_user=${id}&page=${page}&number_items=${number_items}`)
          .then((response) => response.data),
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
    });
  };
  export default useGetSpecificDataWithPaginationId_user;