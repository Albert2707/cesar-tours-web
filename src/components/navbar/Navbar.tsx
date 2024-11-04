import { useIdiom } from "../../context/idiomContext";
import { IdiomTypes } from "../../context/idiomTypes";
import useTranslate from "../../hooks/Translate";
import "./Navbar.scss";
const Navbar = () => {
  const { setLanguage, idiom } = useIdiom() as IdiomTypes;
  const { translate } = useTranslate();
  return (
    <nav className="nav">
      <div className="wrapper">
        <div className="logo">
          <img
            src="images/Cesar-logo.webp"
            alt="Cesar-tours-logo"
            loading="lazy"
          />
        </div>

        <div className="links">
          <ul className="link-list">
            <li>
              <a href="#">{translate("home")}</a>
            </li>
            <li>
              <a href="#">{translate("reservations")}</a>
            </li>
            <li>
              <a href="#">{translate("services")}</a>
            </li>
            <li>
              <a href="#">{translate("contactUs")}</a>
            </li>
            <li>
              <select
                name=""
                value={idiom}
                id=""
                onChange={(e) => setLanguage(e.target.value as "es" | "en")}
              >
                <option value="es">🇩🇴ES</option>
                <option value="en">🇺🇸EN</option>
              </select>
            </li>
          </ul>
          <div className="mobile-menu">
            <button>
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
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
