import { FC } from "react";
import { AuthTypes } from "@/context/authTypes";
import { Navigate } from "react-router-dom";
import { useAuth } from "@hooks/auth/useAuth";

interface Props {
  children: React.ReactNode;
}

const PrivateRoutes: FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth() as AuthTypes;

  if (!isLoggedIn) return <Navigate to="/login" />;
  return <>{children}</>;
};

export default PrivateRoutes;
