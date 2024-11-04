import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination";
import useGetSpecificDataWithPaginationRecharge from "@/lib/hoocks/useGetSpecificDataWithPaginationRecharge";

export const useGetTransactionRechargeSpecific = (url, id, queryKey, page, number_items) => useGetSpecificDataWithPaginationRecharge(url, id, queryKey, page, number_items)
export const useGetTransactionRecharge = (url, queryKey, page, number_items) => useGetDataWithPagination(url, queryKey, page, number_items)


