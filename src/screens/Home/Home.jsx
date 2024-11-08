import axios from 'axios';
import { useEffect, useState } from 'react';
import PlatoCard from '../../components/PlatoCard/PlatoCard.jsx';
import { View, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import BotonCircular from '../../components/BotonCircular/BotonCircular.jsx';
import { useContext } from 'react';
import { MenuContext } from '../../context/menuContext.js';

const Home = ({navigation}) => { //home home again i like to be here when i can

    const { platos } = useContext(MenuContext);
    useEffect(() => {
        console.log(platos)

    }, [platos]);

    return (
        <View style={styles.container}>
            <FlatList
                data={platos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detalle', { platoId: item.id })} // 
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
