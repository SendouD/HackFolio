import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactingNavBar from '../../components/ReactingNavBar';

const JudgeDashboard = () => {
    const [teams, setTeams] = useState([]); 
    const [criteria, setCriteria] = useState([]); 
    const [scores, setScores] = useState([]); 
    const navigate = useNavigate();
    const { name } = useParams();
    const [MaxScore, setMaxscores] = useState([]); 
    const [errorMessages, setErrorMessages] = useState({}); // Changed to an object to track errors per team

    // Fetching teams and criteria when the component loads
    useEffect(() => {
        const getTeams = async () => {
            try {
                const response = await axios.get(`/api/judge/getteams/${name}`);
                setTeams(response.data.teams);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        
        const getCriteria = async () => {
            try {
                const response = await axios.get(`/api/judge/getcriteria/${name}`);
                console.log(response.data.criteria);
                setCriteria(response.data.criteria);
            } catch (error) {
                console.error("Error fetching criteria:", error);
            }
        };

        getTeams();
        getCriteria();
    }, [name]);

    // Fetching project details for a team
    const getProject = async (teamCode) => {
        try {
            const response = await axios.get(`/api/project/hackathonProject/judge/projects/${teamCode}`);
            const id = response.data.id;
            navigate(`/ProjectDisplay/${id}`);
            
            // Clear any previous error for this team
            setErrorMessages(prev => ({...prev, [teamCode]: null}));
        } catch (e) {
            if (e.response && e.response.status === 404) {
                // Set error message specific to this team's team code
                setErrorMessages(prev => ({...prev, [teamCode]: "Project not uploaded"}));
            }
            console.error("Error fetching project:", e);
        }
    };

    // Rest of the code remains the same...

    return (
        <>
        <div className="flex">
            <ReactingNavBar />
            <div className="space-y-3 size-full">
                <Header />
                <div className="judge-dashboard p-4">
                    <h1 className="text-2xl font-bold mb-4">Judge Dashboard</h1>
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <div key={team.id} className="team-evaluation border rounded-lg p-4 mb-6">
                                <h2 className="text-xl font-semibold"><strong>Team Name:</strong> {team.teamName}</h2>
                                <p><strong>Members:</strong> {team.members.length}</p>

                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4" 
                                    onClick={() => getProject(team.teamCode)}
                                >
                                    View Project
                                </button>
                                
                                {/* Display error message specific to this team */}
                                {errorMessages[team.teamCode] && (
                                    <div className="text-red-500 mt-2">
                                        {errorMessages[team.teamCode]}
                                    </div>
                                )}

                                {/* Rest of the team evaluation code... */}
                            </div>
                        ))
                    ) : (
                        <p>Loading teams...</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default JudgeDashboard;
