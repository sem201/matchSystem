import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/Mobile-LoginPage";
import Mainpage from "./page/Mobile-Mainpage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/main", element: <Mainpage /> },
]);

export default router;
