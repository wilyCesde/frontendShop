import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RegisterCar from './RegisterCar';
import ListCustomer from './ListCustomer';
import Customer from './Customer';
import RentForm from './RentForm';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    // Aquí deberías obtener el estado loggedIn y role después del inicio de sesión exitoso
    // Puedes obtenerlos de tu estado global, del almacenamiento local o de la respuesta de la API

    const userRole = 'administrador'; // Ejemplo: Rol del usuario obtenido después del inicio de sesión
    if (userRole) {
      setLoggedIn(true);
      setRole(userRole);
    } else {
      setLoggedIn(false);
      setRole('');
    }
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: 'orange',
      }}
    >
      <Tab.Screen
        name="Customer"
        component={Customer}
        options={{
          title: 'Clientes',
          tabBarIcon: () => <MaterialIcons name="person" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="ListCustomer"
        component={ListCustomer}
        options={{
          title: 'Lista de Clientes',
          tabBarIcon: () => <MaterialIcons name="view-list" size={24} color="black" />,
        }}
      />
      {loggedIn && role === 'administrador' && (
        <Tab.Screen
          name="RegisterCar"
          component={RegisterCar}
          options={{
            title: 'Registrar Vehículo',
            tabBarIcon: () => <MaterialIcons name="add" size={24} color="black" />,
          }}
        />
      )}
      {loggedIn && role === 'administrador' && (
        <Tab.Screen
          name="RentForm"
          component={RentForm}
          options={{
            title: 'Alquilar Vehículo',
            tabBarIcon: () => <MaterialIcons name="car-rental" size={24} color="black" />,
          }}
        />
      )}
    </Tab.Navigator>
  );
}
