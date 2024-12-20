import Select from "react-select";
import useTranslate from "@hooks/translations/Translate";
import { IdiomTypes } from "@/context/idiomTypes";
import { useIdiom } from "@hooks/idiom/useIdiom";

// Definimos estilos comunes reutilizables
const commonStyles = {
  fontSize: "12px",
};
// Función para aplicar estilos condicionales
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getOptionStyles = (state: any) => ({
  backgroundColor: state.isFocused ? "rgba(242, 75, 15, 0.1)" : "transparent",
  color: state.isFocused ? "orange" : "inherit",
});

const SelectIdiom = () => {
  const { translate } = useTranslate();
  const { setLanguage, idiom } = useIdiom() as IdiomTypes;

  const options = [
    { value: "es", label: translate("Spanish"), labelOnSelect: "es" },
    { value: "en", label: translate("English"), labelOnSelect: "us" },
  ];

  const formatLabel = (option: {
    value: string;
    label: string;
    labelOnSelect: string;
  }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        justifyContent: "center",
      }}
    >
      <span>{option.label}</span>
    </div>
  );

  return (
    <Select
      options={options}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          ...commonStyles,
          borderRadius: "50px",
          backgroundColor: "transparent",
          height: "47px",
          display: "flex",
          width: "100px",
          justifyContent: "center",
          alignItems: "center",
          borderColor: "gray",
          boxShadow: "none",
          "&:hover": { borderColor: "#f2f2f2" },
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menu: (baseStyles) => ({
          ...baseStyles,
          ...commonStyles,
          borderRadius: "10px",
          backgroundColor: "#f2f2f2",
          fontWeight: 600,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          ...getOptionStyles(state),
          "&:active": { backgroundColor: "rgba(242, 75, 15, 0.1)" },
        }),
        indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
        dropdownIndicator: (styles) => ({ ...styles, display: "none" }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0",
          margin: "0 8px",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: "#f2f2f2",
          paddingLeft: "0",
        }),
      }}
      formatOptionLabel={formatLabel}
      placeholder={translate("travelType")}
      isSearchable={false}
      value={options.find((option) => option.value === idiom)}
      closeMenuOnScroll={true}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      menuPosition="fixed"
      onChange={(e) => setLanguage(e?.value as "es" | "en")}
    />
  );
};

export default SelectIdiom;
