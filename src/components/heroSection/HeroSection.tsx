import useTranslate from "../../hooks/Translate";
import "./HeroSection.scss";
const HeroSection = () => {
  const { translate } = useTranslate();
  return (
    <section className="hero-section">
      <div className="wrapper">
        <h3>{translate("yourDestinationIsOurDestination")} </h3>
        <h1>{translate("cesarDestination")}</h1>
        <p>{translate("travelFastAndSafe")}</p>
        <a href="#">{translate("bookNow")}</a>
      </div>
    </section>
  );
};

export default HeroSection;
