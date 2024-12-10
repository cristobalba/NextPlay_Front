import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import useAuthToken from './Auth/useAuthToken';
import axios from 'axios';
import Navbar from './Components/Navbar';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, getIdTokenClaims, isLoading } = useAuth0();
  const navigate = useNavigate();
  const { token, error, fetchToken } = useAuthToken();

  const checkNewUser = async () => {

    const claims = await getIdTokenClaims();
    const isNewUser = claims[import.meta.env.VITE_NAMESPACE]
    try {
      if (isNewUser && token) {
        await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const getTokenAndCheckUser = async () => {
        await fetchToken();
        checkNewUser();
      };

      getTokenAndCheckUser();
    }
  }, [isAuthenticated, fetchToken]);

  if (isLoading) {
    return <div><h2 style={{ color: 'white' }}>Cargando ...</h2></div>;
  }

  return (
    <>
      <Navbar />

      <div className="body-container">
        {!isAuthenticated ? (
          <>
            <div className='space'></div>
            <div className="row">
              <h1 style={{ color: 'white' }}>NextPlay</h1>
            </div>
            <div className="row">
              <button
                type="submit"
                className="submit-button"
                style={{ color: 'black' }}
                onClick={() => loginWithRedirect()}
              >
                Ingresar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='space'></div>
            <div className="row">
              <h1 style={{ color: 'white' }}>Bienvenido {user?.nickname}</h1>
            </div>
            <div className="row">
              <button
                type="submit"
                className="submit-button"
                onClick={() => navigate('gameform')}
              >
                Recomiéndame juegos
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
