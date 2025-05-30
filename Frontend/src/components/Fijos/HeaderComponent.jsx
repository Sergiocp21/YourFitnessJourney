import { useEffect, useRef, useState } from "react";
import GoogleLoginButton from "../Login/GoogleLoginButton"; // Asegúrate que la ruta es correcta
import { useNavigate, useLocation } from "react-router-dom";
import { getUserNameAndImage } from "../../api"; // Asegúrate que la ruta es correcta
import { logout } from "../Login/logout"; // Asegúrate que la ruta es correcta

function Header() {
    const [isGoogleDropdownVisible, setGoogleDropdownVisible] = useState(false);
    const [googleDropdownAlignLeft, setGoogleDropdownAlignLeft] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [userDropdownAlignLeft, setUserDropdownAlignLeft] = useState(false);
    const [userData, setUserData] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const isLandingPage = location.pathname === "/";

    // jwt se lee en cada render. Para el onClick, leeremos de localStorage directamente
    // para asegurar el valor más fresco en el momento del clic.
    // const jwt = localStorage.getItem("jwt"); // Ya no es tan crucial aquí para la lógica del botón Accede

    const googleDropdownRef = useRef(null);
    const googleButtonRef = useRef(null);
    const userDropdownRef = useRef(null);
    const userButtonRef = useRef(null);

    // Eliminado el useEffect de redirección automática.

    const handleTitleClick = () => {
        navigate(isLandingPage ? "/" : "/home");
    };

    const handleUserInfoClick = () => {
        setUserDropdownVisible(false);
        navigate("/userInfo");
    };

    const handleUserClick = () => {
        setUserDropdownVisible(prev => !prev);
    };

    // Modificado handleAccedeClick para la nueva lógica
    const handleAccedeClick = () => {
        const currentJwt = localStorage.getItem("jwt"); // Leer JWT en el momento del clic
        if (currentJwt) {
            navigate("/home"); // Si hay JWT, navegar a home
        } else {
            setGoogleDropdownVisible(prev => !prev); // Si no hay JWT, mostrar dropdown de login
        }
    };

    useEffect(() => {
        const currentJwt = localStorage.getItem("jwt"); // Usar variable local para la llamada a la API
        if (currentJwt) {
            getUserNameAndImage(currentJwt)
                .then(response => setUserData(response.data))
                .catch(error => console.error("Error fetching user data:", error));
        } else {
            setUserData(null);
        }
    }, [location.pathname]); // Re-obtener datos de usuario si el JWT o la ruta cambian (ej. tras login/logout)
    // Si el JWT cambia, el componente se re-renderiza y useEffect se ejecuta.
    // Añadimos location.pathname para que si el jwt se borra y volvemos a una
    // página que necesita userData, se limpie correctamente.

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                googleButtonRef.current && !googleButtonRef.current.contains(event.target) &&
                googleDropdownRef.current && !googleDropdownRef.current.contains(event.target)
            ) {
                setGoogleDropdownVisible(false);
            }
            if (
                userButtonRef.current && !userButtonRef.current.contains(event.target) &&
                userDropdownRef.current && !userDropdownRef.current.contains(event.target)
            ) {
                setUserDropdownVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isGoogleDropdownVisible && googleDropdownRef.current && googleButtonRef.current) {
            const dropdownRect = googleDropdownRef.current.getBoundingClientRect();
            const buttonRect = googleButtonRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;

            const wouldOverflowLeftIfRightAligned = (buttonRect.right - dropdownRect.width) < 0;
            const wouldOverflowRightIfLeftAligned = (buttonRect.left + dropdownRect.width) > screenWidth;

            if (googleDropdownAlignLeft) {
                if (!wouldOverflowLeftIfRightAligned) {
                    setGoogleDropdownAlignLeft(false);
                }
            } else {
                if (wouldOverflowLeftIfRightAligned) {
                    if (!wouldOverflowRightIfLeftAligned) {
                        setGoogleDropdownAlignLeft(true);
                    } else {
                        setGoogleDropdownAlignLeft(true);
                    }
                }
            }
        }
    }, [isGoogleDropdownVisible, googleDropdownAlignLeft, googleDropdownRef, googleButtonRef]);

    useEffect(() => {
        if (userDropdownVisible && userDropdownRef.current) {
            const rect = userDropdownRef.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            if (rect.right > screenWidth) {
                setUserDropdownAlignLeft(true);
            } else {
                setUserDropdownAlignLeft(false);
            }
        }
    }, [userDropdownVisible]);

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center relative z-50">
            <h1
                onClick={handleTitleClick}
                className="font-bold text-xl cursor-pointer"
            >
                Your Fitness Journey
            </h1>

            {/* El botón "Accede" ahora se muestra siempre en la landing page.
                Su onClick decide si redirigir o mostrar el login dropdown. */}
            {isLandingPage && (
                <div className="relative">
                    <button
                        ref={googleButtonRef}
                        onClick={handleAccedeClick} // onClick ahora tiene la lógica dual
                        className="bg-gradient-to-br from-red-800 via-gray-500 to-black text-white px-4 py-2 rounded hover:bg-gradient-to-br hover:from-red-700 hover:via-gray-400 hover:to-black transition-colors duration-300"
                    >
                        Accede
                    </button>
                    {/* El dropdown de Google Login solo se mostrará si isGoogleDropdownVisible es true,
                        lo cual handleAccedeClick solo hará si NO hay JWT. */}
                    {isGoogleDropdownVisible && (
                        <div
                            ref={googleDropdownRef}
                            className={`absolute top-full mt-2 ${googleDropdownAlignLeft ? "left-0" : "right-0"} bg-black text-white p-4 rounded-lg shadow-lg w-auto min-w-[280px] z-[51]`}
                        >
                            <h2 className="text-lg font-semibold text-center mb-4">Iniciar sesión</h2>
                            <GoogleLoginButton />
                        </div>
                    )}
                </div>
            )}

            {/* El menú de usuario se muestra si NO es landing Y HAY JWT (implícito por userData) */}
            {/* Para mayor claridad, podemos añadir la comprobación de jwt aquí también */}
            {!isLandingPage && localStorage.getItem("jwt") && userData && (
                <div className="relative">
                    <button
                        ref={userButtonRef}
                        onClick={handleUserClick}
                        className="bg-gray-700 text-white px-4 py-2 rounded flex items-center hover:bg-gradient-to-br from-red-800 via-gray-500 to-black cursor-pointer"
                    >
                        {userData.username && (
                            <div className="flex items-center">
                                <img
                                    src={userData.imgUrl}
                                    alt="User"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                {userData.username}
                            </div>
                        )}
                    </button>

                    {userDropdownVisible && (
                        <div
                            ref={userDropdownRef}
                            className={`absolute top-12 ${userDropdownAlignLeft ? "left-0" : "right-0"} bg-black text-white p-4 rounded-lg shadow-lg w-48 z-50`}
                        >
                            <button
                                className="bg-gray-900 text-white px-4 py-2 rounded w-full mb-2"
                                onClick={handleUserInfoClick}
                            >
                                Ajustes de usuario
                            </button>
                            <button
                                onClick={() => { logout(); setUserDropdownVisible(false); }}
                                className="bg-red-500 text-white px-4 py-2 rounded w-full"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;