import { motion } from "framer-motion";
import "./Vehicle.scss";
import { FC } from "react";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Vehicle: FC<Props> = ({ setStep }) => {
  const vehicles = [
    { img: "images/suburban.png", name: "Tahoe Suburban", price: "350,50" },
    { img: "images/coaster.png", name: "Toyota Coaster", price: "300,00" },
    { img: "images/hiace.png", name: "Toyota Hiace", price: "250,61" },
  ];
  const variants = {
    initial: {
      x: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.3,
      },
    },
  };
  return (
    <div className="select-vehicle">
      <div className="booking-info">
        <div className="container-info">
          <h2>Journey Information</h2>
          <div className="route">
            <span>Route</span>
            <span>
              Aeropuerto Las Americas Santo Domingo, Ruta 66 Salida Del
              Aeropuerto las Americas Santo Domingo Dominican Republic -- San
              Juan de la Maguana, Dominican Republic
            </span>
          </div>
          <div className="collection-time">
            <span>Collection Time</span>
            <span>24/11/2024 - 03:15</span>
          </div>
          <div className="distance">
            <span>Distance</span>
            <span>135.9 km</span>
          </div>
          <div className="duration">
            <span>Duration</span>
            <span>3 horas 20 minutos</span>
          </div>
        </div>
        <button onClick={() => setStep(1)} className="back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <span>volver</span>
        </button>
      </div>

      <motion.div
        className="vehicle-list"
        initial="initial"
        animate="animate"
        variants={variants}
      >
        {vehicles.map((e) => (
          <motion.div
            key={crypto.randomUUID()}
            variants={variants}
            className="vehicle"
          >
            <div className="vehicle-img">
              <img
                src={e.img}
                alt="Tahoe Suburban"
                width={200}
                height={1200}
                loading="lazy"
              />
            </div>

            <div className="features">
              <div className="vehicle-info">
                <span>{e.name}</span>
                <span className="price">$&nbsp;{e.price}</span>
              </div>

              <div className="book-now">
                <div className="more">
                  <div className="people">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <span>8</span>
                  </div>
                  <div className="luggage">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                      />
                    </svg>

                    <span>20</span>
                  </div>
                </div>
                <button>BOOK NOW</button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Vehicle;
