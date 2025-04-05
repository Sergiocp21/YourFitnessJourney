import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("jwt") // Check if the user is authenticated

    // If the user is not authenticated, redirect to the login page
    if (!token) {
        return <Navigate to="/" />;
    }

    // If the user is authenticated, render the children components
    return children;
}

export default PrivateRoute;