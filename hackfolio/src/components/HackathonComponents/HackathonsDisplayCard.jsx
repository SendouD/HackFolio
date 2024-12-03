import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import "animate.css"; // Import Animate.css for animations

function HackathonsDisplayCard(props) {
    const navigate = useNavigate();
    const hackathonName = props.data.hackathonName.split('-').join(' ');

    async function handleClick() {
        navigate(`/hackathon/${props.data.hackathonName}`);
    }

    return (
        <motion.div
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
            className="hackathon-card relative flex flex-col justify-between p-6 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 overflow-hidden w-96 h-[30rem] shadow-lg text-white animate__animated animate__fadeInDown"
        >
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    {/* Hackathon Name */}
                    <div className="font-bold text-2xl mb-2">{hackathonName}</div>

                    {/* Contact Links */}
                    <div className="flex space-x-2 mb-4">
                        {props.data.contactLinks.map((link, index) => (
                            <a
                                key={index}
                                href={`https://${link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg hover:text-yellow-400"
                            >
                                🌐
                            </a>
                        ))}
                    </div>
                </div>

                {/* Hackathon Details */}
                <div>
                    <div className="mb-3">
                        <span className="font-medium">Theme: </span>
                        {props.data.tech}
                    </div>
                    <div className="mb-3">
                        <span className="font-medium">Mode: </span>
                        {props.data.eventMode.toUpperCase()}
                    </div>
                    <div>
                        <span className="font-medium">Starts: </span>
                        {props.data.fromDate}
                    </div>
                </div>

                {/* Apply Now Button */}
                <button
                    className="mt-4 w-full py-3 bg-[#e0e7ff] text-black rounded-lg font-semibold hover:bg-[#9ca3af] transition-all"
                    onClick={handleClick}
                >
                    Apply Now
                </button>
            </div>

            {/* Background Effects */}
            <Background />
        </motion.div>
    );
}

const Background = () => {
    return (
        <motion.svg
            width="500"
            height="384"
            viewBox="0 0 500 384"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 z-0 opacity-30"
            variants={{
                hover: {
                    scale: 1.2,
                },
            }}
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.circle
                cx="160.5"
                cy="114.5"
                r="101.5"
                fill="#f8fafc"
                opacity="50"
            />
            <motion.ellipse
                cx="160.5"
                cy="265.5"
                rx="101.5"
                ry="43.5"
                fill="#f8fafc"
                opacity="20"
            />
        </motion.svg>
    );
};

export default HackathonsDisplayCard;
