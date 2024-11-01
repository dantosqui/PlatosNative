import axios from 'axios';
import { useEffect, useState } from 'react';
import PlatoCard from '../../components/PlatoCard/PlatoCard.jsx';
import { View, FlatList, StyleSheet } from 'react-native';
import BotonCircular from '../../components/BotonCircular/BotonCircular.jsx';
import { useContext } from 'react';
import { MenuContext } from '../../context/menuContext.js';

const Home = ({navigation}) => {

    const { platos } = useContext(MenuContext);
    console.log(platos)
    /*useEffect(() => {

    }, []);*/

    return (
        <View style={styles.container}>
            <FlatList
                data={platos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detalle', { plato: item.id })} // Use an arrow function here
                    >
                        <PlatoCard title={item.title} image={item.image} />
                    </TouchableOpacity>
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
