import { useMemo, useState } from "react";
import { calculPercentage } from "../utils";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

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
    const [percentVal, setPercentVal] = useState('');
    useMemo(() => {
        if(chartData){
            const sumCurrent = chartData.reduce((sum, data) => sum + data.currentValue, 0);
            const sumOld = chartData.reduce((sum, data) => sum + data.oldValue, 0);
            const valuePercent = calculPercentage(sumCurrent, sumOld);
            if (sumCurrent > sumOld) {
                setPercentVal(<div className="flex items-center justify-center"><FaArrowUpLong color="#36E73D" /><span className="text-[#36E73D]">{valuePercent}%</span></div>);
            } else {
                setPercentVal(<div className="flex items-center justify-center"><FaArrowDownLong color="#F2505D" /><span className="text-[#F2505D]">{valuePercent}%</span></div>);
            }
        }
    }, [chartData]);

    return { percentVal };
};
  