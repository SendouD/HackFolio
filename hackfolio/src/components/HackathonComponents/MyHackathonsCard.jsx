import { useState } from "react";
import { useParams } from 'react-router-dom';

function MyHackathonsCard(props) {
    const { name } = useParams();
    const [hackathonName] = useState(props.data.hackathonName.split('-').join(' '));

    return (
        <div 
            className="hc bg-white rounded-lg shadow-lg p-6 m-4 border border-gray-300 transition-transform transform"
            onClick={() => props.handleClick(props.data.hackathonName)}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="hn font-semibold text-xl text-gray-800">{hackathonName}</h2>
                <div className="flex space-x-2">
                    {props.data.contactLinks.map((link, i) => (
                        <a 
                            key={i} 
                            href={"https://" + link} 
                            className="text-blue-500 text-lg hover:text-blue-200 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>&#128279;</span>
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div>
                    <div className="font-bold text-gray-400">THEME</div>
                    <div className="font-medium text-gray-600">{props.data.tech}</div>
                </div>
                <div className="font-bold text-gray-500">2.5k</div>
            </div>
            <div className="flex justify-between">
                <div className="flex space-x-2">
                    <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full transition-colors">{props.data.eventMode.toUpperCase()}</span>
                    <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full transition-colors">STARTS {props.data.fromDate}</span>
                </div>
            </div>
        </div>
    );
}

export default MyHackathonsCard;
