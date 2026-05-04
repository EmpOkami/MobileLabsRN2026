import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Реєстрація</Text>

            <TextInput placeholder="Електронна пошта" style={styles.input} onChangeText={setEmail} />
            <TextInput placeholder="Пароль" secureTextEntry style={styles.input} onChangeText={setPassword} />
            <TextInput placeholder="Пароль (ще раз)" secureTextEntry style={styles.input} onChangeText={setPassword2} />
            <TextInput placeholder="Прізвище" style={styles.input} onChangeText={setSurname} />
            <TextInput placeholder="Ім'я" style={styles.input} onChangeText={setName} />

            <Button title="Зареєструватися" onPress={() => alert('Зареєстровано')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }
});