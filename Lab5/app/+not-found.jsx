import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.code}>404</Text>
            <Text style={styles.title}>Екран не знайдено</Text>
            <Text style={styles.subtitle}>
                Сторінка, яку ви шукаєте, не існує або була переміщена.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace("/")}
            >
                <Text style={styles.buttonText}>← На головну</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        padding: 24,
    },
    code: { fontSize: 80, fontWeight: "900", color: "#4f46e5" },
    title: { fontSize: 24, fontWeight: "700", color: "#1a1a2e", marginBottom: 12 },
    subtitle: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 24,
    },
    button: {
        backgroundColor: "#4f46e5",
        borderRadius: 12,
        paddingHorizontal: 28,
        paddingVertical: 14,
    },
    buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});