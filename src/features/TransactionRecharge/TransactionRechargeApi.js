import axiosInstance from "@/lib/axiosInstance";
import useGetSpecificDataWithPaginationRecharge from "@/lib/hoocks/useGetSpecificDataWithPaginationRecharge";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionRechargeSpecific = (url, id, queryKey, page, number_items) => useGetSpecificDataWithPaginationRecharge(url, id, queryKey, page, number_items)

// /transaction/search_transactions?state=all&date_start=2024-11-14&date_end=2024-11-14&montant_debut=0&montant_fin=20000000&energy_debut=1&energy_fin=2000&page=1&number_items=50
export const useGetTransactionRecharge = (url, queryKey, state, date_start, date_end, montant_debut, montant_fin, energy_debut, energy_fin, page, number_items) => useQuery({
    queryKey: [`${queryKey}`, page, `${state}`, `${date_start}`, `${date_end}`, `${montant_debut}`, `${montant_fin}`, `${energy_debut}`, `${energy_fin}`],
    queryFn: () =>
      axiosInstance
        .get(`/${url}?state=${state}&date_start=${date_start}&date_end=${date_end}&montant_debut=${montant_debut}&montant_fin=${montant_fin}&energy_debut=${energy_debut}&energy_fin=${energy_fin}&page=${page}&number_items=${number_items}`)
        .then((response) => response.data),
    refetchOnWindowFocus: true,
    refetchInterval: 1000,
  });


