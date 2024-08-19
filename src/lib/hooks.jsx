import { useMemo, useState } from "react";
import { calculPercentage } from "./utils";

/**
 * Hook personnalisé pour calculer et retourner le pourcentage de changement 
 * entre deux séries de données (valeurs actuelles et anciennes).
 *
 * @param {Array} chartData - Un tableau d'objets contenant les données du graphique.
 * Chaque objet doit avoir une propriété `currentValue` pour la valeur actuelle et 
 * une propriété `oldValue` pour la valeur ancienne.
 *
 * @returns {Object} - Un objet contenant les propriétés suivantes :
 *  - `percentVal` {string}: Le pourcentage de changement formaté en chaîne de caractères avec le signe + si positif ou - si negatif.
 *  - `colorPercent` {string}: La couleur associée au pourcentage de changement, vert si positif et rouge si négatif.
 *
 * @example
 * const { percentVal, colorPercent } = usePercent(chartData);
 * console.log(percentVal); // "+20%"
 * console.log(colorPercent); // "#36E73D"
 */

export const usePercent = (chartData) => {
    const [colorPercent, setColorPercent] = useState("")
    const [percentVal, setPercentVal] = useState('')
    useMemo(() => {
        const sumCurrent = chartData.reduce((sum, data) => sum + data.currentValue, 0);
        const sumOld = chartData.reduce((sum, data) => sum + data.oldValue, 0);
        const valuePercent =  calculPercentage(sumCurrent, sumOld);
        if (sumCurrent > sumOld) {
          setColorPercent("#36E73D")
          setPercentVal(`+${valuePercent}%`);
        }
        else{
          setColorPercent("#F2505D")
          setPercentVal(`-${valuePercent}% `);
        }
    
      }, [chartData]);
      return { percentVal, colorPercent };
}