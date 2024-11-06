// Reviews.js
import "./Reviews.scss";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { Arrow, AutoPlay, Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import ReviewCard from "./components/reviewCard/ReviewCard";
import { ReviewsCardType } from "../../models/reviewCardType";
import { useRef } from "react";

const reviews: ReviewsCardType[] = [
  {
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Maria Gonzalez",
    date: "12 de septiembre",
    rating: 5,
    comment: "¡Me encantó el servicio!",
    desc: "Todo fue perfecto, desde la puntualidad hasta la amabilidad del conductor. Lo recomiendo.",
  },
  {
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Carlos Ramirez",
    date: "8 de julio",
    rating: 5,
    comment: "¡Perfecto!",
    desc: "Servicio impecable, muy profesional y siempre atento a las necesidades de los pasajeros.",
  },
  {
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Ana López",
    date: "3 de octubre",
    rating: 5,
    comment: "Experiencia excelente",
    desc: "El conductor fue muy amable y el vehículo estaba en perfectas condiciones. Definitivamente usaré este servicio nuevamente.",
  },
  {
    img: "https://images.pexels.com/photos/3761507/pexels-photo-3761507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Pedro Sánchez",
    date: "15 de agosto",
    rating: 4.5,
    comment: "Muy satisfecho",
    desc: "El viaje fue muy cómodo y llegamos a tiempo. Excelente atención y coordinación.",
  },
  {
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Lucia Fernandez",
    date: "21 de junio",
    rating: 4,
    comment: "¡Increíble!",
    desc: "Un servicio de calidad, puntual y con gran atención al detalle. Muy recomendable.",
  },
  {
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "David Martinez",
    date: "29 de noviembre",
    rating: 5,
    comment: "Más que satisfecho",
    desc: "Todo salió a la perfección. Sin contratiempos y con un trato muy cordial. Sin duda, 5 estrellas bien merecidas.",
  },
  {
    img: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "David Martinez",
    date: "29 de noviembre",
    rating: 3.5,
    comment: "Más que satisfecho",
    desc: "Todo salió a la perfección. Sin contratiempos y con un trato muy cordial. Sin duda, 5 estrellas bien merecidas.",
  },
];

const Reviews = () => {
  const flickingRef = useRef<Flicking>(null);
  const plugins = [
    new AutoPlay({ duration: 2500, stopOnHover: false }),
    new Pagination({ type: "bullet" }),
    new Arrow(),
  ];

  return (
    <div className="reviews">
      <div className="wrapper">
        <Flicking
          circular={true}
          plugins={plugins}
          defaultIndex={0}
          duration={500}
          circularFallback={"bound"}
          bound={true}
          //   useFindDOMNode={true}
          align={{ camera: "5%", panel: "40px" }}
          ref={flickingRef}
        >
          {reviews.map((e) => (
            <div key={crypto.randomUUID()}>
              <ReviewCard props={{ ...e }} />
            </div>
          ))}
          <ViewportSlot>
            <span className="flicking-arrow-prev"></span>
            <span className="flicking-arrow-next"></span>
            <div className="flicking-pagination"></div>
          </ViewportSlot>
        </Flicking>
      </div>
    </div>
  );
};

export default Reviews;
