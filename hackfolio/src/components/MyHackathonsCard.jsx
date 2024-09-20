import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

function MyHackathonsCard(props) {
    const navigate = useNavigate();
    const { name } = useParams();
    
    async function handleClick() {
        let arr = [];
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${name}/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            arr = await response.json();
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
        if(arr[0].completelyFilled === true) 
            navigate(`/hackathon/${props.data.hackathonName}`);
        else 
            navigate(`/completeHackathonCreation/${name}`);
    }

    return(
        <>
            <div className="hackathon-card h-auto w-auto flex justify-between items-center" onClick={handleClick}>
                <div className="flex justify-between">
                    <div className="hack-name font-semibold text-3xl text-gray-950/80">{props.data.hackathonName}</div>
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