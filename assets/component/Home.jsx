import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vendedor from './Vendedor';
import { Ionicons } from '@expo/vector-icons';
import Venta from './Venta';
import { AppContexProvider } from '../contex/AppContexProvider';


const Tab = createBottomTabNavigator();


const Home = () => {
  return (
    <AppContexProvider>
      <Tab.Navigator
        initialRouteName='Vendedor'
        screenOptions={{
          tabBarActiveTintColor: 'green',
          tabBarActiveBackgroundColor: 'yellow',
          tabBarInactiveTintColor: 'black',
          headerShown: false
        }
        }
      >
        <Tab.Screen name='Vendedor' component={Vendedor} options={{

          title: 'Zona_vendedor', tabBarIcon: ({ color, size }) => (
            <Ionicons name='earth' color={color} size={30} />
          )
        }}
        />

        <Tab.Screen name='Venta' component={Venta} options={{
          title: 'Zona_venta', tabBarIcon: ({ color, size }) => (
            <Ionicons name='heart' color={color} size={30} />
          )
        }}
        />

      </Tab.Navigator>
    </AppContexProvider>
  )
}

export default Home