import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, resetPassword } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Помилка', 'Заповніть всі поля');
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            router.replace('/(app)/profile');
        } catch (error) {
            Alert.alert('Помилка входу', getErrorMessage(error.code));
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Введіть email', 'Спочатку введіть email адресу');
            return;
        }
        try {
            await resetPassword(email);
            Alert.alert('✅ Готово', 'Лист для скидання паролю відправлено на ' + email);
        } catch (error) {
            Alert.alert('Помилка', getErrorMessage(error.code));
        }
    };

    const getErrorMessage = (code) => {
        switch (code) {
            case 'auth/invalid-email': return 'Невірний формат email';
            case 'auth/user-not-found': return 'Користувача не знайдено';
            case 'auth/wrong-password': return 'Невірний пароль';
            case 'auth/invalid-credential': return 'Невірний email або пароль';
            case 'auth/too-many-requests': return 'Забагато спроб. Спробуйте пізніше';
            default: return 'Щось пішло не так. Спробуйте ще раз';
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>👋 Вхід</Text>
                <Text style={styles.subtitle}>Раді бачити вас знову!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#999"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Пароль"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />

                <TouchableOpacity
                    style={styles.forgotBtn}
                    onPress={handleResetPassword}
                >
                    <Text style={styles.forgotText}>Забули пароль?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, loading && styles.btnDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.btnText}>
                        {loading ? 'Входимо...' : 'Увійти'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.linkContainer}>
                    <Text style={styles.linkText}>Немає акаунту? </Text>
                    <Link href="/(auth)/register">
                        <Text style={styles.link}>Зареєструватись</Text>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scrollContent: {
        flexGrow: 1, justifyContent: 'center',
        padding: 24
    },
    title: {
        fontSize: 32, fontWeight: 'bold',
        color: '#1A1A2E', marginBottom: 8
    },
    subtitle: {
        fontSize: 16, color: '#666',
        marginBottom: 32
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        color: '#333'
    },
    forgotBtn: { alignSelf: 'flex-end', marginBottom: 24 },
    forgotText: { color: '#6C63FF', fontSize: 14 },
    btn: {
        backgroundColor: '#6C63FF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 24
    },
    btnDisabled: { opacity: 0.6 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    linkContainer: { flexDirection: 'row', justifyContent: 'center' },
    linkText: { color: '#666', fontSize: 14 },
    link: { color: '#6C63FF', fontSize: 14, fontWeight: '600' }
});