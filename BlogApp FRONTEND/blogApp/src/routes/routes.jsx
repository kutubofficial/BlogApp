import { createBrowserRouter } from "react-router-dom";
import Registration from "../login/Registration";
import Login from "../login/Login";
import Layout from "../layout/Layout";
import Dashboard from "../components/Dashboard";
import ViewSingleBlog from "../components/pages/ViewSingleBlog";
import EditBlog from "../components/pages/EditBlog";
import Profile from ".././components/pages/profile/Profile";

export let myRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/blog/:id",
        element: <ViewSingleBlog />,
      },
      {
        path: "/edit/:id",
        element: <EditBlog />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
    ],
  },
]);
