import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectRoute from "../components/auth/ProtectedRoute";
import Spinner from "../utills/Spinner";
const Login = lazy(() => import("../components/auth/Login"));
const Home = lazy(() => import("../Pages/Home"));
const PostDetail = lazy(() => import("../Pages/PostDetail"));
const AddEditForm = lazy(() => import("../Pages/AddEditForm"));
const NotFound = lazy(() => import("../utills/NotFound"));

export const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectRoute>
        <Suspense fallback={<Spinner />}>
          <Home />
        </Suspense>
      </ProtectRoute>
    ),
  },
  {
    path: "post/:id",
    element: (
      <Suspense fallback={<Spinner />}>
        <PostDetail />
      </Suspense>
    ),
  },

  {
    path: "/post/add",
    element: (
      <Suspense fallback={<Spinner />}>
        <AddEditForm />
      </Suspense>
    ),
  },

  {
    path: "/post/edit/:id",
    element: (
      <Suspense fallback={<Spinner />}>
        <AddEditForm />
      </Suspense>
    ),
  },

  {
    path: "*",
    element: (
      <Suspense fallback={<Spinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
