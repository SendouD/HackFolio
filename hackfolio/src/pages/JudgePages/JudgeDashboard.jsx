import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const JudgeDashboard = () => {
    const [teams, setTeams] = useState([]); 
    const [criteria, setCriteria] = useState([]); 
    const [scores, setScores] = useState([]) // Store scores for each team and criterion
    const navigate = useNavigate();
    const { name } = useParams();

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
        } catch (e) {
            console.error("Error fetching project:", e);
        }
    };

    // Handle score change for each team and criterion
    const handleScoreChange = (criterionName, score) => {
        const obj={};
        obj[criterionName]=score
        setScores((prev) => [...prev,obj])
        
        
    };

    useEffect(()=>{
        console.log(scores)
    },[scores])

    // Submit evaluation and send the scores to the server
    const submitEvaluation = async (teamId) => {
        const teamScores = scores;
        
        if (!teamScores || teamScores.length === 0) {
            console.error("No scores to submit for team:", teamId);
            return;
        }

        const email = JSON.parse(localStorage.getItem("data")).email; // Retrieve email from localStorage

        try {
            const response = await axios.post('/api/judge/update/scores', {
                teamId,
                email,
                scores: teamScores,
            });
            console.log("Scores updated successfully:", response.data);
        } catch (error) {
            console.error("Error submitting scores:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="judge-dashboard p-4">
                <h1 className="text-2xl font-bold mb-4">Judge Dashboard</h1>
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <div key={team.id} className="team-evaluation border rounded-lg p-4 mb-6">
                            <h2 className="text-xl font-semibold"><strong>Team Name:</strong> {team.teamName}</h2>
                            <p><strong>Status:</strong> {team.judgingStatus}</p>
                            <p><strong>Members:</strong> {team.members.length}</p>

                            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => getProject(team.teamCode)}>
                                View Project
                            </button>

                            <div className="criteria mt-4">
                                <h3 className="text-lg font-semibold">Evaluate Team:</h3>
                                {criteria.filter(criterion => Object.keys(criterion).length > 0).map((criterion) => (
                                    <div key={criterion.name} className="criterion mb-2">
                                        <label className="block text-sm">
                                            {criterion.name} (Max: {criterion.maxMarks})
                                        </label>
                                        <input
                                            type="number"
                                            onChange={(e) => handleScoreChange(criterion.name, e.target.value)}
                                            min={0}
                                            max={criterion.maxMarks}
                                            className="border px-2 py-1 w-full"
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                                onClick={() => submitEvaluation(team._id)}
                            >
                                Submit Evaluation
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading teams...</p>
                )}
            </div>
        </>
    );
};

export default JudgeDashboard;
