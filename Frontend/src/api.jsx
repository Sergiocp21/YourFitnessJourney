import axios from "axios";


export const api = axios.create({
    baseURL: "http://localhost:8080", //http://192.168.1.14:8080

});


api.interceptors.response.use( //If the error is 401, removes the token and redirects to landing page
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('jwt');
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export const validateToken = async (token) => {
    return api.get("/users/validateToken", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error("Error validating token:", error);
        return false;
    });
}

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

export const getPublicRoutines = async (token) => {
    return api.get("/routine/publicRoutines", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error fetching public routines:", error);
            throw new Error("Error fetching public routines");
        });
};

export const getUserRoutines = async (token) => {
    return api.get("/routine/userRoutines", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error fetching user routines:", error);
            throw new Error("Error fetching user routines");
        });
};

export const copyRoutine = async (routine, jwt) => {
    return api.post("/routine/copyRoutine", routine, {
        headers: {
            Authorization: jwt ? `Bearer ${jwt}` : "",
        },
    }).then(res => res.data)
        .catch(error => {
            console.error("Error copying routine:", error);
            throw new Error("Error copying routine");
        });
}

export const deleteRoutine = async (routineId, token) => {
    return api.delete(`/routine/deleteRoutine/${routineId}`, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error deleting routine:", error);
            throw new Error("Error deleting routine routineId = " + routineId);
        });
}

export const setRoutineAsActive = async (routineId, token) => {
    return api.put(`/routine/setRoutineAsActive/${routineId}`, {}, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error setting routine as active:", error);
            throw new Error("Error setting routine as active");
        });
}


export const updateRoutine = async (routineDTO, token) => {
    return api.put("/routine/updateRoutine", routineDTO, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error updating routine:", error);
            throw new Error("Error updating routine");
        });
}

export const getTodayExercises = async (token) => {
    return api.get("/routine/getTodayExercises", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error fetching today's exercises:", error);
            throw new Error("Error fetching today's exercises");
        });
}

export const updateWorkoutProgress = async (routineDayDTO, token) => {
    try {
        const response = await api.put("/routine/updateTodayWorkout", routineDayDTO, {
            headers: {
                Authorization: token ? `Bearer ${token}` : "",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating workout progress:", error);
        throw new Error("Error updating workout progress");
    }
}



export const getActiveRoutineDays = async (token) => {
    return api.get("/routine/getActiveRoutineDays", {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error fetching active routine days:", error);
            throw new Error("Error fetching active routine days");
        });
}

export const changeActiveDay = async (dayOrder, token) => {
    return api.put(`/routine/changeActiveDay/${dayOrder}`, {}, {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    }).then(res => res.data)
        .catch(error => {
            console.error("Error changing active day:", error);
            throw new Error("Error changing active day");
        });
}

export const getUserCount = async () => {
    return api.get("/users/getUserCount")
        .then(res => res.data)
        .catch(error => {
            console.error("Error fetching user count:", error);
            throw new Error("Error fetching user count");
        });
}




