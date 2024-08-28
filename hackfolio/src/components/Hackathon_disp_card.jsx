import { useEffect, useState } from "react";

function Hackathon_disp_card(props) {
    
    async function handleClick() {
        
    }

    useEffect(() => {
        console.log("in")
    },[])

    return(
        <>
            <div className="hackathon-card flex flex-col justify-between">
                <div className="flex justify-between">
                    <div className="hack-name font-semibold text-3xl text-gray-950/80">{props.data.hackathonName}</div>
                    <div className="flex">
                        {
                            props.data.contactLinks.map((ele,i)=>{
                                console.log(ele)
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
                        <div className="hack-status">OFFLINE</div>
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