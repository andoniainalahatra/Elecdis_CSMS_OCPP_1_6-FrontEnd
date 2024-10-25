import { loginUser } from "@/features/auth/authApi";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      const tokenExpiry = 7; // 7 jours si "rememberMe" est activé, sinon 1 jour
      Cookies.set("access_token", data.access_token, {
        expires: tokenExpiry,
        secure: false, // Obligatoire si SameSite=None
        sameSite: "Lax", // Ou 'Lax', selon le comportement souhaité
      });
      Cookies.set("user", JSON.stringify(data.user), {
        expires: tokenExpiry,
        secure: false,
        sameSite: "Lax",
      });
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
