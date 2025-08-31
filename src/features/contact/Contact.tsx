import "./Contact.scss";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import useTranslate from "@/shared/hooks/translations/Translate";
import toast, { Toaster } from "react-hot-toast";
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
} from "react-hook-form";
import { render } from "@react-email/render";
import Email from "@/features/email/Email";
import { EmailProps } from "@/models/email/Email";
import { EmailService } from "./services/email/emailService";
import { customToast } from "@/utils/functions/customToast";
import { VITE_RESEND_API_KEY } from "@/config/config";
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
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const send = async ({
    email,
    name,
    message,
    html,
    key = VITE_RESEND_API_KEY,
    subject,
  }: EmailProps) => {
    try {
      const props = {
        email,
        name,
        message,
        html,
        key,
        subject,
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
      customToast("error", translate("message_failed"));
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { name, message, email, phone } = data;
    const subject = translate("new_contact_request");
    const labels = {
      preview: translate("new_contact_request"),
      header: translate("user_message"),
      email: translate("email"),
      phone: translate("phone"),
      name: translate("name"),
      message: translate("message"),
    };
    const html = await render(
      <Email parameters={{ name, message, email, phone, labels }} />,
      {
        pretty: true,
      }
    );
    await send({ email, name, message, html, subject });
  };
  const onError = (errors: FieldErrors<Inputs>) => {
    if (errors.name) {
      customToast("error", translate("name_required"));
    } else if (errors.email) {
      customToast("error", translate("email_required"));
    } else if (errors.phone) {
      customToast("error", translate("phone_required"));
    } else if (errors.message) {
      customToast("error", translate("message_required"));
    }
  };

  return (
    <div className="contact-section" id="contact">
      <Toaster />
      <div className="container">
        <div className="wrapper">
          <div className="left">
            <span>{translate("contact_message")}</span>
            <div className="contact_img">
              <img src="images/tahoe.webp" alt="Tahoe" loading="lazy" />
            </div>
          </div>
          <div className="right">
            <form
              action=""
              className="contact_form"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div className="form_item">
                <label htmlFor="name">{translate("name")}</label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                  className={`name ${errors.name ? "invalid" : ""}`}
                />
              </div>
              <div className="form_item">
                <label htmlFor="email">{translate("email")}</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className={`email ${errors.email ? "invalid" : ""}`}
                />
              </div>
              <div className="form_item">
                <label htmlFor="">{translate("phone")}</label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: true,
                    //   validate: (value) => {
                    //     return (
                    //       value.length >= 10 ||
                    //       "El número de teléfono es inválido"
                    //     );
                    //   },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      inputClassName="phone-invalid"
                      disableDialCodeAndPrefix={true}
                      defaultCountry="do"
                      className={`phoneInput ${
                        errors.phone ? "phone-invalid" : ""
                      }`}
                    />
                  )}
                />
              </div>
              <div className="form_item">
                <label htmlFor="">{translate("message")}</label>
                <textarea
                  id=""
                  cols={10}
                  rows={5}
                  {...register("message", { required: true })}
                  className={errors.message ? "invalid" : ""}
                />
              </div>
              <button className="message-button" aria-label="send message">
                {translate("send_message")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
