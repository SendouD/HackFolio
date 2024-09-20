import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function Hackathon_disp_card(props) {
    const navigate = useNavigate();
    const { name } = useParams();
    const temp = useState(props.data.hackathonName.split('-').join(' '));
    
    async function handleClick() {
        navigate(`/hackathon/${props.data.hackathonName}`);
    }

    return(
        <>
            <div className="hackathon-card flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="hack-name font-semibold text-3xl text-gray-950/80">{temp}</div>
                    <div className="flex">
                        {
                            props.data.contactLinks.map((ele,i)=>{
                                return <div key={i} className="hack-links"><a href={"https://"+ele}>&#128279;</a></div>
                            })
                        }
                    </div>
                </div>
                <div className="flex justify-between">
                    <div>
                        <div className="font-bold text-gray-400">THEME</div>
                        <div className="hack-themes font-medium text-gray-500">{props.data.tech}</div>
                    </div>
                    <div className="font-bold text-gray-400">
                        2.5k
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex">
                        <div className="hack-status">{props.data.eventMode.toUpperCase()}</div>
                        <div className="hack-status">STARTS {props.data.fromDate}</div>
                    </div>
                    <button 
                        className="w-36 text-xl bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                        onClick={handleClick}
                    >
                        Apply now
                    </button>
                </div>
            </div>
        </>
    );
}

export default Hackathon_disp_card