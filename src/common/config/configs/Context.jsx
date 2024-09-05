/* eslint-disable default-case */

import { useState, createContext, useCallback, useEffect } from "react";

export const Context = createContext();
const currentYear = new Date().getFullYear();

export const ContextProvider = ({ children }) => {
  const [isActive, setActive] = useState("");
  const [nav, setNav] = useState(false);
  const openNav = () => setNav(true);
  const closeNav = () => setNav(false);

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userRole, setUserRole] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  //   const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  //   console.log("Token:", token);
  //   console.log("User:", user);
  //   if (token && user) {
  //     setIsAuthenticated(true);
  //     setUserRole(JSON.parse(user).role); // Assurez-vous de parser correctement
  //   } else {
  //     setIsAuthenticated(false);
  //     setUserRole("");
  //   }
  // }, []);

  // const handleAuthenticated = (val) => {
  //   setIsAuthenticated(val);
  // };
  // const handleUserRole = (role) => {
  //   setUserRole(role);
  // };

  const [filterYear, setFilterYear] = useState(currentYear);
  const [filters, setFilters] = useState({
    bar: "Mensuel",
    nombreSession: "journalier",
    energyDelivery: "journalier",
    revenu: "journalier",
    newClient: "journalier",
  });

  // userRole;
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
        isActive,
        setActive,
        openNav,
        closeNav,
        nav,
        filterYear,
        handleFilterYear,
        filters,
        handleFilterChange,
        // isAuthenticated,
        // handleAuthenticated,
        // userRole,
        // handleUserRole,
      }}
    >
      {children}
    </Context.Provider>
  );
};
