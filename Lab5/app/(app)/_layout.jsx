import { Stack } from "expo-router";

export default function AppLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Каталог товарів" }} />
            <Stack.Screen name="details/[id]" options={{ title: "Деталі товару" }} />
        </Stack>
    );
}
