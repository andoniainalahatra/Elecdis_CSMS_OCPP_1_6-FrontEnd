/* eslint-disable default-case */

import { useState, createContext, useCallback } from "react";

export const Context = createContext();
const currentYear = new Date().getFullYear();

export const ContextProvider = ({ children }) => {
    const [isActive, setIsActive] = useState('');
    const [nav, setNav] = useState(false);
    const [filterYear, setFilterYear] = useState(currentYear);
    const [filters, setFilters] = useState({
        bar: "Mensuel",
        nombreSession: "journalier",
        energyDelivery: "journalier",
        revenu: "journalier",
        newClient: "journalier",
    });

    const openNav = useCallback(() => setNav(true), []);
    const closeNav = useCallback(() => setNav(false), []);
    
    const handleFilterChange = useCallback((filterName, filterValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: filterValue,
        }));
    }, []);

    const handleFilterYear = useCallback((filterValue) => {
        setFilterYear(filterValue);
    }, []);

    return (
        <Context.Provider
            value={{
                isActive, setIsActive,
                openNav, closeNav, nav,
                filterYear, handleFilterYear,
                filters, handleFilterChange,
            }}
        >
            {children}
        </Context.Provider>
    );
};