import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./routes/join";
import Login from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
