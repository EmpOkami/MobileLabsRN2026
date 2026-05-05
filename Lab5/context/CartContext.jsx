import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);

    const addItem = (product) => {
        setItems((prev) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, qty: p.qty + 1 } : p
                );
            }
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeItem = (id) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    };

    const clear = () => setItems([]);

    const totalCount = items.reduce((sum, p) => sum + p.qty, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clear, totalCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}
