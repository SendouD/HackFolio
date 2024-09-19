import { useState, useEffect } from "react";
import Hackathon_disp_card from "../components/Hackathon_disp_card";
import "../styles/hack_card.css"

function Hack_cards_disp() {
    const [data,setData] = useState([]);

    async function getData() {
        try {
            const response = await fetch(`/api/hackathon`, {
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
            <div className="flex flex-wrap justify-center">
                {
                    data.map((element,i) => {
                        console.log(element)
                        return <Hackathon_disp_card key={i} data={element}/>
                    })
                }
            </div>
        </div>
    );
}

export default Hack_cards_disp