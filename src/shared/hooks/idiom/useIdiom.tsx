import { idiomContext } from "@/context/idiomctx";
import { useContext } from "react";

export const useIdiom = () => {
    if (!idiomContext) throw new Error("Debe estar dentro de un componente");
    return useContext(idiomContext);
  };