import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatSize, formatDate, getExtension, getIcon } from '../utils/fileUtils';

export default function InfoModal({ visible, item, onClose }) {
    if (!item) return null;

    const rows = [
        { label: 'Назва', value: item.name },
        { label: 'Тип', value: item.isDirectory ? 'Папка' : (getExtension(item.name) || 'файл').toUpperCase() },
        { label: 'Розмір', value: item.isDirectory ? '—' : formatSize(item.size) },
        { label: 'Змінено', value: formatDate(item.modificationTime) },
        { label: 'Шлях', value: item.uri },
    ];

    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.icon}>{getIcon(item)}</Text>
                    <Text style={styles.title}>Інформація</Text>
                    {rows.map((row) => (
                        <View key={row.label} style={styles.row}>
                            <Text style={styles.label}>{row.label}</Text>
                            <Text style={styles.value} numberOfLines={2}>{row.value}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeText}>Закрити</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 24 },
    modal: { backgroundColor: '#16213e', borderRadius: 20, padding: 24 },
    icon: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
    title: { color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#0f3460' },
    label: { color: '#888', fontSize: 13, flex: 1 },
    value: { color: '#fff', fontSize: 13, flex: 2, textAlign: 'right' },
    closeBtn: { marginTop: 20, backgroundColor: '#e94560', borderRadius: 10, padding: 14, alignItems: 'center' },
    closeText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});