import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    Alert, ScrollView, KeyboardAvoidingView, Platform, Modal
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function EditProfileScreen() {
    const { getUserProfile, updateUserProfile, deleteAccount } = useAuth();

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            const data = await getUserProfile();
            if (data) {
                setName(data.name || '');
                setAge(data.age || '');
                setCity(data.city || '');
            }
        };
        load();
    }, []);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert('Помилка', 'Введіть ім\'я');
            return;
        }
        if (age && (isNaN(age) || Number(age) < 1 || Number(age) > 120)) {
            Alert.alert('Помилка', 'Введіть коректний вік');
            return;
        }

        setLoading(true);
        try {
            await updateUserProfile({ name: name.trim(), age: age.trim(), city: city.trim() });
            Alert.alert('✅ Збережено', 'Профіль успішно оновлено', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалось зберегти профіль');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deletePassword) {
            Alert.alert('Помилка', 'Введіть пароль для підтвердження');
            return;
        }
        setDeleteLoading(true);
        try {
            await deleteAccount(deletePassword);
            setDeleteModalVisible(false);
            Alert.alert('Акаунт видалено', 'Ваш акаунт успішно видалено');
            router.replace('/(auth)/login');
        } catch (error) {
            const messages = {
                'auth/wrong-password': 'Невірний пароль',
                'auth/invalid-credential': 'Невірний пароль',
                'auth/requires-recent-login': 'Потрібна повторна авторизація'
            };
            Alert.alert('Помилка', messages[error.code] || 'Не вдалось видалити акаунт');
        } finally {
            setDeleteLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content}>
                {/* Заголовок */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.backBtn}>← Назад</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Редагування</Text>
                </View>

                {/* Форма */}
                <View style={styles.form}>
                    <Text style={styles.label}>Ім'я *</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Введіть ваше ім'я"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Вік</Text>
                    <TextInput
                        style={styles.input}
                        value={age}
                        onChangeText={setAge}
                        placeholder="Введіть ваш вік"
                        keyboardType="numeric"
                        placeholderTextColor="#999"
                    />

                    <Text style={styles.label}>Місто</Text>
                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Введіть ваше місто"
                        placeholderTextColor="#999"
                    />
                </View>

                {/* Кнопка збереження */}
                <TouchableOpacity
                    style={[styles.saveBtn, loading && styles.btnDisabled]}
                    onPress={handleSave}
                    disabled={loading}
                >
                    <Text style={styles.saveBtnText}>
                        {loading ? 'Зберігаємо...' : '💾 Зберегти зміни'}
                    </Text>
                </TouchableOpacity>

                {/* Кнопка видалення */}
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => setDeleteModalVisible(true)}
                >
                    <Text style={styles.deleteBtnText}>🗑️ Видалити акаунт</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Модальне вікно підтвердження видалення */}
            <Modal
                visible={deleteModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setDeleteModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>⚠️ Видалити акаунт?</Text>
                        <Text style={styles.modalText}>
                            Ця дія незворотна. Введіть пароль для підтвердження.
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={deletePassword}
                            onChangeText={setDeletePassword}
                            placeholder="Ваш пароль"
                            secureTextEntry
                            placeholderTextColor="#999"
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.modalCancelBtn}
                                onPress={() => {
                                    setDeleteModalVisible(false);
                                    setDeletePassword('');
                                }}
                            >
                                <Text style={styles.modalCancelText}>Скасувати</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalDeleteBtn, deleteLoading && styles.btnDisabled]}
                                onPress={handleDelete}
                                disabled={deleteLoading}
                            >
                                <Text style={styles.modalDeleteText}>
                                    {deleteLoading ? 'Видалення...' : 'Видалити'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    content: { padding: 24 },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 16 },
    backBtn: { color: '#6C63FF', fontSize: 16 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A2E' },
    form: { marginBottom: 24 },
    label: { fontSize: 14, color: '#666', marginBottom: 8, marginTop: 8 },
    input: {
        backgroundColor: '#fff', borderRadius: 12, padding: 16,
        fontSize: 16, borderWidth: 1, borderColor: '#E0E0E0',
        color: '#333', marginBottom: 8
    },
    saveBtn: {
        backgroundColor: '#6C63FF', borderRadius: 12, padding: 16,
        alignItems: 'center', marginBottom: 12
    },
    btnDisabled: { opacity: 0.6 },
    saveBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    deleteBtn: {
        backgroundColor: '#fff', borderRadius: 12, padding: 16,
        alignItems: 'center', borderWidth: 1, borderColor: '#FF4757'
    },
    deleteBtnText: { color: '#FF4757', fontSize: 16, fontWeight: '600' },
    // Modal
    modalOverlay: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center', alignItems: 'center', padding: 24
    },
    modalContent: {
        backgroundColor: '#fff', borderRadius: 16, padding: 24, width: '100%'
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 8 },
    modalText: { fontSize: 14, color: '#666', marginBottom: 16 },
    modalButtons: { flexDirection: 'row', gap: 12, marginTop: 8 },
    modalCancelBtn: {
        flex: 1, padding: 14, borderRadius: 10, borderWidth: 1,
        borderColor: '#E0E0E0', alignItems: 'center'
    },
    modalCancelText: { color: '#666', fontWeight: '600' },
    modalDeleteBtn: {
        flex: 1, padding: 14, borderRadius: 10,
        backgroundColor: '#FF4757', alignItems: 'center'
    },
    modalDeleteText: { color: '#fff', fontWeight: '600' }
});