import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./routes/Join";
import Profile from "./routes/Profile";
import DeleteAccount from "./routes/DeleteAccount";
import Logout from "./routes/Logout";
import "./global.scss";
import Home from "./routes/Home";
import Layout from "./components/layout/Layout";
import Aside from "./components/layout/Aside";
import ProtectedRoute from "./components/ProtectedRoute";
import TestUserHome from "./redux/TestUserHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <div className="layout">
            <Aside />
            <Home />
          </div>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/deleteAccount",
        element: <DeleteAccount />,
      },
      {
        path: "/logout",

        element: <Logout />,
      },
      {
        path: "/test",
        element: <TestUserHome />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
