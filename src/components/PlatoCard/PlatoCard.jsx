import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, useAnimatedValue } from 'react-native';
import BotonCircular from "../BotonCircular/BotonCircular"
import { MenuContext } from '../../context/menuContext';

import { useNavigation } from '@react-navigation/native';

const Card = ({ title, image, description,id }) => {
  const {addPlato, exists,sacarPlato} = useContext(MenuContext)
  const nav=useNavigation()
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text>rica receta</Text>
        <Text style={styles.title}>{title}</Text>
        {exists(id) ? (
          <BotonCircular onPress={() => {sacarPlato(id);nav.navigate("Home")}} icon={"-"}></BotonCircular> ):(
          <BotonCircular onPress={() => {addPlato(id);nav.navigate("Home")}} icon={"+"}></BotonCircular>
          )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default Card;
