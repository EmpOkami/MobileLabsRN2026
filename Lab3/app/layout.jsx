import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { GameProvider } from "../context/GameContext";

import HomeScreen       from "./index";
import ChallengesScreen from "./challenges";
import SettingsScreen   from "./settings";

const Tab = createBottomTabNavigator();

function Tabs() {
    const { isDark } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: isDark ? "#1e1e2e" : "#6C63FF" },
                headerTintColor: "#fff",
                tabBarStyle: { backgroundColor: isDark ? "#1e1e2e" : "#fff" },
                tabBarActiveTintColor: "#6C63FF",
                tabBarInactiveTintColor: isDark ? "#888" : "#aaa",
                tabBarIcon: ({ color, size }) => {
                    const icons = {
                        Home: "game-controller",
                        Challenges: "list-circle",
                        Settings: "settings",
                    };
                    return <Ionicons name={icons[route.name]} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home"       component={HomeScreen}       options={{ title: "Gesture Clicker" }} />
            <Tab.Screen name="Challenges" component={ChallengesScreen} options={{ title: "Завдання" }} />
            <Tab.Screen name="Settings"   component={SettingsScreen}   options={{ title: "Налаштування" }} />
        </Tab.Navigator>
    );
}

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <GameProvider>
                    {/* ↓ Ось цей рядок був відсутній */}
                    <NavigationContainer>
                        <Tabs />
                    </NavigationContainer>
                </GameProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}