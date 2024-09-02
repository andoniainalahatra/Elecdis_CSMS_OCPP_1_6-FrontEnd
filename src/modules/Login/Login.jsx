import { useForm, Controller } from "react-hook-form";
import Input from "./components/Input";
import CheckBox from "./components/CheckBox";
import Boutton from "./components/Boutton";
import ErrorMessage from "../../components/ErrorMessage";
import NavigateLink from "./components/NavigateLink";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";

const Login = ({ children, Title }) => {
  const [invalidMessage, setInvalidMessage] = useState('');
  
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/token", data);
      // Si la réponse est un succès (200 OK), stocker le token
      const { access_token, role } = response.data;
      console.log(access_token, "acces", role, "role");
      
      if (data.rememberMe) {
        localStorage.setItem("access_token", access_token);
      } else {
        sessionStorage.setItem("access_token", access_token);
      }

      alert("Login successful!");
    } catch (error) {
      // Gérer les erreurs d'authentification
      if (error.response && error.response.status === 401) {
        setInvalidMessage(error.response.data.detail)
      } else {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full bg-[#f8f9f7] h-screen flex items-center justify-center"
    >
      <div className="shadow-xl bg-white max-sm:shadow-none w-[400px] 2xl:w-[500px] h-auto p-6 flex items-center justify-center flex-col gap-[4vh] rounded-lg">
        <div className="w-full flex items-center flex-col justify-center">
          <div className="w-full flex items-center justify-center h-2 pt-10 flex-col mb-[4vh]">
            {children}
          </div>
          <h4 className="text-importantText max-lg:text-[20px] xl:text-2xl mb-[4vh]">
            {Title}
          </h4>
          {invalidMessage && <ErrorMessage message={invalidMessage} className="mb-[1vw]" />}
          <div className="w-full mb-[4vh]">
            <Controller
              name="email"
              rules={{
                required: "Adresse mail requis",
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                  message: "Adresse mail invalide",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="email"
                  label="Adresse email"
                  {...field}
                />
              )}
            />
            {errors?.email && <ErrorMessage message={errors.email.message} />}
          </div>
          <div className="w-full mb-[4vh]">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "le mot de passe est requis",
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  id="password"
                  {...field}
                  label="Mot de passe"
                />
              )}
            />
            {errors?.password && (
              <ErrorMessage message={errors.password.message} />
            )}
          </div>
          <div className="w-full mb-[4vh]">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <CheckBox
                  id="rememberMe"
                  label="Souvenez-vous de moi"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="w-full flex items-center flex-col justify-center gap-7">
          <Boutton label="CONNEXION" />
          <div className="w-full flex items-center min-2xl:text-center justify-between flex-col gap-5 min-2xl:flex-row">
            <NavigateLink route="/forgotpassword" label="Mot de pass oublier" />
            <NavigateLink
              route="/inscription"
              label="N'avez vous pas de compte, S'inscrire ?"
            />
          </div>
        </div>
        <div className="w-full">
          <p className="text-center text-simpleText text-base mt-[1vh]">
            Copyright, elecdis 2024
          </p>
        </div>
      </div>
    </form>
  );
};

export default Login;
