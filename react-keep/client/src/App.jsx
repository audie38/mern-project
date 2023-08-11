import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchNotesData, fetchNoteDataById } from "./store/note/noteActions";

import Root from "./components/layout/Root";
import Private from "./components/layout/Private";
import Public from "./components/layout/Public";
import Error from "./pages/Error";

import Note from "./pages/note/Note";
import NoteAddEdit from "./pages/note/NoteAddEdit";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

let initStart = true;

export default function App() {
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.note.isNeedRefresh);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          index: true,
          element: (
            <Private>
              <Note />
            </Private>
          ),
        },
        {
          path: "/note",
          element: (
            <Private>
              <NoteAddEdit />
            </Private>
          ),
        },
        {
          path: "/note/:id",
          element: (
            <Private>
              <NoteAddEdit />
            </Private>
          ),
          loader: async ({ params }) => {
            return await dispatch(fetchNoteDataById(params.id));
          },
        },
        {
          path: "/login",
          element: (
            <Public>
              <Login />
            </Public>
          ),
        },
        {
          path: "/register",
          element: (
            <Public>
              <Register />
            </Public>
          ),
        },
      ],
    },
  ]);

  useEffect(() => {
    if (initStart || refresh) {
      dispatch(fetchNotesData());
    }
    initStart = false;
  }, [dispatch, refresh]);

  return <RouterProvider router={router} />;
}
