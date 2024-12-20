import "./Experience.scss"
import useTranslate from '@/shared/hooks/translations/Translate';

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
                            src="images/view.webp"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/viva.webp"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">


                        <img
                            src="images/ocean.webp"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/beach.webp"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/beach2.webp"
                            alt="" loading="lazy"
                        />
                    </div>
                    <div className="picture">

                        <img
                            src="images/travel.webp"
                            alt="" loading="lazy"
                        />
                    </div>
                </div>
                <h1>
                    {translate("some_videos")}
                </h1>
                <div className="experience-videos">
                    <div className="video">

                        <video controls={false} autoPlay muted loop>
                            <source src="videos/video1.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="video">

                        <video controls={false} autoPlay muted loop>
                            <source src="videos/video2.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experience