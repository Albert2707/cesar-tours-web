import { request } from "../utils/request";
export interface EmailProps {
    email: string,
    name: string,
    message: string
    html: string
}
export class EmailService {
    static async sendEmail({email,name,message,html}:EmailProps): Promise<any> {
        try {
            const response = await request.post("email/send", {
                email,
                name,
                message,
                html
            });
            return response.data;
        } catch (error) {
            console.error("Error sending email:", error);
            throw error;
        }
    }
}

