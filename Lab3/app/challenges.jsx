import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useGame }  from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";

const ICONS = {
    taps: "👆", doubletaps: "👆👆", longpress: "⏱",
    pan: "🖐", swiperight: "➡️", swipeleft: "⬅️",
    pinch: "🔍", score: "🏆", swipeup: "⬆️",
};

export default function ChallengesScreen() {
    const { challenges } = useGame();
    const { isDark }     = useTheme();

    const bg   = isDark ? "#12121f" : "#f5f5ff";
    const card = isDark ? "#1e1e2e" : "#fff";
    const text = isDark ? "#e0e0e0" : "#1a1a2e";
    const sub  = isDark ? "#888"    : "#888";

    return (
        <ScrollView style={{ flex: 1, backgroundColor: bg }}>
            <Text style={[styles.header, { color: text }]}>Завдання</Text>

            {challenges.map((ch) => {
                const done     = ch.current >= ch.goal;
                const progress = ch.goal > 1 ? ch.current / ch.goal : done ? 1 : 0;

                return (
                    <View key={ch.id} style={[styles.card, { backgroundColor: card }]}>
                        <View style={styles.row}>
                            <Text style={styles.icon}>{ICONS[ch.type] ?? "🎯"}</Text>

                            <View style={{ flex: 1 }}>
                                <Text style={[styles.title, { color: text }]}>{ch.label}</Text>
                                <Text style={[styles.desc, { color: sub }]}>{ch.desc}</Text>

                                {/* прогрес-бар тільки для числових завдань */}
                                {ch.goal > 1 && (
                                    <View style={styles.barBg}>
                                        <View style={[styles.barFill, { width: `${progress * 100}%` }]} />
                                    </View>
                                )}
                                {ch.goal > 1 && (
                                    <Text style={[styles.progress, { color: sub }]}>
                                        {ch.current}/{ch.goal}
                                    </Text>
                                )}
                            </View>

                            {/* статус ✓ / ○ */}
                            <View style={[styles.badge, done && styles.badgeDone]}>
                                <Text style={{ color: done ? "#fff" : sub, fontSize: 16 }}>
                                    {done ? "✓" : "○"}
                                </Text>
                            </View>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header:   { fontSize: 26, fontWeight: "bold", margin: 20 },
    card:     { marginHorizontal: 16, marginBottom: 12, borderRadius: 14, padding: 14, elevation: 3, shadowOpacity: 0.08, shadowRadius: 6 },
    row:      { flexDirection: "row", alignItems: "center", gap: 12 },
    icon:     { fontSize: 26, width: 36, textAlign: "center" },
    title:    { fontSize: 15, fontWeight: "600" },
    desc:     { fontSize: 12, marginTop: 2 },
    barBg:    { height: 5, backgroundColor: "#e0e0f0", borderRadius: 3, marginTop: 8, overflow: "hidden" },
    barFill:  { height: "100%", backgroundColor: "#6C63FF", borderRadius: 3 },
    progress: { fontSize: 11, marginTop: 3 },
    badge:    { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: "#ccc", alignItems: "center", justifyContent: "center" },
    badgeDone:{ backgroundColor: "#6C63FF", borderColor: "#6C63FF" },
});