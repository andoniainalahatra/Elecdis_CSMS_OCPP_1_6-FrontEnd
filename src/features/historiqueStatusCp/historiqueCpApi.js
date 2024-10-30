import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination.js";

export const HistoriqueCp = (url, queryKey, page, number_items) =>
  useGetDataWithPagination(url, queryKey, page, number_items);
