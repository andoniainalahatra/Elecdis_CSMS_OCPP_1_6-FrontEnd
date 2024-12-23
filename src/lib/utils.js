import { clsx } from "clsx";
import Cookies from "js-cookie";
import { twMerge } from "tailwind-merge";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function getToken() {
  let token = Cookies.get("access_token");
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
};

export const isMonthPresent = (dateString) => {
  return (dateString.match(/-/g) || []).length === 1; // Un tiret pour YYYY-MM
};
export const isOnlyYear = (dateString) => {
  return /^\d{4}$/.test(dateString); 
};
export const formatValue = (value) => {
  const roundedValue = Number(value.toFixed(2));
  const formatWithSpaces = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return roundedValue % 1 === 0
    ? formatWithSpaces(roundedValue.toFixed(0)) 
    : formatWithSpaces(roundedValue.toFixed(2));
};
// const formatValue = (value) => {
//   const roundedValue = Number(value.toFixed(2));
//   if (roundedValue >= 1e6) {
//     return ${(roundedValue / 1e6).toFixed(1)}M; // Millions
//   } else if (roundedValue >= 1e3) {
//     return ${(roundedValue / 1e3).toFixed(1)}K; // Milliers
//   } else {
//     return roundedValue.toString(); // Valeur inférieure à 1000
//   }
// };

export const convertToMinutes = (timeString) => {
  const [hours, minutes] = timeString
    .split(" ")
    .filter((_, index) => index % 2 === 0)
    .map(Number);
  return hours * 60 + minutes;
};

export const convertTimeToHourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return `${hours.toString().padStart(2, "0")}h${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const takeOnlyTime =  (date) => {
  if(date){
    const [dateOnly, timeOnly] = date.split("T");
    return timeOnly.slice(0,5)
  }else{
    return "en cours"
  }
}
export const takeOnlyDate = (date) => {
  if(date){
    const [dateOnly, timeOnly] = date.split("T");
  return dateOnly
  }else{
    return "en cours"
  }
}

export const convertDate = (dateString) => {
  if (dateString == null) {
    return "Jamais utilisé";
  } else {
    const date = new Date(dateString);

    // Obtenir le jour, le mois et l'année au format JJ/MM/AAAA
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
    const year = date.getFullYear();

    // Obtenir l'heure et les minutes au format HH:MM
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  }
};

export const transformValue = (value) => {
  const formatNumber = (num, unit) => {
    // Arrondir le nombre à une décimale avant de formater
    const roundedNum = Math.round(num * 10) / 10;

    // Vérifier si le nombre arrondi est sans décimales significatives (.0)
    if (roundedNum % 1 === 0) {
      return roundedNum.toLocaleString("fr-FR") + ` ${unit}`;
    }

    return (
      roundedNum.toLocaleString("fr-FR", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) + ` ${unit}`
    );
  };

  if(value){
    if (value.toLowerCase().includes("kwh")) {
      const number = parseFloat(value.replace(/ kwh/i, "").replace(",", "."));
      return formatNumber(number, "kWh");
    } else if (value.toLowerCase().includes("ar")) {
      const number = parseFloat(value.replace(/ ar/i, "").replace(",", "."));
      return formatNumber(number, "Ar");
    } else {
      return value; // Retourne la valeur originale si elle ne contient ni "kwh" ni "ar"
    }
  }else{
    return "null"
  }
};
