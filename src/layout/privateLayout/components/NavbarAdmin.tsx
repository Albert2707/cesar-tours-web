import { NavLink, useNavigate } from "react-router-dom";
import useTranslate from "@/shared/hooks/translations/Translate";
import "./NavbarAdmin.scss";
import Button from "@/shared/components/button/Button";
import ConfirmPopup from "@/shared/components/confirmPopup/ConfirmPopup";
import { AuthTypes } from "@/context/authTypes";
import { useAuth } from "@/context/authContext";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import SelectIdiom from "@/shared/components/selectIdiom/SelectIdiom";
import MobileMenu from "@/features/navbar/components/mobileMenu/MobileMenu";

const NavbarAdmin = () => {
  const { translate } = useTranslate();
  const { logout } = useAuth() as AuthTypes;
  const [confirm, setConfirm] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="admin-nav">
      {/* Mobile menu  */}
      <AnimatePresence>
        {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} isAdmin={true} setConfirm={setConfirm} />}
      </AnimatePresence>
      <div className="wrapper">
        <div className="logo">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="scroll-to-top-button"
          >
            <img
              src="/images/Cesar-logo.webp"
              alt="Cesar-tours-logo"
              loading="lazy"
            />
          </button>
        </div>

        <div className="links">
          <ul className="link-list">
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
              >
                {translate("reservations_admin")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/vehicles"
                className={({ isActive }) =>
                  isActive ? "link-active" : "link"
                }
              >
                {translate("vehicles")}
              </NavLink>
            </li>
            <li>
              <SelectIdiom />
            </li>
            <li>
              <Button
                properties={{
                  type: "logout",
                  onClickfn: () => setConfirm(true),
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
                Logout
              </Button>
            </li>
          </ul>
          <div className="mobile-menu">
            <SelectIdiom />

            <button aria-label="menu-button" onClick={toggleMenu}>
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-equal"
                >
                  <line x1="5" x2="19" y1="9" y2="9" />
                  <line x1="5" x2="19" y1="15" y2="15" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {confirm && (
            <ConfirmPopup
              title="Cierre de sesion"
              subTitle="Ya no tendrás acceso a funciones privadas del sistema ¿Seguro que deseas continuar? "
              onConfirm={handleLogout}
              onCancel={() => setConfirm(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
