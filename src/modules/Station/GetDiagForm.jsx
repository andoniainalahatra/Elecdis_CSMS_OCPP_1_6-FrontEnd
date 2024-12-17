import React from 'react'
import Input from '../Login/components/Input'
import Boutton from '../Login/components/Boutton'
import { Controller, useForm } from 'react-hook-form'
import { useGetDiagno } from './DetailApi';
import Swal from 'sweetalert2';

function GetDiagForm({action, Id}) {
const { mutate: get_Diagno, isPending: isGeting } = useGetDiagno(Id);

 const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
      path: "",
    },
  });
  const onGetDiagno = (data) => {
    get_Diagno(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          text: "Le fichier de diagnostic a été télécharger dans le serveur"
        });
        action(false);
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        });
      },
    });
  };
  return (
    <div className="text-gray-800 mt-2 transition-opacity duration-300 ease-in-out opacity-100 animate-fade-in">
            <form onSubmit={handleSubmit(onGetDiagno)}>
              <div className="">
                <Controller
                  name="startTime"
                  rules={{
                    required: "La date&heure debut est requis",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeHolder="YYYY-MM-DDTHH:MM:SS"
                      id="startTime"
                      label="Date & Heure debut Diagno"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-2">
                <Controller
                  name="endTime"
                  rules={{
                    required: "La date&heure debut est requis",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeHolder="YYYY-MM-DDTHH:MM:SS"
                      id="endTime"
                      label="Date & Heure fin Diagno"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="mt-2">
                <Controller
                  name="path"
                  rules={{
                    required:
                      "L'emplacement du fichier telecharge de diagnostic est requis",
                  }}
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      placeHolder="/nom emplacement"
                      id="path"
                      label="Nom du dossier pour télécharger le fichier"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="w-full mt-2 flex items-center flex-col justify-center gap-7">
                <Boutton isLoading={isGeting} label="Télécharger" />
              </div>
            </form>
          </div>
  )
}

export default GetDiagForm
