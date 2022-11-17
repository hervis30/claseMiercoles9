import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vendedor from './Vendedor';
import { Ionicons } from '@expo/vector-icons';
import Venta from './Venta';
import { AppContexProvider } from '../contex/AppContexProvider';
import CustomTab from "../component/CustomTab";


const Tab = createBottomTabNavigator();


const Home = () => {
  return (
    <AppContexProvider>
      <Tab.Navigator
        initialRouteName='Vendedor'
        screenOptions= {({ route }) => ({
          tabBarActiveTintColor: 'white',
          tabBarActiveBackgroundColor: '#FF6868',
          tabBarInactiveTintColor: 'black',
          headerShown: false
        })
        }
    
        tabBar={props => <CustomTab {...props} />}
      >
        <Tab.Screen name='Vendedor' component={Vendedor} options={{

          title: 'Vendedor', tabBarIcon: ({ color, size }) => (
            <Ionicons name='people' color={color} size={30} />
          )
        }}
        />

        <Tab.Screen name='Venta' component={Venta} options={{
          title: 'Ventas', tabBarIcon: ({ color, size }) => (
            <Ionicons name='trending-up' color={color} size={30} />
          )
        }}
        />

      </Tab.Navigator>
    </AppContexProvider>
  )
}

export default Home