import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const data = Array(12).fill(0);

export default function GalleryScreen() {
    return (
        <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(_, index) => index.toString()}
            renderItem={() => <View style={styles.item} />}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 10 },
    item: {
        flex: 1,
        height: 120,
        backgroundColor: '#ddd',
        margin: 5,
        borderRadius: 10
    }
});