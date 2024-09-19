import { useState,useEffect } from 'react'
import "../styles/hack_info_card.css"

function Hack_info_card() {


    return(
        <div className="hack-info-card flex flex-col justify-between" style={{marginLeft:"30px"}}>
            <div>

            </div>

            <div className='flex justify-center'>
                <button 
                    className="w-11/12 text-xl bg-indigo-600 text-white py-4 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Apply now
                </button>
            </div>   
        </div>
    );
}

export default Hack_info_card