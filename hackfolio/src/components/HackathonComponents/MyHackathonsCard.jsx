import { useState } from "react";
import { useParams } from "react-router-dom";

function MyHackathonsCard(props) {
    const { name } = useParams();
    const [hackathonName] = useState(
        props.data.hackathonName.split("-").join(" ")
    );

    return (
        <div
            className="hc bg-[#c4b5fd] rounded-lg shadow-lg p-12 m-6 w-full max-w-lg border border-[#5f3abd] hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out animate__animated animate__fadeInUp"
            onClick={() => props.handleClick(props.data.hackathonName)}
        >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-8">
                <h2 className="hn font-bold text-4xl text-[#5f3abd] flex items-center justify-center">{hackathonName}</h2>
                <div className="flex space-x-5">
                    {props.data.contactLinks.map((link, i) => (
                        <a
                            key={i}
                            href={"https://" + link}
                            className="text-[#3f40bb] text-3xl hover:text-[#5f3abd] transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>&#128279;</span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Theme and Tech Details */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col">
                    <div className="font-semibold text-black-400">THEME</div>
                    <div className="font-medium text-white text-lg">{props.data.tech}</div>
                </div>
                <div className="text-2xl font-bold text-[#5f3abd]">
                    Participants: 2.5k
                </div>
            </div>

            {/* Event Mode and Start Date */}
            <div className="flex justify-between">
                <div className="flex space-x-6">
                    <span className="bg-[#5f3abd] text-white py-3 px-6 rounded-full text-lg shadow-lg hover:bg-[#4720a2] transition-all duration-300 ease-in-out flex items-center justify-center">
                        {props.data.eventMode.toUpperCase()}
                    </span>

                    <span className="bg-[#3f40bb] text-white py-3 px-6 rounded-full text-lg shadow-lg hover:bg-[#2d2a87] transition-all duration-300 ease-in-out">
                        STARTS: {props.data.fromDate}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MyHackathonsCard;
