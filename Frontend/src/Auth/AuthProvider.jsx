import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = window.localStorage.getItem("jwt");

        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (jwtToken) => {
        window.localStorage.setItem("jwt", jwtToken);
        setToken(jwtToken);

    };

    const logout = () => {
        setToken(null);
        window.localStorage.removeItem("jwt");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}