import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";
import router from './router';

createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN} // Desde las variables de entorno
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID} // Desde las variables de entorno
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: import.meta.env.VITE_AUTH0_SCOPE
    }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>,
)
