import { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useVerification } from "./api/api";
import Swal from "sweetalert2";
import Boutton from "../Login/components/Boutton";

export default function EmailSend() {

  const location = useLocation();
  const email = location.state;


  const [isFocused, setIsFocused] = useState(false);
  const [val, setValue] = useState('');
  const [emails, setEmail] = useState(email);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  const { mutate: verifyCode, isPending, isSuccess } = useVerification();

  const handleValue = (e) => {
    setValue(e.target.value);
  };



  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  const handleResendEmail = () => {
    setCountdown(30);

    navigate("/forgotpassword");
  };
  const dataToSend = { code: val, email: email };

  if (isSuccess) {
    return <Navigate to="/newPassword" replace state={dataToSend} />;
    // return <EmailSend email={val} />
  }

  const handleSubmit = () => {
    if (val) {  // Assurez-vous que 'val' contient le code
      verifyCode({ code: val, email: emails });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Attention",
        text: "Veuillez saisir un code valide.",
      });
    }
  };


  return (
    <div>
      <div className="flex items-center justify-center w-full h-screen">
        <div className="max-sm:shadow-none w-[400px] 2xl:w-[500px] shadow-xl p-6 bg-white rounded-lg">
          <div className="flex items-center justify-center w-full p-3">
            <MdOutlineEmail color="#F2505D" className="w-[20%] h-auto" />
          </div>
          <h2 className="mb-6 text-xl text-center text-importantText">Vérifiez votre adresse e-mail</h2>

          <p className="text-center text-simpleText">
            Veuillez consulter l'adresse e-mail {emails} pour voir le code de réinitialisation de votre mot de passe.
          </p>
          <div className="relative w-full mt-4">
            <input
              id="code"
              type="text"
              className="peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] mb-4"
              value={val}
              onChange={handleValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => (val ? setIsFocused(true) : setIsFocused(false))}
            />
            <label
              htmlFor="code"
              className={`absolute left-2 text-base bg-white px-2 py-0 transition-all duration-300 transform ${isFocused
                ? "-translate-y-3 scale-90 text-[#F2505D]"
                : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
                }`}
            >
              Code*
            </label>
          </div>


          <Boutton onButtonClick={handleSubmit} label="  Vérifier le code" isLoading={isPending} />

          <button
            className="text-gray-500 hover:text-simpleText bg-gray-100 border-gray-400 hover:bg-gray-200 w-full h-[6vh] rounded-md text-base font-medium"
            onClick={handleResendEmail}
            disabled={countdown > 0} // Désactive le bouton jusqu'à la fin du compte à rebours
          >
            {countdown > 0 ? `Renvoyer dans ${countdown}s` : "Renvoyer un email"}
          </button>
        </div>
      </div>
    </div>

  );
}

