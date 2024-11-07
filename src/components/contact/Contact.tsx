import "./Contact.scss"
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css'
import useTranslate from "../../hooks/Translate";
const Contact = () => {
    const { translate } = useTranslate();
    return (
        <section className="contact-section" id="contact">
            <div className="wrapper">
                <div className="left">
                    <img src="images/tahoe.png" alt="Tahoe" loading="lazy" />
                </div>
                <div className="right">
                    <form action="" className="contact-form">
                        <input type="text" className="name"/>
                        <input type="email" className="email"/>
                        <PhoneInput
                            defaultCountry="do"
                            className="phoneInput"
                            charAfterDialCode=" "
                        // value={phone}
                        // onChange={(phone) => setPhone(phone)}
                        />
                        {/* <input type="text" /> */}
                        <textarea name="" id="" cols={10} rows={5} />
                        <button className="message-button" type="button"> {translate("send_message")}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact