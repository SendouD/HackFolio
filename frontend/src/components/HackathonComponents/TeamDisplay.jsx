import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingPage from "../loading";

function TeamDisplay(props) {
    const { name } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isHackathonEnded, setIsHackathonEnded] = useState(false);
    
    useEffect(() => {
        getTeamDetails();
        checkHackathonStatus();
    }, []);
    
    async function getTeamDetails() {
        try {
            const response = await fetch(`${__BACKEND_URL__}/api/hackathon/hackathonTeam/${name}/join`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if(response.status === 403) navigate('/Error403');
            const data = await response.json();
            setData(data.data);
            props.func();
            setLoading(false);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    
    async function checkHackathonStatus() {
        try {
            const response = await fetch(`${__BACKEND_URL__}/api/hackathon/getHackDetails/${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if(!response.ok) return;
            const data = await response.json();
            const currTime = new Date();
            const toTime = new Date(data.data.toDate);
            setIsHackathonEnded(currTime > toTime);
        } catch (error) {
            console.error('Error checking hackathon status:', error);
        }
    }
    
    if(loading) {
        return <LoadingPage />;
    }
    
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <h3 className="text-xl font-medium text-gray-800 mb-4">Team Information</h3>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <span className="font-medium text-gray-600">Team Name</span>
                    <span className="text-gray-800">{data.teamName}</span>
                </div>
                
                {!isHackathonEnded && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                        <span className="font-medium text-gray-600">Team Code</span>
                        <span className="font-mono bg-gray-100 px-3 py-1 rounded border border-gray-300 text-gray-800">{data.teamCode}</span>
                    </div>
                )}
                
                <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-700 mb-2">Team Members</h4>
                    <div className="bg-gray-50 rounded-md border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.members.map((member, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-700">{member.email}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                member.role === 'leader' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {member.role === 'leader' ? 'Team Leader' : 'Member'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamDisplay;