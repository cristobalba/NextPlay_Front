import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";
import App from './App.jsx';
import Chat from './Views/Chat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN} // Desde las variables de entorno
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} // Desde las variables de entorno
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>,
)
