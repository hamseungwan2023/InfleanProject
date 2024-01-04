import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./routes/Join";
import Profile from "./routes/Profile";
import DeleteAccount from "./routes/DeleteAccount";
import Logout from "./routes/Logout";
import "./global.scss";
import Layout from "./components/layout/Layout";
import Aside from "./components/layout/Aside";
import Main from "./routes/Main";
import PostDetailRoute from "./routes/PostDetailRoute";
import PostWroteRoute from "./routes/PostWroteRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <>
          <Aside />
          <Main />
        </>
      },
      {
        path: "/postDetail/:id",
        element: <>
          <Aside />
          <PostDetailRoute />
        </>
      },
      {
        path: "/postWrote/:id",
        element: <>
          <Aside />
          <PostWroteRoute />
        </>
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/deleteAccount",
        element: <DeleteAccount />
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
