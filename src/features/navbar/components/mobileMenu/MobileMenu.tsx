import { FC } from "react";
import useTranslate from "@/shared/hooks/translations/Translate";
import "./MobileMenu.scss";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import Button from "@/shared/components/button/Button";

interface Props {
  isOpen: boolean;
  isAdmin: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConfirm?: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: FC<Props> = ({
  isOpen,
  setIsOpen,
  isAdmin = false,
  setConfirm,
}) => {
  const { translate } = useTranslate();
  const variants = {
    initial: {
      x: -200,
      opacity: 0,
    },
    animateIn: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.5,
      },
    },
    animateOut: {
      x: -200,
      opacity: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.5,
      },
    },
  };

  const links = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const link = {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate={"animateIn"}
      exit={"animateOut"}
      variants={variants}
      className="mobile"
    >
      <motion.div className="wrapper-mobile">
        <motion.ul
          className="link-list-mobile"
          variants={links}
          initial="hidden"
          animate="show"
        >
          {isAdmin ? (
            <>
              <motion.li variants={link}>
                <Link to="/admin/orders" onClick={() => setIsOpen(false)}>
                  {translate("reservations_admin")}
                </Link>
              </motion.li>
              <motion.li variants={link}>
                <Link to="/admin/vehicles" onClick={() => setIsOpen(false)}>
                  {translate("vehicles")}
                </Link>
              </motion.li>
              <motion.li variants={link}>
                <Button
                  properties={{
                    type: "logout",
                    onClickfn: () => {
                      if (setConfirm) setConfirm(true);
                    },
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
              </motion.li>
            </>
          ) : (
            <>
              <motion.li variants={link}>
                <NavLink to="/#home" onClick={() => setIsOpen(!isOpen)}>
                  {translate("home")}
                </NavLink>
              </motion.li>
              <motion.li variants={link}>
                <NavLink to="/#booking" onClick={() => setIsOpen(!isOpen)}>
                  {translate("reservations")}
                </NavLink>
              </motion.li>
              <motion.li variants={link}>
                <NavLink to="/#aboutUs" onClick={() => setIsOpen(!isOpen)}>
                  {translate("aboutUs")}
                </NavLink>
              </motion.li>
              <motion.li variants={link}>
                <NavLink to="/#contact" onClick={() => setIsOpen(!isOpen)}>
                  {translate("contactUs")}
                </NavLink>
              </motion.li>
            </>
          )}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
