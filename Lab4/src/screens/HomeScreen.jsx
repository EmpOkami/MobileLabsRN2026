import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import StorageBar from '../components/StorageBar';

export default function HomeScreen({ navigation }) {
    const [storage, setStorage] = useState({ total: 0, free: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageInfo();
    }, []);

    const loadStorageInfo = async () => {
        setLoading(true);
        try {
            const free = await FileSystem.getFreeDiskStorageAsync();
            const total = await FileSystem.getTotalDiskCapacityAsync();
            setStorage({ free: free ?? 0, total: total ?? 0 });
        } catch (e) {
            console.warn('Storage error:', e);
            setStorage({ free: 0, total: 0 });
        } finally {
            setLoading(false);
        }
    };

    const openFileSystem = () => {
        const rootUri = FileSystem.documentDirectory;
        if (!rootUri) {
            Alert.alert('Помилка', 'Неможливо отримати доступ до файлової системи');
            return;
        }
        navigation.navigate('FileList', {
            dirUri: rootUri,
            title: 'Документи',
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Ласкаво просимо до</Text>
            <Text style={styles.appName}>📁 Файловий менеджер</Text>

            {loading ? (
                <ActivityIndicator color="#e94560" size="large" style={{ margin: 20 }} />
            ) : (
                <StorageBar total={storage.total} free={storage.free} />
            )}

            <TouchableOpacity style={styles.openBtn} onPress={openFileSystem}>
                <Text style={styles.openBtnText}>🚀 Відкрити файлову систему</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.refreshBtn} onPress={loadStorageInfo}>
                <Text style={styles.refreshText}>🔄 Оновити статистику</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', paddingTop: 40 },
    welcome: { color: '#888', textAlign: 'center', fontSize: 16, marginBottom: 4 },
    appName: { color: '#fff', textAlign: 'center', fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
    openBtn: {
        backgroundColor: '#e94560', margin: 16, padding: 16,
        borderRadius: 14, alignItems: 'center', elevation: 4,
    },
    openBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 17 },
    refreshBtn: { alignItems: 'center', marginTop: 8 },
    refreshText: { color: '#a29bfe', fontSize: 14 },
});