import { FC } from "react";
import useTranslate from "../../../../shared/hooks/translations/Translate";
import "./MobileMenu.scss";
import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
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
          <motion.li variants={link}>
            <a href="#home" onClick={() => setIsOpen(!isOpen)}>
              {translate("home")}
            </a>
          </motion.li>
          <motion.li variants={link}>
            <a href="#booking" onClick={() => setIsOpen(!isOpen)}>
              {translate("reservations")}
            </a>
          </motion.li>
          <motion.li variants={link}>
            <a href="#aboutUs" onClick={() => setIsOpen(!isOpen)}>
              {translate("aboutUs")}
            </a>
          </motion.li>
          <motion.li variants={link}>
            <a href="#contact" onClick={() => setIsOpen(!isOpen)}>
              {translate("contactUs")}
            </a>
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default MobileMenu;
