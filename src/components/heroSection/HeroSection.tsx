import { useRef } from "react";
import useTranslate from "../../hooks/translations/Translate";
import "./HeroSection.scss";
import { useScroll, useTransform, motion } from "framer-motion";
const HeroSection = () => {
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const { translate } = useTranslate();
  return (
    <section className="hero-section" id="home">
      <motion.div className="wrapper" ref={wrapperRef} style={{ y }}>
        <h3>{translate("yourDestinationIsOurDestination")} </h3>
        <h1>{translate("cesarDestination")}</h1>
        <p>{translate("travelFastAndSafe")}</p>
        <a href="#booking">{translate("bookNow")}</a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
