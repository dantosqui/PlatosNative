import { useContext, useState,useEffect } from "react";
import { Button, View, Image, Text } from "react-native"
import { MenuContext } from "../../context/menuContext";
import axios from "axios";
import { API_KEY } from "../../constantes/constantes";
import { useRoute } from '@react-navigation/native'; // Importar useRoute


const PlatoDetail = ({navigation}) => {
    const [infoPlato,setInfoPlato] = useState({})
    const { addPlato, sacarPlato,exists,maxPlatosReached,veganPercentages } = useContext(MenuContext); 
    const { platoId }= useRoute().params;

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
        addPlato()
        navigation.navigate('Home')
    }
    const canAñadirAlMenu = () => {//si ya hay 4 platos no se puede añadir, si hay ya 50 porciento de veganos y es vegano no se puede añadir y viseversa
        
        if(!maxPlatosReached){
            if(infoPlato.vegan){
                if(veganPercentages.vegan<50){
                    return true
                }
            }
            else if (veganPercentages.nonVegan<50){
                return true
            }
            else return false
        }
        else return false
    }
    

    return(
        <View>
            <Image source={{ uri: infoPlato.image }}/>
            <Text>{infoPlato.title}</Text>
            <Text>Puntaje de saludablebilidad: {infoPlato.healthScore}</Text>
            <Text>Es vegano🌿: {infoPlato.vegan ? ("Si") : ("No")} </Text>
            {exists(infoPlato.id) ? (
                <Button onPress={handleBorrar} title="Eliminar"></Button>
                ):(
                    <Button disabled={!canAñadirAlMenu()} onPress={handleAñadir} title="+"></Button>
                )
            }
        </View>
    )

}

export default PlatoDetail