import "./Experience.scss"
import useTranslate from '../../hooks/translations/Translate';
const Experience = () => {
    const { translate } = useTranslate();
    return (
        <div className="experience-section">
            <div className="wrapper">
                <h1>
                    {translate("experience_speaks")}
                </h1>
                <div className="experience-pictures">
                    <div className="picture">
                        <img
                            src="images/view.jpg"
                            alt="" loading="lazy"
                        />
                    </div>
                    {/* <div className="picture">

                        <img
                            src="https://images.pexels.com/photos/20734769/pexels-photo-20734769/free-photo-of-hombre-vacaciones-arena-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/"
                            alt="" loading="lazy"
                        />
                    </div> */}
                    <div className="picture">

                        <img
                            src="images/viva.jpg"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">


                        <img
                            src="images/ocean.jpg"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/beach.jpg"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/beach2.jpg"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/travel.jpg"
                            alt="" loading="lazy"
                        />
                    </div>
                    {/* <div className="picture">

                        <img
                            src="https://images.pexels.com/photos/7089997/pexels-photo-7089997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="" loading="lazy"
                        />
                    </div> */}
                </div>
                <h1>
                    {translate("some_videos")}
                </h1>
                <div className="experience-videos">
                    <div className="video">

                        <video controls autoPlay muted loop>
                            <source src="videos/video1.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="video">

                        <video controls autoPlay muted loop>
                            <source src="videos/video2.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience