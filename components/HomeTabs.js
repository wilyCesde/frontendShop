import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Customer from "./Customer";
import ListCustomer from "./ListCustomer";
import {MaterialIcons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: "orange",
      }}
    >
      <Tab.Screen name="Customer" component={Customer} options={{ title: "Clientes",
      tabBarIcon: () => (<MaterialIcons name="person" size={24} color="black"/>) }} />
      <Tab.Screen name="ListCustomer" component={ListCustomer} options={{ title: "Lista de Clientes" ,
     tabBarIcon: () => (<MaterialIcons name="view-list" size={24} color="black"/>)
    
    }} />
    </Tab.Navigator>

  );


}



