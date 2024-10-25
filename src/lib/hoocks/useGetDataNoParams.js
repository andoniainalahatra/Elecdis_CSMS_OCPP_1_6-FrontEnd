import axiosInstance from "@/lib/axiosInstance.js";
import { useQuery } from "@tanstack/react-query";
const useGetDataNoParams = (url, querykey) => {
  return useQuery({
    queryKey: [querykey],
    queryFn: () => axiosInstance.get(url).then((response) => response.data),
    refetchOnWindowFocus: true,
  });
};
export default useGetDataNoParams;
