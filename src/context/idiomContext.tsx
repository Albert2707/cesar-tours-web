import { createContext, useContext, useState } from "react";

const idiomContext = createContext({});

export const useIdiom = () => {
  if (!idiomContext) throw new Error("Debe estar dentro de un componente");
  return useContext(idiomContext);
};

interface Props {
  children: React.ReactNode;
}
export const IdiomContextProvider: React.FC<Props> = ({ children }) => {
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
