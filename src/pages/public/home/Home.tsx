import React from "react";
import { SEO } from "../../../shared/components/seo/SEO";

const HeroSection = React.lazy(
  () => import("../../../features/heroSection/HeroSection")
);
const Reviews = React.lazy(() => import("../../../features/reviews/Reviews"));
const Booking = React.lazy(() => import("../../../features/booking/Booking"));
const Experience = React.lazy(
  () => import("../../../features/experience/Experience")
);
const AboutUs = React.lazy(() => import("../../../features/aboutUs/AboutUs"));
const Contact = React.lazy(() => import("../../../features/contact/Contact"));
const Footer = React.lazy(() => import("../../../features/footer/Footer"));
const WhatsApp = React.lazy(
  () => import("../../../shared/components/whatsApp/WhatsApp")
);

const Home = () => {
  return (
    <>
      <SEO
        title="Cesar Tour "
        description="Transportation around Dominican Republic"
        name="Cesar Tour"
        type="web"
      />
      <WhatsApp />
      <HeroSection />
      <Reviews />
      <Booking />
      <Experience />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
