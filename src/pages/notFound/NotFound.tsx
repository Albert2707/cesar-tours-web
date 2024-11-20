import {
    useNavigate,
} from "react-router-dom";
import "./NotFound.scss"
import useTranslate from "../../hooks/translations/Translate";
const NotFound = () => {
    const navigate = useNavigate();
    const { translate } = useTranslate();
    return (
        <div className="not-found">
            <div className="left">
                <img src="images/Cesar-logo.png" alt="" />
            </div>
            <div className="line"></div>
            <div className="right">
                <span className="title">404</span>
                <button onClick={() => navigate('/')}>
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