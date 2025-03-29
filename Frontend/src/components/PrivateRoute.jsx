import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext"; // Import AuthContext

function PrivateRoute({ children }) {
    const { token } = useContext(AuthContext); // Check if the user is authenticated

    // If the user is not authenticated, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If the user is authenticated, render the children components
    return children;
}

export default PrivateRoute;