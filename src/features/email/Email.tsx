import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Preview,
  Img,
  Text,
  Section,
  Heading,
} from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  message: string;
  phone: string;
}
interface Props {
  parameters: EmailProps;
}
export const Email: React.FC<Props> = ({
  parameters: { name, message, email, phone },
}) => {
  return (
    <Html>
      <Head />
      <Preview>Reservacion</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://i.ibb.co/wMy6KND/hiace.png"
            width="40"
            height="33"
            alt="Cesar Tours"
          />
          <Section>
            <Heading style={h1}>{name} ha enviado un correo</Heading>
            <Section style={verificationSection}>
              <Text style={text}>Correo: <strong>{email}</strong></Text>
            </Section>
            <Section>
              <Text style={text}>Telefono: <strong>{phone}</strong></Text>
            </Section>
            <Section>
              <Text style={text}>Nombre: <strong>{name}</strong></Text>
            </Section>
            <Section>
              <Text style={text}>Mensaje: <strong>{message}</strong></Text>
            </Section>
            <Text style={text}>😁</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};
export default Email;

const main = {
  backgroundColor: "rgba(242, 75, 15, 0.1)",
  padding: "10px",
};
const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "10px",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};
const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
