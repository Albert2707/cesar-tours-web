export interface EmailResponse {
    data: {
        id: string
    }
    message: string
}
export interface EmailProps {
    email: string,
    name: string,
    message: string
    html: string
    key?:string
    subject:string
}