import './App.css'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();


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
      <button className="btn btn-primary">
        <Link to={`chat`}> Ingresar </Link>
      </button>
      {/* <div>
        <Outlet />
      </div> */}
    </>
  )
}

export default App
