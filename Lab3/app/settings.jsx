import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useGame }  from "../context/GameContext";

export default function SettingsScreen() {
    const { isDark, toggleTheme } = useTheme();
    const { score, challenges }   = useGame();

    const done = challenges.filter((c) => c.current >= c.goal).length;

    const bg   = isDark ? "#12121f" : "#f5f5ff";
    const card = isDark ? "#1e1e2e" : "#fff";
    const text = isDark ? "#e0e0e0" : "#1a1a2e";
    const sub  = isDark ? "#888"    : "#777";

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Text style={[styles.header, { color: text }]}>Налаштування</Text>

            {/* Тема */}
            <View style={[styles.card, { backgroundColor: card }]}>
                <Text style={[styles.label, { color: text }]}>🌙 Темна тема</Text>
                <Switch value={isDark} onValueChange={toggleTheme} thumbColor="#6C63FF" trackColor={{ true: "#9b8fe8", false: "#ccc" }} />
            </View>

            {/* Статистика */}
            <Text style={[styles.section, { color: sub }]}>СТАТИСТИКА</Text>

            <View style={[styles.card, { backgroundColor: card }]}>
                <StatRow label="🏆 Очки" value={score} color={text} />
                <StatRow label="✅ Завдань виконано" value={`${done} / ${challenges.length}`} color={text} />
            </View>
        </View>
    );
}

function StatRow({ label, value, color }) {
    return (
        <View style={styles.row}>
            <Text style={[styles.label, { color }]}>{label}</Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header:    { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
    section:   { fontSize: 11, letterSpacing: 2, marginTop: 20, marginBottom: 8, marginLeft: 4 },
    card:      { borderRadius: 14, padding: 16, marginBottom: 12, elevation: 3, shadowOpacity: 0.08, shadowRadius: 6 },
    row:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
    label:     { fontSize: 15 },
    value:     { fontSize: 15, fontWeight: "bold" },
});