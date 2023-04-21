import Topbar from "../Topbar/Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

export default Layout;
