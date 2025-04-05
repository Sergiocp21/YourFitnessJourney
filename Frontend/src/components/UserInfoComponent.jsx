import { useState, useEffect } from "react";
import { getUserInfo, updateUserInfo } from "../api";
import UserDTO from "../Dtos/UserDTO";
import { logout } from "./Login/logout"

function UserInfoComponent() {
    const token = localStorage.getItem("jwt");
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (token) {
            getUserInfo(token)
                .then((response) => {
                    setUserData(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response && error.response.status === 401) {
                        logout();
                    }
                });
        }
    }, [token]);

    const updateUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedUser = new UserDTO(
            formData.get("name"),
            userData.email,
            formData.get("pictureUrl"),
            formData.get("weight"),
            formData.get("height")
        );
        console.log(JSON.stringify(updatedUser));
        updateUserInfo(token, updatedUser);
    };

    return (
        <div>
            <h1>Informacion de usuario</h1>
            <form onSubmit={updateUser}>
                <label name="name">Nombre: </label>
                <input
                    type="text"
                    name="name"
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    value={userData?.name || ""} // Use empty string as fallback
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
                <br></br>
                <label name="email">Email: </label>
                <span>{userData?.email || "Cargando..."}</span>
                <br></br>
                <label name="weight">Peso: </label>
                <input
                    type="text"
                    name="weight"
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    value={userData?.weight || ""} // Use empty string as fallback
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                />
                <br></br>
                <label name="height">Altura: </label>
                <input
                    type="text"
                    name="height"
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    value={userData?.height || ""} // Use empty string as fallback
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                />
                <br></br>
                <label name="pictureUrl">Imagen: (para cambiar introduce la url de la imagen)</label>
                <img
                    src={userData?.pictureUrl || ""}
                    alt="User"
                    className="w-24 h-24 rounded-full"
                />
                <input
                    type="text"
                    name="pictureUrl"
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                    value={userData?.pictureUrl || ""} // Use empty string as fallback
                    onChange={(e) => setUserData({ ...userData, pictureUrl: e.target.value })}
                />
                <br></br>
                <button
                    type="submit"
                    className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out"
                >
                    Update user
                </button>
            </form>
        </div>
    );
}

export default UserInfoComponent;