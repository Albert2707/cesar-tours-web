import { motion } from "framer-motion";
import "./Vehicle.scss";
const Vehicle = () => {
  return (
    <motion.div
      className="select-vehicle"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 1}}
    >
      <div className="booking-info">
        <button>
          volver
        </button>
        <h2>Direction</h2>
      </div>
      <div className="vehicle-list">
        <img src="images/tahoe.png" />
      </div>
    </motion.div>
  );
};

export default Vehicle;
