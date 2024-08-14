/* eslint-disable default-case */

import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isActive, setActive] = useState('');
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);

    return (
        <Context.Provider
            value={{
                isActive, setActive,
                openNav, closeNav, nav
            }}
        >
            {children}
        </Context.Provider>
    );
};
