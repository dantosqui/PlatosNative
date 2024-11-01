import axios from 'axios';
import { useEffect, useState } from 'react';
import PlatoCard from '../../components/PlatoCard/PlatoCard.jsx';
import { View, FlatList, StyleSheet } from 'react-native';
import BotonCircular from '../../components/BotonCircular/BotonCircular.jsx';

const Home = ({navigation}) => {
    const [platos, setPlatos] = useState([]);

    useEffect(() => {

    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={platos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <PlatoCard title={item.title} image={item.image} />
                )}
            />

            <BotonCircular onPress={() => navigation.navigate('Buscar')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16, // Espaciado alrededor de la lista
        backgroundColor: '#f5f5f5', // Color de fondo claro
    },
});

export default Home;
