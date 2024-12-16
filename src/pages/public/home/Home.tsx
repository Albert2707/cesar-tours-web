import React, { useEffect } from "react";
import { Seo } from "@/shared/components/seo/SEO";
import { useLocation } from "react-router-dom";

const HeroSection = React.lazy(
  () => import("@/features/heroSection/HeroSection")
);
const Reviews = React.lazy(() => import("@/features/reviews/Reviews"));
const Booking = React.lazy(() => import("@/features/booking/Booking"));
const Experience = React.lazy(
  () => import("@/features/experience/Experience")
);
const AboutUs = React.lazy(() => import("@/features/aboutUs/AboutUs"));
const Contact = React.lazy(() => import("@/features/contact/Contact"));
const WhatsApp = React.lazy(
  () => import("@/shared/components/whatsApp/WhatsApp")
);
const Home = () => {
  const {hash} = useLocation();
  useEffect(() => {
    if(hash){
      const target = document.getElementById(hash.replace("#",""));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }

  }, [hash]);
  return (
    <>
      <Seo
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
    </>
  );
};

export default Home;
