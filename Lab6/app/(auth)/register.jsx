import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView
} from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Помилка', 'Заповніть всі поля');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Помилка', 'Паролі не співпадають');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Помилка', 'Пароль має бути мінімум 6 символів');
            return;
        }

        setLoading(true);
        try {
            await register(email, password);
            router.replace('/(app)/profile');
        } catch (error) {
            const messages = {
                'auth/email-already-in-use': 'Цей email вже використовується',
                'auth/invalid-email': 'Невірний формат email',
                'auth/weak-password': 'Пароль занадто слабкий'
            };
            Alert.alert('Помилка', messages[error.code] || 'Не вдалось зареєструватись');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>🚀 Реєстрація</Text>
                <Text style={styles.subtitle}>Створіть новий акаунт</Text>

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
                    placeholder="Пароль (мін. 6 символів)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Підтвердіть пароль"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    placeholderTextColor="#999"
                />

                <TouchableOpacity
                    style={[styles.btn, loading && styles.btnDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    <Text style={styles.btnText}>
                        {loading ? 'Реєструємось...' : 'Зареєструватись'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.linkContainer}>
                    <Text style={styles.linkText}>Вже є акаунт? </Text>
                    <Link href="/(auth)/login">
                        <Text style={styles.link}>Увійти</Text>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scrollContent: {
        flexGrow: 1, justifyContent: 'center', padding: 24
    },
    title: { fontSize: 32, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 8 },
    subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
    input: {
        backgroundColor: '#fff', borderRadius: 12, padding: 16,
        fontSize: 16, marginBottom: 16, borderWidth: 1,
        borderColor: '#E0E0E0', color: '#333'
    },
    btn: {
        backgroundColor: '#6C63FF', borderRadius: 12, padding: 16,
        alignItems: 'center', marginBottom: 24
    },
    btnDisabled: { opacity: 0.6 },
    btnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    linkContainer: { flexDirection: 'row', justifyContent: 'center' },
    linkText: { color: '#666', fontSize: 14 },
    link: { color: '#6C63FF', fontSize: 14, fontWeight: '600' }
});