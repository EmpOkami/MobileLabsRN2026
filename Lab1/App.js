import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
              headerTitle: "FirstMobileApp",
              tabBarIcon: ({ color, size }) => {
                let iconName;

                  if (route.name === 'Головна') iconName = 'home-outline';
                  if (route.name === 'Фотогалерея') iconName = 'images-outline';
                  if (route.name === 'Профіль') iconName = 'person-outline';

                  return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}