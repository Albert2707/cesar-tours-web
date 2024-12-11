import { lazy } from "react";
import { Outlet, ScrollRestoration} from "react-router-dom";
const Navbar = lazy(() => import("../features/navbar/Navbar"));
const Footer = lazy(() => import("../features/footer/Footer"));
const MainLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
    {/* <ScrollRestoration/> */}
      <Navbar />
      <ScrollRestoration/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
