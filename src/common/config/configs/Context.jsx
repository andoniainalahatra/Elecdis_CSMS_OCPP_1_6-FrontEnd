/* eslint-disable default-case */

import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isActive, setActive] = useState('');
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);
    const [filterBar, setFilterBar] = useState(null)

    const handleFilterBarChange = (filterValue) => {
        setFilterBar(filterValue)
    }

    return (
        <Context.Provider
            value={{
                isActive, setActive,
                openNav, closeNav, nav, 
                filterBar, handleFilterBarChange
            }}
        >
            {children}
        </Context.Provider>
    );
};
