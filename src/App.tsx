import { lazy, useEffect } from "react";
const HeroSection = lazy(() => import("./components/heroSection/HeroSection"))
const Booking = lazy(() => import("./components/booking/Booking"))
const Experience = lazy(() => import("./components/experience/Experience"))
const Reviews = lazy(() => import("./components/reviews/Reviews"))
const Navbar = lazy(() => import("./components/navbar/Navbar"))
const AboutUs = lazy(() => import("./components/aboutUs/AboutUs"))
const Contact = lazy(() => import("./components/contact/Contact"))
const Footer = lazy(() => import("./components/footer/Footer"))

function App() {

  useEffect(() => {
    const { hash } = window.location;
    if (hash) history.replaceState(null, "", window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <HeroSection/>
      <Reviews/>
      <Booking />
      <Experience/>
      <AboutUs/>
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;
