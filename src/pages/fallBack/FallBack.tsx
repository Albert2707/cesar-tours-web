import Loader from '../../components/loader/Loader'
import './FallBack.scss'

const FallBack = () => {
    return (
        <div className="fallBack">
            <img src="images/Cesar-logo.png" alt="" /> 
            <Loader />
        </div>
    )
}

export default FallBack