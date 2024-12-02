import Select from "react-select";
import useTranslate from "../../hooks/translations/Translate";
import { useIdiom } from "../../../context/idiomContext";
import { IdiomTypes } from "../../../context/idiomTypes";

const SelectIdiom = () => {
    const { translate } = useTranslate();
    const { setLanguage, idiom } = useIdiom() as IdiomTypes;

  const options = [
    { value: "es", label: translate("Spanish"), labelOnSelect: "es" },
    { value: "en", label: translate("English"), labelOnSelect: "us" },
  ];

  const formatLabel = (option:any) => (
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
  )

  return (
    <Select
      options={options}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "transparent",
          borderRadius: "10px",
          height: "40px",
          display: "flex",
          width: "100px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          borderColor: "gray",
          boxShadow: "none",
          "&:hover": {
            borderColor: "#f2f2f2",
          },
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "10px",
          fontSize: "12px",
          backgroundColor: "#f2f2f2",
          fontWeight: 600,
          // zIndex: 9999, // Asegura que el menú esté al frente
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? "rgba(242, 75, 15, 0.1)"
            : "transparent",
          color: state.isFocused ? "orange" : "inherit",
          "&:active": {
            backgroundColor: "rgba(242, 75, 15, 0.1)",
          },
        }),
        indicatorSeparator: (styles) => ({
          ...styles,
          display: "none",
        }),
        dropdownIndicator: (styles) => ({
          ...styles,
          display: "none",
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          padding: "0",
          margin: "0 8px",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          margin: "0",
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
