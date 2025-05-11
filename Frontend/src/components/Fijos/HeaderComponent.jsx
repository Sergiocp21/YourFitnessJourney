import { useEffect, useRef, useState } from "react";
import GoogleLoginButton from "../Login/GoogleLoginButton";
import { useNavigate, useLocation } from "react-router";
import { getUserNameAndImage } from "../../api";
import { logout } from "../Login/logout";

function Header() {
    const [googleDropdownVisible, setDropdownVisible] = useState(false);
    const [userDropdownVisible, setUserDropdownVisible] = useState(false);
    const [userData, setUserData] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const isLandingPage = location.pathname === "/";

    const jwt = localStorage.getItem("jwt");

    // Refs para detectar clics fuera
    const googleDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    const handleTitleClick = () => {
        if (isLandingPage) {
            navigate("/");
        } else {
            navigate("/home");
        }
    };

    const handleUserInfoClick = () => {
        navigate("/userInfo");
    };

    const handleLoginClick = () => {
        if (jwt) {
            navigate("/home");
        } else {
            setDropdownVisible(!googleDropdownVisible);
        }
    };

    const handleUserClick = () => {
        setUserDropdownVisible(prev => !prev);
    };

    useEffect(() => {
        getUserNameAndImage(jwt)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, [jwt]);

    // Cerrar dropdowns al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                googleDropdownRef.current &&
                !googleDropdownRef.current.contains(event.target)
            ) {
                setDropdownVisible(false);
            }
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setUserDropdownVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center">
            <h1
                onClick={handleTitleClick}
                className="font-bold text-xl cursor-pointer"
            >
                Your Fitness Journey
            </h1>

            {isLandingPage && (
                <>
                    <button
                        onClick={handleLoginClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Accede
                    </button>

                    {googleDropdownVisible && (
                        <div
                            ref={googleDropdownRef}
                            className="absolute top-16 right-4 bg-black text-white p-4 rounded-lg shadow-lg"
                        >
                            <h2 className="text-lg font-semibold text-center mb-4">Iniciar sesión</h2>
                            <GoogleLoginButton />
                        </div>
                    )}
                </>
            )}

            {!isLandingPage && (
                <div className="relative">
                    <button
                        onClick={handleUserClick}
                        className="bg-gray-700 text-white px-4 py-2 rounded flex items-center hover:bg-gradient-to-br from-red-800 via-gray-500 to-black cursor-pointer"
                    >
                        {userData?.username && (
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
                            className="absolute top-12 right-0 bg-black text-white p-4 rounded-lg shadow-lg w-48 z-50"
                        >
                            <button
                                className="bg-gray-900 text-white px-4 py-2 rounded w-full mb-2"
                                onClick={handleUserInfoClick}
                            >
                                Ajustes de usuario
                            </button>
                            <button
                                onClick={logout}
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
