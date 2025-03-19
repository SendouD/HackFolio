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
            alert("Name should have at least 3 characters.");
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
            alert("Enter a valid 6-character Team Code!");
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
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-4 text-center">Create a Team</h3>
                    
                    <div className="space-y-3">
                        <input 
                            type="text"
                            className="w-full px-4 py-2.5 bg-white rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300"
                            placeholder="Enter team name"
                            ref={inpNameRef}
                        />
                        <button 
                            className="w-full py-2.5 px-4 bg-[#5f3abd] hover:bg-[#4f2fa0] text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f3abd]"
                            onClick={handleCreate}
                        >
                            Create a team
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center justify-center gap-4 my-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-gray-500 font-medium text-sm">OR</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                
                <div>
                    <h3 className="text-xl font-medium text-gray-800 mb-4 text-center">Join a Team</h3>
                    <div className="flex gap-2">
                        <input 
                            type="text"
                            className="flex-1 px-4 py-2.5 bg-white rounded-md border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-colors duration-300"
                            placeholder="Enter team code"
                            ref={inpCodeRef}
                        />
                        <button 
                            className="px-6 py-2.5 bg-[#5f3abd] hover:bg-[#4f2fa0] text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f3abd]"
                            onClick={handleJoin}
                        >
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamFormation;