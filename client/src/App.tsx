import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Join from './routes/join';

const router = createBrowserRouter([
  {
    path: "/join",
    element: <Join />
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;