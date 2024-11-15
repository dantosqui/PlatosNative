import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonCircular = ({ onPress,icon }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{icon}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30, // Hace el botón circular
    backgroundColor: '#007BFF', // Color de fondo
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Para que lo puedas posicionar en la pantalla
    bottom: 20, // Ajusta según sea necesario
    right: 20, // Ajusta según sea necesario
    elevation: 5, // Sombra en Android
  },
  buttonText: {
    fontSize: 30,
    color: 'white', // Color del texto
  },
});

export default BotonCircular;
