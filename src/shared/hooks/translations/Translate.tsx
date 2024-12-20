import { IdiomTypes } from "@/context/idiomTypes";
import en from"@/locales/en.json"
import es from"@/locales/es.json"
import { useIdiom } from "@hooks/idiom/useIdiom";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const idioms:any ={en, es}
const useTranslate = () => {
 const {idiom} = useIdiom() as IdiomTypes;
  const translate = (key: string) => idioms[idiom][key] || key
  return {translate};
};

export default useTranslate;
