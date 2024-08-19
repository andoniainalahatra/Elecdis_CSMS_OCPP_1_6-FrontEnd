import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
/**
 * 
 * @param {number} newValue - somme de nouvelle valeur
 * @param {number} oldValue - somme de ancien valeur
 * @returns {number} - arrondissement de valeur du pourcentage en deux chiffre
 */
export const calculPercentage = (newValue, oldValue) => {
  return Math.round((newValue * 100) / oldValue, 2);
}
