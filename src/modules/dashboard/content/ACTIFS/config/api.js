import axiosInstance from "@/lib/axiosInstance.js";
import React, { useState, useEffect } from "react";

const useHistoriqueCp = (
  url,
  id_cp = "" || undefined,
  status = "",
  start_time = "",
  end_time = ""
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fonction pour effectuer la requête
    const fetchData = async () => {
      setIsLoading(true); // Début du chargement
      try {
        const response = await axiosInstance.get(`${url}`, {
          params: {
            id_cp: id_cp || undefined,
            status: status || undefined,
            start_time: start_time,
            end_time: end_time,
          },
        });
        setData(response.data); // Met à jour les données
      } catch (err) {
        setError(err); // Enregistre l'erreur si la requête échoue
      } finally {
        setIsLoading(false); // Fin du chargement
      }
    };

    // Appel de la fonction fetchData
    fetchData();
  }, [url, id_cp, status, start_time, end_time]); // Requête à chaque changement de ces valeurs

  return { data, error, isLoading };
};

export default useHistoriqueCp;
