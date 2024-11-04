import { useIdiom } from "../context/idiomContext";
import { IdiomTypes } from "../context/idiomTypes";
import en from"../locales/en.json"
import es from"../locales/es.json"

const idioms:any ={en, es}
const useTranslate = () => {
 const {idiom} = useIdiom() as IdiomTypes;
  const translate = (key: string) => idioms[idiom][key] || key
  return {translate};
};

export default useTranslate;
