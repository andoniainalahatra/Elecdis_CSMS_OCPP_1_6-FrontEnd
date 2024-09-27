import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import Swal from "sweetalert2";

/**
 * 
 * @param {String} queryKey - queryKey du requete a invalider c-a-d requete a refetcher
 * @param {Function()} action - function qui ferme le modal
 * @param {string} endpoint - endpoint de l'API
 * @param {String} buttonText - Label du boutton
 */

const CsvUploader = ({ queryKey, action, endpoint, buttonText = "Envoyer CSV" }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const queryClient = useQueryClient();


  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => {
      return axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
    queryClient.invalidateQueries({ queryKey: [queryKey], exact: false });
      Swal.fire({
        title: "Fichier importé avec succès",
        icon: "success",
        text: data.message,
      });
      action();
    },
    onError: (error) => {
      Swal.fire({
        title: "Oops !",
        icon: "error",
        text: error.response?.data?.message || "Une erreur est survenue lors de l'importation",
      });
    },
  });

  const handleSubmit = () => {
    if (!file) {
      Swal.fire({
        title: "Oops !",
        icon: "error",
        text: "Impossible d'importer un fichier vide",
      });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    mutate(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40">
      <div className="relative bg-white rounded-lg w-[400px] p-4 flex flex-col justify-center items-center gap-4">
        <button
          className="absolute bg-white top-1 right-1 "
          onClick={() => action()}
        >
          <IoMdCloseCircle size={40} />
        </button>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border p-2"
        />
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="flex justify-center items-center w-full h-[6vh] bg-[#F2505D] rounded-md text-white text-base font-medium hover:bg-[#df3846]"
        >
          {isPending ? "Envoi en cours..." : buttonText}
        </button>
      </div>
    </div>
  );
};

export default CsvUploader;