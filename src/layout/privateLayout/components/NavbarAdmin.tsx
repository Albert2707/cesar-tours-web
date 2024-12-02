import { NavLink, useNavigate } from 'react-router-dom';
import { useIdiom } from '../../../context/idiomContext';
import { IdiomTypes } from '../../../context/idiomTypes';
import useTranslate from '../../../shared/hooks/translations/Translate';
import './NavbarAdmin.scss'
import Select from "react-select";
import Button from '../../../shared/components/button/Button';
import ConfirmPopup from '../../../shared/components/confirmPopup/ConfirmPopup';
import { AuthTypes } from '../../../context/authTypes';
import { useAuth } from '../../../context/authContext';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const NavbarAdmin = () => {
  const { translate } = useTranslate();
  const { setLanguage, idiom } = useIdiom() as IdiomTypes;
  const { logout } = useAuth() as AuthTypes;
  const [confirm, setConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const options = [
    { value: "es", label: translate("Spanish"), labelOnSelect: "es" },
    { value: "en", label: translate("English"), labelOnSelect: "us" },
  ];
  const handleLogout = () => {
    logout();
    navigate("/login")
  }
  return (
    <nav className="admin-nav">
      {/* Mobile menu  */}
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
              <NavLink to="/admin/orders" className={({ isActive }) =>
                isActive ? "link-active" :"link" 
              }>{translate("Orders")}</NavLink>
            </li>
            <li>
              <a href="/vehicles">{translate("Vehicles")}</a>
            </li>
            <li>
              <Select
                options={options}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    borderRadius: "50px",
                    height: "40px",
                    display: "flex",
                    width: "100px",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "12px",
                    borderColor: "gray",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#f2f2f2",
                    },
                  }),
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: "10px",
                    fontSize: "12px",
                    backgroundColor: "#f2f2f2",
                    fontWeight: 600,
                    // zIndex: 9999, // Asegura que el menú esté al frente
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isFocused
                      ? "rgba(242, 75, 15, 0.1)"
                      : "transparent",
                    color: state.isFocused ? "orange" : "inherit",
                    "&:active": {
                      backgroundColor: "rgba(242, 75, 15, 0.1)",
                    },
                  }),
                  indicatorSeparator: (styles) => ({
                    ...styles,
                    display: "none",
                  }),
                  dropdownIndicator: (styles) => ({
                    ...styles,
                    display: "none",
                  }),
                  valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    padding: "0",
                    margin: "0 8px",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    margin: "0",
                    color: "#f2f2f2",
                    paddingLeft: "0",
                  }),
                }}
                formatOptionLabel={(option) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      justifyContent: "center",
                    }}
                  >
                    <span>{option.label}</span>
                  </div>
                )}
                placeholder={translate("travelType")}
                isSearchable={false}
                value={options.find((option) => option.value === idiom)}
                closeMenuOnScroll={true}
                menuPortalTarget={document.body}
                menuPlacement="auto"
                menuPosition="fixed"
                onChange={(e) => setLanguage(e?.value as "es" | "en")}
              />
            </li>
            <li>
              <Button properties={{type: "logout", onClickfn: () => setConfirm(true) }} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Logout
              </Button>
            </li>
          </ul>
        </div>
        <AnimatePresence>

          {confirm &&

            <ConfirmPopup title="Cierre de sesion" subTitle='Ya no tendrás acceso a funciones privadas del sistema ¿Seguro que deseas continuar? ' onConfirm={handleLogout} onCancel={() => setConfirm(false)} />
          }
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default NavbarAdmin