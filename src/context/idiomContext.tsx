import { useState } from "react";
import { ContextProps } from "@/models/context/contextProps";
import { idiomContext } from "@/context/idiomctx";



export const IdiomContextProvider: React.FC<ContextProps> = ({ children }) => {
  const [idiom, setIdiom] = useState<"es" | "en">(
    (localStorage.getItem("idiom") as "es" | "en") || "es"
  );

  const setLanguage = (language: "es" | "en") => {
    setIdiom(language);
    localStorage.setItem("idiom", language);
  };

  return (
    <idiomContext.Provider value={{ idiom, setLanguage }}>
      {children}
    </idiomContext.Provider>
  );
};
