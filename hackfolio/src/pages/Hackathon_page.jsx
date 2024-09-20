import { useState,useEffect } from 'react'
import Hack_detailed_info from '../components/Hack_detailed_info';
import Hack_info_card from '../components/Hack_info_card';
import { useParams } from 'react-router-dom';

function Hackathon_page() {
    const { name } = useParams();

    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{marginTop:"30px"}}>
                {/* <div style={{height:"300px",width:"100px"}}/> */}
                <div className="flex">
                    <div>
                        <Hack_detailed_info name={name}/>
                    </div>
                    <div>
                        <Hack_info_card id={name}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hackathon_page