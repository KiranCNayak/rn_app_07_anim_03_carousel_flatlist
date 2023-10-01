import React from 'react';
import { View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CarouselWithTouchableNav from './views/CarouselWithTouchableNavigationView';
import HomeView from './views/HomeView';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeView">
        <Stack.Screen
          name="HomeView"
          component={HomeView}
          options={{
            title: 'Flatlists with Animations',
            headerBackButtonMenuEnabled: true,
            headerStyle: {
              backgroundColor: '#329821',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="CarouselWithTouchableNav"
          component={CarouselWithTouchableNav}
          options={{
            title: 'Overview',
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
