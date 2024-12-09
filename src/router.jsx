import {
    createBrowserRouter,
  } from "react-router-dom";
import App from './App.jsx';
import GameForm from './Views/GameForm';
import Chat from './Views/Chat';
import History from './Views/History.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/gameform",
    element: <GameForm />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/recommendations",
    element: <History />,
  },
]);

export default router;