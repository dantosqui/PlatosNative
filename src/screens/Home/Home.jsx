import axios from 'axios';
import { useEffect, useState } from 'react';
import PlatoCard from '../../components/PlatoCard/PlatoCard.jsx'
import { View,Text,FlatList } from 'react-native';


const Home = () => {
    const [platos,setPlatos] = useState([])

useEffect(() => {
  
    const fetchDishes = async () => {
        try {
          const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
              apiKey: 'e796545d48bc41e584c5a6bacd421f72',
              number: 10, // Número de resultados
            },
          });
          setPlatos(response.data.results)
        } catch (error) {
          console.error('Error fetching dishes:', error);
          throw error;
        }
      };

    fetchDishes();
}, []);




    return(
        <View>
            <FlatList
                data={platos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PlatoCard title={item.title} image={item.image} />
                )}
            />
        
        </View>
    )
}


export default Home