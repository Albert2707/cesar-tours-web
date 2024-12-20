import { EmailProps, EmailResponse } from "@/models/email/Email";
import { request } from "@/utils/api/request";

export class EmailService {
  static async sendEmail({
    email,
    name,
    message,
    html,
    key,
    subject
  }: EmailProps): Promise<EmailResponse> {
    try {
      const response = await request.post(
        "email/send",
        {
          email,
          name,
          message,
          html,
          subject
        },
        { headers: { resendapikey: key } }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}
