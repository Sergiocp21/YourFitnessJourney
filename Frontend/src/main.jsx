import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";

import "./index.css";
import { AuthProvider } from "./Auth/AuthProvider";
import ErrorBoundary from "./ErrorBoundary";

const clientId = import.meta.env.VITE_REACT_APP_Client_ID;
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </GoogleOAuthProvider>
);
