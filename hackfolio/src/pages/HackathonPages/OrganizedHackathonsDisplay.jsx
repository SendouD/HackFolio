import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard"
import Header from "../../components/Header";
import "../../styles/hack_card.css"

function OrganizedHackathonsDisplay() {
    const [data,setData] = useState([]);
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await fetch(`/api/hackathon/organizedHackathons`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const array = await response.json();
            setData(array);
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    } 

    useEffect(()=> {
        getData();
    },[])

    function navFunction(completelyFilled,hackathonName) {
        if (completelyFilled) {
            navigate(`/organizedHackathons/${hackathonName}`);
        } else {
            navigate(`/completeHackathonCreation/${hackathonName}`);
        }
    }

    async function handleClick(hackathonName) {
        try {
            const response = await fetch(`/api/hackathon/hackathonCreate/${hackathonName}/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();

            navFunction(data.completelyFilled,data.hackathonName);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return(
        <div className="">
            <Header></Header>
            <div className="block">
                <div className="text-4xl font-medium flex justify-center my-[50px]">Organized Hackathons :</div>
                {
                    data.map((element,i) => {
                        return <MyHackathonsCard key={i} data={element} handleClick={handleClick}/>
                    })
                }
            </div>
        </div>
    );
}

export default OrganizedHackathonsDisplay