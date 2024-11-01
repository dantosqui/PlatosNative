import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
   
    const [platos, setPlatos] = useState([]);

    const addPlato = (plato) => {
        setPlatos([...platos, plato]);
    };

    const sacarPlato = (id) => {
        setPlatos(platos.filter(plato => plato.id !== id));
    };

    return (
        <MenuContext.Provider value={{ platos, addPlato, sacarPlato }}>
            {children}
        </MenuContext.Provider>
    );
};
