import { Outlet } from "react-router-dom";
import NavbarAdmin from "./components/NavbarAdmin";
import "./AdminLayout.scss";
import { AuthTypes } from "@/context/authTypes";
import Footer from "@/features/footer/Footer";
import useTranslate from "@hooks/translations/Translate";
import { useAuth } from "@hooks/auth/useAuth";
const AdminLayout = () => {
  const { currentUser } = useAuth() as AuthTypes;
  const { translate } = useTranslate();

  return (
    <div id="admin_main">
      <NavbarAdmin />
      <div className="container">
        <div className="wrapper-layout">
          <h3>
            {translate("welcome")}, {currentUser.name} 👋
          </h3>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
