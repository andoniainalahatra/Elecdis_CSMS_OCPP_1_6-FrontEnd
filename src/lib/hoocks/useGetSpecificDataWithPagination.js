import axiosInstance from "@/lib/axiosInstance.js";
import { useQuery } from "@tanstack/react-query";
const useGetSpecificDataWithPagination = (url, id, queryKey, page, number_items) => {
  return useQuery({
    queryKey: [`${queryKey}`, page, id],

    queryFn: () =>
      axiosInstance
        .get(`/${url}/${id}?page=${page}&number_items=${number_items}`)
        .then((response) => response.data),
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });
};
export default useGetSpecificDataWithPagination;