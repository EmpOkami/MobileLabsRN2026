import React, { useState } from 'react';
import {
    Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';

export default function CreateModal({ visible, onClose, onCreate }) {
    const [type, setType] = useState('folder'); // 'folder' | 'file'
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const handleCreate = () => {
        if (!name.trim()) return;
        onCreate({ type, name: name.trim(), content });
        setName('');
        setContent('');
    };

    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <KeyboardAvoidingView
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View style={styles.modal}>
                    <Text style={styles.title}>➕ Створити</Text>

                    {/* Вибір типу */}
                    <View style={styles.tabs}>
                        <TouchableOpacity
                            style={[styles.tab, type === 'folder' && styles.tabActive]}
                            onPress={() => setType('folder')}
                        >
                            <Text style={styles.tabText}>📁 Папку</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, type === 'file' && styles.tabActive]}
                            onPress={() => setType('file')}
                        >
                            <Text style={styles.tabText}>📄 Файл .txt</Text>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder={type === 'folder' ? 'Назва папки' : 'Назва файлу (без .txt)'}
                        placeholderTextColor="#666"
                        value={name}
                        onChangeText={setName}
                    />

                    {type === 'file' && (
                        <TextInput
                            style={[styles.input, styles.textarea]}
                            placeholder="Початковий вміст файлу..."
                            placeholderTextColor="#666"
                            value={content}
                            onChangeText={setContent}
                            multiline
                        />
                    )}

                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                            <Text style={styles.cancelText}>Скасувати</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
                            <Text style={styles.createText}>Створити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
    modal: { backgroundColor: '#16213e', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
    title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    tabs: { flexDirection: 'row', marginBottom: 16, gap: 8 },
    tab: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#0f3460', alignItems: 'center' },
    tabActive: { backgroundColor: '#e94560' },
    tabText: { color: '#fff', fontWeight: '600' },
    input: {
        backgroundColor: '#0f3460', color: '#fff', borderRadius: 10,
        padding: 12, marginBottom: 12, fontSize: 15,
    },
    textarea: { height: 100, textAlignVertical: 'top' },
    buttons: { flexDirection: 'row', gap: 12, marginTop: 8 },
    cancelBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: '#0f3460', alignItems: 'center' },
    cancelText: { color: '#aaa', fontWeight: '600' },
    createBtn: { flex: 1, padding: 14, borderRadius: 10, backgroundColor: '#e94560', alignItems: 'center' },
    createText: { color: '#fff', fontWeight: 'bold' },
});