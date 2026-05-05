import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { products } from "../../../data/products";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const { isAuthenticated } = useAuth();
    const { addItem } = useCart();

    const product = products.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.notFound}>
                <Text style={styles.notFoundText}>Товар не знайдено 😕</Text>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Text style={styles.backBtnText}>← Назад</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            Alert.alert(
                "Потрібна авторизація",
                "Щоб додавати товари в кошик, увійдіть або зареєструйтесь.",
                [
                    { text: "Скасувати", style: "cancel" },
                    { text: "Увійти", onPress: () => router.push("/login") },
                ]
            );
            return;
        }
        addItem(product);
        Alert.alert("Готово", `${product.name} додано до кошика!`);
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>

                <View style={styles.divider} />

                <Text style={styles.descLabel}>Опис</Text>
                <Text style={styles.description}>{product.description}</Text>

                <TouchableOpacity
                    style={[
                        styles.cartBtn,
                        !isAuthenticated && styles.cartBtnDisabled,
                    ]}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.cartBtnText}>
                        {isAuthenticated
                            ? "🛒 Додати до кошика"
                            : "🔒 Увійдіть, щоб додати в кошик"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f4f8" },
    image: { width: "100%", height: 280 },
    content: { padding: 20 },
    name: { fontSize: 24, fontWeight: "700", color: "#1a1a2e", marginBottom: 8 },
    price: { fontSize: 28, fontWeight: "800", color: "#4f46e5", marginBottom: 16 },
    divider: { height: 1, backgroundColor: "#e5e7eb", marginBottom: 16 },
    descLabel: { fontSize: 14, fontWeight: "600", color: "#6b7280", marginBottom: 8 },
    description: { fontSize: 16, color: "#374151", lineHeight: 24 },
    cartBtn: {
        backgroundColor: "#4f46e5",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        marginTop: 24,
    },
    cartBtnDisabled: {
        backgroundColor: "#9ca3af",
    },
    cartBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    notFound: { flex: 1, justifyContent: "center", alignItems: "center" },
    notFoundText: { fontSize: 18, color: "#6b7280", marginBottom: 16 },
    backBtn: { backgroundColor: "#4f46e5", padding: 12, borderRadius: 10 },
    backBtnText: { color: "#fff", fontWeight: "600" },
});
