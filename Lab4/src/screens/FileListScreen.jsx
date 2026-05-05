import React, { useEffect, useState, useCallback } from 'react';
import {
    View, Text, FlatList, TouchableOpacity,
    StyleSheet, ActivityIndicator, RefreshControl, Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';
import { readDirectory } from '../utils/fileUtils';
import FileItem from '../components/FileItem';
import CreateModal from '../components/CreateModal';
import InfoModal from '../components/InfoModal';

export default function FileListScreen({ route, navigation }) {
    const dirUri = route?.params?.dirUri ?? FileSystem.documentDirectory ?? '';
    const title = route?.params?.title ?? 'Документи';

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createVisible, setCreateVisible] = useState(false);
    const [infoItem, setInfoItem] = useState(null);

    useEffect(() => {
        navigation.setOptions({ title: `📁 ${title}` });
        loadItems();
    }, [dirUri]);

    const loadItems = useCallback(async () => {
        setLoading(true);
        try {
            const result = await readDirectory(dirUri);
            setItems(result);
        } catch (e) {
            console.warn('Помилка читання директорії:', e);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }, [dirUri]);

    const getReadablePath = () => {
        try {
            if (!dirUri) return 'Документи/';
            const base = FileSystem.documentDirectory ?? '';
            return base ? dirUri.replace(base, 'Документи/') : dirUri;
        } catch {
            return 'Документи/';
        }
    };

    const handleNavigate = (uri, name) => {
        const normalizedUri = uri.endsWith('/') ? uri : `${uri}/`;
        navigation.push('FileList', { dirUri: normalizedUri, title: name });
    };

    const handleEdit = (item) => {
        navigation.navigate('FileEdit', { fileUri: item.uri, fileName: item.name });
    };

    const handleCreate = async ({ type, name, content }) => {
        if (!name.trim()) return;
        try {
            const base = dirUri.endsWith('/') ? dirUri : `${dirUri}/`;
            if (type === 'folder') {
                await FileSystem.makeDirectoryAsync(`${base}${name}`, { intermediates: true });
            } else {
                await FileSystem.writeAsStringAsync(`${base}${name}.txt`, content || '');
            }
            setCreateVisible(false);
            loadItems();
        } catch (e) {
            console.warn('Помилка створення:', e);
            Alert.alert('Помилка', 'Не вдалося створити елемент');
        }
    };

    const renderItem = ({ item }) => (
        <FileItem
            item={item}
            onNavigate={handleNavigate}
            onRefresh={loadItems}
            onViewInfo={setInfoItem}
            onEdit={handleEdit}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.breadcrumb}>
                <Text style={styles.breadcrumbText} numberOfLines={1}>
                    📍 {getReadablePath()}
                </Text>
            </View>

            {loading ? (
                <ActivityIndicator color="#e94560" size="large" style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.uri}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={loadItems} tintColor="#e94560" />
                    }
                    ListEmptyComponent={
                        <Text style={styles.empty}>
                            Папка порожня{'\n'}Натисніть ➕ щоб створити файл або папку
                        </Text>
                    }
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={() => setCreateVisible(true)}>
                <Text style={styles.fabText}>＋</Text>
            </TouchableOpacity>

            <CreateModal
                visible={createVisible}
                onClose={() => setCreateVisible(false)}
                onCreate={handleCreate}
            />
            <InfoModal
                visible={!!infoItem}
                item={infoItem}
                onClose={() => setInfoItem(null)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a1a2e' },
    breadcrumb: { backgroundColor: '#0f3460', padding: 10, paddingHorizontal: 16 },
    breadcrumbText: { color: '#a29bfe', fontSize: 12 },
    empty: { color: '#555', textAlign: 'center', marginTop: 60, fontSize: 16, lineHeight: 26 },
    fab: {
        position: 'absolute', right: 20, bottom: 28,
        width: 60, height: 60, borderRadius: 30,
        backgroundColor: '#e94560', alignItems: 'center',
        justifyContent: 'center', elevation: 8,
        shadowColor: '#e94560', shadowOpacity: 0.4,
        shadowRadius: 8, shadowOffset: { width: 0, height: 4 },
    },
    fabText: { color: '#fff', fontSize: 30, lineHeight: 34 },
});