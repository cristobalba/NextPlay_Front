import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthToken from './Auth/useAuthToken';
import axios from 'axios';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, getIdTokenClaims } = useAuth0();
  const navigate = useNavigate();
  const { token, error, fetchToken } = useAuthToken();

  const checkNewUser = async () => {

    const claims = await getIdTokenClaims();
    const isNewUser = claims[import.meta.env.VITE_NAMESPACE]
    if (isNewUser && token) {
      await axios.post(`${import.meta.env.VITE_API_URL}/user/register`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  return (
    <>
      <div className="header-container">
        {isAuthenticated && (
          <button
            type="submit"
            className="logout-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
        )}
      </div>

      <div className="body-container">
        {!isAuthenticated ? (
          <>
            <div className="row">
              <h1>NextPlay.</h1>
            </div>
            <div className="row">
              <button
                type="submit"
                className="submit-button"
                onClick={() => loginWithRedirect()}
              >
                Ingresar
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="row">
              <h1>NextPlay.</h1>
            </div>
            <div className="row">
              <h2>Welcome {user?.nickname}</h2>
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
