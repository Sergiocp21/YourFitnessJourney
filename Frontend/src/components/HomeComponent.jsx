import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext"; // Correct import path
import { getUserInfo } from "../api";

function HomeComponent() {
    const { token, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (token) {
            getUserInfo(token).then((response) => {
                setUserData(response.data);
            }).catch((error) => {
                console.log(error);
                if (error.response && error.response.status === 401) {
                    // Only log out if the error is a 401 Unauthorized
                    logout();
                }
            });
        }
    }, [token, logout]);

    return (
        <div>
            <h1>Bienvenido, {userData?.name}!</h1>
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
    );
}

export default HomeComponent;