import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const validate = () => {
        const next = {};
        if (!email.trim()) {
            next.email = "Введіть email";
        } else if (!EMAIL_REGEX.test(email.trim())) {
            next.email = "Невірний формат email";
        }
        if (!password) {
            next.password = "Введіть пароль";
        } else if (password.length < 6) {
            next.password = "Пароль має бути від 6 символів";
        }
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleLogin = () => {
        if (!validate()) return;
        const success = login(email.trim(), password);
        if (success) {
            router.replace("/(app)");
        } else {
            Alert.alert("Помилка", "Невірні дані");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Вхід</Text>

                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Email"
                    value={email}
                    onChangeText={(v) => {
                        setEmail(v);
                        if (errors.email) setErrors((e) => ({ ...e, email: undefined }));
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={(v) => {
                        setPassword(v);
                        if (errors.password)
                            setErrors((e) => ({ ...e, password: undefined }));
                    }}
                    secureTextEntry
                />
                {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>

                <Link href="/register" style={styles.link}>
                    Немає акаунту? Зареєструватися
                </Link>
                <Link href="/(app)" style={styles.link}>
                    ← Продовжити як гість
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
        justifyContent: "center",
        padding: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 24,
        textAlign: "center",
        color: "#1a1a2e",
    },
    input: {
        borderWidth: 1,
        borderColor: "#dce3f0",
        borderRadius: 10,
        padding: 14,
        marginBottom: 6,
        fontSize: 16,
        backgroundColor: "#f8fafc",
    },
    inputError: {
        borderColor: "#ef4444",
        backgroundColor: "#fef2f2",
    },
    errorText: {
        color: "#ef4444",
        fontSize: 13,
        marginBottom: 8,
        marginLeft: 4,
    },
    button: {
        backgroundColor: "#4f46e5",
        borderRadius: 10,
        padding: 16,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    link: {
        marginTop: 16,
        textAlign: "center",
        color: "#4f46e5",
        fontSize: 14,
    },
});
