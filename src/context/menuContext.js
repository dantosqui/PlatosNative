import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
   
    const [platos, setPlatos] = useState([]);

    const addPlato = (plato) => {
        console.log("palto añadido: ",plato)
        setPlatos([...platos, plato]);
    };

    const exists = (id) => {
        if (platos && id) {
            
            const foundPlato = platos.find(plato => plato.id === id);
            return foundPlato ? true : false; 
        }
        return false;
    };

    const sacarPlato = (id) => {
        setPlatos(platos.filter(plato => plato.id !== id));
    };

    return (
        <MenuContext.Provider value={{ platos, addPlato, sacarPlato, exists }}>
            {children}
        </MenuContext.Provider>
    );
};
