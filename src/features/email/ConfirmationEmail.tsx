import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Preview,
  Img,
  Text,
} from "@react-email/components";
import useTranslate from "@hooks/translations/Translate";

interface EmailProps {
  reservationNum?: string;
  origin?: string;
  destination?: string;
  date?: string;
  hour?: string;
  name?: string;
}
interface Props {
  parameters: EmailProps;
}
export const ConfirmationEmail: React.FC<Props> = ({ parameters: { origin } }) => {
  const { translate } = useTranslate();

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
      <Preview>{translate("Confirmacion de reserva")}</Preview>
      <Body>
        <Container>
          <Img src={`/images/logo.png`} width="32" height="32" alt="Github" />
          <Text>{origin}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationEmail;
