import axiosInstance from "@/lib/axiosInstance.js";

export const getStations = (url, page, number_items) =>
  axiosInstance.get(`/${url}?page=${page}&number_items=${number_items}`).then((response) => response)

