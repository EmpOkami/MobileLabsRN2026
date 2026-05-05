import { createContext, useContext, useState } from "react";

// 1. Створюємо контекст
const AuthContext = createContext(null);

// 2. Провайдер — обгортка для всього застосунку
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Імітація логіну (без реального бекенду)
    const login = (email, password) => {
        if (email && password) {
            setUser({ email });
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    // Імітація реєстрації
    const register = (email, password, name) => {
        if (email && password && name) {
            setUser({ email, name });
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Хук для зручного доступу до контексту
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}