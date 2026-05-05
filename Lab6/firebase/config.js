import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyD7xzn-R0N78Qcx9t7zyMBH9jbDnPm6qps",
    authDomain: "lab6-21ec7.firebaseapp.com",
    projectId: "lab6-21ec7",
    storageBucket: "lab6-21ec7.firebasestorage.app",
    messagingSenderId: "376103759684",
    appId: "1:376103759684:web:b455a77d428e1f1cfef111",
    measurementId: "G-E4N9WX8VZD"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export default app;