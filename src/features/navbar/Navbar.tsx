import { useState } from "react";
import MobileMenu from "./components/mobileMenu/MobileMenu";
import "./Navbar.scss";
import { AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import useTranslate from "../../shared/hooks/translations/Translate";
import SelectIdiom from "../../shared/components/selectIdiom/SelectIdiom";

const Navbar = () => {
  const { translate } = useTranslate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


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
              <SelectIdiom/>
            </li>
          </ul>
          <div className="mobile-menu">
          <SelectIdiom/>

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
