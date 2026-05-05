import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export default function FileViewScreen({ route }) {
    const { fileUri, fileName } = route.params;
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        FileSystem.readAsStringAsync(fileUri)
            .then(setContent)
            .catch(() => setContent('(не вдалося прочитати файл)'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.fileName}>📄 {fileName}</Text>
            {loading ? (
                <ActivityIndicator color="#e94560" />
            ) : (
                <ScrollView style={styles.scroll}>
                    <Text style={styles.content}>{content || '(файл порожній)'}</Text>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', padding: 16 },
    fileName: { color: '#a29bfe', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
    scroll: { flex: 1 },
    content: { color: '#e0e0e0', fontSize: 15, lineHeight: 24, fontFamily: 'monospace' },
});