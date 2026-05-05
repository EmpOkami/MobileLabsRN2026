import React, { useEffect, useState } from 'react';
import {
    View, TextInput, TouchableOpacity, Text,
    StyleSheet, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

export default function FileEditScreen({ route, navigation }) {
    const { fileUri, fileName } = route.params;
    const [content, setContent] = useState('');
    const [saved, setSaved] = useState(true);

    useEffect(() => {
        navigation.setOptions({ title: `✏️ ${fileName}` });
        FileSystem.readAsStringAsync(fileUri)
            .then((text) => setContent(text))
            .catch(() => setContent(''));
    }, []);

    const handleSave = async () => {
        try {
            await FileSystem.writeAsStringAsync(fileUri, content);
            setSaved(true);
            Alert.alert('✅ Збережено', 'Файл успішно збережено!');
        } catch (e) {
            Alert.alert('❌ Помилка', 'Не вдалося зберегти файл');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TextInput
                style={styles.editor}
                value={content}
                onChangeText={(t) => { setContent(t); setSaved(false); }}
                multiline
                textAlignVertical="top"
                placeholder="Введіть текст..."
                placeholderTextColor="#555"
                autoFocus
            />
            <TouchableOpacity
                style={[styles.saveBtn, !saved && styles.saveBtnUnsaved]}
                onPress={handleSave}
            >
                <Text style={styles.saveBtnText}>
                    {saved ? '✅ Збережено' : '💾 Зберегти зміни'}
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e', padding: 16 },
    editor: {
        flex: 1, color: '#e0e0e0', fontSize: 15, lineHeight: 24,
        fontFamily: 'monospace', backgroundColor: '#0f3460',
        borderRadius: 12, padding: 14, marginBottom: 12,
    },
    saveBtn: { backgroundColor: '#00b894', padding: 16, borderRadius: 12, alignItems: 'center' },
    saveBtnUnsaved: { backgroundColor: '#e94560' },
    saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});