import React from "react";
import { View, Text, StyleSheet, Vibration } from "react-native";
import { Gesture, GestureDetector, Directions } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    runOnJS,
} from "react-native-reanimated";

import { useGame }  from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
    const { score, addScore, updateChallenge } = useGame();
    const { isDark } = useTheme();

    // --- Анімовані значення (нова API) ---
    const translateX      = useSharedValue(0);
    const translateY      = useSharedValue(0);
    const scale           = useSharedValue(1);
    const baseScale       = useSharedValue(1);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    // ── 1. SINGLE TAP ──
    const singleTap = Gesture.Tap()
        .maxDuration(250)
        .onEnd(() => {
            runOnJS(addScore)(1);
            runOnJS(updateChallenge)("taps");
            runOnJS(Vibration.vibrate)(30);
        });

    // ── 2. DOUBLE TAP ──
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            runOnJS(addScore)(2);
            runOnJS(updateChallenge)("doubletaps");
            runOnJS(Vibration.vibrate)([0, 40, 60, 40]);
        });

    // ── 3. LONG PRESS ──
    const longPress = Gesture.LongPress()
        .minDuration(1000)
        .onStart(() => {
            scale.value = withSpring(1.3);
            runOnJS(addScore)(5);
            runOnJS(updateChallenge)("longpress");
            runOnJS(Vibration.vibrate)(200);
        })
        .onEnd(() => {
            scale.value = withSpring(1);
        });

    // ── 4. PAN (drag) ──
    const pan = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = savedTranslateX.value + e.translationX;
            translateY.value = savedTranslateY.value + e.translationY;
            runOnJS(updateChallenge)("pan");
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        });

    // ── 5. FLING RIGHT ──
    const flingRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd(() => {
            const pts = Math.floor(Math.random() * 10) + 1;
            runOnJS(addScore)(pts);
            runOnJS(updateChallenge)("swiperight");
            runOnJS(Vibration.vibrate)(50);
        });

    // ── 6. FLING LEFT ──
    const flingLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onEnd(() => {
            const pts = Math.floor(Math.random() * 10) + 1;
            runOnJS(addScore)(pts);
            runOnJS(updateChallenge)("swipeleft");
            runOnJS(Vibration.vibrate)(50);
        });

    // ── 7. FLING UP (кастомне завдання) ──
    const flingUp = Gesture.Fling()
        .direction(Directions.UP)
        .onEnd(() => {
            runOnJS(addScore)(3);
            runOnJS(updateChallenge)("swipeup");
            runOnJS(Vibration.vibrate)(50);
        });

    // ── 8. PINCH ──
    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = Math.max(0.5, Math.min(baseScale.value * e.scale, 2.5));
        })
        .onEnd((e) => {
            baseScale.value = Math.max(0.5, Math.min(baseScale.value * e.scale, 2.5));
            scale.value = withSpring(baseScale.value);
            runOnJS(addScore)(3);
            runOnJS(updateChallenge)("pinch");
        });

    // ── Об'єднуємо жести ──
    const taps   = Gesture.Exclusive(doubleTap, singleTap); // подвійний має пріоритет
    const flings = Gesture.Race(flingRight, flingLeft, flingUp); // тільки один свайп за раз
    const all    = Gesture.Simultaneous(taps, longPress, pan, flings, pinch);

    // ── Анімований стиль ──
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    const bg = isDark ? "#12121f" : "#f0f0ff";

    return (
        <View style={[styles.container, { backgroundColor: bg }]}>
            <Text style={[styles.label, { color: isDark ? "#ccc" : "#555" }]}>SCORE</Text>
            <Text style={[styles.score, { color: isDark ? "#fff" : "#1a1a2e" }]}>{score}</Text>

            <View style={styles.hints}>
                {[
                    "👆 Tap: +1",
                    "👆👆 Double-tap: +2",
                    "⏱ Long press (1s): +5",
                    "↔️ Swipe вправо/вліво: +1–10",
                    "⬆️ Swipe вгору: +3",
                    "🔍 Pinch: +3",
                ].map((h) => (
                    <Text key={h} style={[styles.hint, { color: isDark ? "#aaa" : "#777" }]}>{h}</Text>
                ))}
            </View>

            <GestureDetector gesture={all}>
                <Animated.View style={[styles.clicker, animatedStyle]}>
                    <Text style={styles.clickerText}>TAP{"\n"}ME</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

const styles = StyleSheet.create({
    container:   { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
    label:       { fontSize: 13, letterSpacing: 3, marginBottom: 4 },
    score:       { fontSize: 72, fontWeight: "bold", marginBottom: 24 },
    hints:       { marginBottom: 32, alignItems: "center" },
    hint:        { fontSize: 13, marginVertical: 2 },
    clicker: {
        width: 130,
        height: 130,
        borderRadius: 65,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6C63FF",
        shadowColor: "#6C63FF",
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    clickerText: { color: "#fff", fontWeight: "bold", fontSize: 18, textAlign: "center" },
});