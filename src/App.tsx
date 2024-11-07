import { useEffect } from "react";
import AboutUs from "./components/aboutUs/AboutUs";
import Booking from "./components/booking/Booking";
import Contact from "./components/contact/Contact";
import Experience from "./components/experience/Experience";
import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./components/navbar/Navbar";
import Reviews from "./components/reviews/Reviews";
import Footer from "./components/footer/Footer";
function App() {
  // const{setLanguage} = useIdiom() as   IdiomTypes;
  // setLanguage("en")
  // const {translate} = useTranslate();
  useEffect(() => {
    const { hash } = window.location;
    if (hash) history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <Reviews />
      <Booking />
      <Experience />
      <AboutUs />
      {/* <Contact /> */}
      <Footer />
    </>
  );
}

export default App;
