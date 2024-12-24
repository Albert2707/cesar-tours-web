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
  reservationNum?: string;
  origin?: string;
  destination?: string;
  date?: string;
  hour?: string;
  name?: string;
  total?:string
}

interface Labels {
  preview: string
  header: string;
  num: string;
  origen: string;
  destino: string;
  dateTime: string;
  total:string
}
interface Props {
  parameters: EmailProps;
  labels: Labels
}
export const ConfirmationEmail: React.FC<Props> = ({ parameters: { origin, name, reservationNum, destination, date, hour, total }, labels }) => {

  /*
  Numero de reserva
  origen
  destino
  fecha y hora
  aerolinea 
  # de vuelo
  Nombre y apellido del cliente
  # pasajeros
  # maletas
  total a pagar 
  metodo de pago.
   */
  return (
    <Html lang="en">
      <Head />
      <Preview>{labels?.header}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://i.ibb.co/QbqHYfc/logo-transparent.png"
            width="67"
            height="64"
            alt="Cesar Tours"
          />
          <Section>
            <Heading style={h1}>
              {name} {labels?.header} 😎💪
            </Heading>
            <Section style={verificationSection}>
              <Text style={text}>
                {labels?.num}: <b style={bold}>{reservationNum}</b>
              </Text>
            </Section>
            <Section>
              <Text style={text}>
                {labels?.origen}: <b style={bold}>{origin}</b>
              </Text>
            </Section>
            <Section>
              <Text style={text}>
                {labels?.destino}: <b style={bold}>{destination}</b>
              </Text>
            </Section>
            <Section>
              <Text style={text}>
                {labels?.total}: <b style={bold}>{total}</b>
              </Text>
            </Section>
            <Section>
              <Text style={text}>
                {labels.dateTime}: <b style={bold}>{date} - {hour}</b>
              </Text>

              <Text style={footer}>Punta cana, bavaro</Text>
              <Text style={footerSecond}>Tel (849) 258-7373</Text>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f2f2f2",
  padding: "10px",
  minHeight: "500px",
  maxHeight: "none",
};
const h1 = {
  color: "#111",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const container = {
  backgroundColor: "transparent",
  border: "1px solid #f0f0f0",
  borderRadius: "10px",
  padding: "50px",
  minHeight: "auto",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "bold",
  color: "#222",
  lineHeight: "26px",
};
const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const bold = {
  ...text,
  fontWeight: "normal",
};
const footer = {
  color: "#6a737d",
  fontSize: "12px",
  fontWeight: "bold",
  textAlign: "left" as const,
  marginTop: "10px",
};
const footerSecond = {
  ...footer,
  marginTop: "-10px",
};