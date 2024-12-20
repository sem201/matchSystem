import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Mainpage from "./page/MainPage";
import MobileMainpage from "./page/Mobile-Mainpage";
import DraftModal2 from "./components/Mobile/chooseUser/DraftModal2";
import ProfilePage from "./page/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/main", element: <Mainpage /> },
  { path: "/test", element: <MobileMainpage /> },
  { path: "/draftmodal2", element: <DraftModal2 /> },
  { path: "/ProfilePage", element: <ProfilePage /> },
]);

export default router;
