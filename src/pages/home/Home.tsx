import { FloatingWhatsApp } from 'react-floating-whatsapp'
import HeroSection from '../../components/heroSection/HeroSection'
import Reviews from '../../components/reviews/Reviews'
import Booking from '../../components/booking/Booking'
import Experience from '../../components/experience/Experience'
import AboutUs from '../../components/aboutUs/AboutUs'
import Contact from '../../components/contact/Contact'
import Footer from '../../components/footer/Footer'
const Home = () => {
    return (
        <>
            <HeroSection />
            <Reviews />
            <Booking />
            <Experience />
            <AboutUs />
            <Contact />
            <Footer />
            <FloatingWhatsApp phoneNumber="+18098541810" accountName="Albert Joan" chatMessage="Hola ¿Como podemos ayudarte?" placeholder="Reserva ya" avatar="" buttonStyle={{ animation: "none", animationDuration: "0", transition: "none", transform: "none" }} />
        </>
    )
}

export default Home