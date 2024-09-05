import { loginUser } from '@/features/auth/authApi';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (data) => {
      const tokenExpiry = data.rememberMe ? 7 : 1; // 7 jours si "rememberMe" est activé, sinon 1 jour
      // Enregistrer le token et l'utilisateur dans les cookies avec SameSite et Secure
      Cookies.set('access_token', data.access_token, {
        expires: tokenExpiry,
        secure: true, // Obligatoire si SameSite=None
        sameSite: 'None' // Ou 'Lax', selon le comportement souhaité
      });
      Cookies.set('user', JSON.stringify(data.user), {
        expires: tokenExpiry,
        secure: true,
        sameSite: 'None'
      });
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};