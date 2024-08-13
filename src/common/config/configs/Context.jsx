/* eslint-disable default-case */

import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isActive, setActive] = useState('');

    return (
        <Context.Provider
            value={{
                isActive, setActive
            }}
        >
            {children}
        </Context.Provider>
    );
};
