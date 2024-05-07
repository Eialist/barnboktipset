import "./App.css";
import RegisterPage from "./pages/Register/RegisterPage";
import FrontLoginPage from "./pages/Frontpage/FrontLoginPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./pages/Userpage/UserPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";

const routes = [
  {
    path: "/",
    element: <FrontLoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/welcome",
    element: <WelcomePage />,
  },
];

function App() {
  return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
