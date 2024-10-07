import axiosInstance from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetDataFilter = (url, querkey) =>
  useQuery({
    queryKey: [querkey],
    queryFn: () => axiosInstance.get(url).then((response) => response.data),
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
  });


