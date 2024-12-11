import { FC } from 'react'
import "./Button.scss"
interface ButtonProps {
    // text: string,
    type: "primary" | "secondary" | "logout" |"filter"|"options"
    onClickfn : ()=> void
}
interface Props {
    properties: ButtonProps
    children: React.ReactNode
}
const Button: FC<Props> = ({children, properties: { type,onClickfn } }) => {
    return (
        <button className={`btn-${type}`} onClick={onClickfn}>
{children}
        </button>
    )
}

export default Button