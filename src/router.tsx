import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./page/Desktop-MainPage";

const router = createBrowserRouter([{ path: "/main", element: <MainPage /> }]);

export default router;
