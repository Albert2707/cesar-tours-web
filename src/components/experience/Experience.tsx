import React from 'react'
import "./Experience.scss"
import useTranslate from '../../hooks/Translate';
const Experience = () => {
    const { translate } = useTranslate();
    return (
        <section className="experience-section">
            <div className="wrapper">
                <h1>
                    {translate("experience_speaks")}
                </h1>
                <div className="experience-pictures">

                    <img
                        src="https://images.pexels.com/photos/19133803/pexels-photo-19133803/free-photo-of-coches-vehiculos-estacionado-aparcado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://images.pexels.com/photos/20734769/pexels-photo-20734769/free-photo-of-hombre-vacaciones-arena-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://www.oceanworld.net/eng/assets/uploads/slides/1283x616/849fe-14031-8.jpg"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://tainotour.com/wp-content/uploads/2021/03/Boogies_Buggies_Adventure_Punta_Cana_Macao_Beach_off_road-1.jpg"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://static-resources.mirai.com/wp-content/uploads/sites/1738/20220420093819/Posibles-portadas-2-1.jpg"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://images.pexels.com/photos/917510/pexels-photo-917510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://images.pexels.com/photos/7089997/pexels-photo-7089997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="" loading="lazy"
                    />
                    <img
                        src="https://images.pexels.com/photos/7089997/pexels-photo-7089997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="" loading="lazy"
                    />
                </div>
                <h1>
                    {translate("some_videos")}
                </h1>
                <div className="experience-videos">
                    <video controls autoPlay muted loop>
                        <source src="videos/video1.mp4" type="video/mp4" />
                    </video>
                    <video  controls autoPlay muted loop>
                        <source src="videos/video2.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </section>
    )
}

export default Experience