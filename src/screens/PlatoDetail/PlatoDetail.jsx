import { useContext, useState,useEffect } from "react";
import { Button, View, Image, Text } from "react-native"
import { MenuContext } from "../../context/menuContext";
import axios from "axios";
import { API_KEY } from "../../constantes/constantes";
const PlatoDetail = ({platoId,navigation}) => {
    const [infoPlato,setInfoPlato] = useState({})
    const { platos, addPlato, sacarPlato } = useContext(MenuContext); 

    useEffect(() => {
        
        
        const fetchInfo = async () => {
            try{
                const response = await axios.get(`https://api.spoonacular.com/recipes/${platoId}/information`,{
                    params:{
                        includeNutrition:true,
                        apiKey:API_KEY
                    }
                })
                setInfoPlato(response.data)
            }  catch (error){
                console.error('error fecheando un plato: ',error)
                throw error
            }
        }
        fetchInfo()
    }, [platoId]);

    const handleBorrar = () => {
        sacarPlato(infoPlato.id)
        navigation.navigate('Home')
    }
    const handleAñadir = () => {
        addPlato(infoPlato)
        navigation.navigate('Home')
    }
    
    const exists = () => {
        if (platos){
            if (platos.indexOf(infoPlato)){
                return true
            }
        }
        return false
    }

    return(
        <View>
            <Image source={{uri:infoPlato.image}}/>
            <Text>Puntaje de saludablebilidad: {infoPlato.healthScore}</Text>
            <Text>Es vegano🌿: {infoPlato.vegan ? ("Si") : ("No")} </Text>
            {exists() ? (
                <Button onPress={handleAñadir} title="+"></Button>
                ):(
                <Button onPress={handleBorrar} title="Eliminar"></Button>)
            }
        </View>
    )

}

export default PlatoDetail