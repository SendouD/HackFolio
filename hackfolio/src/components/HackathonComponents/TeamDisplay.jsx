import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function TeamDisplay(props) {
    const { name } = useParams();
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        getTeamDetails();
    },[])

    async function getTeamDetails() {
        try {
            const response = await fetch(`/api/hackathon/hackathonTeam/${name}/join`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setData(data.data);
            props.func();
            setLoading(false);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    if(loading) {
        return(
            <div className="flex justify-center">
                Loading....
            </div>
        );
    }

    return(
        <>
            <div>
                <div>
                    Team Name: {data.teamName}
                </div>
                <div>
                    Team Code: {data.teamCode}
                </div>
                <div>
                    {
                        data.members.map((ele,i) => {
                            return <div key={i}>{ele.email} : {ele.role}</div>
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default TeamDisplay