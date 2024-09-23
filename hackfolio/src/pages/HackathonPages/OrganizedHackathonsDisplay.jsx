import { useState, useEffect, useRef } from "react";
import MyHackathonsCard from "../../components/HackathonComponents/MyHackathonsCard"
import Header from "../../components/Header";
import "../../styles/hack_card.css"

function OrganizedHackathonsDisplay() {
    const [data,setData] = useState([]);

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

    return(
        <div className="">
            <Header></Header>
            <div className="block">
                <div className="text-4xl font-medium flex justify-center my-[50px]">Organized Hackathons :</div>
                {
                    data.map((element,i) => {
                        return <MyHackathonsCard key={i} data={element}/>
                    })
                }
            </div>
        </div>
    );
}

export default OrganizedHackathonsDisplay