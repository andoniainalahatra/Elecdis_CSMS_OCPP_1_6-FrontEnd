/* eslint-disable default-case */

import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isActive, setActive] = useState('');
    const [nav, setNav] = useState(false);
    const openNav = () => setNav(true);
    const closeNav = () => setNav(false);
    const [filterBar, setFilterBar] = useState("Mensuel")

    const handleFilterBarChange = (filterValue) => {
        setFilterBar(filterValue)
    }
    const [filterNombreSession, setFilterNombreSession] = useState(null)

    const handleFilterNombreSessionChange = (filterValue) => {
        setFilterNombreSession(filterValue)
    }
    const [filterEneryDelivery, setFilterEneryDelivery] = useState(null)

    const handleFilterEneryDeliveryChange = (filterValue) => {
        setFilterEneryDelivery(filterValue)
    }
    const [filterRevenu, setFilterRevenu] = useState(null)

    const handleFilterRevenuChange = (filterValue) => {
        setFilterRevenu(filterValue)
    }
    const [filterNewClient, setFilterNewClient] = useState(null)

    const handleFilterNewClientChange = (filterValue) => {
        setFilterNewClient(filterValue)
    }

    return (
        <Context.Provider
            value={{
                isActive, setActive,
                openNav, closeNav, nav, 
                filterBar, handleFilterBarChange,
                filterEneryDelivery, handleFilterEneryDeliveryChange,
                filterNewClient, handleFilterNewClientChange,
                filterRevenu, handleFilterRevenuChange,
                filterNombreSession, handleFilterNombreSessionChange
            }}
        >
            {children}
        </Context.Provider>
    );
};
