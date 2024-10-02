import { clsx } from "clsx"
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge"
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export function getToken() {
  let token = Cookies.get('access_token');
  return token;
}


/**
 * 
 * @param {number} newValue - somme de nouvelle valeur
 * @param {number} oldValue - somme de ancien valeur
 * @returns {number} - arrondissement de valeur du pourcentage 
 */
export const calculPercentage = (newValue, oldValue) => {
  if (oldValue === 0) {
      return "∞";
  }
  return Math.round((newValue * 100) / oldValue);
};
