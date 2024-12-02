import HeroSection from '../../../features/heroSection/HeroSection'
import Reviews from '../../../features/reviews/Reviews'
import Booking from '../../../features/booking/Booking'
import Experience from '../../../features/experience/Experience'
import AboutUs from '../../../features/aboutUs/AboutUs'
import Contact from '../../../features/contact/Contact'
import Footer from '../../../features/footer/Footer'
import WhatsApp from '../../../shared/components/whatsApp/WhatsApp'
const Home = () => {
    return (
        <>
            <WhatsApp />
            <HeroSection />
            <Reviews />
            <Booking />
            <Experience />
            <AboutUs />
            <Contact />
            <Footer />

        </>
    )
}

export default Home