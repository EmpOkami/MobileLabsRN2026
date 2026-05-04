import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// ── Hamburger button ─────────────────────────────────────────────────────────
const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.menuBtn}>
    <Text style={styles.menuIcon}>☰</Text>
  </TouchableOpacity>
);

// ── News Stack (Main + Details) ──────────────────────────────────────────────
function NewsStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a73e8' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        cardStyle: { backgroundColor: '#f0f4f8' },
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Новини',
          // Кнопка відкриття Drawer
          headerLeft: () => (
            <MenuButton onPress={() => navigation.openDrawer()} />
          ),
          // Прибираємо подвійний header: Stack-заголовок = єдиний заголовок
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          // Динамічний заголовок — оновлюється з DetailsScreen через setOptions
          title: route.params?.newsItem?.category ?? 'Деталі',
          headerBackTitle: 'Назад',
        })}
      />
    </Stack.Navigator>
  );
}

// ── Root Drawer ──────────────────────────────────────────────────────────────
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false, // ← усунення подвійного header-а
          drawerStyle: { width: 280 },
        }}
      >
        <Drawer.Screen name="NewsStack" component={NewsStack} options={{ title: 'Новини' }} />
          <Drawer.Screen
              name="Contacts"
              component={ContactsScreen}
              options={({ navigation }) => ({   // ← отримуємо navigation з параметрів
                  headerShown: true,
                  title: 'Контакти',
                  headerStyle: { backgroundColor: '#1a73e8' },
                  headerTintColor: '#fff',
                  headerTitleStyle: { fontWeight: '700' },
                  headerLeft: () => (
                      <MenuButton onPress={() => navigation.openDrawer()} /> // ← явно викликаємо
                  ),
              })}
          />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    marginLeft: 14,
    padding: 4,
  },
  menuIcon: {
    fontSize: 22,
    color: '#fff',
  },
});
