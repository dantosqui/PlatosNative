import React, { createContext, useEffect, useState } from 'react';
import { MAX_PLATOS } from '../constantes/constantes';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
   
    const [platos, setPlatos] = useState([]);
    const [promedios, setPromedios] = useState({promedioHealthScore:-1,precioTotal:-1})
    const [maxPlatosReached, setMaxPlatosReached] = useState(false)
    
    useEffect(() => {
        if (platos.length > 0) { // esta parte calcula el promeido
            const promedioHealthScore = platos.reduce((acumulador, plato) => acumulador + plato.healthScore, 0) / platos.length;
            const precioTotal = platos.reduce((acumulador, plato) => acumulador + plato.pricePerServing, 0)
            
            
            setPromedios({
                promedioHealthScore: promedioHealthScore,
                precioTotal: precioTotal
            });
        } else {
            setPromedios({
                promedioHealthScore: -1,
                promedioPrecio: -1
            });
        }
        
        setMaxPlatosReached(platos.length===MAX_PLATOS) //esto se fija si ya son 4 platos
        
    }, [platos]);

    
    
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
    const addPlato = (plato) => {
        //validamos aca porque sino tengo que importar una banda de cosas
        
        setPlatos([...platos, plato]);
    };
    
    return (
        <MenuContext.Provider value={{ promedios, platos, addPlato, sacarPlato, exists,maxPlatosReached }}>
            {children}
        </MenuContext.Provider>
    );
};
