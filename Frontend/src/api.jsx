import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080",
});

export const getUserInfo = async (token) => {

    return api.get("/backend/getUser", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    });

}

export const getUserNameAndImage = async (token) => {
    return api.get("/backend/getUserNameAndImage", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    });
}

export const updateUserInfo = async (token, updatedUser) => {
    return api.post("/backend/updateUser", JSON.stringify(updatedUser), {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    }).then((response) => { response.data; window.location.href = "/home"; })
        .catch((error) => console.log("Error updating user data:", error));


}

