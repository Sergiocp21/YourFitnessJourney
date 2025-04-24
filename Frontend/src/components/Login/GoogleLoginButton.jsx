import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function GoogleLoginButton() {
    const navigate = useNavigate();
    const onSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/users/access",
                credentialResponse.credential,
                {
                    headers: {
                        "Content-Type": "text/plain",
                    },
                }
            );
            const jwt = response.data; //Receive the JWT from the backend

            window.localStorage.setItem("jwt", jwt);

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