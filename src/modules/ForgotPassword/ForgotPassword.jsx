import { useState } from "react";
import Boutton from "../Login/components/Boutton";
import Logo from "@/assets/logo1.png";
import NavigateLink from "../Login/components/NavigateLink";
import { useForgotPassword } from "./api/api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom"; // Importer Navigate
import EmailSend from "./EmailSend";

export default function ForgotPassword() {
  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState('');
  const handleValue = (e) => {
    setValue(e.target.value);
  };

  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const onSubmit = () => {
    if (val) {
      forgotPassword(val); // Utiliser directement val ici
    } else {
      Swal.fire({
        icon: "warning",
        title: "Attention",
        text: "Veuillez saisir une adresse e-mail valide.",
      });
    }
  };

  // Redirige vers la page "emailSend" si la mutation est réussie
  if (isSuccess) {
    return <Navigate to="/emailSend" replace state={val} />;
    // return <EmailSend email={val} />
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="max-sm:shadow-none w-[400px] 2xl:w-[500px] shadow-xl p-6 bg-white rounded-lg">
        <div className="flex items-center justify-center w-full p-3">
          <img src={Logo} className="w-[40%] h-auto" alt="Logo" />
        </div>
        <h2 className="mb-6 text-xl text-center text-importantText">Réinitialiser votre mot de passe</h2>

        <p className="text-center text-simpleText">
          Saisissez votre adresse e-mail et nous vous enverrons des instructions
          pour réinitialiser votre mot de passe.
        </p>
        <div className="relative w-full mt-4">
          <input
            id="email"
            type="email"
            className="peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] mb-4"
            value={val}
            onChange={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => (val ? setIsFocused(true) : setIsFocused(false))}
          />
          <label
            htmlFor="email"
            className={`absolute left-2 text-base bg-white px-2 py-0 transition-all duration-300 transform ${isFocused
              ? "-translate-y-3 scale-90 text-[#F2505D]"
              : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
              }`}
          >
            Adresse email*
          </label>
        </div>
        <Boutton onButtonClick={onSubmit} label="Continuer" isLoading={isPending} />
        <div className="flex items-center justify-center mt-4">
          <NavigateLink route="/" label="Revenir à la page de connexion" />
        </div>
      </div>
    </div>
  );
}
