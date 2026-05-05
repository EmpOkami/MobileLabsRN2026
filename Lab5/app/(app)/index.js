import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { products } from "../../data/products";

function ProductCard({ item }) {
    return (
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.cardBody}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

export default function CatalogScreen() {
    const { isAuthenticated, user, logout } = useAuth();
    const { clear, totalCount } = useCart();

    const handleLogout = () => {
        logout();
        clear();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {isAuthenticated ? (
                    <>
                        <Text style={styles.greeting}>
                            Вітаємо, {user?.name || user?.email}!
                        </Text>
                        <View style={styles.headerActions}>
                            <Text style={styles.cartBadge}>🛒 {totalCount}</Text>
                            <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
                                <Text style={styles.logoutText}>Вийти</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.greeting}>Гість</Text>
                        <TouchableOpacity
                            onPress={() => router.push("/login")}
                            style={styles.loginBtn}
                        >
                            <Text style={styles.loginText}>Увійти</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductCard item={item} />}
                contentContainerStyle={styles.list}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f4f8" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
    },
    greeting: { fontSize: 16, fontWeight: "600", color: "#1a1a2e" },
    headerActions: { flexDirection: "row", alignItems: "center", gap: 12 },
    cartBadge: { fontSize: 16, fontWeight: "600", color: "#1a1a2e" },
    logoutBtn: {
        backgroundColor: "#ef4444",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    logoutText: { color: "#fff", fontWeight: "600", fontSize: 14 },
    loginBtn: {
        backgroundColor: "#4f46e5",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    loginText: { color: "#fff", fontWeight: "600", fontSize: 14 },
    list: { padding: 12 },
    row: { justifyContent: "space-between" },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 14,
        width: "48%",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
    },
    image: { width: "100%", height: 130 },
    cardBody: { padding: 10 },
    productName: { fontSize: 14, fontWeight: "600", color: "#1a1a2e", marginBottom: 4 },
    productPrice: { fontSize: 16, fontWeight: "700", color: "#4f46e5" },
});
