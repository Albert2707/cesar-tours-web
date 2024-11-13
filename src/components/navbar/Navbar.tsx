import { useState } from "react";
import { useIdiom } from "../../context/idiomContext";
import { IdiomTypes } from "../../context/idiomTypes";
import useTranslate from "../../hooks/Translate";
import MobileMenu from "./components/mobileMenu/MobileMenu";
import "./Navbar.scss";
import { AnimatePresence } from "framer-motion";
import Select from "react-select";

const Navbar = () => {
  const { setLanguage, idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const options = [
    { value: "es", label: translate("Spanish"), labelOnSelect: "es" },
    { value: "en", label: translate("English"), labelOnSelect: "us" },
  ];
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
              <a href="#home">{translate("home")}</a>
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
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }) ,
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
            {/* <li className="whatsapp">
              <a
                href="https://wa.me/+18492587373?text=Hola,%20%C2%BFc%C3%B3mo%20est%C3%A1s%3F"
                target="_blank"
              >
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <title>WhatsApp</title>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
            </li> */}
          </ul>
          <div className="mobile-menu">
            <button arial-label="menu-button" onClick={toggleMenu}>
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
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
