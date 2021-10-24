import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { News } from './src/news'
import { Albums } from './src/albums'
import { Details } from './src/details'


const Tab = createMaterialTopTabNavigator()
const DeatilsStack = createStackNavigator()

export default function App() {

  const DetailsStackScreen = () => (
    <DeatilsStack.Navigator>
      <DeatilsStack.Screen name='NewsWindow' component={News} options={{ headerShown: false }}></DeatilsStack.Screen>
      <DeatilsStack.Screen name='Details' component={Details} options={{ headerShown: false }}></DeatilsStack.Screen>
    </DeatilsStack.Navigator>
  )



  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarStyle: { height: 56},
        tabBarLabelStyle: { fontSize: 14, fontFamily: 'Roboto-Bold',textTransform:'capitalize' },
        tabBarActiveTintColor: '#466BC9',
        tabBarInactiveTintColor: '#586976',
        tabBarIndicatorStyle: { backgroundColor: '#466BC9', height: 2, }
        
      }}
        tabBarPosition={'bottom'}
        
      >
        <Tab.Screen name="News" component={DetailsStackScreen} options={{ headerShown: false}} />
        <Tab.Screen name="Albums" component={Albums} options={{ headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}




