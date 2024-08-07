import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import logo from "/public/images/logo1.png";

const Inscription = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-[450px] shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-3 rounded-md p-3">
            <img src={logo} alt="" />
          </div>
          <CardTitle>Créer un compte</CardTitle>
          <CardDescription>Inscrivez-vous pour commencer.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex space-x-4">
                <div className="flex flex-col space-y-1.5 w-1/2">
                  {/* <Label htmlFor="nom">Nom</Label> */}
                  <Input id="nom" placeholder="Votre nom*" />
                </div>
                <div className="flex flex-col space-y-1.5 w-1/2">
                  {/* <Label htmlFor="prenom">Prenom</Label> */}
                  <Input id="prenom" placeholder="Votre prenom*" />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="email">Email</Label> */}
                <Input id="email" type="email" placeholder="Votre email*" />
              </div>
              <div className="flex flex-col space-y-1.5">
                {/* <Label htmlFor="password">Mot de passe</Label> */}
                <Input id="password" type="password" placeholder="Votre mot de passe" />
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button className="bg-primaryChart hover:bg-red-600">S'inscrire</Button>
        </CardFooter>
        <div className="flex justify-center mt-4 mb-6">
          <a className="text-primaryChart underline" href="#">
            Disposez-vous déjà d'un compte? Se connecter
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Inscription;
