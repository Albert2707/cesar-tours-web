import { FC } from 'react';
import { useIdiom } from '../../../../context/idiomContext';
import { IdiomTypes } from '../../../../context/idiomTypes';
import useTranslate from '../../../../hooks/Translate';
import "./MobileMenu.scss";
import { motion } from "framer-motion";
import Select from "react-select";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: FC<Props> = ({ isOpen, setIsOpen }) => {
    const { setLanguage, idiom } = useIdiom() as IdiomTypes;
    const { translate } = useTranslate();
    const options = [
        { value: "es", label: translate("Spanish"), image: "./public/images/espana-1.webp", labelOnSelect: "es" },
        { value: "en", label: translate("English"), image: "./public/images/estados-unidos-de-america_1_.webp", labelOnSelect: "us" },
      ];
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
        <motion.div initial="initial" animate={"animateIn"} exit={"animateOut"} variants={variants} className="mobile">
            <motion.div className="wrapper-mobile">
                <motion.ul className="link-list-mobile" variants={links} initial="hidden" animate="show">
                    <motion.li variants={link}>
                        <a href="#home" onClick={() => setIsOpen(!isOpen)}>{translate("home")}</a>
                    </motion.li>
                    <motion.li variants={link}>
                        <a href="#booking" onClick={() => setIsOpen(!isOpen)}>{translate("reservations")}</a>
                    </motion.li>
                    <motion.li variants={link}>
                        <a href="#aboutUs" onClick={() => setIsOpen(!isOpen)}>{translate("aboutUs")}</a>
                    </motion.li>
                    <motion.li variants={link}>
                        <a href="#contact" onClick={() => setIsOpen(!isOpen)}>{translate("contactUs")}</a>
                    </motion.li>
                    <motion.li variants={link}>
                    <Select
                options={options}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    borderRadius: "10px",
                    height: "45px",
                    display: "flex",
                    width:"150px",
                    color:"#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    borderColor: "gray",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "none",
                    },
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    borderRadius: "10px",
                    fontSize: "14px",
                    backgroundColor: "#f2f2f2",
                    fontWeight: 600,
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    textAlign:"center",
                    backgroundColor: state.isFocused ? "rgba(242, 75, 15, 0.1)" : "transparent",
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
                    paddingLeft: "0",
                    textAlign:"center",
                    color:"#f2f2f2",
                    fontWeight:600
                  }),
                }}
                formatOptionLabel={(option) => (
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    {option.image && <img src={option.image} alt="" style={{ width: "30px", height: "30px" }} />}
                    <span>
                      {/* {context === "menu" ? option.label : option.labelOnSelect} */}
                      {option.label}
                    </span>
                  </div>)}
                placeholder={translate("travelType")}
                isSearchable={false}
                value={options.find((option) => option.value === idiom)}
                closeMenuOnScroll={true}
                onChange={(e) => setLanguage(e?.value as "es" | "en")}
              />
                    </motion.li>
                </motion.ul>
            </motion.div>
        </motion.div>
    );
};

export default MobileMenu;
