import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../layouts/HomeLayout";
import Profile from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
]);
