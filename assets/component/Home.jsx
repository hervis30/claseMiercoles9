import { Text, View } from 'react-native'
import React, { Component } from 'react';
import {styles} from '../Styles/Style';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Vendedor from './Vendedor';
import {Ionicons} from '@expo/vector-icons';
import Venta from './Venta';




const Tab = createBottomTabNavigator();


const Home = () => {
  return (
 <Tab.Navigator
 initialRouteName='Vendedor'
 screenOptions={{
     tabBarActiveTintColor:'green',
     tabBarActiveBackgroundColor:'yellow',
     tabBarInactiveTintColor:'black',
     headerShown:false
  }
 }
 >
  <Tab.Screen name='Vendedor' component={Vendedor} options={{
    //tabBarStyle:{display:'none'},
    title:'Zona_vendedor',tabBarIcon:({color,size})=>(
      <Ionicons name='vendedor' color={color} size={30}/>
    )
  }}
  />

    <Tab.Screen name='Venta' component={Venta} options={{
    title:'Zona_venta',tabBarIcon:({color,size})=>(
      <Ionicons name='sell' color={color} size={30}/>
    )
  }}
  />
  
 </Tab.Navigator>
  )
}

export default Home