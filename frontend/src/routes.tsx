import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import GameDetailPage from "./pages/GameDetailPage";
import RegistrationPage from "./pages/AuthenticationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
      { path: "auth", element: <RegistrationPage /> },
    ],
  },
]);

export default router;
