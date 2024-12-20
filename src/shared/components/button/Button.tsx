import { CSSProperties, FC } from "react";
import "./Button.scss";
interface ButtonProps {
  // text: string,
  type:
    | "primary"
    | "secondary"
    | "logout"
    | "filter"
    | "options"
    | "toast"
    | "back"
    | "back-login";
  onClickfn: () => void;
  disabled?: boolean;
  btnClass?: string;
  style?: CSSProperties;
}
interface Props {
  properties: ButtonProps;
  children: React.ReactNode;
}
const Button: FC<Props> = ({
  children,
  properties: { type, onClickfn, disabled, btnClass, style },
}) => {
  return (
    <button
      className={`btn-${type} ${btnClass}`}
      onClick={onClickfn}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
