import axiosInstance from "@/lib/axiosInstance.js";
import { useQuery } from "@tanstack/react-query";
const useGetDataWithPagination = (url, queryKey, page, number_items) => {
  return useQuery({
    queryKey: [`${queryKey}`, page],

    queryFn: () =>
      axiosInstance
        .get(`/${url}?page=${page}&number_items=${number_items}`)
        .then((response) => response.data),
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });
};
export default useGetDataWithPagination;
