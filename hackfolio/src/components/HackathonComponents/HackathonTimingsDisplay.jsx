import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/hack_info_card.css";

function HackathonTimingsDisplay() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isJudge, setIsJudge] = useState(false); // State to manage judge status

    useEffect(() => {
        getInfo();
        checkIfJudge(); // Check if the user is a judge on component mount
    }, []);

    async function getInfo() {
        try {
            const response = await fetch(`/api/hackathon/updateHackDetails/${name}`);
            
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            setData(arr.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function checkIfJudge() {
        try {
            const response = await fetch(`/api/judge/isjudge/${name}`);
            console.log(response)

            if (response.ok) {
                setIsJudge(true); // Set to true if status is 200
            } else {
                setIsJudge(false); // Set to false if not a judge
            }
        } catch (error) {
            console.error('Error checking judge status:', error);
        }
    }

    async function handleClick() {
        try {
            const response = await fetch(`/api/hackathon/hackathonTeam/${name}/create`);
            console.log(response);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            if (arr.flag === true) {
                navigate(`/hackathon/${name}/editRegistrationDetails`);
            } else {
                navigate(`/hackathon/${name}/register`);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    if (data === null) return <div>Loading...</div>;

    return (
        <div className="hack-info-card flex flex-col justify-between" style={{ marginLeft: "30px" }}>
            <div>
                <div>From: {data.fromDate}</div>
                <div>To: {data.toDate}</div>
            </div>

            <div className='flex justify-center'>
                <button 
                    className="w-11/12 text-xl bg-indigo-600 text-white py-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                    onClick={() => handleClick()}
                >
                    Apply now
                </button>
            </div>

            {/* Render the Judge button if the user is a judge */}
            {isJudge && (
                <div className='flex justify-center mt-4'>
                    <button 
                        className="w-11/12 text-xl bg-green-600 text-white py-4 rounded-md font-semibold hover:bg-green-700 transition-colors"
                        onClick={() => navigate(`/hackathon/${name}/judgeDashboard`)} // Redirect to the judge dashboard
                    >
                        Judge Dashboard
                    </button>
                </div>
            )}
        </div>
    );
}

export default HackathonTimingsDisplay;
