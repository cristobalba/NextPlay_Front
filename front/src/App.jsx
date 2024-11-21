import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <h1>NextPlay.</h1>
      {/* {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <div>
          <h2>Welcome, {user?.name}</h2>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Logout
          </button>
        </div>
      )} */}
      <button
        type="submit"
        className="submit-button"
        onClick={() => navigate('gameform')}
        style={{ color: 'white' }}
      >
        Ingresar
      </button>
    </>
  )
}

export default App
