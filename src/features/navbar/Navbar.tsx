import { useState } from "react";
import { useIdiom } from "../../context/idiomContext";
import { IdiomTypes } from "../../context/idiomTypes";
import MobileMenu from "./components/mobileMenu/MobileMenu";
import "./Navbar.scss";
import { AnimatePresence } from "framer-motion";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import useTranslate from "../../shared/hooks/translations/Translate";

const Navbar = () => {
  const { setLanguage, idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: "es", label: translate("Spanish"), labelOnSelect: "es" },
    { value: "en", label: translate("English"), labelOnSelect: "us" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
const formatLabel = (option:any) => (
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
)

  return (
    <nav className="nav">
      {/* Mobile menu  */}
      <AnimatePresence>
        {isOpen && <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
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
              src="images/Cesar-logo.webp"
              alt="Cesar-tours-logo"
              loading="lazy"
            />
          </button>
        </div>

        <div className="links">
          <ul className="link-list">
            <li>
              <NavLink to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{translate("home")}</NavLink>
            </li>
            <li>
              <a href="#booking">{translate("reservations")}</a>
            </li>
            <li>
              <a href="#aboutUs">{translate("aboutUs")}</a>
            </li>
            <li>
              <a href="#contact">{translate("contactUs")}</a>
            </li>
            <li>
              <Select
                options={options}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    borderRadius: "10px",
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
                formatOptionLabel={formatLabel}
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
          </ul>
          <div className="mobile-menu">
            <Select
              options={options}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  height: "40px",
                  display: "flex",
                  width: "100px",
                  justifyContent: "center",
                  transition: "all 0.3s ease-in-out",
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
              formatOptionLabel={formatLabel}
              placeholder={translate("travelType")}
              isSearchable={false}
              value={options.find((option) => option.value === idiom)}
              closeMenuOnScroll={true}
              menuPortalTarget={document.body}
              menuPlacement="auto"
              menuPosition="fixed"
              onChange={(e) => setLanguage(e?.value as "es" | "en")}
            />
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-equal"><line x1="5" x2="19" y1="9" y2="9" /><line x1="5" x2="19" y1="15" y2="15" /></svg>

              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
