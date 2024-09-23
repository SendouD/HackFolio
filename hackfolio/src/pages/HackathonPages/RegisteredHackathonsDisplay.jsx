import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard"
import Header from "../../components/Header";
import "../../styles/hack_card.css"
import EditHackathonRegistrationForm from "../../components/HackathonComponents/EditHackathonRegistrationForm";

function RegisteredHackathonsDisplay() {
    const [data,setData] = useState([]);
    const navigate = useNavigate();

    async function getData() {
        try {
            const response = await fetch(`/api/hackathon/registeredHackathons`, {
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

    async function handleClick(hackathonName) {
        navigate(`/hackathon/${hackathonName}/editRegistrationDetails`);
    }

    return(
        <div className="">
            <Header></Header>
            <div className="block">
                <div className="text-4xl font-medium flex justify-center my-[50px]">Registered Hackathons :</div>
                {
                    data.map((element,i) => {
                        return <MyHackathonsCard key={i} data={element} handleClick={handleClick}/>
                    })
                }
            </div>
        </div>
    );
}

export default RegisteredHackathonsDisplay