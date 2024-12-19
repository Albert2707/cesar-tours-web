import {
    useNavigate,
} from "react-router-dom";
import "./NotFound.scss"
import useTranslate from "@/shared/hooks/translations/Translate";
import { useAuth } from "@/context/authContext";
import { AuthTypes } from "@/context/authTypes";
const NotFound = () => {
    const { isLoggedIn } = useAuth() as AuthTypes;

    const navigate = useNavigate();
    const { translate } = useTranslate();
    return (
        <div className="not-found">
            <div className="left">
                <img src="/images/Cesar-logo.webp" alt="Cesar logo" loading="lazy" />
            </div>
            <div className="line"></div>
            <div className="right">
                <span className="title">404</span>
                <button onClick={() => isLoggedIn ? navigate('/login') : navigate('/')}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                    <span>{translate("back")}</span></button>
            </div>
        </div>
    )
}

export default NotFound