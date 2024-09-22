import { useRef } from "react";
import { useParams } from "react-router-dom";

function TeamFormation(props) {
    const inpRef = useRef(null);
    const { name } = useParams();

    async function handleCreate() {
        try {
            const response = await fetch(`/api/hackathon/hackathonTeam/${name}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            const data = await response.json();
            console.log(data);
            props.func();
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    async function handleJoin() {
        const teamCode = inpRef.current.value;
        if(teamCode.length !== 6) {
            console.log("Enter a valid Team Code!");
        }
        else {
            try {
                const response = await fetch(`/api/hackathon/hackathonTeam/${name}/join`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ teamCode }),
                });
                
                const data = await response.json();
                console.log(data);
                props.func();
            } catch (error) {
                console.error('Error posting data:', error);
            }
        }
    }

    return(
        <>
            <div className="flex justify-center h-[70vh] items-center">
                <div className="">
                    <div className="flex justify-center">
                        <button 
                            className="bg-blue-500 text-white py-3 px-8 rounded text-2xl hover:bg-blue-800 transition-all w-[350px]"
                            onClick={handleCreate}
                        >
                            Create a team
                        </button>
                    </div>
                    <div className="flex justify-center my-[50px] text-5xl font-medium text-gray-800">
                        {'< - OR - >'}
                    </div>
                    <div className="flex justify-center">
                        <input 
                            type="text"
                            className="w-[400px] text-3xl py-3 px-[30px] font-normal rounded-s card"
                            ref={inpRef}
                        />
                        <button 
                            className="bg-blue-500 text-white py-3 px-8 rounded-e text-2xl hover:bg-blue-700 transition-all"
                            onClick={handleJoin}
                        >
                            Join a team
                        </button>
                    </div>   
                </div>
            </div>
        </>
    );
}

export default TeamFormation