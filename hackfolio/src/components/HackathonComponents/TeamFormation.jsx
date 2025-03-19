import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TeamFormation(props) {
    const inpCodeRef = useRef(null);
    const inpNameRef = useRef(null);
    const { name } = useParams();
    const navigate = useNavigate();

    async function handleCreate() {
        const teamName = inpNameRef.current.value;
        if(teamName.length < 3) {
            alert("Name should have atleast 3 characters.");
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({teamName}),
                credentials: 'include',
            });
            if(response.status === 403) navigate('/Error403');
            if(response.status === 400) {
                alert(response.msg);
            }
            else {
                const data = await response.json();
                console.log(data);
                props.func();
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function handleJoin() {
        const teamCode = inpCodeRef.current.value;
        if(teamCode.length !== 6) {
            console.log("Enter a valid Team Code!");
            return;
        }
        else {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathon/hackathonTeam/${name}/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamCode }),
                    credentials: 'include',
                });
                if(response.status === 403) navigate('/Error403');
                const data = await response.json();
                if(data.msg === "Team Full!") {
                    alert("Team Full!");
                }
                console.log(data);
                props.func();
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    }

    return(
        <div className="bg-white rounded-lg shadow p-6 bg-gradient-to-tr from-blue via-blue-100 to-white">
            
            
            <div className="space-y-6">
                <div className="text-center">
                    <h3 className="text-xl font-medium text-gray-700 mb-4">Have some friends?</h3>
                    
                    <div className="space-y-3">
                        <input 
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter team name"
                            ref={inpNameRef}
                        />
                        <button 
                            className="bg-[#5f3abd] hover:bg-[#5f3abd] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full font-medium"
                            onClick={handleCreate}
                        >
                            Create a team
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 my-4">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-gray-500 font-medium">- OR -</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>
                
                <div className="flex gap-2">
                    <input 
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter team code"
                        ref={inpCodeRef}
                    />
                    <button 
                        className="bg-[#5f3abd] hover:bg-[#5f3abd] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium"
                        onClick={handleJoin}
                    >
                        Join
                    </button>
                </div>
                
            </div>
        </div>
    );
}

export default TeamFormation;
