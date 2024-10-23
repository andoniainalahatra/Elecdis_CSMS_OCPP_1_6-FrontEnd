import useGetDataWithPagination from "@/lib/hoocks/useGetDataWithPagination";

export const DefaillanceApi = (url,queryKey,page,number_items) => useGetDataWithPagination(url, queryKey, page, number_items)

