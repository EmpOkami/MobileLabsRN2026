import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { getIcon, formatSize, formatDate, getExtension } from '../utils/fileUtils';

export default function FileItem({ item, onNavigate, onRefresh, onViewInfo, onEdit }) {
    const handlePress = () => {
        if (item.isDirectory) {
            onNavigate(item.uri, item.name);
        } else if (getExtension(item.name) === 'txt') {
            onEdit(item);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            '🗑 Видалення',
            `Ви впевнені, що хочете видалити "${item.name}"?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        await FileSystem.deleteAsync(item.uri, { idempotent: true });
                        onRefresh();
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} onLongPress={handleDelete}>
            <Text style={styles.icon}>{getIcon(item)}</Text>
            <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.meta}>
                    {item.isDirectory ? 'Папка' : formatSize(item.size)} •{' '}
                    {formatDate(item.modificationTime)}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onViewInfo(item)} style={styles.btn}>
                    <Text style={styles.btnText}>ℹ️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.btn}>
                    <Text style={styles.btnText}>🗑</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#16213e', borderRadius: 12,
        padding: 12, marginHorizontal: 16, marginVertical: 4, elevation: 2,
    },
    icon: { fontSize: 28, marginRight: 12 },
    info: { flex: 1 },
    name: { color: '#fff', fontWeight: '600', fontSize: 15 },
    meta: { color: '#888', fontSize: 12, marginTop: 2 },
    actions: { flexDirection: 'row', gap: 8 },
    btn: { padding: 6 },
    btnText: { fontSize: 18 },
});