import { useState,useEffect } from 'react'
import Hack_detailed_info from '../components/Hack_detailed_info';
import Hack_info_card from '../components/Hack_info_card';
import { useParams } from 'react-router-dom';

function Hackathon_page() {
    const { id } = useParams();

    return(
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{marginTop:"30px"}}>
                {/* <div style={{height:"300px",width:"100px"}}/> */}
                <div className="flex">
                    <div>
                        <Hack_detailed_info id={id}/>
                    </div>
                    <div>
                        <Hack_info_card id={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hackathon_page