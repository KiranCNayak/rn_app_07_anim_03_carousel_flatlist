import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CarouselWithTouchableNavigationView from './views/CarouselWithTouchableNavigationView';
import HomeView from './views/HomeView';
import ScrollPaginatedView from './views/ScrollPaginatedView';

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
          component={CarouselWithTouchableNavigationView}
          name="CarouselWithTouchableNavigationView"
          options={{
            title: 'Overview',
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={ScrollPaginatedView}
          name="ScrollPaginatedView"
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
