import { FC } from 'react'
import "./Button.scss"
interface ButtonProps {
    // text: string,
    type: "primary" | "secondary" | "logout" | "filter" | "options" | "toast" | "back"
    onClickfn: () => void
    disabled?: boolean

}
interface Props {
    properties: ButtonProps
    children: React.ReactNode
}
const Button: FC<Props> = ({ children, properties: { type, onClickfn, disabled } }) => {
    return (
        <button className={`btn-${type}`} onClick={onClickfn} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button