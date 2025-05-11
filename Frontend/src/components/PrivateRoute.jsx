import React from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../api.jsx";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("jwt"); // Check if the user is authenticated
    const isValidToken = validateToken(token); // Validate the token

    // If the user is not authenticated or the token is invalid, redirect to the login page
    if (!token || !isValidToken) {
        return <Navigate to="/" />;
    }

    // If the user is authenticated, render the children components
    return children;
}

export default PrivateRoute;