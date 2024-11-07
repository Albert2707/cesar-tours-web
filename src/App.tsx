import AboutUs from "./components/aboutUs/AboutUs";
import Booking from "./components/booking/Booking";
import Experience from "./components/experience/Experience";
import HeroSection from "./components/heroSection/HeroSection";
import Navbar from "./components/navbar/Navbar";
import Reviews from "./components/reviews/Reviews";
function App() {
  // const{setLanguage} = useIdiom() as   IdiomTypes;
  // setLanguage("en")
  // const {translate} = useTranslate();
  return (
    <>
      <Navbar />
      <HeroSection />
      <Reviews />
      <Booking />
      <Experience />
      <AboutUs/>
    </>
  );
}

export default App;
