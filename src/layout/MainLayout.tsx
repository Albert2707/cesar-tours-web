import { lazy } from "react";
import { Outlet} from "react-router-dom";
const Navbar = lazy(() => import("@/features/navbar/Navbar"));
const Footer = lazy(() => import("@/features/footer/Footer"));
const MainLayout = () => {
  return (
    <div id="main">
      <Navbar />
      <main className="main-layout">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
