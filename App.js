import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home/Home.jsx'
import PlatoDetail from './src/screens/PlatoDetail/PlatoDetail.jsx'
import SearchPlato from './src/screens/SearchPlatos/SearchPlato.jsx';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Menu de Platos' }} />
        <Stack.Screen name="Detalle" component={PlatoDetail} options={{ title: 'Detalles del Plato' }} />
        <Stack.Screen name="Buscar" component={SearchPlato} options={{ title: 'Buscar plato' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
