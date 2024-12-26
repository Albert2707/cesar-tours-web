import { useEffect, useRef } from "react";
import useTranslate from "@/shared/hooks/translations/Translate";
import "./HeroSection.scss";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavlinksStore } from "@hooks/navlinks/useNavlinksStore";
const HeroSection = () => {
  const wrapperRef = useRef(null);
  const heroRef = useRef(null);  
  const { setNavlink, navlink } = useNavlinksStore();
  const view = useInView(heroRef, {
    amount: "all",
  });
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const { translate } = useTranslate();
    useEffect(() => {
      if (view) {
        setNavlink({...navlink, home: true })
      } else {
        setNavlink({ ...navlink, home: false })
      }
    }, [view])
  return (
    <div className="hero-section" id="home" ref={heroRef}>
      <div className="container">
        <motion.div
          className="wrapper"
          ref={wrapperRef}
          style={{ y }}
        >
          <h3>{translate("yourDestinationIsOurDestination")} </h3>
          <h1>{translate("cesarDestination")}</h1>
          <p>{translate("travelFastAndSafe")}</p>
          <Link to="/#booking">{translate("bookNow")}</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
