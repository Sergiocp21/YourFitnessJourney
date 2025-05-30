import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import GoogleLoginButton from "../Login/GoogleLoginButton";

function LoginRedirectButton({ children, className }) {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const loginRef = useRef(null);

    const handleClick = () => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            navigate("/home");
        } else {
            setShowLogin(true);
        }
    };

    // Cerrar login si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (loginRef.current && !loginRef.current.contains(e.target)) {
                setShowLogin(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block">
            <button onClick={handleClick} className={className}>
                {children}
            </button>

            {showLogin && (
                <div
                    ref={loginRef}
                    className="absolute top-12 left-0 bg-white text-black p-4 rounded-lg shadow-lg z-50"
                >
                    <h2 className="text-lg font-semibold text-center mb-4">Iniciar sesión</h2>
                    <GoogleLoginButton />
                    <button
                        onClick={() => setShowLogin(false)}
                        className="mt-2 text-sm text-gray-600 underline block mx-auto"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}

export default LoginRedirectButton;
