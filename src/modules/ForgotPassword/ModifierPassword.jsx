import { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useModification } from "./api/api";
import Swal from "sweetalert2";
import Boutton from "../Login/components/Boutton";

export default function ModifierPassword() {

    const location = useLocation();
    const data = location.state;


    const [newPassFocused, setnewPassFocused] = useState(false);
    const [confPassFocused, setconfPassFocused] = useState(false);
    const [val, setValue] = useState('');
    const [val2, setValue2] = useState('');


    const { mutate: modifyCode, isPending, isSuccess } = useModification();

    const handleValue = (e) => {
        setValue(e.target.value);
    };

    const handleValue2 = (e) => {
        setValue2(e.target.value);
    };

    const handleSubmit = () => {
        if (val === val2) {
            modifyCode({
                code: data.code, email: data.email, new_password: val,
                confirm_password: val2,
            });
        } else {
            Swal.fire({
                icon: "warning",
                title: "Attention",
                text: "Veuillez verifier votre mots de passe.",
            });
        }
    };

    if (isSuccess) {
        return <Navigate to="/" replace />;
    }

    return (
        <div>
            <div className="flex items-center justify-center w-full h-screen">
                <div className="max-sm:shadow-none w-[400px] 2xl:w-[500px] shadow-xl p-6 bg-white rounded-lg">
                    <div className="flex items-center justify-center w-full p-3">
                        <MdOutlineEmail color="#F2505D" className="w-[20%] h-auto" />
                    </div>
                    <h2 className="mb-6 text-xl text-center text-importantText">Modifier votre Mots de passe</h2>

                    <p className="text-center text-simpleText">
                        Veuillez bien verifier votre mots de passe avant de l'envoyer.
                    </p>
                    <div className="relative w-full mt-4">
                        <input
                            type="password"
                            className="peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] mb-4"
                            value={val}
                            onChange={handleValue}
                            onFocus={() => setnewPassFocused(true)}
                            onBlur={() => (val ? setnewPassFocused(true) : setnewPassFocused(false))}
                        />
                        <label
                            className={`absolute left-2 text-base bg-white px-2 py-0 transition-all duration-300 transform ${newPassFocused
                                ? "-translate-y-3 scale-90 text-[#F2505D]"
                                : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
                                }`}
                        >
                            Nouveau mots de passe*
                        </label>
                    </div>

                    <div className="relative w-full mt-4">

                        <input
                            type="password"
                            className="peer w-full h-[6vh] rounded-md border-solid border-[#CDCBCB] border-[0.5px] indent-2 text-[#5a5858] text-base focus:outline-none focus:border-[#F2505D] mb-4"
                            value={val2}
                            onChange={handleValue2}
                            onFocus={() => setconfPassFocused(true)}
                            onBlur={() => (val2 ? setconfPassFocused(true) : setconfPassFocused(false))}
                        />
                        <label
                            className={`absolute left-2 text-base bg-white px-2 py-0 transition-all duration-300 transform ${confPassFocused
                                ? "-translate-y-3 scale-90 text-[#F2505D]"
                                : "max-sm:translate-y-[1vh] translate-y-[1.2vh] 2xl:translate-y-5 scale-100 text-simpleText"
                                }`}
                        >
                            Confirmer votre de passe*
                        </label>
                    </div>
                    <Boutton onButtonClick={handleSubmit} label="  Vérifier le code" isLoading={isPending} />
                </div>
            </div>
        </div>

    );
}

