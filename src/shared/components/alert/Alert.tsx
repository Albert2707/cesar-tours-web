import { FC } from "react";
import "./Alert.scss"
interface Props{
    msg:string
}
const Alert:FC<Props> = ({msg}) => {
  return (
    <div className="alert">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check-check"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" />
      </svg>
      <span>{msg}</span>
    </div>
  );
};

export default Alert;
