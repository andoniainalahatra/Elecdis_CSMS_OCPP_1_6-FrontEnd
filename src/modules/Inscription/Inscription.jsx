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
import logo from "/public/images/logo1.png";
import FloatingLabelInput from "@/components/forms/FloatingLabelInput";

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
                  <FloatingLabelInput id="nom" label="Votre nom *"/>
                </div>
                <div className="flex flex-col space-y-1.5 w-1/2">
                 <FloatingLabelInput id="prenom" label="Votre prenom *"/>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <FloatingLabelInput id="email" label="Votre email *" type="email"/>
              </div>
              <div className="flex flex-col space-y-1.5">
                  <FloatingLabelInput id="password" label="Votre mot de passe" type="password"/>
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
