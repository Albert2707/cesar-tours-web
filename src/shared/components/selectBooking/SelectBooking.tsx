import { FC } from 'react'
import Select from "react-select";
import useTranslate from '../../hooks/translations/Translate';

interface SelectProps{
    options: any[],
    value?: any,
    onChange: (e: any) => void,
    placeholder:string
  
}
const SelectBooking:FC<SelectProps> = ({options, value, onChange,placeholder}) => {
    const { translate } = useTranslate();

  return (
    <Select
    options={options}
    value={value}
    styles={{
      control: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "transparent",
        borderRadius: "10px",
        display: "flex",
        height: "47px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        borderColor: "rgba(51, 55, 64, 0.3)",
        boxShadow: "none", // Remueve o cambia el borde en foco
        "&:hover": {
          borderColor: "none", // Color del borde en hover
        },
      }),
      menu: (baseStyles) => ({
        ...baseStyles,
        borderRadius: "10px",
        fontSize: "12px",
        backgroundColor: "#f2f2f2",
        fontWeight: 600,
      }),
      option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isFocused
          ? "rgba(242, 75, 15, 0.1);"
          : "transparent", // Cambia el color de fondo en hover
        color: state.isFocused ? "orange" : "inherit", // Cambia el color del texto en hover
        "&:active": {
          backgroundColor: "rgba(242, 75, 15, 0.1)", // Color de fondo al hacer clic
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
        padding: "0", // Remueve padding para centralizar mejor el texto
        margin: "0 8px", // Ajusta el margen para que el texto esté centrado
      }),
      singleValue: (baseStyles) => ({
        ...baseStyles,
        margin: "0", // Remueve margen adicional si lo hay
        paddingLeft: "0", // Asegura que el texto esté centrado en el control
      }),
    }}
    placeholder={translate(placeholder)}
    onChange={onChange}
    menuPortalTarget={document.body}
    menuPlacement="auto"
    menuPosition="fixed"
    isSearchable={false}
  />
  )
}

export default SelectBooking
