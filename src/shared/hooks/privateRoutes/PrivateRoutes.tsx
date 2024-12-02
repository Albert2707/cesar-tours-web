import { FC } from "react"
import { useAuth } from "../../../context/authContext"
import { AuthTypes } from "../../../context/authTypes"
import { Navigate } from "react-router-dom"

interface Props {
    children: React.ReactNode
}

const PrivateRoutes: FC<Props> = ({ children }) => {
    const { isLoggedIn } = useAuth() as AuthTypes;

    if (!isLoggedIn) return <Navigate to="/login" />
    return <>{children}</>
}

export default PrivateRoutes