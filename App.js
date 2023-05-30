import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabs from './components/HomeTabs';
import Login from './components/Login';
import RegisterCar from './components/RegisterCar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema de Almacen' }} />
        <Stack.Screen name="cars" component={RegisterCar} options={{ title: 'Sistema de Almacen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
