import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import "animate.css"; // Import Animate.css for animations

function HackathonsDisplayCard(props) {
  const navigate = useNavigate();
  
  async function handleClick() {
    navigate(`/hackathon/${props.data.hackathonName}`);
  }
  
  // Get button text based on date comparison
  const getButtonText = () => {
    const currentDate = new Date();
    const startDate = new Date(props.data.fromDate);
    const endDate = new Date(props.data.toDate); // Assuming you have an endDate in your data
    
    if (currentDate < startDate) {
      return "Apply Now";
    } else if (currentDate > endDate) {
      return " Ended";
    } else {
      return "View Hackathon";
    }
  };
  
  return (
    <motion.div
      className="hackathon-card flex flex-col justify-between p-6 bg-gray-200 rounded-lg shadow-gray-200 mx-4 my-4"
      whileHover="hover"
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
    >
      <div className="flex justify-between items-center">
        {/* Hackathon Name */}
        <div className="hack-name font-semibold text-3xl text-gray-900">
          {props.data.hackathonName.split('-').join(' ')}
        </div>
        {/* Contact Links */}
        {/* <div className="flex space-x-3">
          {props.data.contactLinks.map((ele, i) => (
            <a
              key={i}
              href={"https://" + ele}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-indigo-600 hover:text-indigo-800"
            >
              &#128279;
            </a>
          ))}
        </div> */}
      </div>
      <div className="flex justify-between mt-4">
        <div>
          <div className="font-bold text-gray-500">THEME</div>
          <div className="hack-themes font-medium text-gray-700">
            {props.data.tech}
          </div>
        </div>
   
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <span className="hack-status font-medium text-gray-600">
            {props.data.eventMode.toUpperCase()}
          </span>
          <span className="hack-status font-medium text-gray-600">
            STARTS {props.data.fromDate}
          </span>
        </div>
        {/* Dynamic Button */}
        <motion.button
          className={`w-36 text-xl ${getButtonText() === "Hackathon Ended" ? "bg-gray-500" : "bg-[#5f3abd] hover:bg-[#5635aa]"} text-white py-2 rounded-md font-semibold transition-colors`}
          onClick={handleClick}
          whileHover={{ scale: getButtonText() === " Ended" ? 1.0 : 1.1 }}
          disabled={getButtonText() === "Hackathon Ended"}
        >
          {getButtonText()}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default HackathonsDisplayCard;