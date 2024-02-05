import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./routes/Profile";
import DeleteAccount from "./routes/DeleteAccount";
import ProtectedRoute from "./routes/ProtectedRoute";
import Logout from "./routes/Logout";
import "./global.scss";
import Layout from "./components/layout/Layout";
import Aside from "./components/layout/Aside";
import Main from "./routes/Main";
import PostDetailRoute from "./routes/PostDetailRoute";
import PostWroteRoute from "./routes/PostWroteRoute";
import Join from "./routes/Join";
import PostWriteRoute from "./routes/PostWriteRoute";
import NoteList from "./components/note/NoteList";
import NoteWrite from "./components/note/NoteWrite";
import PostCorrectRoute from "./routes/PostCorrectRoute";
import FindUserId from "./routes/findAccount/FindUserId";
import FindUserPw from "./routes/findAccount/FindUserPw";
import NoteDetail from "./components/note/NoteDetail";
import TokenRefresher from "./TokenRefresher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Aside />
            <Main />
          </>
        ),
      },
      {
        path: "/postDetail/:id",
        element: (
          <>
            <Aside />
            <PostDetailRoute />
          </>
        ),
      },
      {
        path: "/postWrote/:id",
        element: (
          <>
            <Aside />
            <PostWroteRoute />
          </>
        ),
      },
      {
        path: "/postWrite",
        element: (
          <ProtectedRoute>
            <Aside />
            <PostWriteRoute />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postCorrect/:id",
        element: (
          <>
            <Aside />
            <PostCorrectRoute />
          </>
        ),
      },
      {
        path: "/profile",
        element: (
          <>
            <Aside />
            <PostWroteRoute />
          </>
        ),
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/deleteAccount/:id",
        element: <DeleteAccount />,
      },
      {
        path: "/join",
        element: <Join />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/findid",
        element: <FindUserId />,
      },
      {
        path: "/findpw",
        element: <FindUserPw />,
      },
      {
        path: "/noteList/:id",
        element: (
          <ProtectedRoute>
            <Aside />
            <NoteList />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/noteWrite/:id",
    element: <NoteWrite />,
  },
  {
    path: "/noteDetail/:id",
    element: <NoteDetail />,
  },
]);

function App() {
  return <>
    <RouterProvider router={router} />
    <TokenRefresher />
  </>;
}

export default App;
