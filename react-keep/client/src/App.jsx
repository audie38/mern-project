import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./components/layout/Root";
import Error from "./pages/Error";

import Note from "./pages/note/Note";
import NoteAddEdit from "./pages/note/NoteAddEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        index: true,
        element: <Note />,
      },
      {
        path: "/note",
        element: <NoteAddEdit />,
      },
      {
        path: "/note/:id",
        element: <NoteAddEdit />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
