import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamFormation from "../components/TeamFormation";
import TeamDisplay from "../components/TeamDisplay";
import Header from "../components/Header";

function HackathonTeamPage() {
    const [inTeam,setInTeam] = useState(false);
    const { name } = useParams();

    useEffect(()=>{
        handle();
    },[])

    async function handle() {
        try {
            const response = await fetch(`/api/hackathon/registerForHackathon/${name}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const arr = await response.json();
            if(!arr.teamCode) setInTeam(false);
            else setInTeam(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return(
        <>
            <Header />
            {
                (inTeam) ? 
                <TeamDisplay func={handle} /> :
                <TeamFormation func={handle}/>
            }
        </>
    );
}

export default HackathonTeamPage