import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import { fetchNotesData, fetchNoteDataById } from "./store/note/noteActions";

import Root from "./components/layout/Root";
import Private from "./components/layout/Private";
import Public from "./components/layout/Public";

const Error = lazy(() => import("./pages/Error"));
const Note = lazy(() => import("./pages/note/Note"));
const NoteAddEdit = lazy(() => import("./pages/note/NoteAddEdit"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

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
              <Suspense fallback={<p className="text-center">Loading...</p>}>
                <Note />
              </Suspense>
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
              <Suspense>
                <NoteAddEdit />
              </Suspense>
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
    if (refresh) {
      dispatch(fetchNotesData());
    }
  }, [dispatch, refresh]);

  return <RouterProvider router={router} />;
}
