import { AuthContext } from './Auth/AuthContext';
import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HeaderComponent from './components/Fijos/HeaderComponent';
import FooterComponent from './components/Fijos/FooterComponent';
import LandingPage from './components/LandingPage';
import HomeComponent from './components/HomeComponent';
import PrivateRoute from './components/PrivateRoute';
import UserInfoComponent from './components/UserInfoComponent';
import HomeRoutines from './components/Routines/HomeRoutines';

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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <HeaderComponent></HeaderComponent>
      <main className="flex-grow p-8 bg-gradient-to-b from-red-800 via-gray-900 to-black text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} /> {/* Landing page */}
          <Route path="/home" element={
            <PrivateRoute>
              <HomeComponent />
            </PrivateRoute>
          } />
          <Route path="/userInfo" element={
            <PrivateRoute>
              <UserInfoComponent />
            </PrivateRoute>
          } />
          <Route path='/routines' element={
            <PrivateRoute>
              <HomeRoutines />
            </PrivateRoute>
          } />
        </Routes>
      </main>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;