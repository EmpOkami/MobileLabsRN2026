import React, { createContext, useContext, useState, useCallback } from "react";

const GameContext = createContext();

const INITIAL_CHALLENGES = [
    { id: "taps",       label: "Зробити 10 кліків",          desc: "Натисни на об'єкт 10 разів",        goal: 10,  current: 0, type: "taps" },
    { id: "doubletaps", label: "Подвійний клік 5 разів",     desc: "Виконай 5 подвійних кліків",        goal: 5,   current: 0, type: "doubletaps" },
    { id: "longpress",  label: "Утримати об'єкт 3 секунди",  desc: "Зроби довге натискання",            goal: 1,   current: 0, type: "longpress" },
    { id: "pan",        label: "Перетягнути об'єкт",         desc: "Перемісти об'єкт по екрану",        goal: 1,   current: 0, type: "pan" },
    { id: "swiperight", label: "Свайп вправо",               desc: "Швидкий свайп вправо",              goal: 1,   current: 0, type: "swiperight" },
    { id: "swipeleft",  label: "Свайп вліво",                desc: "Швидкий свайп вліво",               goal: 1,   current: 0, type: "swipeleft" },
    { id: "pinch",      label: "Змінити розмір об'єкта",     desc: "Використай жест зведення пальців",  goal: 1,   current: 0, type: "pinch" },
    { id: "score100",   label: "Отримати 100 очок",          desc: "Набери 100 очок у лічильнику",      goal: 100, current: 0, type: "score" },
    { id: "custom",     label: "Свайп вгору 3 рази",         desc: "Зроби 3 швидких свайпи вгору",      goal: 3,   current: 0, type: "swipeup" },
];

export function GameProvider({ children }) {
    const [score, setScore] = useState(0);
    const [challenges, setChallenges] = useState(INITIAL_CHALLENGES);

    const updateChallenge = useCallback((type, amount = 1) => {
        setChallenges((prev) =>
            prev.map((c) => {
                if (c.type !== type) return c;
                const next = Math.min(c.current + amount, c.goal);
                return { ...c, current: next };
            })
        );
    }, []);

    const addScore = useCallback((amount) => {
        setScore((prev) => {
            const next = prev + amount;
            // оновлюємо завдання "набрати 100 очок"
            setChallenges((cs) =>
                cs.map((c) =>
                    c.type === "score" ? { ...c, current: Math.min(next, c.goal) } : c
                )
            );
            return next;
        });
    }, []);

    return (
        <GameContext.Provider value={{ score, challenges, addScore, updateChallenge }}>
            {children}
        </GameContext.Provider>
    );
}

export const useGame = () => useContext(GameContext);