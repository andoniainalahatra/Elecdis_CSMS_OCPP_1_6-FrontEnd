import useExample from "@/lib/hoocks/useExample";

export const StationApi = (url,queryKey,page,number_items) => useExample(url, queryKey, page, number_items)

// const useExample = (url, queryKey, page, number_items) => {
//     return useQuery({
//         queryKey: [`${queryKey}`, page],
//
//         queryFn: () =>
//             axiosInstance.get(`/${url}?page=${page}&number_items=${number_items}`).then((response) => response)
//     })
// }
// export default useExample;

