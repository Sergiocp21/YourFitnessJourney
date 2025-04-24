import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.1.14:8080",
});

export const getUserInfo = async (token) => {

    return api.get("/users/getUser", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    });

}

export const getUserNameAndImage = async (token) => {
    return api.get("/users/getUserNameAndImage", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    });
}

export const updateUserInfo = async (token, updatedUser) => {
    return api.post("/users/updateUser", JSON.stringify(updatedUser), {
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    }).then((response) => { response.data; window.location.href = "/home"; })
        .catch((error) => console.log("Error updating user data:", error));


}

export const getMuscleGroups = async () => {
    return api.get("/exercises/types");
};

export const getExercisesByMuscleGroup = async (muscleGroup) => {
    return api.get("/exercises/byMuscleGroup", {
        params: { muscleGroup }
    }
    )
};

export const saveRoutine = async (routineDTO, token) => {
    try {
        const response = await api.post(
            "/routine/saveRoutine",
            routineDTO,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("No se pudo guardar la rutina:", error);
        throw new Error("No se pudo guardar la rutina");
    }
};


