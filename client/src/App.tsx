import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./routes/join";
import Login from "./routes/login";
import Logout from "./routes/logout";

const router = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
