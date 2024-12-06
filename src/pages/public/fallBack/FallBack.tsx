import Loader from '../../../features/loader/Loader'
import './FallBack.scss'

const FallBack = () => {
    return (
        <div className="fallBack">
            <img src="images/Cesar-logo.webp" alt="" /> 
            <Loader />
        </div>
    )
}

export default FallBack