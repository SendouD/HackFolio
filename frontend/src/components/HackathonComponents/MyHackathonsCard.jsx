import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MyHackathonsCard(props) {
  const navigate = useNavigate();
  
  function handleClick() {
    props.handleClick(props.data.hackathonName);
  }

  return (
    <motion.div
      className="flex flex-col justify-between p-6 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={handleClick}
    >
      <div>
        {/* Hackathon Name */}
        <h2 className="font-semibold text-2xl text-neutral-800 mb-4 line-clamp-2">
          {props.data.hackathonName.split("-").join(" ")}
        </h2>
        
        <div className="flex justify-between mb-4">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-1">Theme</div>
            <div className="text-sm font-medium text-neutral-700">{props.data.tech}</div>
          </div>
          
          {/* Contact Links */}
          {props.data.contactLinks && props.data.contactLinks.length > 0 && (
            <div className="flex space-x-2">
              {props.data.contactLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.startsWith("http") ? link : "https://" + link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full hover:bg-indigo-50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-neutral-100">
        <div className="flex flex-col space-y-1">
          <span className="text-xs font-medium px-2 py-1 bg-neutral-100 rounded-full text-neutral-700 inline-block w-fit">
            {props.data.eventMode.toUpperCase()}
          </span>
          <span className="text-xs text-neutral-500">
            Starts {new Date(props.data.fromDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
        
        <motion.button
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          More info
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MyHackathonsCard;