import { CSSProperties, FC } from "react";
import Select from "react-select";
import useTranslate from "@hooks/translations/Translate";
interface SelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (e: any) => void;
  placeholder: string;
  isSearchable?: boolean;
  customStyles?:CSSProperties
}
const SelectBooking: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  isSearchable,
  customStyles
}) => {
  const { translate } = useTranslate();

  return (
    <Select
      options={options}
      value={value}
      className="invalid"
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderColor: "rgba(51, 55, 64, 0.3)",
          ...customStyles,
          backgroundColor: "transparent",
          borderRadius: "10px",
          display: "flex",
          height: "47px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
          boxShadow: "none",
          "&:hover": {
            borderColor: "none",
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          borderRadius: "10px",
          fontSize: "14px",
          backgroundColor: "#f2f2f2",
          fontWeight: 600,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused
            ? "rgba(242, 75, 15, 0.1);"
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
          fontSize: "14px",
          paddingLeft: "0",
        }),
      }}
      placeholder={translate(placeholder)}
      onChange={onChange}
      menuPortalTarget={document.body}
      menuPlacement="auto"
      menuPosition="fixed"
      isSearchable={isSearchable}
    />
  );
};

export default SelectBooking;
