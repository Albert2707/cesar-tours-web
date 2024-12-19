import Login from "@/features/login/Login";
import "./Siging.scss";
import Button from "@/shared/components/button/Button";
import useTranslate from "@hooks/translations/Translate";
import { useNavigate } from "react-router-dom";
const Siging = () => {
  const { translate } = useTranslate();
  const navigate = useNavigate();

  return (
    <div className="login">
      <Login />
      <div className="options">
        <div className="go-back">
          <Button
            properties={{ type: "back-login", onClickfn: () => navigate("/") }}
          >
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
              className="lucide lucide-chevron-left"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{translate("home")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Siging;
