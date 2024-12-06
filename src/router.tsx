import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Mainpage from "./page/MainPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/main", element: <Mainpage /> },
]);

export default router;
