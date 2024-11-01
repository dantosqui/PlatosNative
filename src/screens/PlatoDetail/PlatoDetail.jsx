import { useState } from "react";
import { View } from "react-native"


const PlatoDetail = ({platoId}) => {
    const [infoPlato,setInfoPlato] = useState({})

    useEffect(() => {

        const fetchInfo = async () => {
            try{
                const response = await axios.get(`https://api.spoonacular.com/recipes/${platoId}/information`,{
                    params:{
                        includeNutrition:true
                    }
                })
                setInfoPlato(response.data)
            }  catch (error){
                console.error('error fecheando un plato: ',error)
                throw error
            }
        }
    }, []);
    

    return(
        <View>
            <Image source={{uri:infoPlato.image}}/>
            <Text>Puntaje de saludablebilidad: {infoPlato.healthScore}</Text>
            <Text>Es vegano: {infoPlato.vegan ? ("Si") : ("No")} </Text>
        </View>
    )

}

export default PlatoDetail