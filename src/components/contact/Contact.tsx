import "./Contact.scss";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useTranslate from "../../hooks/Translate";
const Contact = () => {
  const { translate } = useTranslate();
  return (
    <section className="contact-section" id="contact">
      <div className="wrapper">
        <div className="left">
          <span>Nos encantaría saber de usted. </span>
          <img src="images/tahoe.png" alt="Tahoe" loading="lazy" />
        </div>
        <div className="right">
          <form action="" className="contact-form">
            <div className="form-item">
              <label htmlFor="name">Nombre</label>
              <input id="name" type="text" className="name" />
            </div>
            <div className="form-item">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" className="email" />
            </div>
            <div className="form-item">
              <label htmlFor="">
                {/* {translate("phone")} */}
                Telefono
              </label>
              <PhoneInput
                defaultCountry="do"
                className="phoneInput"
                charAfterDialCode=" "
                // value={phone}
                // onChange={(phone) => setPhone(phone)}
              />
            </div>
            <div className="form-item">
              <label htmlFor="">
                {/* {translate("message")} */}
                Mensaje
              </label>
              <textarea name="" id="" cols={10} rows={5} />
            </div>
            <button className="message-button" type="button">
              {translate("send_message")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
