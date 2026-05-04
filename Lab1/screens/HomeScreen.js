import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = Array(8).fill({
    title: "Заголовок новини",
    date: "Дата новини",
    text: "Короткий текст новини"
});

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Новини</Text>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.imagePlaceholder} />
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text>{item.text}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    card: { flexDirection: 'row', marginBottom: 10 },
    imagePlaceholder: {
        width: 60,
        height: 60,
        backgroundColor: '#ccc',
        marginRight: 10
    },
    title: { fontWeight: 'bold' },
    date: { color: 'gray', fontSize: 12 }
});