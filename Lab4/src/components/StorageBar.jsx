import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatSize } from '../utils/fileUtils';

export default function StorageBar({ total, free }) {
    const used = total - free;
    const usedPercent = total > 0 ? (used / total) * 100 : 0;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>💾 Статистика пам'яті</Text>

            <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${usedPercent}%` }]} />
            </View>

            <View style={styles.row}>
                <Stat label="Всього" value={formatSize(total)} color="#a29bfe" />
                <Stat label="Зайнято" value={formatSize(used)} color="#e94560" />
                <Stat label="Вільно" value={formatSize(free)} color="#00b894" />
            </View>
        </View>
    );
}

function Stat({ label, value, color }) {
    return (
        <View style={styles.stat}>
            <Text style={[styles.statValue, { color }]}>{value}</Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#16213e',
        borderRadius: 16,
        padding: 16,
        margin: 16,
        elevation: 4,
    },
    title: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 12 },
    barBg: {
        height: 10,
        backgroundColor: '#0f3460',
        borderRadius: 5,
        overflow: 'hidden',
        marginBottom: 12,
    },
    barFill: {
        height: '100%',
        backgroundColor: '#e94560',
        borderRadius: 5,
    },
    row: { flexDirection: 'row', justifyContent: 'space-around' },
    stat: { alignItems: 'center' },
    statValue: { fontWeight: 'bold', fontSize: 15 },
    statLabel: { color: '#aaa', fontSize: 12, marginTop: 2 },
});