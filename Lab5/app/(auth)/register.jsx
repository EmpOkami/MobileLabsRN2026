import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { register } = useAuth();

    const clearError = (field) =>
        setErrors((e) => ({ ...e, [field]: undefined }));

    const validate = () => {
        const next = {};
        if (!name.trim()) next.name = "Введіть ім'я";

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

        if (!confirmPassword) {
            next.confirmPassword = "Підтвердіть пароль";
        } else if (password !== confirmPassword) {
            next.confirmPassword = "Паролі не збігаються";
        }

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const handleRegister = () => {
        if (!validate()) return;
        const success = register(email.trim(), password, name.trim());
        if (success) {
            router.replace("/(app)");
        } else {
            Alert.alert("Помилка", "Не вдалося зареєструватись");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Реєстрація</Text>

                <TextInput
                    style={[styles.input, errors.name && styles.inputError]}
                    placeholder="Ім'я"
                    value={name}
                    onChangeText={(v) => {
                        setName(v);
                        if (errors.name) clearError("name");
                    }}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Email"
                    value={email}
                    onChangeText={(v) => {
                        setEmail(v);
                        if (errors.email) clearError("email");
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
                        if (errors.password) clearError("password");
                    }}
                    secureTextEntry
                />
                {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                    style={[
                        styles.input,
                        errors.confirmPassword && styles.inputError,
                    ]}
                    placeholder="Підтвердження паролю"
                    value={confirmPassword}
                    onChangeText={(v) => {
                        setConfirmPassword(v);
                        if (errors.confirmPassword) clearError("confirmPassword");
                    }}
                    secureTextEntry
                />
                {errors.confirmPassword && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Зареєструватися</Text>
                </TouchableOpacity>

                <Link href="/login" style={styles.link}>
                    Вже є акаунт? Увійти
                </Link>
                <Link href="/(app)" style={styles.link}>
                    ← Продовжити як гість
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
