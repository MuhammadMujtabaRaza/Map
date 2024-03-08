import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Part/Dashboard';
import UserPickup from './Part/Pickup';
import UserDestination from './Part/Destination';
import Fares from './Part/Fares';

const Stack = createNativeStackNavigator();

export default function GlobalNavigation() {
  const screenOptions = (title) => ({
    headerTitle: title,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='dashboard'
          component={Dashboard}
          options={screenOptions('Dashboard')}
        />
        <Stack.Screen
          name='user-pickup'
          component={UserPickup}
          options={screenOptions('User Pickup Location')}
        />
        <Stack.Screen
          name='user-destination'
          component={UserDestination}
          options={screenOptions('User Destination Location')}
        />
        <Stack.Screen
          name='select-fare'
          component={Fares}
          options={screenOptions('Select Fare')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
