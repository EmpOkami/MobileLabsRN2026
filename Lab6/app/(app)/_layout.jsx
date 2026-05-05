import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
    const { user } = useAuth();

    if (!user) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}