import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function AuthLayout() {
    const { user } = useAuth();

    if (user) {
        return <Redirect href="/(app)/profile" />;
    }

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}