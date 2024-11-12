import "./Contact.scss";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useTranslate from "../../hooks/Translate";
import toast, { Toaster } from "react-hot-toast";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { EmailService } from "../../services/emailService";
import { render } from "@react-email/render";
import Email from "../email/Email";
import { EmailProps } from "../../models/Email";
type Inputs = {
  name: string;
  message: string;
  phone: string;
  email: string;
};
const Contact = () => {
  const { translate } = useTranslate();

  const {
    register,
    setValue,
    handleSubmit,
    // watch,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const send = async ({ email, name, message, html }: EmailProps) => {
    try {
      const props = {
        email,
        name,
        message,
        html,
      };
      toast.promise(EmailService.sendEmail(props), {
        loading: translate("sending"),
        success: () => {
          setValue("name", "");
          setValue("message", "");
          setValue("email", "");
          setValue("phone", "+1");
          return translate("message_sent");
        },
        error: translate("message_failed"),
      });
    } catch (error: unknown) {
      toast.error(translate("message_failed"));
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const html = await render(<Email url={"https://netflix.com"} />, {
      pretty: true,
    });

    const { name, message, email, phone } = data;
    if (!name || !message || !email || !phone) {
      return toast.error(translate("fill_all_fields"));
    }
    await send({ email, name, message, html });
  };
  const onError = (errors: FieldErrors<Inputs>) => {
    if (errors.name) {
      toast.error(translate("name_required"));
    } else if (errors.email) {
      toast.error(translate("email_required"));
    } else if (errors.phone) {
      toast.error(translate("phone_required"));
    } else if (errors.message) {
      toast.error(translate("message_required"));
    }
  };

  return (
    <section className="contact-section" id="contact">
      <Toaster />
      <div className="wrapper">
        <div className="left">
          <span>{translate("contact_message")}</span>
          <img src="images/tahoe.png" alt="Tahoe" loading="lazy" />
        </div>
        <div className="right">
          <form
            action=""
            className="contact-form"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            <div className="form-item">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                className={`name ${errors.name ? "invalid" : ""}`}
              />
            </div>
            <div className="form-item">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={`email ${errors.email ? "invalid" : ""}`}
              />
            </div>
            <div className="form-item">
              <label htmlFor="">
                {/* {translate("phone")} */}
                Telefono
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    disableDialCodePrefill={true}
                    inputClassName="phone-invalid"
                    defaultCountry="do"
                    className={`phoneInput ${errors.phone ? "phone-invalid" : ""}`}
                  />
                )}
              />
              {/* <PhoneInput
                defaultCountry="do"
                className="phoneInput"
                charAfterDialCode=" "
                // {...register("phone")}
                // value={phone}
                // onChange={(phone) => setPhone(phone)}
              /> */}
            </div>
            <div className="form-item">
              <label htmlFor="">
                {/* {translate("message")} */}
                Mensaje
              </label>
              <textarea
                id=""
                cols={10}
                rows={5}
                {...register("message", { required: true })}
                className={errors.message ? "invalid" : ""}
              />
            </div>
            <button className="message-button" arial-label="send message">
              {translate("send_message")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;