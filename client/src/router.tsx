import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Mainpage from "./page/MainPage";
import MobileMainpage from "./page/Mobile-Mainpage";
import Mainpagetest from "./page/MainPageTest";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/main", element: <Mainpage /> },
  { path: "/maintest", element: <Mainpagetest /> },
  { path: "/test", element: <MobileMainpage /> },
]);

export default router;
