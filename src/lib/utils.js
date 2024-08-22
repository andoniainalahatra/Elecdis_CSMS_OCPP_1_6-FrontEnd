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

/**
 * Function that orders all data by the 12 months of a given year.
 * The data should have a `timestamp` property.
 *
 * @param {Array<Object>} DATA - The array of objects containing the data to be ordered.
 * @param {number} year - The year for which the data should be ordered.
 * @returns {Array<Object>} - An array of objects ordered by the 12 months of the specified year.
 */

export const getDataByMonth = (DATA, year) => {
  const monthLabels = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];
  const allMonth = [];
  const combinedByMonth = [];
  
  DATA.forEach(item => {
    const monthIndex = new Date(item.timestamp).getUTCMonth();
    const itemYear = new Date(item.timestamp).getUTCFullYear();
    if (itemYear === year) {
      const monthLabel = monthLabels[monthIndex]
      allMonth.push({ label : monthLabel, value : item.value})
    }
  })
  
  monthLabels.forEach ( itemMonth => {
    const sum = allMonth.filter(item => item.label === itemMonth).reduce((acc, curr) => acc + curr.value, 0);
    combinedByMonth.push({ label : itemMonth, value : sum }) 
  })
  
  return combinedByMonth;
}


export const getDataByYear = (DATA) => 
{
  const yearLabels = ["2022", "2023", "2024"];
  const allYear = [];
  const combinedByYear = [];

  DATA.forEach(item => {
    const itemYear = new Date(item.timestamp).getUTCFullYear();
    if (!isNaN(itemYear) && yearLabels.includes(itemYear.toString())) {
      allYear.push({ label: itemYear.toString(), value: Number(item.value) });
    }
  });

  yearLabels.forEach(year => {
    const sum = allYear
      .filter(item => item.label === year)
      .reduce((acc, curr) => acc + curr.value, 0);
    combinedByYear.push({ label: year, value: sum });
  });

  return combinedByYear;
   
}

/**
 * Compare les données actuelles avec les anciennes et retourne un tableau d'objets fusionnés.
 * 
 * @param {Array<{label: string, value: number}>} currentData - Données actuelles.
 * @param {Array<{label: string, value: number}>} oldData - Données anciennes.
 * 
 * @returns {Array<{label: string, currentValue: number, oldValue: number}>} - Tableau des données avec `currentValue` et `oldValue` pour chaque label.
 */
export const compareData = (currentData, oldData) => {
  const oldDataMap = new Map();
  oldData.forEach(monthOldData => {
    oldDataMap.set(monthOldData.label, monthOldData.value);
  });

  const data = currentData.map(monthCurrentData => {
    const oldValue = oldDataMap.get(monthCurrentData.label) || 0;
    return {
      label: monthCurrentData.label,
      currentValue: monthCurrentData.value,
      oldValue: oldValue
    };
  });

  return data
}
