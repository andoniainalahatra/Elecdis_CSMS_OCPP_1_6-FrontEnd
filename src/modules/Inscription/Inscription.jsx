import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";
import logo from "@/assets/logo1.png";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import ErrorMessage from "@/components/ErrorMessage";
import FloatingLabelInput from "@/components/Privates/forms/FloatingLabelInput";

const Inscription = () => {
  const mutation = useMutation({
    mutationFn: (newAdmin) => {
        return axiosInstance.post('/auth/register', newAdmin); // Endpoint pour créer la station
    },
    onSuccess: (data) => {
        console.log('Adminitstrateur créée avec succès:', data);
    },
    onError: (error) => {
        console.error('Erreur lors de la création de la station:', error.response?.data || error.message);
    }
});
  const { handleSubmit, control,formState:{errors} ,watch} = useForm()

  const pass=watch("password")
  // const confirmPassword=watch("confirmPassoword")

  const Submit = (data) => {
    const userData={
      ...data,
      id_subscription: 1,
      id_user_group: 1,
      id_partner: 1
    }
    console.log(userData);
    mutation.mutate(userData)
  }
  // const FloatingLabelInput = FormElements.getFloatingLabelInput();
  return (
    // <React.Suspense fallback={<div>Loading...</div>}>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 max-md:bg-white">
        <Card className="w-[450px] shadow-lg max-md:border-none max-md:shadow-none">
          <CardHeader>
            <div className="p-3 mx-auto mb-3 rounded-md">
              <img src={logo} alt="" />
            </div>
            <CardTitle>Créer un compte</CardTitle>
            <CardDescription>Inscrivez-vous pour commencer.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(Submit)}>
            <CardContent>

              <div className="grid items-center w-full gap-4">
                <div className="flex space-x-4">
                  <div className="flex flex-col w-1/2">
                    <Controller
                      name="last_name"
                      control={control}
                      defaultValue=""
                      render={
                        ({ field }) => <FloatingLabelInput
                          {...field}
                          id="last_name"
                          label="Votre nom *" />
                      }
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <Controller
                      name="first_name"
                      control={control}
                      defaultValue=""
                      render={
                        ({ field }) => <FloatingLabelInput
                          {...field}
                          id="first_name"
                          label="Votre prenom *" />
                      }
                    />

                  </div>
                </div>
               <div className="flex space-x-4">
               <div className="flex flex-col w-1/2">
                  <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      render={
                        ({ field }) => <FloatingLabelInput
                          {...field}
                          id="phone"
                          type="text"
                          label="Votre telephone *" />
                      }
                    />
                </div>
                <div className="flex flex-col w-1/2">
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={
                      ({ field }) => <FloatingLabelInput
                        {...field}
                        id="email"
                        type="email"
                        label="Votre email *" />
                    }
                  />
                </div>
               </div>
                <div className="flex space-x-4 max-md:flex-col max-md:space-x-0 max-md:gap-4">
                  <div className="flex flex-col w-1/2 max-md:w-full">
                 <Controller
                      name="password"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <FloatingLabelInput
                          {...field}
                          id="password"
                          type="password"
                          label="Votre mot de passe *"
                        />
                      )}
                    />
                    

                  </div>
                  <div className="flex flex-col w-1/2 max-md:w-full">
                    <Controller
                      name="confirm_password"
                      control={control}
                      defaultValue=""
                      rules={{required:"Confirmation requis",
                        validate:(value)=>{
                         return value === pass || "Mot de passe non identique a la confirmation"
                        }
                      }}
                      render={
                        ({ field }) => <FloatingLabelInput
                          {...field}
                          
                          id="confirm_password"
                          type="password"
                          label="Confirmer votre Mdp *" />
                      }
                    />
                    {errors?.confirm_password && <ErrorMessage message={errors.confirm_password.message}/>}

                  </div>
                </div>

                <div className="flex items-center space-x-2 text-simpleText">
                  <Checkbox id="terms" className="border-simpleText" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    J'accepte les termes et conditions.
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Annuler</Button>
              <Button className="bg-primaryChart hover:bg-red-600" type="submit">S'inscrire</Button>
            </CardFooter>
          </form>
          <div className="flex justify-center mt-4 mb-6">
            <Link className="text-sm underline text-primaryChart" to="/" >Disposez-vous déjà d'un compte? Se connecter</Link>
          </div>
        </Card>
      </div>
    // </React.Suspense>
  );
};

export default Inscription;
