import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Input from "@/modules/Login/components/Input";
import Boutton from "@/modules/Login/components/Boutton";
import { IoMdCloseCircle } from "react-icons/io";
import ErrorMessage from "@/components/ErrorMessage";
import { useGetOneRfid, useUpdateRfid } from "@/features/RFID/rfidApi";
import { PulseLoader } from "react-spinners";
import FloatingLabelInput from "@/components/Privates/forms/FloatingLabelInput";
import SelectList from "./SelectList";
import { getSubscription } from "../config/client/clientApi";

export default function EditClient({ action, id }) {

    const { data, error, isLoading } = useGetOneRfid(id);
    const [invalidMessage, setInvalidMessage] = useState("");

    const { mutate: update_rfid, isPending } = useUpdateRfid(id);

    const { control, formState: { errors }, handleSubmit, reset, } = useForm();

    const { refetch: useSubscription, isPending: isPost, data: dataStart, error: errorStart } = getSubscription();




    useEffect(() => {
        if (data) {
            reset({
                rfid: data.rfid,
                user_id: data.user_id,
            });
        }
        useSubscription();
    }, [data, reset]);


    const onSubmit = (data) => {
        // update_rfid(data, {
        //     onSuccess: () => {
        //         Swal.fire({
        //             icon: "success",
        //             title: "Numéro RFID modifié avec succès !",
        //         });
        //         action();
        //     },
        //     onError: (error) => {
        //         if (error.response?.status === 401) {
        //             setInvalidMessage("Identifiant utilisateur n'existe pas");
        //         } else {
        //             Swal.fire({
        //                 icon: "error",
        //                 title: "Oops...",
        //                 text: "Une erreur s'est produite. Veuillez réessayer plus tard.",
        //             });
        //         }
        //     },
        // });
        console.log(data);
    };


    // if (isLoading) {
    //     return (
    //         <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-40">
    //             <PulseLoader color="#F2505D" />
    //         </div>
    //     );
    // }

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center justify-center w-full h-screen bg-black bg-opacity-40"
            >
                <div className="relative bg-white shadow-xl backdrop-blur max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center justify-center flex-col gap-[4vh] rounded-lg">
                    <button
                        className="absolute bg-white top-1 right-1"
                        onClick={() => action()}
                    >
                        <IoMdCloseCircle size={40} />
                    </button>

                    <div className="flex flex-col items-center justify-center w-full">
                        <h4 className="text-importantText max-lg:text-[20px] xl:text-2xl mb-[4vh]">
                            Modifier l'information du client
                        </h4>

                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="first_name"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}

                                render={({ field }) => (
                                    <Input type="text" label="Nom" {...field} />
                                )}
                            />
                            {errors?.first_name && <ErrorMessage message={errors.first_name.message} />}
                        </div>

                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="last_name"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}

                                render={({ field }) => (
                                    <Input type="text" label="Prenom" {...field} />
                                )}
                            />
                            {errors?.last_name && <ErrorMessage message={errors.last_name.message} />}
                        </div>

                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}

                                render={({ field }) => (
                                    <Input type="text" label="Email" {...field} />
                                )}
                            />
                            {errors?.email && <ErrorMessage message={errors.email.message} />}
                        </div>

                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}

                                render={({ field }) => (
                                    <Input type="text" label="Numero de telephone" {...field} />
                                )}
                            />
                            {errors?.phone && <ErrorMessage message={errors.phone.message} />}
                        </div>

                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="id_partner"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}

                                render={({ field }) => (
                                    <Input type="text" label="Partenariat" {...field} />
                                )}
                            />
                            {errors?.subscription && <ErrorMessage message={errors.subscription.message} />}
                        </div>

                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="id_subscription"
                                control={control}
                                rules={{
                                    required: "Ce champ est requis",
                                    pattern: {
                                        value: /[a-zA-Z0-9]/,
                                        message: "Format invalide",
                                    },
                                }}

                                render={({ field }) => (
                                    <SelectList id="id_subscription" label="Souscription" type="select" {...field} data={''} />
                                )}
                            />
                            {errors?.partner && <ErrorMessage message={errors.partner.message} />}
                        </div>

                        {invalidMessage && (
                            <ErrorMessage message={invalidMessage} className="mb-[1vw]" />
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center w-full gap-7">
                        <Boutton isLoading={isPending} label="Mettre à jour" />
                    </div>

                    {isPost && <p>En cours...</p>}
                    {dataStart && <p>Données reçues : {JSON.stringify(dataStart.data)}</p>}
                    {errorStart && <p>Erreur : {errorStart.message}</p>}

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
