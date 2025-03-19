"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function HackathonsDisplayCard(props) {
  const navigate = useNavigate()

  async function handleClick() {
    navigate(`/hackathon/${props.data.hackathonName}`)
  }

  // Get button text based on date comparison
  const getButtonText = () => {
    const currentDate = new Date()
    const startDate = new Date(props.data.fromDate)
    const endDate = new Date(props.data.toDate) // Assuming you have an endDate in your data

    if (currentDate < startDate) {
      return "Apply Now"
    } else if (currentDate > endDate) {
      return "Ended"
    } else {
      return "View Hackathon"
    }
  }

  // Determine button style based on status
  const getButtonStyle = () => {
    if (getButtonText() === "Ended") {
      return "bg-neutral-400 cursor-not-allowed"
    }
    return "bg-indigo-600 hover:bg-indigo-700"
  }

  return (
    <motion.div
      className="flex flex-col justify-between p-6 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
      whileHover={{ y: -5 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
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

        {/* Dynamic Button */}
        <motion.button
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${getButtonStyle()}`}
          onClick={handleClick}
          whileHover={getButtonText() !== "Ended" ? { scale: 1.05 } : {}}
          whileTap={getButtonText() !== "Ended" ? { scale: 0.98 } : {}}
        >
          {getButtonText()}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default HackathonsDisplayCard