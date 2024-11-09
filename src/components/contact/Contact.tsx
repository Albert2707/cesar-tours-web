import "./Contact.scss";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useTranslate from "../../hooks/Translate";
import { Resend } from "resend";
// import Email from "../email/Email";
// await resend.batch.send([
//   {
//     from: 'Acme <onboarding@resend.dev>',
//     to: ['foo@gmail.com'],
//     subject: 'hello world',
//     html: '<h1>it works!</h1>',
//   },
//   {
//     from: 'Acme <onboarding@resend.dev>',
//     to: ['bar@outlook.com'],
//     subject: 'world hello',
//     html: '<p>it works!</p>',
//   },
// ]);
const Contact = () => {
  const resend = new Resend("re_f4PncFpH_5wnh6FQ2EurxLnR9FfNThEGc");
  const send = async () => {
    console.log("se envia");
    resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'albertjohan2707@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
  };
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
            <button className="message-button" type="button" onClick={send}>
              {translate("send_message")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
