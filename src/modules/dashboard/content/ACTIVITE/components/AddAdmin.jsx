import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Input from "@/modules/Login/components/Input";
import Boutton from "@/modules/Login/components/Boutton";
import ErrorMessage from "@/components/ErrorMessage";
import SelectList from "../../GRC/components/SelectList";
import { getSubscription } from "../../GRC/config/client/clientApi";

import { useAddAdmin } from "../config/Api/AdminApi";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Search from "../../GRC/components/Search";

export default function AddAdmin({ Id, setOpen }) {
    const [invalidMessage, setInvalidMessage] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // const { mutate: updateClient, isPending } = useUpdateClient(Id);
    const { mutate: addAdmin, isPending, isSuccess } = useAddAdmin();

    const { control, formState: { errors }, handleSubmit, reset } = useForm();
    const { refetch: fetchSubscription, isPending: isFetchingSubscriptions, data: subscriptions } = getSubscription();
    const [datas, setDatas] = useState([]);


    // Initialiser les valeurs du formulaire une fois les données du client et les souscriptions disponibles
    useEffect(() => {
        reset({
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            id_subscription: "",
            id_user_group: 1,  // Utiliser l'ID extrait de la souscription
            password: "000000",
            confirm_password: "000000",
        });
        fetchSubscription();  // Récupérer les souscriptions
    }, [subscriptions, reset]);

    useEffect(() => {
        if (subscriptions) {
            setDatas(subscriptions.data);  // Stocker les souscriptions dans l'état
        }
    }, [subscriptions]);

    const onSubmit = (formData) => {
        addAdmin(formData, {
        });
    }

    if (isSuccess) {
        setOpen(false)
    }


    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center justify-center w-full h-screen bg-black bg-opacity-40">
                <div className="relative bg-white shadow-xl backdrop-blur max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center justify-center flex-col gap-[4vh] rounded-lg">
                    {/* <button className="absolute bg-white top-1 right-1" onClick={()=>{}}>
                        <IoMdCloseCircle size={40} />
                    </button> */}

                    <div className="flex flex-col items-center justify-center w-full">
                        <h4 className="text-importantText max-lg:text-[20px] xl:text-2xl mb-[4vh]">
                            Ajout de l'Admin
                        </h4>

                        {/* First Name */}
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

                        {/* Last Name */}
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

                        {/* Email */}
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

                        {/* Phone */}
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
                                    <div>
                                        <label
                                            className={`absolute left-2 text-base bg-white px-7 py-0 transition-all duration-300 transform  -translate-y-3 scale-90
                                        ${isFocused ? ' text-[#F2505D]' : 'text-gray-500'}`}
                                        >
                                            Téléphone
                                        </label>

                                        <PhoneInput
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)} // Ajout de la gestion du blur
                                            international
                                            defaultCountry="MG"
                                            {...field}
                                            className="input-phone-number h-[50px] p-4 border rounded-sm focus:outline-none focus:border-[#F2505D] transition duration-200"
                                            placeholder="Entrez votre numéro" // Ajout d'un placeholder
                                        />
                                    </div>
                                )}
                            />
                            {errors?.phone && <ErrorMessage message={errors.phone.message} />}
                        </div>

                        {/* Subscription Select List */}
                        <div className="w-full mb-[4vh]">
                            <Controller
                                name="id_subscription"
                                control={control}
                                rules={{ required: "Ce champ est requis" }}
                                render={({ field }) => (
                                    // <SelectList
                                    //     id="id_subscription"
                                    //     label="Souscription"
                                    //     type="select"
                                    //     value={field?.subscription}  // Valeur actuelle
                                    //     datas={datas}
                                    //     onChange={field.onChange}
                                    // />
                                    <Search datas={datas} placeholder='Subscription' label={'Subscription'} onChange={field.onChange} searchKey="type_subscription" />
                                )}
                            />
                            {errors?.id_subscription && <ErrorMessage message={errors.id_subscription.message} />}
                        </div>

                        {/* Error Message */}
                        {invalidMessage && (
                            <ErrorMessage message={invalidMessage} className="mb-[1vw]" />
                        )}
                        {/* password */}


                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col items-center justify-center w-full gap-7">
                        <Boutton isLoading={isPending} label="Ajouter" />
                    </div>

                    {/* Footer */}
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
