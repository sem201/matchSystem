import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";

const router = createBrowserRouter([{ path: "/", element: <LoginPage /> }]);

export default router;
