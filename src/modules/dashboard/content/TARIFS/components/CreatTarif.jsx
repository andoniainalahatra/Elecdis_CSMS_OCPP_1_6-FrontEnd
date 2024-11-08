import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import Swal from "sweetalert2";
import Input from "@/modules/Login/components/Input";
import Boutton from "@/modules/Login/components/Boutton";
import { IoMdCloseCircle } from "react-icons/io";
import ErrorMessage from "@/components/ErrorMessage";
// import { useCreateRfid } from "@/features/RFID/rfidApi";
import ColorPickerComponent from "@/components/ColorPickerComponent";

export default function CreateTarif({ action }) {
  //   const [invalidMessage, setInvalidMessage] = useState("");
  //   const { mutate: create_rfid, isPending: isCreating } = useCreateRfid();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name_tarif: "",
      description: "",
      start_hour: "",
      end_hour: "",
      price : "",
      backgroundColor: "#3f3c3c",
      textColor: "#d5cdcd",
      majoration : "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // create_rfid(data, {
    //   onSuccess: () => {
    //     Swal.fire({
    //       icon: "success",
    //       title: "RFID créé avec succès !",
    //     });
    //     action();
    //   },
    //   onError: (error) => {
    //     if (error.response?.status === 401) {
    //       setInvalidMessage("Identifiant utilisateur n'existe pas");
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    //       });
    //     }
    //   },
    // });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-black bg-opacity-40 h-screen flex items-center justify-center"
      >
        <div className="relative bg-white shadow-xl w-[450px] h-auto p-6 flex items-center justify-center flex-col gap-6 rounded-lg">
          <button
            className="absolute bg-white top-1 right-1"
            onClick={() => action()}
          >
            <IoMdCloseCircle size={40} />
          </button>
          <h4 className="text-importantText text-2xl mb-2">Créer un Tarif</h4>

          {/* Nom du tarif */}
          <div className="w-full mb-2">
            <Controller
              name="name_tarif"
              rules={{
                required: "Le nom est requis",
                pattern: {
                  value: /[a-zA-Z0-9]/,
                  message: "Format invalide",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="name_tarif"
                  label="Nom du tarif"
                  {...field}
                />
              )}
            />
            {errors?.name_tarif && (
              <ErrorMessage message={errors.name_tarif.message} />
            )}
          </div>

          {/* Description */}
          <div className="w-full mb-2">
            <Controller
              name="description"
              rules={{
                required: "La description est requise",
                pattern: {
                  value: /[a-zA-Z0-9]/,
                  message: "Format invalide",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="description"
                  label="Description du tarif"
                  {...field}
                />
              )}
            />
            {errors?.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>
          <div className="w-full flex justify-center items-center gap-6">
            {/* Heure de début */}
            <div className="w-full mb-2">
              <Controller
                name="start_hour"
                rules={{
                  required: "L'heure de début est requise",
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="start_hour"
                    label="Heure de début"
                    {...field}
                  />
                )}
              />
              {errors?.start_hour && (
                <ErrorMessage message={errors.start_hour.message} />
              )}
            </div>
            {/* Heure de fin */}
            <div className="w-full mb-2">
              <Controller
                name="end_hour"
                rules={{
                  required: "L'heure de fin est requise",
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="end_hour"
                    label="Heure de fin"
                    {...field}
                  />
                )}
              />
              {errors?.end_hour && (
                <ErrorMessage message={errors.end_hour.message} />
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-6">
            {/* Heure de début */}
            <div className="w-full mb-2">
              <Controller
                name="price"
                rules={{
                  required: "Le prix est requis",
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="price"
                    label="Prix pour le tarif en Ar"
                    {...field}
                  />
                )}
              />
              {errors?.price && (
                <ErrorMessage message={errors.price.message} />
              )}
            </div>
            {/* Heure de fin */}
            <div className="w-full mb-2">
              <Controller
                name="majoration"
                rules={{
                  required: "La majoration est requise",
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="majoration"
                    label="Taux de majoration"
                    {...field}
                  />
                )}
              />
              {errors?.majoration && (
                <ErrorMessage message={errors.majoration.message} />
              )}
            </div>
          </div>
          {/* Couleur de fond */}
          <div className="w-full mb-2">
            <Controller
              name="backgroundColor"
              control={control}
              render={({ field }) => (
                <ColorPickerComponent
                  value={field.value}
                  onChange={field.onChange}
                  label="Choisir une couleur pour le fond du box"
                />
              )}
            />
            {errors?.backgroundColor && (
              <ErrorMessage message={errors.backgroundColor.message} />
            )}
          </div>

          {/* Couleur du texte */}
          <div className="w-full mb-2">
            <Controller
              name="textColor"
              control={control}
              render={({ field }) => (
                <ColorPickerComponent
                  value={field.value}
                  onChange={field.onChange}
                  label="Choisir une couleur pour les textes du box"
                />
              )}
            />
            {errors?.textColor && (
              <ErrorMessage message={errors.textColor.message} />
            )}
          </div>

          <Boutton isLoading={false} label="CRÉER" />
          <p className="text-center text-simpleText text-base mt-4">
            Copyright, elecdis 2024
          </p>
        </div>
      </form>
    </div>
  );
}
