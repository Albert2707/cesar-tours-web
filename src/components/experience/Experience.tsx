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
                <div className="experience-picture">

                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/19133803/pexels-photo-19133803/free-photo-of-coches-vehiculos-estacionado-aparcado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/20734769/pexels-photo-20734769/free-photo-of-hombre-vacaciones-arena-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/20734769/pexels-photo-20734769/free-photo-of-hombre-vacaciones-arena-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/"
                            alt=""
                        />
                    </div>
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/19133803/pexels-photo-19133803/free-photo-of-coches-vehiculos-estacionado-aparcado.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/20734769/pexels-photo-20734769/free-photo-of-hombre-vacaciones-arena-mujer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/"
                            alt=""
                        />
                    </div>
                    <div className="item">
                        <img
                            src="https://images.pexels.com/photos/7089997/pexels-photo-7089997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/7089997/pexels-photo-7089997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                        <img
                            src="https://images.pexels.com/photos/7089997/pexels-photo-7089997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt=""
                        />
                    </div>
                </div>


                <h1>
                {translate("some_videos")}
                </h1>

            </div>
        </section>
    )
}

export default Experience