import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotification } from '../Notifications/useNotification';


function GoogleLoginButton() {
    const { notify } = useNotification();
    const navigate = useNavigate();
    const onSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post(
                "https://api.yourfitnessjourney.fit/users/access",
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
        notify("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.", "error");
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