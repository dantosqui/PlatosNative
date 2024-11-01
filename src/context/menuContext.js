import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
   
    const [platos, setPlatos] = useState([]);

    const addPlato = (plato) => {
        setPlatos([...platos, plato]);
    };

    return (
        <MenuContext.Provider value={{ platos, categorias, addPlato }}>
            {children}
        </MenuContext.Provider>
    );
};
