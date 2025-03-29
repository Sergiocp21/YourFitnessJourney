import { AuthContext } from './Auth/AuthContext';
import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HeaderComponent from './components/Fijos/HeaderComponent';
import FooterComponent from './components/Fijos/FooterComponent';
import MainComponent from './components/MainComponent';
import LoginComponent from './components/Login/LoginComponent';
import HomeComponent from './components/HomeComponent';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      login(token);
      navigate("/home"); // Redirect to home after saving the token
    }
  }, [login, navigate]);

  return (
    <div className="app-container">
      <HeaderComponent></HeaderComponent>
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<MainComponent />} /> {/* Landing page */}
          <Route path="/login" element={<LoginComponent />} /> {/* Login */}
          <Route path="/home" element={
            <PrivateRoute>
              <HomeComponent />
            </PrivateRoute>
          } /> {/* Protected route */}
        </Routes>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;