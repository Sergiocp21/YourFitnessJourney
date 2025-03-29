import React, { useContext } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom";


function GoogleLoginButton() {
    const { login } = useContext(AuthContext); // Access the login function from AuthContext
    const navigate = useNavigate();

    const onSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/backend/access",
                credentialResponse.credential,
                {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                }
            );
            const jwt = response.data; //Receive the JWT from the backend

            login(jwt);

            navigate("/home"); // Redirect to the home page
        } catch (error) {
            console.error("Error al enviar el token al backend:", error);
        }
    };

    const onError = () => {
        console.log("Login Failed");
    };
    const clientId = import.meta.env.VITE_REACT_APP_Client_ID
    return (

        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={onSuccess}
                onError={onError}
                buttonText="Iniciar sesión con Google"
            />
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;