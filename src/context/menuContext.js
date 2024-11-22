import React, { createContext, useEffect, useState } from 'react';
import { MAX_PLATOS } from '../constantes/constantes';
import axios from 'axios';
export const MenuContext = createContext();
import { API_KEY } from '../constantes/constantes';

export const MenuProvider = ({ children }) => {
   
    const [platos, setPlatos] = useState([]);
    const [promedios, setPromedios] = useState({promedioHealthScore:-1,precioTotal:-1})
    const [maxPlatosReached, setMaxPlatosReached] = useState(false)
    const [veganPercentages,setVeganPercentages] = useState({vegan:0,nonVegan:0})
    
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
        
        setVeganPercentages({vegan:platos.filter((i) => i.vegan)
        .length*100/MAX_PLATOS,
        nonVegan:platos.filter((i) => !i.vegan)
        .length*100/MAX_PLATOS}
        ) 
        //esto calcula el porcentaje de platos que son veganos segun el total de platos para el menu osea que ponele que son 4 platos si hay 1 vegano te tira 25% AUNQUE haya solo 1 plato
            
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
    const addPlato = async (platoId) => {
        
        try{
            const plato = await axios.get(`https://api.spoonacular.com/recipes/${platoId}/information`,{
                params:{
                    includeNutrition:true,
                    apiKey:API_KEY
                }
            })
            setPlatos([...platos, plato.data]);
           
        }  catch (error){
            console.error('error fecheando un plato: ',error)
            throw error
        }
    };
    
    return (
        <MenuContext.Provider value={{ promedios, platos, addPlato, sacarPlato, exists,maxPlatosReached,veganPercentages }}>
            {children}
        </MenuContext.Provider>
    );
};
