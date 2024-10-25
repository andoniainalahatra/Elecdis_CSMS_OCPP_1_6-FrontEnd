import * as React from "react";
import { useState } from "react";

const SelectListClient = ({ datas, label, onChange }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // Fonction pour gérer la saisie dans le champ de recherche
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        
        if (term) {
            // Filtrer les résultats en fonction du texte saisi
            const results = datas.filter(item => item.name.toLowerCase().includes(term.toLowerCase()));
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    };

    // Fonction pour gérer la sélection d'un élément dans la liste
    const handleSelectItem = (item) => {
        setSearchTerm(item.name);
        setFilteredResults([]);
        onChange?.(item.id); // Transmet l'ID sélectionné au parent
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Ajoute un léger délai pour éviter la fermeture immédiate
                placeholder={label}
                className="block w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
            />
            
            {isFocused && filteredResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                    {filteredResults.map(item => (
                        <li
                            key={item.id}
                            onClick={() => handleSelectItem(item)}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SelectListClient;
