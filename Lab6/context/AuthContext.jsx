import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    deleteUser,
    EmailAuthProvider,
    reauthenticateWithCredential,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);       // поточний користувач
    const [loading, setLoading] = useState(true);  // чи завантажується

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe; // cleanup при unmount
    }, []);

    const register = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Створюємо порожній документ профілю у Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
            email: email,
            name: '',
            age: '',
            city: '',
            createdAt: new Date().toISOString()
        });
        return userCredential;
    };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    };

    const getUserProfile = async () => {
        if (!user) return null;
        const docRef = doc(db, 'users', user.uid); // тільки свій документ!
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    };

    const updateUserProfile = async (data) => {
        if (!user) throw new Error('Не авторизований');
        const docRef = doc(db, 'users', user.uid); // uid як ID документу
        await setDoc(docRef, data, { merge: true }); // merge: true — не перезаписує повністю
    };

    const deleteAccount = async (password) => {
        if (!user) throw new Error('Не авторизований');

        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        await deleteDoc(doc(db, 'users', user.uid));

        await deleteUser(user);
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        resetPassword,
        getUserProfile,
        updateUserProfile,
        deleteAccount
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};