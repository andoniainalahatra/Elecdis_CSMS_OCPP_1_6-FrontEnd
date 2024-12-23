import React from 'react'
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Controller, useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance.js";
import Swal from "sweetalert2";

function ChargePointTemplates() {
    const { handleSubmit, control } = useForm();
    const mutation = useMutation({
        mutationFn: (newStation) => {
            return axiosInstance.post('/cp/create', newStation); // Endpoint pour créer la station
        },
        onSuccess: (data) => {
            console.log('Station créée avec succès:', data);
            Swal.fire({
                title: 'Succès!',
                text: 'La station a été créée avec succès.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            // Optionnel: Vous pouvez ajouter une action, comme fermer un modal ou réinitialiser le formulaire


        },
        onError: (error) => {
            console.error('Erreur lors de la création de la station:', error.response?.data || error.message);
        }
    });

    const onSubmit = (data) => {
        const stationData = {
            ...data,
            status: "Unavailable",     // Valeur par défaut
            // longitude: 0,              // Valeur par défaut
            // latitude: 0                // Valeur par défaut
        };
        mutation.mutate(stationData)
        console.log(stationData);
    }
    return (
        <div className=''>
            <div className="bg-white p-4 my-3 border  rounded-md">
                <div className="grid grid-rows-2 ">
                    <h1 className='underline mb-3'>Charge Point Templates</h1>
                    <p className='text-gray-500'> Ici, vous pouvez créer votre point de charge personnalisé</p>
                </div>
            </div>

            <div className="bg-white border rounded-md p-4 mt-4">
                <div className="grid grid-rows ">
                    <div className="">
                        <h2 className='font-semibold mr-8'> Contenu du ChargePoint Templates</h2>
                        <hr className='text-gray-500 m-4'/>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <h2 className='m-8 font-semibold text-simpleText'>Informations concernant le materiel</h2>
                            <div className="m-8 grid grid-cols-2 gap-4 ">
                                <div className="">
                                    <label htmlFor="id" className='text-gray-600'>Identifiant</label>
                                    <Controller
                                        name="id"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="serial_number" className='text-gray-600'>Numero de serie</label>
                                    <Controller
                                        name="serial_number"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>

                                <div className="">
                                    <label htmlFor="charge_point_model" className='text-gray-600'>Modele</label>
                                    <Controller
                                        name="charge_point_model"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="charge_point_vendors" className='text-gray-600'> Fournisseur</label>
                                    <Controller
                                        name="charge_point_vendors"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <h2 className='m-8 font-semibold text-simpleText'>Informations concernant la localisation du
                                point de charge</h2>

                            <div className="m-8 grid grid-cols-3 gap-4">
                                <div className="">
                                    <label htmlFor="adresse" className='text-gray-600'> Adresse</label>
                                    <Controller
                                        name="adresse"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="latitude" className='text-gray-600'> Latitude</label>
                                    <Controller
                                        name="latitude"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="longitude" className='text-gray-600'> Longitude</label>
                                    <Controller
                                        name="longitude"
                                        control={control}
                                        render={({field}) => (
                                            <Input type="text" {...field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='m-4 gap-4'>
                                    <Button className='bg-primaryChart text-[#fefefe] hover:bg-red-500 mt-3 ml-4 '>
                                        Creer le point de charge
                                    </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChargePointTemplates