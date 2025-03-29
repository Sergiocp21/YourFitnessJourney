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
