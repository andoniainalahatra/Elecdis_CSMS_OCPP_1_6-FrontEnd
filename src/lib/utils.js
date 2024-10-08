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


export const isFullDate = (dateString) => {
  return (dateString.match(/-/g) || []).length === 2; // Deux tirets pour YYYY-MM-DD
}

export const isMonthPresent = (dateString) => {
  return (dateString.match(/-/g) || []).length === 1; // Un tiret pour YYYY-MM
}
export const formatValue = (value) => {
  const roundedValue = Number(value.toFixed(2));
  if (roundedValue >= 1e6) {
    return `${(roundedValue / 1e6).toFixed(1)}M`; // Millions
  } else if (roundedValue >= 1e3) {
    return `${(roundedValue / 1e3).toFixed(1)}K`; // Milliers
  } else {
    return roundedValue.toString(); // Valeur inférieure à 1000
  }
};

export const convertToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(' ').filter((_, index) => index % 2 === 0).map(Number);
  return hours * 60 + minutes;
};


export const convertTimeToHourFormat = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`; 
};
