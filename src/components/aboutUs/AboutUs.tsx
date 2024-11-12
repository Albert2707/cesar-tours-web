import "./AboutUs.scss";

const AboutUs = () => {
  return (
    <div className="aboutUs-section" id="aboutUs">
      <div className="wrapper">
        <div className="card-aboutUs">
          <div className="card-header">
            <div className="header" style={{backgroundColor:"#4BBFBF"}}>
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
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
            <h3>Vision</h3>
          </div>
          <div className="card-body">
            <p>
              Ser la empresa líder en servicios turísticos integrales,
              reconocida por proporcionar experiencias memorables y de alta
              calidad a los viajeros de todo el mundo, facilitando sus aventuras
              con comodidad, seguridad y eficiencia.
            </p>
          </div>
        </div>

        <div className="card-aboutUs">
          <div className="card-header">
            <div className="header" style={{backgroundColor:"#22A2F2"}}>
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
                  d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
                />
              </svg>
            </div>
            <h3>Misión</h3>
          </div>
          <div className="card-body">
            <p>
              Ofrecer soluciones turísticas completas y personalizadas,
              enfocadas en la satisfacción del cliente, con excelencia y respeto
              por las comunidades locales.
            </p>
          </div>
        </div>

        <div className="card-aboutUs">
          <div className="card-header">
            <div className="header" style={{backgroundColor:"#F24B0F"}}>
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
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
            <h3>Valores</h3>
          </div>
          <div className="card-body">
            <p className="par">
              Excelencia en el servicio <br /> Integridad <br /> Innovación{" "}
              <br />
              Responsabilidad <br /> Cuidado por las personas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;