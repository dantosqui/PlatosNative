import { useState } from "react";
import axios from "axios"; 
import PlatoCard from "../../components/PlatoCard/PlatoCard.jsx";
import { View, Button, FlatList, TextInput,TouchableOpacity } from "react-native"; 

const SearchPlato = ({navigation}) => {
    const [query, setQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const handleBuscar = async () => { // Traer los resultados cuando apretas buscar
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', { //importante saber que esto busca recipes, tambien se pueden buscar comidas 
                                                                                                    //de restaurntes
                params: {
                    apiKey: 'e796545d48bc41e584c5a6bacd421f72',
                    query: query,
                    number: 25,
                },
            });
            setSearchResult(response.data.results);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    }

    return (
        <View style={{ padding: 16 }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingLeft: 8 }}
                onChangeText={setQuery}
                value={query}
                placeholder="Busca un plato..."
            />

            <Button
                title="Buscar"
                onPress={handleBuscar}
            />

            <FlatList
                
                data={searchResult}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detalle', { plato: item.id })} // Use an arrow function here
                    >
                        <PlatoCard title={item.title} image={item.image} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default SearchPlato;
