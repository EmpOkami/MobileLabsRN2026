import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import FileListScreen from './src/screens/FileListScreen';
import FileViewScreen from './src/screens/FileViewScreen';
import FileEditScreen from './src/screens/FileEditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: '#1a1a2e' },
              headerTintColor: '#e94560',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: '📁 Файловий менеджер' }} />
          <Stack.Screen name="FileList" component={FileListScreen} />
          <Stack.Screen name="FileView" component={FileViewScreen} options={{ title: '👁 Перегляд файлу' }} />
          <Stack.Screen name="FileEdit" component={FileEditScreen} options={{ title: '✏️ Редагування' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}