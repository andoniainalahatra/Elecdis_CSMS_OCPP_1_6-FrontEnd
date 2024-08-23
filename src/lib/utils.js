import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MONTHLABELS } from "@/_mock/constant"
import { TRIMERSTRELABELS } from "@/_mock/constant"
import { YEARLABEL } from "@/_mock/constant"
import { SEMESTRELABEL } from "@/_mock/constant"
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
  
  const allMonth = [];
  const combinedByMonth = [];
  
  DATA.forEach(item => {
    const monthIndex = new Date(item.timestamp).getUTCMonth();
    const itemYear = new Date(item.timestamp).getUTCFullYear();
    if (itemYear === year) {
      const monthLabel = MONTHLABELS[monthIndex]
      allMonth.push({ label : monthLabel, value : item.value})
    }
  })
  
  MONTHLABELS.forEach ( itemMonth => {
    const sum = allMonth.filter(item => item.label === itemMonth).reduce((acc, curr) => acc + curr.value, 0);
    combinedByMonth.push({ label : itemMonth, value : sum }) 
  })
  
  return combinedByMonth;
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

// export const getComparisonDataByYear = (data, selectedYear) => {
//   const currentData = getDataByMonth(data, selectedYear);
//   const previousYear = selectedYear - 1;
//   const oldData = getDataByMonth(data, previousYear);
//   const comparisonData = compareData(currentData, oldData);
  
//   return comparisonData;
// };

export const getDataByYear = (DATA) => 
{
  const allYear = [];
  const combinedByYear = [];

  DATA.forEach(item => {
    const itemYear = new Date(item.timestamp).getUTCFullYear();
    if (!isNaN(itemYear) && YEARLABEL.includes(itemYear.toString())) {
      allYear.push({ label: itemYear.toString(), currentValue: Number(item.value) });
    }
  });

  YEARLABEL.forEach(year => {
    const sum = allYear
      .filter(item => item.label === year)
      .reduce((acc, curr) => acc + curr.currentValue, 0);
    combinedByYear.push({ label: year, currentValue: sum });
  });

  return combinedByYear;
   
}



export const getDataByTrimestre = (data, year) => {
    
    const trimestres = [];
    const totalValueTrimestre = [];
    data.forEach(item => {
      const dataYear = new Date(item.timestamp).getUTCFullYear();
      const dataMonth = new Date(item.timestamp).getUTCMonth(); // 0-indexed (0 = January, 11 = December)

      if (dataYear === year) {
        if (dataMonth >= 0 && dataMonth <= 2) {
          trimestres.push({ label: "1erTrimestre", currentValue: item.value });
        } else if (dataMonth >= 3 && dataMonth <= 5) {
          trimestres.push({ label: "2èmTrimestre", currentValue: item.value });
        } else if (dataMonth >= 6 && dataMonth <= 8) {
          trimestres.push({ label: "3èmTrimestre", currentValue: item.value });
        } else if (dataMonth >= 9 && dataMonth <= 11) {
          trimestres.push({ label: "4èmTrimestre", currentValue: item.value });
        }
      }})
    TRIMERSTRELABELS.forEach(trimestre => {
      const sum = trimestres.filter(item => item.label === trimestre).reduce((acc, curr) => acc + curr.currentValue, 0);
      totalValueTrimestre.push({ label : trimestre, currentValue : sum })
    })

    return totalValueTrimestre;
}

export const getDataBySemestre = (data, year) => {
  
  const semestres = [];
  const totalValueSemestre = [];
  data.forEach(item => {
    const dataYear = new Date(item.timestamp).getUTCFullYear();
    const dataMonth = new Date(item.timestamp).getUTCMonth(); // 0-indexed (0 = January, 11 = December)

    if (dataYear === year) {
      if (dataMonth >= 0 && dataMonth <= 5) {
        semestres.push({ label: "1erSemestre", currentValue: item.value });
      } else if (dataMonth >= 6 && dataMonth <= 11) {
        semestres.push({ label: "2èmSemestre", currentValue: item.value });
      }
    }})
  SEMESTRELABEL.forEach(semestre => {
    const sum = semestres.filter(item => item.label === semestre).reduce((acc, curr) => acc + curr.currentValue, 0);
    totalValueSemestre.push({ label : semestre, currentValue : sum })
  })

  return totalValueSemestre;
}
