import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import AddTask from "../pages/AddTask.tsx";
import Tasks from "../pages/Tasks.tsx";
import ErrorBoundary from "../components/ErrorBoundary.tsx";
import PageNotFound from "../components/PageNotFound.tsx";
import SignUp from "../pages/SignUp.tsx";

export default function Router() {
  const routingArr = createBrowserRouter([
    {
      path: "/",
      element: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "/",
              element: <AddTask />,
            },
            {
              path: "Tasks/:id?",
              element: <Tasks />,
            },
          ],
        },
        {
          path: "/SignUp",
          element: <SignUp />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider
      router={routingArr}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}
