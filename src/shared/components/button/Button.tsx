import { FC } from 'react'
import "./Button.scss"
interface ButtonProps {
    // text: string,
    type: "primary" | "secondary" | "logout" | "filter" | "options" | "toast" | "back"
    |"back-login"
    onClickfn: () => void
    disabled?: boolean
    btnClass?: string
}
interface Props {
    properties: ButtonProps
    children: React.ReactNode
}
const Button: FC<Props> = ({ children, properties: { type, onClickfn, disabled, btnClass } }) => {
    return (
        <button className={`btn-${type} ${btnClass}`} onClick={onClickfn} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button