import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import GoogleLoginButton from './GoogleLoginButton';
function LoginComponent() {
    const { token } = useContext(AuthContext); // Obtén el token del contexto

    // Si el usuario ya está autenticado, redirige a /home
    if (token) {
        return <Navigate to="/home" />;
    }

    return (
        <div>
            <h1>Login with Google</h1>
            <GoogleLoginButton />
        </div>
    );
}

export default LoginComponent;