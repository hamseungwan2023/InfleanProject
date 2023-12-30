import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./routes/join";
import Login from "./routes/login";
import Profile from "./profile/Profile";
import DeleteAccount from "./routes/DeleteAccount";

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
    path: "/deleteAccount",
    element: <DeleteAccount />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
