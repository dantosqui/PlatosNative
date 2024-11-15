import axios from 'axios';
import { useEffect, useState } from 'react';
import PlatoCard from '../../components/PlatoCard/PlatoCard.jsx';
import { View, FlatList, StyleSheet,TouchableOpacity,Text } from 'react-native';
import BotonCircular from '../../components/BotonCircular/BotonCircular.jsx';
import { useContext } from 'react';
import { MenuContext } from '../../context/menuContext.js';

const Home = ({navigation}) => { //home home again i like to be here when i can

    const { platos, promedios } = useContext(MenuContext);
    
    
    return (
        <View style={styles.container}>
            {promedios.promedioHealthScore >= 0 ? (<Text>Promedio de HealthScore: {promedios.promedioHealthScore}</Text>) : (<></>) }
            {promedios.precioTotal > 0 ? (<Text>Precio total: {promedios.precioTotal}</Text>) : (<></>) }
            <FlatList
                data={platos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Detalle', { platoId: item.id })} // 
                    >
                        <PlatoCard title={item.title} image={item.image} id={item.id} />
                    </TouchableOpacity>
                )}
            />

            <BotonCircular icon={"+"} onPress={() => navigation.navigate('Buscar')} />
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
