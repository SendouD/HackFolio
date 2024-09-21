import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function MyHackathonsCard(props) {
    const navigate = useNavigate();
    const { name } = useParams();
    const temp = useState(props.data.hackathonName.split('-').join(' '));
    
    async function handleClick() {
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${props.data.hackathonName}/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            if(data.completelyFilled)
                navigate(`/organizedHackathons/${props.data.hackathonName}`);
            else
                navigate(`/completeHackathonCreation/${props.data.hackathonName}`);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return(
        <>
            <div className="hackathon-card h-auto w-auto flex justify-between items-center" onClick={handleClick}>
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
                </div>
            </div>
        </>
    );
}

export default MyHackathonsCard