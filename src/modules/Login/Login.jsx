import { useForm, Controller } from "react-hook-form";
import Input from "./components/Input";
import CheckBox from "./components/CheckBox";
import Boutton from "./components/Boutton";
import ErrorMessage from "./components/ErrorMessage";
import NavigateLink from "./components/NavigateLink";

const Login = ({ children, Title }) => {
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
  
  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="shadow-xl w-[400px] h-auto p-5 flex items-center justify-center flex-col gap-[5vh] rounded-md">
        <div className="w-full flex items-center flex-col justify-center gap-[4vh]">
          <div className="w-full flex items-center justify-center h-[25px] flex-col">
            {children}
          </div>
          <h4 className="text-importantText text-2xl">{Title}</h4>
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
              <Input type="text" id="email" label="Adresse email" placeholder="Adresse email..." {...field} />
            )}
          />
          {errors?.email && <ErrorMessage message={errors.email.message} />}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "le mot de passe est requis",
              minLength: {
                value: 5,
                message: "Mot de passe incorrect",
              },
            }}
            render={({ field }) => (
              <Input
                type="password"
                id="password"
                placeholder="Votre mot de pass..."
                {...field}
                label="Mot de passe"
              />
            )}
          />
          {errors?.password && (
            <ErrorMessage message={errors.password.message} />
          )}
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
        <div className="w-full flex items-center flex-col justify-center gap-7">
          <Boutton label="CONNEXION" />
          <div className="w-full flex items-center justify-between max-lg:flex-col max-lg:gap-5">
            <NavigateLink 
              route="#" 
              label="Mot de pass oublier" 
            />
            <NavigateLink
              route="#"
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
