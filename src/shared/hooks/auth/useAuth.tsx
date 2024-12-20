import { AuthContext } from "@/context/authctx";
import { useContext } from "react";

export const useAuth = () => {
  if (!AuthContext) throw new Error("Debe estar dentro de un componente");
  return useContext(AuthContext);
};
