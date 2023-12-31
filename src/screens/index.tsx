import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './HomeScreen';
import WeatherScreen from './WeatherScreen';

export type RootStackParamList = {
  Home: undefined;
  Weather: { latitude: number, longitude: number }
}

export type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>
export type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>

const RootStack = createNativeStackNavigator<RootStackParamList>()

function AppNavigator() {

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name='Home'>
          {() => <HomeScreen />}
        </RootStack.Screen>
        <RootStack.Screen name='Weather'>
          {() => <WeatherScreen />}
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator