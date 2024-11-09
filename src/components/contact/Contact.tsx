import "./Contact.scss";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useTranslate from "../../hooks/Translate";
import toast, { Toaster } from 'react-hot-toast';
import { EmailService } from "../../services/emailService";
import { render } from '@react-email/render';
import Email from "../email/Email";
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
  const send = async () => {
    try {
      const html = await render(<Email url={"https://netflix.com"} />, {
        pretty: true,
      });
      const props = {
        email: "albertjohan2707@gmail.com",
        name: "Albert",
        message: "HOla mundito",
        html
      }
       await EmailService.sendEmail(props);
      // console.log(response);
      toast.success("Email enviado con éxito");
    } catch (error: unknown) {
      if (error instanceof Error) {

        toast.error(error.message);
      }
    }

  };
  const { translate } = useTranslate();
  return (
    <section className="contact-section" id="contact">
      <Toaster />
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
            <button className="message-button" type="button" arial-label="send message" onClick={send}>
              {translate("send_message")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
