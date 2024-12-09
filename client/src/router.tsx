import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Mainpage from "./page/MainPage";
import MobileMainpage from "./page/Mobile-Mainpage";
import Mainpagetest from "./page/MainPageTest";
import Account from "./components/Login/Account";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/kakao/login", element: <Account /> },
  { path: "/main", element: <Mainpage /> },
  { path: "/maintest", element: <Mainpagetest /> },
  { path: "/test", element: <MobileMainpage /> },
]);

export default router;
