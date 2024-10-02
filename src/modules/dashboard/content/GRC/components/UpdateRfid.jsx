import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Input from "@/modules/Login/components/Input";
import Boutton from "@/modules/Login/components/Boutton";
import { IoMdCloseCircle } from "react-icons/io";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetOneRfid, useUpdateRfid } from "@/features/RFID/rfidApi";
import { PulseLoader } from "react-spinners";

export default function UpdateRfid({ action, id }) {
  const { data, error, isLoading } = useGetOneRfid(id);
  const [invalidMessage, setInvalidMessage] = useState("");
  const { mutate: update_rfid, isPending } = useUpdateRfid(id);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset, 
  } = useForm();
  useEffect(() => {
    if (data) {
      reset({
        rfid: data.rfid,
        user_id: data.user_id,
      });
    }
  }, [data, reset]);

  const onSubmit = (data) => {
    update_rfid(data, {
      onSuccess: () => {
        Swal.fire({
          icon: "success",
          title: "Numéro RFID modifié avec succès !",
        });
        action();
      },
      onError: (error) => {
        if (error.response?.status === 401) {
          setInvalidMessage("Identifiant utilisateur n'existe pas");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
          });
        }
      },
    });
  };

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 bg-black bg-opacity-40 w-full flex justify-center items-center h-screen">
        <PulseLoader color="#F2505D" />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-black bg-opacity-40 h-screen flex items-center justify-center"
      >
        <div className="relative bg-white shadow-xl backdrop-blur max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center justify-center flex-col gap-[4vh] rounded-lg">
          <button
            className="absolute bg-white top-1 right-1"
            onClick={() => action()}
          >
            <IoMdCloseCircle size={40} />
          </button>
          <div className="w-full flex items-center flex-col justify-center">
            <h4 className="text-importantText max-lg:text-[20px] xl:text-2xl mb-[4vh]">
              Modifier le numéro RFID
            </h4>

            <div className="w-full mb-[4vh]">
              <Controller
                name="rfid"
                control={control}
                rules={{
                  required: "Le numéro RFID est requis",
                  pattern: {
                    value: /[a-zA-Z0-9]/,
                    message: "Format invalide",
                  },
                }}
                render={({ field }) => (
                  <Input type="text" id="rfid" label="Numéro RFID" {...field} />
                )}
              />
              {errors?.rfid && <ErrorMessage message={errors.rfid.message} />}
            </div>

            <div className="w-full mb-[4vh]">
              <Controller
                name="user_id"
                control={control}
                rules={{
                  required: "L'identifiant utilisateur est requis",
                  pattern: {
                    value: /[a-zA-Z0-9]/,
                    message: "Format invalide",
                  },
                }}
                render={({ field }) => (
                  <Input
                    type="number"
                    id="idUser"
                    {...field}
                    label="Identifiant utilisateur lié"
                  />
                )}
              />
              {errors?.user_id && (
                <ErrorMessage message={errors.user_id.message} />
              )}
            </div>
            {invalidMessage && (
              <ErrorMessage message={invalidMessage} className="mb-[1vw]" />
            )}
          </div>

          <div className="w-full flex items-center flex-col justify-center gap-7">
            <Boutton isLoading={isPending} label="Mettre à jour" />
          </div>
          <div className="w-full">
            <p className="text-center text-simpleText text-base mt-[1vh]">
              Copyright, elecdis 2024
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}