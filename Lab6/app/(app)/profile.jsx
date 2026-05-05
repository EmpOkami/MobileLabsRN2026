import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Alert, ScrollView, ActivityIndicator
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useCallback } from 'react';

export default function ProfileScreen() {
    const { user, logout, getUserProfile } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            loadProfile();
        }, [])
    );

    const loadProfile = async () => {
        try {
            const data = await getUserProfile();
            setProfile(data);
        } catch (error) {
            Alert.alert('Помилка', 'Не вдалось завантажити профіль');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Вийти', style: 'destructive',
                onPress: async () => {
                    await logout();
                    router.replace('/(auth)/login');
                }
            }
        ]);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6C63FF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Аватар / Заголовок */}
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {profile?.name ? profile.name[0].toUpperCase() : '?'}
                    </Text>
                </View>
                <Text style={styles.name}>
                    {profile?.name || 'Ім\'я не вказано'}
                </Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            {/* Дані профілю */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>📋 Мої дані</Text>

                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>👤 Ім'я</Text>
                    <Text style={styles.dataValue}>
                        {profile?.name || 'Не вказано'}
                    </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>🎂 Вік</Text>
                    <Text style={styles.dataValue}>
                        {profile?.age || 'Не вказано'}
                    </Text>
                </View>

                <View style={styles.separator} />

                <View style={styles.dataRow}>
                    <Text style={styles.dataLabel}>🏙️ Місто</Text>
                    <Text style={styles.dataValue}>
                        {profile?.city || 'Не вказано'}
                    </Text>
                </View>
            </View>

            {/* Кнопки дій */}
            <TouchableOpacity
                style={styles.editBtn}
                onPress={() => router.push('/(app)/edit-profile')}
            >
                <Text style={styles.editBtnText}>✏️ Редагувати профіль</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                <Text style={styles.logoutBtnText}>🚪 Вийти з акаунту</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { alignItems: 'center', padding: 32, paddingBottom: 24 },
    avatar: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: '#6C63FF', justifyContent: 'center', alignItems: 'center',
        marginBottom: 12
    },
    avatarText: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
    name: { fontSize: 22, fontWeight: 'bold', color: '#1A1A2E', marginBottom: 4 },
    email: { fontSize: 14, color: '#888' },
    card: {
        backgroundColor: '#fff', margin: 16, borderRadius: 16,
        padding: 20, shadowColor: '#000', shadowOpacity: 0.05,
        shadowRadius: 10, elevation: 2
    },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 },
    dataRow: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingVertical: 8
    },
    dataLabel: { fontSize: 14, color: '#888' },
    dataValue: { fontSize: 14, color: '#333', fontWeight: '500' },
    separator: { height: 1, backgroundColor: '#F0F0F0' },
    editBtn: {
        backgroundColor: '#6C63FF', margin: 16, marginTop: 8,
        borderRadius: 12, padding: 16, alignItems: 'center'
    },
    editBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    logoutBtn: {
        backgroundColor: '#fff', margin: 16, marginTop: 0,
        borderRadius: 12, padding: 16, alignItems: 'center',
        borderWidth: 1, borderColor: '#FF4757'
    },
    logoutBtnText: { color: '#FF4757', fontSize: 16, fontWeight: '600' }
});