import { Label } from "@/components/ui/label";
import * as React from "react";
import { useState } from "react";

const Search = ({ datas, label, onChange, searchKey = "type_subscription", placeholder }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    // Fonction pour gérer la saisie dans le champ de recherche
    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            // Filtrer les résultats en fonction du texte saisi et de la clé dynamique
            const results = datas.filter(item =>
                item[searchKey].toLowerCase().includes(term.toLowerCase())
            );
            setFilteredResults(results);
        } else {
            setFilteredResults([]);
        }
    };

    // Fonction pour gérer la sélection d'un élément dans la liste
    const handleSelectItem = (item) => {
        setSearchTerm(item[searchKey]);
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
                placeholder={placeholder}
                className="block w-full px-4 py-2 border rounded-lg focus:border-primary focus:outline-none"
            />

            <Label
                className={`absolute text-sm duration-300 bg-white transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2
                     peer-focus:text-primaryChart peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isFocused ? "text-primaryChart" : "text-gray-500"
                    }`}
            >
                {label}
            </Label>

            {isFocused && filteredResults.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {filteredResults.map(item => (
                        <li
                            key={item.id}
                            onClick={() => handleSelectItem(item)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {item[searchKey]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
