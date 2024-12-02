import { FC } from 'react'
import './ConfirmPopup.scss'
import { motion } from 'framer-motion'
interface Props {
    onConfirm: () => void
    onCancel: () => void
    title: string
    subTitle?: string
}
const ConfirmPopup: FC<Props> = ({ onConfirm, onCancel,title,subTitle }) => {
    return (
        <div className="confirm-popup">
            <motion.div initial={{ scale: 0 }} transition={{ duration: 0.5, type: "spring" }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="container">
                <h2 className="mesagge">{title}</h2>
                <span className="sub-message">{subTitle || ""}</span>
                <div className="options">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onCancel}>NO</button>
                </div>
            </motion.div>
        </div>
    )
}

export default ConfirmPopup